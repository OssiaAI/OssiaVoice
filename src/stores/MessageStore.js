import {reactive, ref} from 'vue'
import {defineStore} from 'pinia'
import {ChatOpenAI} from "@/repositories/ChatCompletionRepository.js";
import {exampleContext} from "@/stores/example_context.js";
import {exampleUserBackstory} from "@/stores/example_backstory.js";

export const useMessageStore = defineStore('messages', () => {
  const userBackstory = ref(exampleUserBackstory)
  const currentContext = ref(exampleContext)
  const interlocutorPhrase = ref('')
  const scriberPhrase = ref('')
  const messageHistory = ref([])
  const previousSuggestions = reactive({})
  const wordSuggestions = ref([
    'hi', 'how', 'you', 'weather', 'nice', 'hungry', 'dinner', 'today', 'weather', 'i',
    'work', 'rugby', 'jazz', 'cold', 'warm', 'thirsty', 'bored', 'good'])
  const sentenceSuggestions = ref([
    "Hi, how are you doing?", "What's on for your day?",
    "I'm a little cold", "Get up to anything interesting today?"])
  const editInstruction = ref(null)
  const messageTab = ref('build')

  const client = new ChatOpenAI(userBackstory.value)

  // Respond
  async function generateSentences() {
    const command = `Given the conversation history, generate a list of 3 to 5 short generic sentences the 
      assistant may want to say`
    sentenceSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, false, true)
  }

  async function generateWords() {
    const command = `Given the conversation history, generate a short list of key words and connector words or 
    very short phrases the assistant can select from to build a new sentence`
    wordSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, true, false)
  }

  // Build Sentences
  async function generateSentencesFromWords(words) {
    const command = `Given the following list of words, generate between 3-5 sentences that the assistant 
    might be trying to say. Keep them generic:\n${words}`
    sentenceSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, false, true)
  }

  async function generateMoreWordsFromWords(words) {
    const command = `Given the following list of words, generate another list of related words that the 
    assistant could select from to build a sentence:\n${words}`
    wordSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, true, false)
  }

  // New Sentence
  async function generateWordSuggestionsFromNewTopic(topic) {
    const command = `Generate a short list of key words and connector words the 
      assistant can select from to build a new sentence, based around a new topic: '${topic}'`
    wordSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, true, false)
  }

  async function generateSentenceSuggestionsFromNewTopic(topic) {
    const command = `Generate a list of 3 to 5 short generic sentences the 
      assistant may want to say, based around a new topic: '${topic}'`
    sentenceSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, false, true)
  }

  // Edit Sentence
  async function editSingleResponseWithHint(response, hint) {
    const command = `Given the conversation history, and your previous suggestion below:\n'${response}'\n\n 
    provide 3 to 5 modified suggestions using the following hint:\n'${hint}'`
    sentenceSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, false, true)
  }

  async function editAllResponsesWithHint(hint) {
    const command = `Given the conversation history, and your previous suggestions below:
    \n'${previousSuggestions}'\n\n 
    provide 3 to 5 modified suggestions using the following hint:\n'${hint}'`
    sentenceSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, false, true)
  }

  // Generate Response
  async function generateNewResponses() {
    const command = `Given the conversation history, and your previous suggestions below:
    \n'${previousSuggestions}'\n\n provide 3 to 5 alternative suggestions`
    sentenceSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, false, true)
  }

  async function generateWordSuggestionsFromHint(hint) {
    const command = `Given the conversation history, generate a short list of key words and connector words or 
    very short phrases the assistant can select from to build a new sentence, based on the hint: '${hint}'`
    wordSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, true, false)
  }

  async function generateSentenceSuggestionsFromHint(hint) {
    const command = `Given the conversation history, generate a list of 3 to 5 short generic sentences the 
      assistant may want to say, based on the hint: '${hint}'`
    sentenceSuggestions.value = await client.getResponse(messageHistory.value, command, currentContext.value,
      previousSuggestions, false, true)
  }

  return {
    messageTab,
    userBackstory,
    currentContext,
    interlocutorPhrase,
    scriberPhrase,
    messageHistory,
    previousSuggestions,
    wordSuggestions,
    sentenceSuggestions,
    editInstruction,
    generateSentences,
    generateWords,
    generateSentencesFromWords,
    generateMoreWordsFromWords,
    generateWordSuggestionsFromNewTopic,
    generateSentenceSuggestionsFromNewTopic,
    editSingleResponseWithHint,
    editAllResponsesWithHint,
    generateNewResponses,
    generateWordSuggestionsFromHint,
    generateSentenceSuggestionsFromHint,
  }
})
