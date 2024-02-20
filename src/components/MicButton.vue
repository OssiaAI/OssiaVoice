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
  }
  else {
    micBtnImage.value = micImg
  }

}


</script>

<template>
  <div id="mic-btn-container">
    <div id="mic-halo" :class="{ haloGrow: micActive }"/>
    <img id="mic-btn" alt="mic-icon" :src="micBtnImage" @mouseenter="micHover" @mouseleave="micUnhover" @click="micClick"/>
  </div>
</template>
<style scoped>

#mic-btn-container {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  min-height: 180px;
  min-width: 10px;
}

#mic-btn {
  height: 140px;
  cursor: pointer;
}

#mic-halo {
  height: 140px;
  width: 140px;
  border-radius: 70px;
  background-color: green;
}

.haloGrow {
  animation-name: halo;
  animation-duration: 1.1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  //animation-direction: alternate;
}

@keyframes halo {
  from {height: 140px; width: 140px; background-color: rgba(69, 189, 69, 0.9); border-radius: 70px;}
  to {height: 180px; width: 180px; background-color: transparent; border-radius: 90px;}
}


</style>