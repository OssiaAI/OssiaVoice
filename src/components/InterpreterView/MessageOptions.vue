<script setup>
import {ref} from "vue";

const sentence_suggestions = ref([
  "Hi, how are you doing? Adding some more content",
  "What's on for your day?",
  "I'm a little cold"
])

</script>

<template>
  <div id="send-message-wrapper">
    <div id="message-input-wrapper">
      <v-text-field
          label="Message"
          hide-details
          id="message-input"
      >
        <template v-slot:append-inner>
          <v-icon id="magic-icon" icon="mdi-auto-fix"/>
          <v-icon id="send-icon" icon="mdi-send"/>
        </template>
      </v-text-field>
    </div>
    <div class="message-suggestion-container">
      <div class="message-suggestion" v-for="(sentence, index) in sentence_suggestions" :key="index" tabindex="0">
        {{ sentence }}
      </div>
    </div>
  </div>
</template>

<style scoped>

#send-message-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  align-content: center;
}

#magic-icon {
  margin-right: 5px
}

#message-input-wrapper {
  margin: 5px auto;
  width: 95%;
}

#message-input {
  width: 100%;
}

.message-suggestion-container {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px 10px;
  max-height: 100%;
}

.message-suggestion {
  background-color: #00b600;
  box-sizing: content-box;
  color: white;
  height: fit-content(20%);
  max-width: 33%;
  padding: 5px 15px;
  border-radius: 1.5em;
}

</style>