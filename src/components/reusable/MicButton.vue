<script setup>
import {ref} from "vue";
import micImg from '@/assets/mic-button/mic.svg'
import micHoverImg from '@/assets/mic-button/mic-hover.svg'
import micActiveImg from '@/assets/mic-button/mic-active.svg'

const micActive = ref(false)
const micBtnImage = ref(micImg)

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
  } else {
    micBtnImage.value = micImg
  }

}


</script>

<template>
  <div id="mic-btn-container">
    <!--    <div id="mic-halo" :class="{ haloGrow: micActive }"/>-->
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
  //border: 20px solid green;
  //border-radius: 75%;
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