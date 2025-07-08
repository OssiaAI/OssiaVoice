<script setup>
import { ref, onMounted, onBeforeUnmount, defineModel } from "vue";
import micImg from '@/assets/mic-button/mic.svg';
import micHoverImg from '@/assets/mic-button/mic-hover.svg';
import micActiveImg from '@/assets/mic-button/mic-active.svg';
import { useAlertStore } from "@/stores/AlertStore.js";
import { useSettingsStore } from "@/stores/SettingsStore.js";
import { pipeline, AutoProcessor, AutoModelForAudioFrameClassification, read_audio } from "@huggingface/transformers";

let segmentationProcessor = null;
let segmentationModel = null;

/**
 * Limits the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
// Helper Functions
/**
 * Filters and enhances diarization segments
 * @param {Array} diarization - Raw diarization segments from model
 * @returns {Array} Filtered (confidence >= 0.8) and processed diarization segments
 */
function preprocessDiarization(diarization) {
  return diarization
    .filter(segment => segment.end - segment.start >= 0.5)
    .filter(segment => segment.confidence >= 0.8)
    .map(segment => ({
      ...segment,
      label: segment.label || `Speaker_${segment.id}`
    }));
}

/**
 * Merges transcription and diarization results
 * @param {Object} transcription - Whisper transcription result
 * @param {Array} diarization - Speaker diarization segments
 * @returns {Object} Combined results with formatted text and segments
 */
function mergeResults(transcription, diarization) {
  const validSegments = preprocessDiarization(diarization);

  const formattedSegments = transcription.chunks.reduce((acc, chunk) => {
    const speaker = findOptimalSpeaker(chunk.timestamp, validSegments);
    return mergeSegments(acc, chunk, speaker);
  }, []);

  return {
    formattedText: generateReadableText(formattedSegments),
    segments: formattedSegments,
    rawData: { diarization, transcription }
  };
}

/**
 * Finds the most appropriate speaker for a given time chunk
 * @param {Array} timestamp - [start, end] timestamps for the chunk
 * @param {Array} segments - Available speaker segments
 * @returns {string} Speaker label for the chunk
 */
function findOptimalSpeaker([start, end], segments) {
  // Case 1: Find segments that completely contain this chunk
  const containingSegments = segments.filter(
    segment => segment.start <= start && segment.end >= end
  );
  if (containingSegments.length === 1) {
    return containingSegments[0].label;
  }
  
  if (containingSegments.length > 1) {
    console.log('Mode1:', containingSegments.length);
    // If multiple segments contain this chunk, use the one with highest confidence
    return containingSegments.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    ).label;
  }
  
  // Case 2: Find segments with meaningful overlap
  const overlapThreshold = 0.65; 
  const chunkDuration = end - start;
  
  const overlappingSegments = segments.filter(segment => {
    const overlapStart = Math.max(start, segment.start);
    const overlapEnd = Math.min(end, segment.end);
    const overlapDuration = Math.max(0, overlapEnd - overlapStart);
    console.log('Mode2:', overlapDuration);
    return overlapDuration / chunkDuration >= overlapThreshold;
  });
  
  if (overlappingSegments.length > 0) {
    return overlappingSegments.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    ).label;
  }
  
  // Case 3: Fall back to midpoint distance method
  const chunkMid = (start + end) / 2;
  let bestMatch = null;
  let minDistance = Infinity;

  for (const segment of segments) {
    const segmentMid = (segment.start + segment.end) / 2;
    const distance = Math.abs(segmentMid - chunkMid);
    
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = segment;
    }
    
  }
  console.log('Mode3:', minDistance);
  return bestMatch?.label || 'Speaker';
}

/**
 * Merges consecutive segments from the same speaker
 * @param {Array} acc - Accumulated segments
 * @param {Object} chunk - Current chunk to process
 * @param {string} speaker - Speaker label
 * @returns {Array} Updated segments array
 */
function mergeSegments(acc, chunk, speaker) {
  const last = acc[acc.length - 1];
  const newSegment = {
    start: chunk.timestamp[0],
    end: chunk.timestamp[1],
    text: chunk.text.trim(),
    speaker
  };

  if (last && last.speaker === speaker && (chunk.timestamp[0] - last.end < 1.5)) {
    last.text += ` ${newSegment.text}`;
    last.end = newSegment.end;
    return acc;
  }
  return [...acc, newSegment];
}

/**
 * Generates human-readable text from processed segments
 * @param {Array} segments - Speaker segments with text
 * @returns {string} Formatted text with speaker labels
 */
