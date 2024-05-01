window.voice = null;
window.speechSynthesis.onvoiceschanged = function() {
  window.voice = speechSynthesis.getVoices()[1];
};

export default async function speak(text) {

  if (!('speechSynthesis' in window)) {
    alert('Your browser does not support speech synthesis. Please use a supported browser or speech ' +
      'synthesis/recognition will not work');
    return
  }

  // Create a new instance of SpeechSynthesisUtterance.
  const msg = new SpeechSynthesisUtterance();

  // Set the text.
  msg.text = text;

  // Set the attributes.
  msg.volume = 1.0; // 0-1
  msg.rate = 1.0; // 0.1-10
  msg.pitch = 1; // 0-2

  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
  // msg.voice = await speechSynthesis.getVoices().filter((voice) => {
  //   console.log(voice.name)
  //   console.log(voice.name == 'Aaron')
  //   console.log(voice.name === 'Aaron')
  //   return voice.name === 'Aaron';
  // })[0];
  msg.voice = window.voice;
  // Queue this utterance.
  window.speechSynthesis.cancel();  // stop saying anything else
  window.speechSynthesis.speak(msg);
}