<script setup>
import InterlocutorPanel from "@/components/interlocutorPanel.vue";
import MessageHistory from "@/components/messageHistory.vue";
import MessageBuilder from "@/components/messageBuilder/editMessage.vue";
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
        <MessageBuilder/>
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
  max-height: 45vh;
  align-items: stretch;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  //border-color: theme.$ossia-divider-light-2;
}

#bottom-panel {
  display: flex;
  width: 100%;
  height: 55vh;
  max-height: 55vh;
}

#interlocutor-panel {
  background: theme.$ossia-light-background-2;
  padding: 10px;
  height: 100%;
  width: 50%;
  //flex-grow: 1;
  max-width: 550px;
}

#message-history {
  background: theme.$ossia-light-background-1;;
  height: 100%;
  flex-grow: 1;
}

#edit-message {
  flex-grow: 1;
  background-color: theme.$ossia-light-background-1;
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
  min-width: 50%;
}

@media (max-width: 600px) {

  #bottom-panel {
    flex-direction: column;
  }

  #separator {
    height: 2px;
    width: 70%;
  }

  #edit-message {
    max-height: 50%;
  }

  #separator {
    display: none;
  }

}

</style>