function generateReadableText(segments) {
  return segments.map(s => `${s.speaker}: ${s.text}`).join('\n\n');
}

// Speaker Segmentation Processing
/**
 * Processes audio for speaker diarization
 * @param {Blob} audioBlob - The recorded audio blob to process
 * @returns {Promise<Array>} Array of speaker segments with timing information
 */
async function processDiarization(audioBlob) {
  try {
    // First, convert the blob to an ArrayBuffer
    const audioUrld = URL.createObjectURL(audioBlob);

    const processedAudio = await read_audio(audioUrld,segmentationProcessor.feature_extractor.config.sampling_rate);
    
    const inputs = await segmentationProcessor(processedAudio);

    const { logits } = await segmentationModel(inputs);
    
    const diarization = segmentationProcessor.post_process_speaker_diarization(
      logits,
      processedAudio.length
    )[0];
    
    return diarization;
  } catch (error) {
    console.error('Diarization error:', error);
    return [];
  }
}

/**
 * Removes unwanted markers from transcription text
 * @param {string} text - Raw transcription text
 * @returns {string} - Cleaned text
 */
function filterText(text) {
  if (!text) return '';
  return text.replace(/\[BLANK_AUDIO\]/g, '').trim();
}

/** Sample rate for Whisper model audio processing */
const WHISPER_SR = 16000;
const alertStore = useAlertStore();
const settingsStore = useSettingsStore();

/** Two-way binding for transcription result */
const model = defineModel();

// State management
const micActive = ref(false);
const micBtnImage = ref(micImg);
const currentModelName = ref('');
const isLoading = ref(true);
const loadProgress = ref(0);
const isProcessing = ref(false);
const isProcessing_normalpipeline = ref(false);
let transcriber = null;
const partialResult = ref('');
const accumulatedText = ref(''); 
const processingSpeed = ref(0);
/** Emit transcription result with audio data */
const emit = defineEmits(["textAvailable"]);

// Audio processing resources
let audioContext = null;
let mediaStreamSource = null;
let scriptProcessor = null;
let audioStream = null;
let worker = null;
let initTimeout = null;
let audioBuffers = [];
let lastSendTime = 0;
const BUFFER_SEND_INTERVAL = 1000;

/** Stores complete audio recording for final processing */
let completeAudioData = [];

/** Available speech recognition models */
const modelMap = {
  'Choice 1': 'Xenova/whisper-tiny.en',
  'Choice 2': 'Xenova/whisper-base.en',
  'Choice 3': 'Xenova/whisper-small.en'
};

/**
 * Handles errors consistently throughout the component
 * @param {string} context - Description of where error occurred
 * @param {Error} error - Error object
 */
const handleError = (context, error) => {
  const message = error?.message || 'Unknown error';
  console.error(`[ERROR] ${context}`, message);
  alertStore.showAlert("error", context,
    message.includes('FeatureExtractor') ? 
    'Audio processing initialization failed, please refresh the page and try again' : 
    message
  );
  stopRecording();
  cleanup();
};

/**
 * Initialize component, load speech recognition model and worker
 */
