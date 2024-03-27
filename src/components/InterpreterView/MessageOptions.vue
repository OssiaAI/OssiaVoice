<script setup>
import {useMessageStore} from "@/stores/MessageStore.js";
import speak from "@/repositories/TextToSpeechRepository.js";

const messageStore = useMessageStore()

function submitMessage(sentence, hint) {
  if (sentence && hint) {
    messageStore.editSingleResponseWithHint(sentence, hint)
    messageStore.generateWordsForSingleResponseFromHint(sentence, hint)
    messageStore.editInstruction = null
  }
  else if (sentence) {
    messageStore.messageHistory.push({role: "assistant", content: sentence})
    speak(sentence)
    messageStore.activeEditHistory = []
  }
  else if (hint) {
    messageStore.generateWordSuggestionsFromHint(hint)
    messageStore.generateSentenceSuggestionsFromHint(hint)
  }
  messageStore.messageTab = 'build'
}

function editAllMessages() {
  let hint = messageStore.editInstruction
  messageStore.editAllResponsesWithHint(hint)
  messageStore.generateWordsForAllResponsesFromHint(hint)
  messageStore.editInstruction = null
  messageStore.messageTab = 'build'
}

</script>

<template>
  <div id="send-message-wrapper">
    <div id="message-input-wrapper">
      <v-text-field
          label="Message"
          hide-details
          id="message-input"
          v-model="messageStore.scriberPhrase"
          @keydown.enter="submitMessage(messageStore.scriberPhrase); messageStore.scriberPhrase = ''
"
          density="comfortable"
          style="max-width: 100%"
      >
      </v-text-field>
      <div id="icons-wrapper">
        <v-icon
            class="message-icon"
            id="magic-icon"
            icon="mdi-auto-fix"
            @click.stop="submitMessage(null, messageStore.scriberPhrase); messageStore.scriberPhrase = ''"/>
        <v-icon
            class="message-icon"
            id="send-icon"
            icon="mdi-send"
            @click.stop="submitMessage(messageStore.scriberPhrase); messageStore.scriberPhrase = ''"/>
      </div>
    </div>
    <em id="editInstruction" v-if="messageStore.editInstruction" >
      {{ messageStore.editInstruction }}
      <br/>
      Select one or 'edit all' to apply</em>
    <div class="message-suggestion-container">
      <div v-for="(sentence, index) in messageStore.sentenceSuggestions" :key="index"
           @click="submitMessage(sentence, messageStore.editInstruction)"
           class="message-suggestion raised"
           tabindex="0">
        {{ sentence }}
      </div>
        <span v-if="messageStore.editInstruction"
              class="message-suggestion message-action-btn raised"
              @click.stop="editAllMessages">
          Edit all
        </span>
        <span v-if="messageStore.editInstruction"
              class="message-suggestion message-action-btn raised"
              @click.stop="messageStore.editInstruction = null">
          <v-icon icon="mdi-close"/>
        </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';

#send-message-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  align-content: center;
  padding: 0 5px;
}


#icons-wrapper {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin-left: -80px;
}

#magic-icon{
  color: black;
  padding: 18px;

  &:hover {
    color: darken(theme.$primary, 5%);
  }
  &:active {
    color: darken(theme.$primary, 10%);
  }
}

#send-icon{
  color: theme.$primary;
  padding: 18px;

  &:hover {
    color: darken(theme.$primary, 5%);
  }
  &:active {
    color: darken(theme.$primary, 10%);
  }
}

#message-input-wrapper {
  margin: 5px auto;
  width: 100%;
  display: flex;
  justify-items: stretch;
  &:deep(input) {
    padding-right: 85px;
  }
}

#editInstruction {
  color: theme.$text-color-inverted-muted;
  text-align: center;
}

.message-suggestion-container {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  align-content: safe center;
  justify-content: safe center;
  gap: 10px;
  padding: 10px;
  max-height: 100%;
  overflow: auto;
}

.message-suggestion {
  background-color: theme.$primary;
  box-sizing: content-box;
  color: theme.$text-color;
  height: fit-content(20%);
  max-width: 33%;
  padding: 5px 15px;
  border-radius: 1.5em;
  cursor: pointer;

  &:hover {
    background-color: darken(theme.$primary, 5%);
  }

  &:active {
    background-color: darken(theme.$primary, 10%);
  }
}

.message-action-btn {
  border: 2px solid theme.$primary;
  background-color: transparent;
  color: theme.$text-color-inverted;

  & > i {
    color: theme.$text-color-inverted;
  }

  &:hover {
    background-color: darken(theme.$background, 5%);
  }

  &:active {
    background-color: darken(theme.$background, 10%);
  }
}

</style>