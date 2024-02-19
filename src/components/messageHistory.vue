<script setup>
import MessageBubble from "@/components/messageBubble.vue";
import {ref} from "vue";

const messages = ref([
  {"role": "system", "content": "SystemContext"},
  {"role": "user", "content": "Message content"},
  {"role": "assistant", "content": "Message content"},
  {"role": "user", "content": "Message content"},
  {"role": "assistant", "content": "Message content"},
  {"role": "user", "content": "Message content"},
  {"role": "assistant", "content": "Message content"},
  {"role": "assistant", "content": "Message content"},
  {"role": "user", "content": "Message content"},
  {"role": "assistant", "content": "Message content"},
]);
</script>

<template>
  <div id="messageWindow">
    <div v-for="(message, index) in messages" :key="index">
      <message-bubble :message="message"/>
    </div>
  </div>
</template>

<style scoped>
@use '@/assets/theme';

#messageWindow {
  max-height: 100%;
  //box-shadow: inset 0 0 15px #dedcdc;
  width: 100%;
  height: 60vh;
  margin: auto;
  overflow: auto;
  padding: 10px 20px;
  //border-left-width: 1px; //border-left-style: solid;
}

</style>