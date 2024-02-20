<script setup>

import MicButton from "@/components/reusable/MicButton.vue";
</script>

<template>
  <div id="interlocutor-container">
    <micButton/>
    <div id="message-input-wrapper">
      <v-text-field
        label="Message"
        hide-details
        id="message-input"
    >
      <template v-slot:append-inner>
        <v-icon id="send-icon" icon="mdi-send"></v-icon>
      </template>
    </v-text-field>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';

#interlocutor-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  align-content: center;
}

#send-icon {
  cursor: pointer;
  color: theme.$primary;
  &:hover {
    color: darken(theme.$primary, 10%);
  }
}

#message-input-wrapper {
  width: 90%;
  max-width: 420px;
}

</style>