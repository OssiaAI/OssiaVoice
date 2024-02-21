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
  height: 100dvh;
  width: 100vw;
}

#top-panel {
  display: flex;
  width: 100%;
  height: 45dvh;
  flex-grow: 1;
  align-items: stretch;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

#bottom-panel {
  height: 55dvh;
  display: flex;
  width: 100vw;
  z-index: 1;
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
  background-color: theme.$ossia-light-background-1;
  height: 100%;
  width: 50%;
  overflow: auto;
}

#separator {
  flex-grow: 0;
  width: 2px;
  background-color: theme.$ossia-divider-light-1;
  height: 70%;
  align-self: center;
}

#message-options {
  height: 100%;
  width: calc(50% - 2px);
  display: flex;
  justify-items: stretch;
  background-color: theme.$ossia-light-background-1;
}

@media (max-width: 600px) {

  #top-panel {
    height: 37dvh;
  }

  #bottom-panel {
    height: 63dvh;
  }

  #bottom-panel {
    flex-direction: column-reverse;
  }

  #separator {
    height: 2px;
    width: 70%;
  }

  #message-options {
    width: 100%;
    height: calc(50% - 2px);
  }

  #message-builder {
    width: 100%;
    height: 50%;
  }

}

</style>
