<script setup>
import InterlocutorPanel from "@/components/interlocutorPanel.vue";
import MessageHistory from "@/components/messageHistory.vue";
import EditMessage from "@/components/messageBuilder/editMessage.vue";
import SendMessage from "@/components/messageBuilder/sendMessage.vue";
</script>

<template>
  <div id="interpreter-grid">
    <div id="top-panel">
      <div id="interlocutor-panel">
        <InterlocutorPanel/>
      </div>
      <div id="message-history">
        <MessageHistory/>
      </div>
    </div>
    <div id="bottom-panel">
      <div id="edit-message" tabindex="0" class="tabbable">
        <EditMessage/>
      </div>
      <div id="separator"/>
      <div id="send-message" tabindex="0" class="tabbable">
        <SendMessage/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';

#interpreter-grid {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

#top-panel {
  display: flex;
  width: 100%;
  flex-grow: 0.8;
  max-height: 450px;
  align-items: stretch;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  //border-color: theme.$ossia-divider-light-2;
}

#interlocutor-panel {
  background: theme.$ossia-light-background-2;
  padding: 10px;
  height: 100%;
  flex-grow: 1;
  min-width: 120px;
  max-width: 550px;
  width: 100%;
}

#message-history {
  background: theme.$ossia-light-background-1;;
  height: 100%;
  flex-grow: 3;
}

#bottom-panel {
  display: flex;
  flex-grow: 1;
  width: 100%;
}

#edit-message {
  flex-grow: 1;
  display: flex;
  background-color: theme.$ossia-light-background-1;
  height: 100%;
  max-width: 50%;
}

#separator {
  flex-grow: 0;
  width: 2px;
  background-color: theme.$ossia-divider-light-1;
  height: 70%;
  align-self: center;
}

#send-message {
  flex-grow: 1;
  display: flex;
  justify-items: stretch;
  background-color: theme.$ossia-light-background-1;
  height: 100%;
}

</style>
