<script setup>
import InterlocutorPanel from "@/components/InterpreterView/InterlocutorPanel.vue";
import MessageHistory from "@/components/InterpreterView/MessageHistory/MessageHistory.vue";
import MessageBuilder from "@/components/InterpreterView/MessageBuilder/MessageBuilder.vue";
import MessageOptions from "@/components/InterpreterView/MessageOptions.vue";
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
      <div id="message-builder" tabindex="0" class="tabbable">
        <MessageBuilder/>
      </div>
      <div id="separator"/>
      <div id="message-options" tabindex="0" class="tabbable">
        <MessageOptions/>
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
  width: 100vw;
  height: 55vh;
  max-height: 55vh;
}

#interlocutor-panel {
  background: theme.$ossia-light-background-2;
  padding: 10px;
  height: 100%;
  width: 50%;
  max-width: 550px;
}

#message-history {
  background: theme.$ossia-light-background-1;;
  height: 100%;
  flex-grow: 1;
}

#message-builder {
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

#message-options {
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

  #message-builder {
    max-height: 50%;
    max-width: 100%;
  }

  #separator {
    display: none;
  }

}

</style>
