import OpenAI from "openai";
import {useLoadingStore} from "@/stores/LoadingStore.js";

const model = "gpt-4-turbo-preview" // "gpt-4-turbo-preview" // "gpt-3.5-turbo-0125" //

export class ChatOpenAI {
  constructor(systemMessage) {
    let auth_token = import.meta.env.VITE_API_OPENAI_TOKEN
    if (!auth_token) {
      auth_token = prompt('Enter API Key\n\nSee help on how to generate one at the link below:\n\nhttps://platform.openai.com/docs/quickstart/account-setup\n\nWe suggest you also set spending limits to control costs')
    }
    this.client = new OpenAI({
      apiKey: auth_token, dangerouslyAllowBrowser: true
    });
    this.systemMessage = {role: "system", content: systemMessage};
  }

  async getResponse(messageHistory, command, context = null, wordLoading = false,
                    sentenceLoading = false) {
    const loadingStore = useLoadingStore()
    if (wordLoading) { loadingStore.newWordsLoading++ }
    if (sentenceLoading) { loadingStore.newSentenceLoading++ }
    try {

      let finalCommand = ""
      let messages = [this.systemMessage]
      if (Object.keys(messageHistory).length !== 0) {
        messages = messages.concat(messageHistory)
      }
      if (context) {
        finalCommand += `Here is some background context to the users current situation. You do not necessarily 
      need to use it:\n"${context}\n\n"`
      }
      finalCommand += command
      messages = messages.concat([{role: "system", content: finalCommand}])
      const completion = await this.client.chat.completions.create({
        messages,
        model: model,
        temperature: 0.5,
        top_p: 0.5,
        response_format: {"type": "json_object"}
      });

      return JSON.parse(completion.choices[0].message.content)['suggestions']
    } finally {
      if (wordLoading) { loadingStore.newWordsLoading-- }
      if (sentenceLoading) { loadingStore.newSentenceLoading-- }
    }
  }

}
