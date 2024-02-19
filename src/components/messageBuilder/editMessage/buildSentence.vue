<script setup>
import {onMounted, ref, watch} from "vue";

const word_suggestions = ref([
  'hi', 'name', 'James', 'how', 'today', 'friends', 'drink', 'Tim', 'weather',
  'hi', 'name', 'James', 'how', 'today', 'friends', 'drink', 'Tim', 'weather',
  'hi', 'name', 'James', 'how', 'today', 'friends', 'drink', 'Tim', 'weather'])

const colours = [
  '#01b476',
  '#ef470b',
  '#00a6ff',
  '#e56408',
  '#2e32d7',
  '#00b600',
  '#db47e5',
  '#dea104',
  '#e7177e',
];


watch(() => word_suggestions, () => {
  updateWordSuggestionColors();
})
onMounted(() => {
  updateWordSuggestionColors();
})

function updateWordSuggestionColors() {
  const divs = document.getElementsByClassName("word-suggestion");
  let i;
  for (i = 0; i < divs.length; i++) {
    let newColor = i % colours.length
    divs[i].style.borderColor = colours[newColor];
  }
}

function wordClicked (e) {
  e.target.style.backgroundColor = e.target.style.borderColor
  e.target.style.color = 'white'
}

</script>

<template>

    <div class="word-suggestion-container">
      <div
          class="word-suggestion"
          v-for="(word, index) in word_suggestions"
          :key="index"
          tabindex="0"
          @click="wordClicked">
        {{ word }}
      </div>
    </div>

</template>

<style scoped>
@use 'theme';

.word-suggestion-container {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 5px 25px;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.word-suggestion {
  box-sizing: content-box;
  width: fit-content;
  padding: 5px 15px;
  border-radius: 1.5em;
  height: 22px;
  border: 2px solid grey;
  cursor: pointer;
}

</style>