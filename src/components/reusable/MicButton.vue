<script setup>
import {ref} from "vue";
import micImg from '@/assets/mic-button/mic.svg'
import micHoverImg from '@/assets/mic-button/mic-hover.svg'
import micActiveImg from '@/assets/mic-button/mic-active.svg'
import {AlertStore} from "@/stores/AlertStore.js";

const alertStore = AlertStore();

const micActive = ref(false)
const micBtnImage = ref(micImg)

const model = defineModel()
const emit = defineEmits(['textAvailable'])
const continuous = false

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()

recognition.continous = false
recognition.interimResults = true
recognition.lang = 'en-US'

function micHover() {
  if (micActive.value) return
  micBtnImage.value = micHoverImg
}

function micUnhover() {
  if (micActive.value) return
  micBtnImage.value = micImg
}

function micClick() {
  micActive.value = !micActive.value
  if (micActive.value) {
    micBtnImage.value = micActiveImg
    startRecognition()
  } else {
    micBtnImage.value = micImg
    recognition.stop()
  }
}

function startRecognition() {
    recognition.onstart = () => {
      console.log("Listening!")
    }
    recognition.start()
    recognition.onend = () => {
        emit('textAvailable')
        if (continuous && micActive.value) {
          console.log("...continue listening...")
          recognition.start()
        } else if (micActive.value) {
          micClick()
        }
      }

    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          model.value = transcript
        }
        else {
          interimTranscript += transcript
          model.value = interimTranscript
        }
      }
    }

    recognition.onerror = event => {
      alertStore.showAlert('error', "Error occurred in recognition", event.error)
    }
}


</script>

<template>
  <div id="mic-btn-container">
    <img id="mic-btn" :class="{ haloGrow: micActive }" alt="mic-icon" :src="micBtnImage" @mouseenter="micHover" @mouseleave="micUnhover"
         @click="micClick"/>
  </div>
</template>
<style scoped>

#mic-btn-container {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100%;
}

#mic-btn {
  box-sizing: content-box;
  height: 75%;
  cursor: pointer;
  position: relative;
  align-self: center;
  justify-self: center;
  justify-content: center;
}


.haloGrow {
  border-style: solid;
  animation-name: halo;
  animation-duration: 1.1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  //border-color: rgba(69, 189, 69, 0.9);
  //border-width: 20px;
  //border-radius: 100%;
  //animation-direction: alternate;
}

@keyframes halo {
  from {
    border-color: rgba(69, 189, 69, 0.9);
    border-width: 0;
    border-radius: 75%;
  }
  to {
    border-color: transparent;
    border-width: 20px;
    border-radius: 100%;
  }
}


</style>