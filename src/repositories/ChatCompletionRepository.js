import OpenAI from "openai";
import {useLoadingStore} from "@/stores/LoadingStore.js";
import {useSettingsStore} from "@/stores/SettingsStore.js";
import {AlertStore} from "@/stores/AlertStore.js";

const model = "gpt-4o" // "gpt-4-turbo"

export async function getResponse(messageHistory, command, wordLoading = false,
                                  sentenceLoading = false) {
  const loadingStore = useLoadingStore()
  const settingStore = useSettingsStore()
  const alertStore = AlertStore()

  console.log('API', settingStore.openAIAPIKey)
  if (!(settingStore.openAIAPIKey && settingStore.backstory && settingStore.liabilityAgreement)) {
    settingStore.showSettingsOverlay = true
    settingStore.showSettingsWarning = true
    return
  }

  let client = new OpenAI({
    apiKey: settingStore.openAIAPIKey, dangerouslyAllowBrowser: true
  });

  const systemMessage = {role: "system", content: settingStore.getSystemMessage()};

  if (wordLoading) {
    loadingStore.newWordsLoading++
  }
  if (sentenceLoading) {
    loadingStore.newSentenceLoading++
  }
  try {

    let finalCommand = ""
    let messages = [systemMessage]
    if (Object.keys(messageHistory).length !== 0) {
      messages = messages.concat(messageHistory)
    }

    var now = new Date();
    finalCommand += `Here is some background context to the users current situation. You do not necessarily 
    need to use it:\nDate and Time: ${now}\n`

    if (settingStore.context) {
      finalCommand += `${settingStore.context}\n`
    }

    finalCommand += command
    messages = messages.concat([{role: "system", content: finalCommand}])
    try {
      const completion = await client.chat.completions.create({
        messages,
        model: model,
        temperature: 0.5,
        top_p: 0.5,
        response_format: {"type": "json_object"}
      });
      return JSON.parse(completion.choices[0].message.content)['suggestions']
    } catch (err) {
      alertStore.showAlert('error', `Error (${err.type})`, err.message)
    }

  } finally {
    if (wordLoading) {
      loadingStore.newWordsLoading--
    }
    if (sentenceLoading) {
      loadingStore.newSentenceLoading--
    }
  }
}
