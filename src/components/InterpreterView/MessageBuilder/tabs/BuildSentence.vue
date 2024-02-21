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

function wordClicked(e) {
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
    <div id="extra-words-wrapper">
      <v-text-field
          class="extra-words-input"
          variant="solo"
          rounded
          hide-details
          density="comfortable"
          placeholder="add"
      >
        <template v-slot:append-inner>
          <v-icon id="sendButton">mdi-plus</v-icon>
        </template>
      </v-text-field>
    </div>
    <v-btn id="create" class="edit-btn long-btn">
      Create sentence
      <v-icon size="20" color="text-color-primary">mdi-auto-fix</v-icon>
    </v-btn>
  </div>

</template>

<style scoped lang="scss">
@use '@/assets/theme';
@use '@/assets/main';

.word-suggestion-container {
  display: flex;
  align-items: center;
  align-content: safe center;
  justify-content: safe center;
  flex-wrap: wrap;
}

.word-suggestion {
  box-sizing: content-box;
  width: fit-content;
  padding: 5px 15px;
  margin: 5px;
  border-radius: 1.5em;
  height: 22px;
  border: 2px solid grey;
  cursor: pointer;
}

#extra-words-wrapper {
  width: 100px;
  margin: 5px;
}

.extra-words-input {
  background-color: theme.$ossia-light-background-1;

  &:deep(.v-field) {
    border: 2px solid #00a6ff;
    padding-right: 3px;
  }

  &:deep(.v-field__input) {
    text-align: center;
    min-height: 32px;
    padding: 2px 0 2px 2px;
  }
}

#create {
  background-color: theme.$primary;
  margin: 5px;

  &:deep(.v-btn__content) {
    display: flex;
    color: theme.$text-color-primary;
    gap: 5px;
  }
}

</style>