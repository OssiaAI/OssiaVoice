<script setup>
import {onMounted, ref, watch} from "vue";

const tab = ref('new')
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
    divs[i].style.backgroundColor = colours[newColor];
  }
}

</script>

<template>
  <div id="edit-message-container">
    <v-tabs id="tabs" v-model="tab">
      <v-tab value="build">
        <v-icon size="30" icon="mdi-comment-flash-outline"/>
      </v-tab>
      <v-tab value="new">
        <v-icon size="30" icon="mdi-comment-plus-outline"/>
      </v-tab>
      <v-tab value="edit">
        <v-icon size="30" icon="mdi-comment-edit-outline"/>
      </v-tab>
    </v-tabs>

    <div class="word-suggestion-container">
      <div class="word-suggestion" v-for="(word, index) in word_suggestions" :key="index" tabindex="0">
        {{ word }}
      </div>
    </div>

  </div>
</template>

<style scoped>

#edit-message-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 20px;
}

#tabs {
  flex-grow: 0;
  margin: 5px;
}

.word-suggestion-container {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px 25px;
}

.word-suggestion {
  box-sizing: content-box;
  color: white;
  width: fit-content;
  padding: 5px 15px;
  border-radius: 1.5em;
  height: 22px;
}

</style>