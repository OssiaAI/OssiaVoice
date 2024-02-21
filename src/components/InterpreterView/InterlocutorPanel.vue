<script setup>

import MicButton from "@/components/reusable/MicButton.vue";
</script>

<template>
  <div id="interlocutor-container">
    <micButton id="mic-btn"/>
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

#send-icon {
  cursor: pointer;
  color: theme.$primary;

  &:hover {
    color: darken(theme.$primary, 10%);
  }
}

#message-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 90%;
  max-width: 420px;
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