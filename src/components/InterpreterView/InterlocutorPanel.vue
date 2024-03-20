<script setup>
import MicButton from "@/components/reusable/MicButton.vue";
import {useMessageStore} from "@/stores/MessageStore.js";
const messageStore = useMessageStore()

function submitInterlocutorMessage() {
  if (messageStore.interlocutorPhrase !== '') {
    messageStore.messageHistory.push({ role: "user", content: messageStore.interlocutorPhrase})
    messageStore.generateWords()
    messageStore.generateSentences()
    messageStore.interlocutorPhrase = ''
  }
}

</script>

<template>
  <div id="interlocutor-container">
    <micButton id="mic-btn" v-model="messageStore.interlocutorPhrase" @textAvailable="submitInterlocutorMessage"/>
    <div id="input-wrapper">
      <div id="message-input-wrapper">
        <v-text-field
            label="Message"
            hide-details
            id="message-input"
            v-model="messageStore.interlocutorPhrase"
            @keydown.enter="submitInterlocutorMessage"
            density="comfortable"
        >
        </v-text-field>
        <div id="send-icon-wrapper">
          <v-icon id="send-icon" icon="mdi-send" @click.stop="submitInterlocutorMessage"/>
        </div>
      </div>
      <textarea
          id="context-input"
          v-model="messageStore.currentContext"
          placeholder="Context"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';

#interlocutor-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: 100%;
  align-items: center;
  align-content: center;
}

#mic-btn {
  display: flex;
  height: 180px;
}

#send-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  margin-left: -40px;
}

#send-icon {
  cursor: pointer;
  color: theme.$primary;
  padding: 18px;

  &:hover {
    color: darken(theme.$primary, 5%);
  }
  &:active {
    color: darken(theme.$primary, 10%);
  }
}

#input-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 90%;
  max-width: 420px;
}

#message-input-wrapper {
  width: 100%;
  display: flex;
  justify-items: stretch;
  &:deep(input) {
    padding-right: 40px;
  }
}

#context-input {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 16px;
  min-height: 48px;
  flex-grow: 1;
  background-color: rgb(234, 231, 235);
  border-bottom: 1px solid rgb(152, 153, 159);
  &:active {
    border: none;
    border-bottom: 1px solid rgb(82, 83, 86);
  }
}

#context-input::placeholder {
  color: rgb(100, 105, 114);
}

@media screen and (max-width: 600px), (max-height: 770px) {

  #mic-btn {
    height: 140px;
  }

  #context-input {
    height: 56px;
  }
}

</style>