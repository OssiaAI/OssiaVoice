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
            id="interlocutor-message-input"
            v-model="messageStore.interlocutorPhrase"
            @keydown.enter="submitInterlocutorMessage"
            density="comfortable"
            flat
        >
        </v-text-field>
        <div id="send-icon-wrapper">
          <v-icon id="send-icon" icon="mdi-send" @click.stop="submitInterlocutorMessage"/>
        </div>
      </div>
      <div id="context-input-wrapper">
        <v-textarea
            id="context-input"
            v-model="messageStore.currentContext"
            placeholder="Context"
            hide-details
        />
      </div>
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
  max-height: 100%;
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
  max-height: calc(100% - 180px);
}

#message-input-wrapper {
  width: 100%;
  display: flex;
  justify-items: stretch;
  &:deep(input) {
    padding-right: 40px;
  }
}

#context-input-wrapper {
  height: 110px;
  &:deep(textarea) {
    height: 110px;
    color: theme.$text-color-inverted-muted;
  }
}


@media screen and (max-width: 600px), (max-height: 770px) {

  #mic-btn {
    height: 140px;
  }

  #context-input-wrapper {
  height: 65px;
  &:deep(textarea) {
    height: 65px;
  }
}

}

</style>