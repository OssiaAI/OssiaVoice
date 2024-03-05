<script setup>
import MicButton from "@/components/reusable/MicButton.vue";
import {useMessageStore} from "@/stores/MessageStore.js";
const messageStore = useMessageStore()

function submitInterlocutorMessage() {
  if (messageStore.interlocutorPhrase !== '') {
    messageStore.messageHistory.push({ role: "user", content: messageStore.interlocutorPhrase})
    messageStore.generateWords(messageStore.interlocutorPhrase)
    messageStore.generateSentences(messageStore.interlocutorPhrase)
  }
}

</script>

<template>
  <div id="interlocutor-container">
    <micButton id="mic-btn"/>
    <div id="input-wrapper">
      <div id="message-input-wrapper">
        <v-text-field
            label="Message"
            hide-details
            id="message-input"
            v-model="messageStore.interlocutorPhrase"
            @keydown.enter="submitInterlocutorMessage"
        >
        </v-text-field>
        <div id="send-icon-wrapper">
          <v-icon id="send-icon" icon="mdi-send" @click.stop="submitInterlocutorMessage"></v-icon>
        </div>
      </div>
      <textarea
          id="context-input"
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
}

#context-input {
  border-radius: 3px;
  padding: 16px;
  min-height: 10vh;
  background-color: rgb(234, 231, 235);
}

#context-input::placeholder {
  color: rgb(100, 105, 114);
}

@media screen and (max-height: 815px) {

  #mic-btn {
    height: 140px;
  }

  #context-input {
    min-height: unset;
    height: 56px;
  }
}

</style>