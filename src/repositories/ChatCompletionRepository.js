import OpenAI from "openai";

const model = "gpt-4-turbo-preview"

export class ChatOpenAI {
  constructor(systemMessage) {
    this.client = new OpenAI({
      apiKey: import.meta.env.VITE_API_OPENAI_TOKEN, dangerouslyAllowBrowser: true
    });
    this.systemMessage = {role: "system", content: systemMessage};
  }

  async get_response(messageHistory, command, context = null, previousSuggestions = null) {
    let finalCommand = ""
    let messages = [this.systemMessage]
    if (Object.keys(messageHistory).length !== 0) {
      messages = messages.concat(messageHistory)
    }
    if (context) {
      finalCommand += `Here is some background context to the users current situation. You do not necessarily 
      need to use it:\n"${context}\n\n"`
    }
    if (Object.keys(previousSuggestions).length !== 0) {
      finalCommand += `Your previous suggestions were:\n"${previousSuggestions}\n\n"`
    }
    finalCommand += command
    messages = messages.concat([{role: "system", content: finalCommand}])
    const completion = await this.client.chat.completions.create({
      messages,
      model: model,
      response_format: { "type": "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content)['suggestions']
  }

}
