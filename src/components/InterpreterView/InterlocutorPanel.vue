<script setup>
import MicButton from "@/components/reusable/MicButton.vue";
import {useMessageStore} from "@/stores/MessageStore.js";
import {useSettingsStore} from "@/stores/SettingsStore.js";

const messageStore = useMessageStore()
const settingStore = useSettingsStore()

function submitInterlocutorMessage() {
  if (messageStore.interlocutorPhrase !== '') {
    messageStore.messageHistory.push({role: "user", content: messageStore.interlocutorPhrase})
    messageStore.generateWords()
    messageStore.generateSentences()
    messageStore.interlocutorPhrase = ''
  }
}

</script>

<template>
  <div id="interlocutor-container">
    <div id="toolbar">
      <v-btn @click.stop="settingStore.showSettingsOverlay = true" color="transparent" flat size="20" icon="mdi-cog">
        <v-icon color="grey"></v-icon>
      </v-btn>
    </div>
    <micButton id="mic-btn" v-model="messageStore.interlocutorPhrase" @textAvailable="submitInterlocutorMessage"/>
    <div id="input-wrapper">
      <div id="message-input-wrapper">
        <v-text-field
            placeholder="Message"
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
            variant="solo"
            flat
            v-model="settingStore.context"
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
  background: theme.$ossia-light-background-2;
  border-radius: 7px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  align-items: center;
  align-content: center;
  position: relative;
  overflow: auto;
}

#toolbar {
  display: flex;
  left: 10px;
  gap: 10px;
  position: absolute;
  width: fit-content;
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

.v-text-field:deep(input) {
  background: white;
}

#context-input-wrapper {
  height: 90px;

  &:deep(textarea) {
    height: 90px;
  }
}

.v-textarea {
  &:deep(.v-field__overlay) {
    display: none;
  }
  &:deep(textarea) {
    background: white;
  }
}

@media screen and (max-width: 600px), (max-height: 770px) {

  #mic-btn {
    height: 120px;
  }

  #context-input-wrapper {
    height: 60px;

    &:deep(textarea) {
      height: 60px;
    }
  }

}

</style>