import {reactive, ref} from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', () => {
  const userBackground = ref()
  const currentContext = ref()
  const messageHistory = reactive({})
  const currentEditIteration = reactive({})
  const wordSuggestions = ref()
  const sentenceSuggestions = ref()

  // Build Sentences
  function buildSentenceFromWords(words) {

  }

  function generateMoreWordsFromSelection(words) {

  }

  // New Sentence
  function generateWordSuggestionsFromNewTopic(topic) {

  }

  function generateSentenceSuggestionsFromNewTopic(topic) {

  }

  // Edit Sentence
  function editSingleResponseWithHint(response, hint) {

  }

  function editAllResponsesWithHint(hint) {

  }

  // Generate Response
  function generateNewReponsesFromHint(hint) {

  }

  return {
    userBackground,
    currentContext,
    messageHistory,
    currentEditIteration,
    wordSuggestions,
    sentenceSuggestions,
    buildSentenceFromWords,
    generateMoreWordsFromSelection,
    generateWordSuggestionsFromNewTopic,
    generateSentenceSuggestionsFromNewTopic,
    editSingleResponseWithHint,
    editAllResponsesWithHint,
    generateNewReponsesFromHint,
  }
})
