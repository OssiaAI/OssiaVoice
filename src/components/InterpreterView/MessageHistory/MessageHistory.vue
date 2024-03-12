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
    <div v-else v-for="(message, index) in messageStore.messageHistory.slice().reverse()" :key="index">
      <message-bubble :message="message"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';

#placeholder {
  font-style: italic;
  color: theme.$text-color-inverted-faded;
  width: fit-content;
  margin: 20px auto;
}

#messageWindow {
  max-height: 100%;
  width: 100%;
  height: 60vh;
  margin: auto;
  overflow: auto;
  padding: 10px 20px;
  display: flex;
  flex-direction: column-reverse;
}

</style>