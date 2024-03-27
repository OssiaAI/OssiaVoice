<script setup>
import MessageBubble from "@/components/InterpreterView/MessageHistory/components/MessageBubble.vue";
import {useMessageStore} from "@/stores/MessageStore.js";

const messageStore = useMessageStore()

</script>

<template>
  <div id="messageWindow">
    <div v-if="Object.entries(messageStore.messageHistory).length === 0" id="placeholder">
      Message history will appear here
    </div>
    <div id="message-bubble-container" v-else v-for="(message, index) in messageStore.messageHistory.slice().reverse()" :key="index">
      <message-bubble :message="message"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';

#placeholder {
  font-style: italic;
  color: theme.$text-color-inverted-muted;
  width: fit-content;
  margin: 20px auto;
  text-align: center;
}

#messageWindow {
  max-height: 100%;
  width: 100%;
  height: 60vh;
  margin: auto;
  overflow: auto;
  padding: 10px 10px;
  display: flex;
  flex-direction: column-reverse;
}

#message-bubble-container {
  display: flex;
  flex-direction: column;
}
</style>