onMounted(async () => {
  const selectedModel_full = modelMap[settingsStore.selectedSTTModel] || modelMap['Choice 1'];
  model.value = '';
  try {
    isLoading.value = true;
    loadProgress.value = 10;
    
    currentModelName.value = selectedModel_full ;
    loadProgress.value = 30;
    transcriber = await pipeline(
      "automatic-speech-recognition",
      selectedModel_full ,
    );
  } catch (error) {
    alertStore.showAlert("error", "Model Load Failed", error.message);
  } 
  try {
    loadProgress.value = 60;
    segmentationProcessor = await AutoProcessor.from_pretrained('onnx-community/pyannote-segmentation-3.0');
    console.log('Segmentation Processor Loaded');
    
    loadProgress.value = 80;
    segmentationModel = await AutoModelForAudioFrameClassification.from_pretrained(
      'onnx-community/pyannote-segmentation-3.0', 
      { device: 'wasm', dtype: 'fp32' }
    );
    console.log('Segmentation Model Loaded');
  } catch (error) {
    alertStore.showAlert("error", "Segmentation Model Load Failed", error.message);
  }
  loadProgress.value = 90;
  try {
    console.group('[Main] Initialization start');
    loadProgress.value = 1;    
    worker = new Worker(new URL('@/workers/whisper-worker.js?worker&inline', import.meta.url), {
      type: 'module'
    });
    worker.onmessage = (e) => {
      console.log(`[Main] Received message: ${e.data.status}`, e.data);
      try {
        switch (e.data.status) {
          case 'start':
            isProcessing.value = true;
            processingSpeed.value = 0;
            break;
          case 'loading':
            loadProgress.value = e.data.progress || 0;
            currentModelName.value = e.data.file || '';
            break;
          case 'ready':
            clearTimeout(initTimeout);
            isLoading.value = false;
            break;
          case 'update':
            isProcessing.value = true;
            if (e.data.output) {   
              if (e.data.tps) {
                processingSpeed.value = e.data.tps;
              }
            }
            break;
          case 'complete': {
            const finalText = e.data.output && Array.isArray(e.data.output) ? 
              e.data.output[0] : e.data.output || '';
            const filteredFinal = filterText(finalText);
            console.log(`[Main] Complete result: "${filteredFinal}"`);
            throttledUpdate(filteredFinal);
            setTimeout(() => {
              isProcessing.value = false;
            }, 1000);
            break;
          }
          case 'error':
            handleError("Worker error", new Error(e.data.error));
            break;
        }
      } catch (error) {
        handleError("Message processing failed", error);
      }
    };

    worker.onerror = (e) => handleError("Worker runtime error", e.error);

    initTimeout = setTimeout(() => {
      if (isLoading.value) handleError("Initialization timeout", new Error("Model loading took too long, exceeded 60 seconds"));
    }, 60000);

    const selectedModel = 'onnx-community/whisper-tiny';
    worker.postMessage({ 
      type: 'load',
      data: { modelId: selectedModel }
    });

    console.groupEnd();
  } catch (error) {
    handleError("Initialization failed", error);
  }
});

/**
 * Begin audio recording and real-time transcription
 * Captures microphone input and sends to worker for processing
 */
async function startRecording() {
  try {
    console.group('[Main] Start recording');
    accumulatedText.value = ''
    model.value = '';
    partialResult.value = '';
    completeAudioData = [];
    
    audioStream = await navigator.mediaDevices.getUserMedia({ 
      audio: { 
        sampleRate: WHISPER_SR,
        noiseSuppression: true,
        echoCancellation: true
      }
    });
    
    audioContext = new AudioContext({ 
      sampleRate: WHISPER_SR,
      latencyHint: 'interactive'
    });

    mediaStreamSource = audioContext.createMediaStreamSource(audioStream);
    
    /**
     * Creating our "virtual sound engineer" to clean up voice recordings
     * 
     * First, we set up a noise gate (like what radio DJs use) that helps
     * separate your voice from background noise. It works by:
     * - Setting a "noise floor" at -50dB (quiet enough to catch normal speech)
     * - Using a gentle transition curve (40dB) so your voice sounds natural
     * - Applying strong reduction (12:1) to background noises like fans or AC
     * - Responding quickly (3ms) to catch the start of words
     * - Fading out naturally (250ms) like a human ear would expect
     */
    const noiseGate = audioContext.createDynamicsCompressor();
    noiseGate.threshold.value = -50;
    noiseGate.knee.value = 40;     
    noiseGate.ratio.value = 12;    
    noiseGate.attack.value = 0.003;
    noiseGate.release.value = 0.25;

    /**
     * Next, we add a "tone filter" that focuses on the frequencies of human speech
     * 
     * Think of this like adjusting the treble knob on your stereo. We're keeping
     * frequencies below 8kHz (where your voice lives) and reducing higher sounds
     * (like hissing, static, or that annoying high-pitched whine from electronics).
     * This makes your voice clearer to the AI, just like it would be easier for a
     * friend to hear you in a noisy café if they could filter out the espresso machine.
     */
    const lowPassFilter = audioContext.createBiquadFilter();
    lowPassFilter.type = 'lowpass';
    lowPassFilter.frequency.value = 8000;

    /**
     * Finally, we connect everything together like a recording studio signal chain
     * 
     * Your voice flows through each processor in sequence:
     * 1. Raw microphone input (your actual voice)
     * 2. Through the noise gate (removes background sounds)
     * 3. Through the tone filter (focuses on speech frequencies)
     * 
     * It's like having a personal sound engineer clean up your audio in real-time!
     */
    mediaStreamSource.connect(noiseGate);
    noiseGate.connect(lowPassFilter);
    
    scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
    
    // Route processed audio through scriptProcessor for analysis
    lowPassFilter.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);

    audioBuffers = [];
    lastSendTime = 0;

    scriptProcessor.onaudioprocess = e => {
      const chunk = e.inputBuffer.getChannelData(0);
      // Skip empty or silent chunks
      if (!chunk.some(s => s !== 0)) return;

      try {
        // Add audio fragments to buffer
        const chunkCopy = new Float32Array(chunk);
        audioBuffers.push(chunkCopy);
        
        // Also save to complete audio data array
        completeAudioData.push(new Float32Array(chunk));
        
        const now = Date.now();
        // Send batch data at regular intervals
        if (now - lastSendTime >= BUFFER_SEND_INTERVAL && audioBuffers.length > 0) {
          lastSendTime = now;
          
          // Merge audio data in the buffer
          const totalLength = audioBuffers.reduce((sum, buf) => sum + buf.length, 0);
          const mergedBuffer = new Float32Array(totalLength);
          
          let offset = 0;
          audioBuffers.forEach(buffer => {
            mergedBuffer.set(buffer, offset);
            offset += buffer.length;
          });
          
          // Clear the buffer
          audioBuffers = [];
          
          worker.postMessage({
            type: 'generate',
            data: { 
              audio: mergedBuffer,
              language: 'en'
            }
          });
        }
      } catch (error) {
        handleError("Audio sending failed", error);
      }
    };

    console.groupEnd();
  } catch (error) {
    handleError("Microphone access failed", error);
  }
}

