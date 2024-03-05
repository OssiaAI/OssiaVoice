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
  const messageHistory = reactive([])
  const previousSuggestions = reactive({})
  const wordSuggestions = ref([
    'hi', 'how', 'you', 'weather', 'nice', 'hungry', 'dinner', 'today', 'weather',
    'i', 'work', 'rugby', 'jazz', 'cold', 'warm', 'thirsty', 'bored', 'good'
  ])
  const sentenceSuggestions = ref([
    "Hi, how are you doing? Adding some more content",
    "What's on for your day?",
    "What's on for your day?",
    "Hi, how are you doing? Adding some more content",
    "I'm a little cold",
    "What's on for your day?"
  ])

  const client = new ChatOpenAI(userBackstory.value)

  // Respond
  async function generateSentences() {
    const command = `Given the conversation history, generate a list of 3 to 5 short generic sentences the 
      user may want to say`
    sentenceSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  async function generateWords() {
    const command = `Given the conversation history, generate a short list of key words and connector words or 
    very short phrases the user can select from to build a new sentence`
    wordSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  // Build Sentences
  async function buildSentencesFromWords(words) {
    const command = "Given the following list of words, generate between 3-5 sentences " +
      `that the user might be trying to say. Keep them generic:\n${words}`
    sentenceSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  async function generateMoreWordsFromSelectedWords(words) {
    const command = "Given the following list of words, generate another list of related words that the user " +
      `could select from to build a sentence:\n${words}`
    wordSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  // New Sentence
  async function generateWordSuggestionsFromNewTopic(topic) {
    const command = `Generate a short list of key words and connector words the 
      user can select from to build a new sentence, based around a new topic: '${topic}'`
    wordSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  async function generateSentenceSuggestionsFromNewTopic(topic) {
    const command = `Generate a list of 3 to 5 short generic sentences the 
      user may want to say, based around a new topic: '${topic}'`
    sentenceSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  // Edit Sentence
  async function editSingleResponseWithHint(response, hint) {
    const command = `Given the conversation history, and your previous suggestion below:\n'${response}'\n\n 
    provide 3 to 5 modified suggestions using the following hint:\n'${hint}'`
    sentenceSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  async function editAllResponsesWithHint(hint) {
    const command = `Given the conversation history, and your previous suggestions below:
    \n'${previousSuggestions}'\n\n 
    provide 3 to 5 modified suggestions using the following hint:\n'${hint}'`
    sentenceSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  // Generate Response
  async function generateNewResponses() {
    const command = `Given the conversation history, and your previous suggestions below:
    \n'${previousSuggestions}'\n\n provide 3 to 5 alternative suggestions`
    sentenceSuggestions.value = await client.get_response(messageHistory, command, currentContext.value, previousSuggestions)
  }

  return {
    userBackstory,
    currentContext,
    interlocutorPhrase,
    scriberPhrase,
    messageHistory,
    previousSuggestions,
    wordSuggestions,
    sentenceSuggestions,
    generateSentences,
    generateWords,
    buildSentencesFromWords,
    generateMoreWordsFromSelectedWords,
    generateWordSuggestionsFromNewTopic,
    generateSentenceSuggestionsFromNewTopic,
    editSingleResponseWithHint,
    editAllResponsesWithHint,
    generateNewResponses,
  }
})
