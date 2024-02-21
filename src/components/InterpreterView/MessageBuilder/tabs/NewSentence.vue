<script setup>
import {onMounted, ref, watch} from "vue";

const word_suggestions = ref(['🍝 Dinner', '🏉 Rugby', '🗳️ Politics', '👨‍👩‍👧 Family', '🏥 Health', '🎭 Art',
  '🙂 Mood', '🫂 Friends', '🌦️ Weather', '📆 Plans'])

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
    divs[i].style.backgroundColor = colours[newColor];
    divs[i].style.borderColor = colours[newColor];
  }
}

function wordClicked(e) {
}

</script>

<template>

  <div class="word-suggestion-container">
    <div id="extra-words-wrapper">
      <v-text-field
          class="extra-words-input"
          variant="solo"
          rounded
          hide-details
          density="comfortable"
          placeholder="✍️ New topic"
      >
        <template v-slot:append-inner>
          <v-icon id="sendButton">mdi-send</v-icon>
        </template>
      </v-text-field>
    </div>
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

<style scoped lang="scss">
@use '@/assets/theme';
@use '@/assets/main';

.word-suggestion-container {
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
  color: theme.$text-color-primary;
  height: 22px;
  border: 2px solid grey;
  cursor: pointer;
}

#extra-words-wrapper {
  width: 150px;
}

.extra-words-input {
  background-color: theme.$ossia-light-background-1;

  &:deep(.v-field) {
    border: 2px solid #ecc502;
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

  &:deep(.v-btn__content) {
    display: flex;
    color: theme.$text-color-primary;
    gap: 5px;
  }
}

</style>