/**
 * Stop recording and process complete audio
 * Performs final high-quality transcription on full audio data
 */
async function stopRecording() {
  try {
    [scriptProcessor, mediaStreamSource].forEach(node => node?.disconnect());
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
    }
    audioStream?.getTracks().forEach(track => track.stop());
    
    // Merge complete audio data
    let fullAudio = null;
    if (completeAudioData.length > 0) {
      // Calculate total length
      const totalLength = completeAudioData.reduce((sum, buf) => sum + buf.length, 0);
      fullAudio = new Float32Array(totalLength);

      
      // Merge all fragments
      let offset = 0;
      completeAudioData.forEach(buffer => {
        fullAudio.set(buffer, offset);
        offset += buffer.length;
      });
      
      // Process complete audio with the loaded model
      if (transcriber) {
        try {
          console.log("[Main] Processing complete audio with pipeline...");
          isProcessing_normalpipeline.value = true;
          
          // Convert Float32Array to WAV Blob
          const audioBlob = await float32ArrayToWavBlob(fullAudio);
          const audioUrl = URL.createObjectURL(audioBlob);
          
          const [transcription, diarization] = await Promise.all([
            transcriber(audioUrl, {
              return_timestamps: 'word',
            }),
            processDiarization(audioBlob)
          ]);

          // Debug logging for Whisper transcription results
          console.log('======= WHISPER TRANSCRIPTION RESULTS =======');
          console.log('Full text:', transcription.text);
          console.log('Number of chunks:', transcription.chunks.length);
          console.log('===========================================');

          // Debug logging for pyannote-segmentation diarization results
          console.log('======= PYANNOTE DIARIZATION RESULTS =======');
          console.log('Number of segments:', diarization.length);
          if (diarization.length > 0) {
            console.log('First 5 segments:', diarization.slice(0, 5));
            console.log('Last 5 segments:', diarization.slice(-5));
            
            // Calculate total duration and speaker stats
            const totalDuration = diarization.reduce((sum, seg) => sum + (seg.end - seg.start), 0);
            const speakerCounts = diarization.reduce((counts, seg) => {
              counts[seg.id] = (counts[seg.id] || 0) + 1;
              return counts;
            }, {});
            
            console.log('Total audio duration from segments:', totalDuration);
            console.log('Speaker distribution:', speakerCounts);
          } else {
            console.log('No diarization segments found!');
          }
          console.log('===========================================');

          const validSegments = preprocessDiarization(diarization);
          console.log('After preprocessing:', validSegments.length, 'valid segments');
          
          const mergedResults = mergeResults(transcription, diarization);
          model.value = mergedResults.formattedText;
          emit("textAvailable");
          isProcessing_normalpipeline.value = false;
        } catch (error) {
          handleError("Complete audio processing failed", error);
        }
      } else {
        // Fallback to worker if pipeline isn't available
        worker?.postMessage({ 
          type: 'finalize',
          data: { fullAudio }
        });
        emit("textAvailable");
      }
    }
    
    micActive.value = false;
  } catch (error) {
    handleError("Stop recording failed", error);
  }
}
/**
 * Converts a Float32Array to a WAV Blob
 * @param {Float32Array} float32Array - Audio data
 * @returns {Promise<Blob>} - Audio blob in WAV format
 */
