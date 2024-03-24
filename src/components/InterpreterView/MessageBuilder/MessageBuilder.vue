<script setup>
import BuildSentence from "@/components/InterpreterView/MessageBuilder/tabs/BuildSentence.vue";
import EditSentence from "@/components/InterpreterView/MessageBuilder/tabs/EditSentence.vue";
import NewSentence from "@/components/InterpreterView/MessageBuilder/tabs/NewSentence.vue";
import {useMessageStore} from "@/stores/MessageStore.js";

const messageStore = useMessageStore()

</script>

<template>
  <div id="message-builder-container">
    <div id="tab-group">
      <v-tabs id="tabs" v-model="messageStore.messageTab">
        <v-tab value="build">
          <v-icon size="30" icon="mdi-comment-flash-outline"/>
        </v-tab>
        <v-tab value="edit">
          <v-icon size="30" icon="mdi-comment-edit-outline"/>
        </v-tab>
        <v-tab value="new">
          <v-icon size="30" icon="mdi-comment-plus-outline"/>
        </v-tab>
      </v-tabs>
    </div>

    <div id="builder-controls">
      <div id="div-border">
        <BuildSentence v-if="messageStore.messageTab === 'build'"/>
        <EditSentence v-else-if="messageStore.messageTab === 'edit'"/>
        <NewSentence v-else-if="messageStore.messageTab === 'new'"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

#message-builder-container {
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  gap: 1px;
  height: 100%;
}

#builder-controls {
  display: flex;
  overflow: auto;
  justify-content: center;
  align-items: safe center;
  flex-grow: 1;
}

#div-border {
  padding: 5px;
  height: fit-content
}

#tabs {
  height: fit-content;
  flex-grow: 0;
  margin: 0;
}

</style>