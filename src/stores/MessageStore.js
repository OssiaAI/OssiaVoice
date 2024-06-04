import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getResponse} from "@/repositories/ChatCompletionRepository.js";

export const useMessageStore = defineStore('messages', () => {
  const interlocutorPhrase = ref('')
  const scriberPhrase = ref('')
  const messageHistory = ref([])
  const activeEditHistory = ref([])
  const wordSuggestions = ref([
    'hi', 'how', 'you', 'weather', 'nice', 'hungry', 'dinner', 'today', 'i',
    'work', 'rugby', 'jazz', 'cold', 'warm', 'thirsty', 'bored', 'good'])
  const previousWordSuggestions = ref([])
  const sentenceSuggestions = ref([
    "Hi, how are you doing?", "What's on for your day?",
    "I'm a little cold", "Get up to anything interesting today?"])
  const editInstruction = ref(null)
  const messageTab = ref('build')


  // Respond
  async function generateSentences() {
    const command = `Given the conversation history, generate a list of 3 to 5 short generic sentences the 
      assistant may want to say`
    sentenceSuggestions.value = await getResponse(messageHistory.value, command, false, true)
    activeEditHistory.value = activeEditHistory.value.concat([
      {role: "system", content: command},
      {role: "assistant", content: `{"suggestions": ["${sentenceSuggestions.value.join('", "')}"]}`}
    ])
  }

  async function generateWords() {
    const command = `Given the conversation history, generate a short list of key words or 
    very short phrases the assistant can select from to build a new sentence`
    wordSuggestions.value = await getResponse(messageHistory.value, command, true, false)
  }

  // Build Sentences
  async function generateSentencesFromWords(words) {
    const command = `Given the following list of words, generate between 3-5 sentences that the assistant 
    might be trying to say. Keep them generic but use all the words:\n${words}`
    sentenceSuggestions.value = await getResponse(messageHistory.value, command, false, true)
    activeEditHistory.value = activeEditHistory.value.concat([
      {role: "system", content: command},
      {role: "assistant", content: `{"suggestions": ["${sentenceSuggestions.value.join('", "')}"]}`}
    ])
  }

  async function generateMoreWordsFromWords(words) {
    const command = `Given the following list of words and the conversation history, generate another 
    list of related words that the assistant could select from to build a sentence:\n${words}`
    wordSuggestions.value = await getResponse(messageHistory.value, command, true, false)
  }

  // New Sentence
  async function generateWordSuggestionsFromNewTopic(topic) {
    const command = `Ignore all previous conversation. Generate a short list of key words 
      the assistant can select from to build a new sentence, based around this new topic: '${topic}'`
    wordSuggestions.value = await getResponse(messageHistory.value, command, true, false)
  }

  async function generateSentenceSuggestionsFromNewTopic(topic) {
    const command = `Ignore all previous conversation. Generate a list of 3 to 5 short generic sentences the 
      assistant may want to say, based around this new topic: '${topic}'`
    sentenceSuggestions.value = await getResponse(messageHistory.value, command, false, true)
    activeEditHistory.value = activeEditHistory.value.concat([
      {role: "system", content: command},
      {role: "assistant", content: `{"suggestions": ["${sentenceSuggestions.value.join('", "')}"]}`}
    ])
  }

  // Edit Sentence
  async function editSingleResponseWithHint(response, hint) {
    const command = `The response '${response}' was close. Suggest similar sentences based on the following hint':
    \n'${hint}'`
    const messages = messageHistory.value.concat(activeEditHistory.value)
    sentenceSuggestions.value = await getResponse(messages, command, false, true)
    activeEditHistory.value = activeEditHistory.value.concat([
      {role: "system", content: command},
      {role: "assistant", content: `{"suggestions": ["${sentenceSuggestions.value.join('", "')}"]}`}
    ])
  }

  async function generateWordsForSingleResponseFromHint(response, hint) {
    const command = `The response '${response}' was close. Generate a short list of key words or 
    very short phrases the assistant can select from to build a similar sentence, based on the hint: '${hint}'`
    const messages = messageHistory.value.concat(activeEditHistory.value)
    wordSuggestions.value = await getResponse(messages, command, true, false)
  }

  async function editAllResponsesWithHint(hint) {
    const command = `Try again, using the following hint:\n'${hint}'`
    const messages = messageHistory.value.concat(activeEditHistory.value)
    sentenceSuggestions.value = await getResponse(messages, command, false, true)
    activeEditHistory.value = activeEditHistory.value.concat([
      {role: "system", content: command},
      {role: "assistant", content: `{"suggestions": ["${sentenceSuggestions.value.join('", "')}"]}`}
    ])
  }

  async function generateWordsForAllResponsesFromHint(hint) {
    const command = `None of those suggestions were very useful. This time, instead of full sentences, generate 
    a short list of key words or very short phrases, that the assistant can select from to build 
    alternative sentences. Here is a hint to help guide you: '${hint}'`
    const messages = messageHistory.value.concat(activeEditHistory.value)
    wordSuggestions.value = await getResponse(messages, command, true, false)
  }

  // Generate Response
  async function generateNewResponses() {
    const command = `Try again, providing 3 to 5 alternative suggestions`
    const messages = messageHistory.value.concat(activeEditHistory.value)
    sentenceSuggestions.value = await getResponse(messages, command, false, true)
    activeEditHistory.value = activeEditHistory.value.concat([
      {role: "system", content: command},
      {role: "assistant", content: `{"suggestions": ["${sentenceSuggestions.value.join('", "')}"]}`}
    ])
  }

  async function generateWordSuggestionsFromHint(hint) {
    const command = `Given the conversation history, generate a short list of key words or 
    very short phrases the assistant can select from to build a new sentence, based on the hint: '${hint}'`
    wordSuggestions.value = await getResponse(messageHistory.value, command, true, false)
  }

  async function generateSentenceSuggestionsFromHint(hint) {
    const command = `Given the conversation history, generate a list of 3 to 5 short generic sentences the 
      assistant may want to say, based on the hint: '${hint}'`
    sentenceSuggestions.value = await getResponse(messageHistory.value, command, false, true)
    activeEditHistory.value = activeEditHistory.value.concat([
      {role: "system", content: command},
      {role: "assistant", content: `{"suggestions": ["${sentenceSuggestions.value.join('", "')}"]}`}
    ])
  }

  return {
    messageTab,
    interlocutorPhrase,
    scriberPhrase,
    messageHistory,
    activeEditHistory,
    wordSuggestions,
    previousWordSuggestions,
    sentenceSuggestions,
    editInstruction,
    generateSentences,
    generateWords,
    generateSentencesFromWords,
    generateMoreWordsFromWords,
    generateWordSuggestionsFromNewTopic,
    generateSentenceSuggestionsFromNewTopic,
    editSingleResponseWithHint,
    generateWordsForSingleResponseFromHint,
    editAllResponsesWithHint,
    generateWordsForAllResponsesFromHint,
    generateNewResponses,
    generateWordSuggestionsFromHint,
    generateSentenceSuggestionsFromHint,
  }
})