async function float32ArrayToWavBlob(float32Array) {
  // WAV file format specifications
  const numChannels = 1; // Mono
  const sampleRate = WHISPER_SR;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = float32Array.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // WAV header (44 bytes total)
  // "RIFF" chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true); // ChunkSize
  writeString(view, 8, 'WAVE');

  // "fmt " sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // "data" sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write audio data
  const volume = 0.8; // Adjust volume as needed
  let offset = 44;
  for (let i = 0; i < float32Array.length; i++) {
    // Convert float32 sample to int16
    const sample = Math.max(-1, Math.min(1, float32Array[i])); // Clamp between -1 and 1
    const int16Sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    view.setInt16(offset, int16Sample * volume, true); // true for little-endian
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

/**
 * Helper function to write strings to DataView
 * @param {DataView} view - DataView to write to
 * @param {number} offset - Position to start writing
 * @param {string} string - String to write
 */
function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
/**
 * Reset UI elements and partial results 
 */
function cleanup() {
  partialResult.value = '';
  processingSpeed.value = 0;
  micBtnImage.value = micImg;
}

/**
 * Clean up resources when component is destroyed
 */
onBeforeUnmount(() => {
  try {
    clearTimeout(initTimeout);
    worker?.terminate();
    stopRecording();
    audioContext = null;
    mediaStreamSource = null;
    scriptProcessor = null;
    audioStream = null;
  } catch (error) {
    handleError("Unmount failed", error);
  }
});

/**
 * Handle microphone button click
 * Toggles recording state
 */
const micClick = async () => {
  try {
    // If mic is already active, allow turning it off even during processing
    if (micActive.value) {
      micActive.value = false;
      micBtnImage.value = micImg;
      stopRecording();
      return;
    }
    
    // Otherwise, only allow turning ON if not loading or processing
    if (isLoading.value || isProcessing.value) return;
    
    micActive.value = true;
    micBtnImage.value = micActiveImg;
    await startRecording();
  } catch (error) {
    handleError("Microphone operation failed", error);
  }
};

/**
 * Handle partial transcription results with throttling
 * Updates model value with intermediate results for responsive UI
 */
const throttledUpdate = throttle((text) => {
  if (!text) return;
  
  if (partialResult.value !== text) {
    if (partialResult.value) {
      accumulatedText.value += partialResult.value + ' ';
    }
    partialResult.value = text;
  }
  
  if (model !== undefined) {
    model.value = accumulatedText.value + text;
  }
}, 200);

/** Handle microphone button hover state */
const micHover = () => !micActive.value && (micBtnImage.value = micHoverImg);

/** Handle microphone button hover exit state */
const micUnhover = () => !micActive.value && (micBtnImage.value = micImg);
</script>

<template>
  <div id="mic-btn-container">
    <div v-show="isLoading" class="loading-overlay">
      <div class="progress-bar">
        <div class="progress" :style="{ width: loadProgress + '%' }"></div>
      </div>
      <div class="loading-text">Initializing: {{ currentModelName }}</div>
    </div>

    <!-- Full-Screen Processing Animation -->
    <div v-show="isProcessing_normalpipeline" class="processing-animation">
      <div class="processing-spinner"></div>
      <div class="processing-text">Processing Audio...</div>
    </div>

    <img 
      id="mic-btn"
      :class="{ 
        haloGrow: micActive,
        'loading-state': isLoading 
      }"
      :src="micBtnImage"
      @click="micClick"
      @mouseenter="!isLoading && micHover()"
      @mouseleave="!isLoading && micUnhover()"
    />
  </div>
</template>

<style scoped>
#mic-btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
}

#mic-btn {
  box-sizing: content-box;
  height: 75%;
  cursor: pointer;
  position: relative;
}

.haloGrow {
  border-style: solid;
  animation-name: halo;
  animation-duration: 1.1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
}

@keyframes halo {
  from {
    border-color: rgba(69, 189, 69, 0.9);
    border-width: 0;
    border-radius: 100%; /* Maintain circular border */
  }
  to {
    border-color: transparent;
    border-width: 20px;
    border-radius: 100%; /* Maintain circular border */
  }
}

/* Full-Screen Processing Animation */
.processing-animation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.processing-spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #41b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.processing-text {
  font-size: 1.2em;
  font-weight: 500;
  color: #e6e6e6;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Loading interface styles */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.progress-bar {
  width: 200px;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #41b883, #35495e);
  transition: width 0.3s ease;
}

.loading-text {
  margin-top: 8px;
  color: #2c3e50;
  font-size: 0.9em;
}

.loading-state {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>


