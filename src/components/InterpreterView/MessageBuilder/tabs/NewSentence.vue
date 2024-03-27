<script setup>
import {onMounted, ref} from "vue";
import {useMessageStore} from "@/stores/MessageStore.js";

const messageStore = useMessageStore()

const wordSuggestions = ref(['🍝 Dinner', '🏉 Rugby', '🗳️ Politics', '👨‍👩‍👧 Family', '🏥 Health', '🎭 Art',
  '🙂 Mood', '🫂 Friends', '🌦️ Weather', '📆 Plans'])
const newSuggestion = ref('')

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

function wordClicked(word) {
  if (word) {
    messageStore.generateWordSuggestionsFromNewTopic(word)
    messageStore.generateSentenceSuggestionsFromNewTopic(word)
    messageStore.messageTab = 'build'
  }
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
          v-model="newSuggestion"
          @keydown.enter="wordClicked(newSuggestion); newSuggestion = ''"
      >
        <template v-slot:append-inner>
          <v-icon
              id="extra-word"
              @click.stop="wordClicked(newSuggestion); newSuggestion = ''">
            mdi-auto-fix
          </v-icon>
        </template>
      </v-text-field>
    </div>
    <div
        class="word-suggestion raised"
        v-for="(word, index) in wordSuggestions"
        :key="index"
        tabindex="0"
        @click="wordClicked(word)">
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
  align-content: safe center;
  align-items: center;
  justify-content: safe center;
}

.word-suggestion {
  box-sizing: content-box;
  width: fit-content;
  padding: 5px 15px;
  border-radius: 1.5em;
  color: theme.$text-color;
  height: 22px;
  border: 2px solid grey;
  cursor: pointer;
}

#extra-words-wrapper {
  width: 150px;
}

#extra-word {
  cursor: pointer;

  &:hover {
    color: #dea104;
  }
  &:active {
    color: darken(#dea104, 5%);
  }
}

.extra-words-input {
  background-color: theme.$ossia-light-background-1;

  &:deep(.v-field) {
    border: 2px solid #ecc502;
    padding-right: 7px;
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
    color: theme.$text-color;
    gap: 5px;
  }
}

</style>