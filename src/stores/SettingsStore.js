import {ref, watch} from 'vue'
import {defineStore} from 'pinia'

export const useSettingsStore = defineStore('settings', () => {

  const openAIAPIKey = ref(localStorage.getItem('openAIAPIKey') || '')
  const context = ref(localStorage.getItem('context') || '')
  const backstory = ref(localStorage.getItem('backstory') || '')

  const exampleContext = ref(
    `Time: 20:37
Date: Monday 25 December 2023
Location: Glasgow`)

  const exampleBackstory = ref(`
- Name: James
- Age: 47
- From: Edinburgh, Scotland
- Lives currently: Edinburgh, Scotland
- Dialect: East coast scottish, moderate
- Job: (prior to condition): Aerospace engineer
- Spouse: Lucy
- Children: Daughter, Abigail (abby), 10 years old. Timothy (Tim), Son, 5 years old
- Current state of MND: In a wheelchair, lack of movement of any limbs. Muscle in cheek used to interface with 
assistive system. Cannot talk.
- Hobbies (prior to condition): Rugby, woodwork, played the saxophone
- Hobbies (now): reading fiction, listening to jazz music, spending time with family
- Political leaning: Liberal. Voting history, Scottish National Party
- Character: Demoralised. Pretty short tempered a lot of the time, especially when talking about MND. Enjoys getting 
into debates, especially concerning politics. Especially short tempered and angry when people are patronising or if he 
senses pity.
- Religion: None.
`)

  function getSystemMessage() {
    return `
You are an AI Bot for someone living with Motor Neurone Disease (MND) (hereafter referred to as the 'assistant'). You 
receive a conversation between the assistant and another person (the 'user') . Your job 
is to suggest various likely short sentences that the assistant might want to say to continue the conversation, or a short 
list of key words and phrases the assistant can use to build a sentence.

Here are the rules for the generated suggestions:

- suggestions SHOULD cover a broad range of emotions or affirmative and negative options where it is suitable
- suggestions SHOULD reflect the personality and interests of the user given in the assistant's backstory, but only where appropriate.
- suggestions SHOULD reflect any current context given.
- suggestions SHOULD be tailored to the person you are speaking with
- suggestions MUST be numerous enough to give variety, but not overwhelming in choice. Around 5 is often appropriate for sentences, about 10-15 for key words.
- suggestions MUST not be so specific that they assume any information not given in the backstory
- suggestions MUST not assume the user is always positive and polite. The user may often be frustrated, negative or tired 

Here is the assistant's backstory:
${backstory.value}

The format of the conversation will be a list of previous messages between 'user' and 'assistant', followed by an instruction. 
The instruction could be to generate suggested sentences or a likely words list, or to modify previous suggestions for example.

All your generated suggestions MUST be a valid JSON list.
Below are some examples of inputs and outputs in the correct format. You will be playing the role of the assistant:
user:
just going to the bar, want anything?

system:
Given the conversation history, generate a list of 3 to 5 short generic sentences the assistant may want to say

assistant:
{
  "suggestions": [
    "No I'm okay thanks",
    "Oh go on then, a beer would be great thanks",
    "Well, maybe a glass of water?"
  ]
}
-----
user:
have you seen Dune yet?

system:
Given the following list of words, generate between 3-5 sentences that the assistant might be trying to say. 
Keep them generic but use all the words:
['recommend', 'watching']

assistant:
{
  "suggestions": [
    "No not yet, would you recommend watching it?",
    "Yes it was great, I'd really recommend watching it!",
    "Yes. It wasn't that good, wouldn't really recommend watching it",
  ]
}

-----
user:
did you have a good day at work?

system:
Given the conversation history, generate a short list of key words or very short phrases the assistant can 
select from to build a new sentence

assistant:
{
  "suggestions": [
    "not",
    "good",
    "bad",
    "stressful",
    "fun",
    "boring",
    "tired",
    "weekend",
    "boss",
    "colleagues",
    "office",
    "hate",
    "love",
    "deadline",
    "meeting",
    "pressure",
    "day off",
  ]
}
`
  }

  const liabilityAgreement = ref(localStorage.getItem('liabilityAgreement') === "true" || false)

  const cookieAgreement = ref(localStorage.getItem('cookieAgreement') === "true" || false)

  function save() {
    if (!(cookieAgreement.value && liabilityAgreement.value)) {
      showSettingsOverlay.value = true
      showSettingsWarning.value = true
      return
    }
    localStorage.setItem('openAIAPIKey', openAIAPIKey.value)
    localStorage.setItem('context', context.value)
    localStorage.setItem('backstory', backstory.value)
    localStorage.setItem('liabilityAgreement', liabilityAgreement.value.toString())
    localStorage.setItem('cookieAgreement', cookieAgreement.value.toString())
    showSettingsWarning.value = false
    console.log('settings saved')
  }

  watch(context, async (newContext) => {
    if (!(cookieAgreement.value && liabilityAgreement.value)) {
      showSettingsOverlay.value = true
      showSettingsWarning.value = true
      return
    }
    localStorage.setItem('context', newContext)
  })

  const showSettingsOverlay = ref(!(liabilityAgreement.value && cookieAgreement.value))
  const showSettingsWarning = ref(false)

  return {
    showSettingsOverlay,
    showSettingsWarning,
    openAIAPIKey,
    context,
    backstory,
    exampleContext,
    exampleBackstory,
    getSystemMessage,
    liabilityAgreement,
    cookieAgreement,
    save,
  }
})
