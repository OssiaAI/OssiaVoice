<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {useMessageStore} from "@/stores/MessageStore.js";
import WordChip from "@/components/reusable/WordChip.vue";

const messageStore = useMessageStore()
const wordObjects = reactive({"words": new Set([])})
const previousWordObjects = reactive({"words": new Set([])})
const newWord = ref('')

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

watch(() => messageStore.wordSuggestions, () => {
  updateWordSuggestions()
})
onMounted(() => {
  updateWordSuggestions()
})

function updateWordSuggestions() {
  let tempWordObjects
  tempWordObjects = new Set(messageStore.wordSuggestions.map((word, index) => {
    return {'word': word, 'active': false, 'color': colours[index % colours.length]}
  }))
  wordObjects.words = new Set([...tempWordObjects, ...previousWordObjects.words])
  previousWordObjects.words = new Set()
}

function toggleActive(event, item) {
  item.active = !item.active
}

function submitGenerateSentence() {
  let selectedWordObjects = [...wordObjects.words].filter(messageObject => messageObject.active)
  let wordList = selectedWordObjects.map(wordObject => wordObject.word)
  if (wordList.length > 0) {
    previousWordObjects.words = new Set(selectedWordObjects)
    messageStore.generateSentencesFromWords(wordList)
    messageStore.generateMoreWordsFromWords(wordList)
  }
}

function addWord(){
  let index = wordObjects.words.size
  wordObjects.words = new Set([...wordObjects.words,
    {'word': newWord.value, 'active': true, 'color': colours[(index) % colours.length]}])
  newWord.value = ''
}

</script>

<template>

  <div class="word-chip-container">
    <WordChip
        v-for="(item, index) in wordObjects.words"
        :index="index"
        :color="colours[index % colours.length]"
        :active="item.active"
        :key="index"
        class="raised"
        @click="toggleActive($event, item)">
      {{ item.word }}
    </WordChip>
    <div id="extra-words-wrapper">
      <v-text-field
          class="extra-words-input"
          variant="solo"
          rounded
          hide-details
          density="comfortable"
          placeholder="add"
          v-model="newWord"
          @keydown.enter="addWord"
      >
        <template v-slot:append-inner>
          <v-icon
              id="addButton"
              @click="addWord"
          >
            mdi-plus
          </v-icon>
        </template>
      </v-text-field>
    </div>
    <v-btn id="create" class="edit-btn long-btn" @click="submitGenerateSentence">
      Create sentence
      <v-icon size="20" color="text-color-primary">mdi-auto-fix</v-icon>
    </v-btn>
  </div>

</template>

<style scoped lang="scss">
@use '@/assets/theme';
@use '@/assets/main';

.word-chip-container {
  display: flex;
  align-items: center;
  align-content: safe center;
  justify-content: safe center;
  flex-wrap: wrap;
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

#addButton {
  cursor: pointer;

  &:hover {
    color: #00a6ff;
  }

  &:active {
    color: darken(#00a6ff, 10%);
  }
}

#create {
  background-color: theme.$primary;
  margin: 5px;

  &:deep(.v-btn__content) {
    display: flex;
    color: theme.$text-color;
    gap: 5px;
  }
}

</style>