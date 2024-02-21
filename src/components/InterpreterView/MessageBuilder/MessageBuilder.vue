<script setup>
import {ref} from "vue";
import BuildSentence from "@/components/InterpreterView/MessageBuilder/tabs/BuildSentence.vue";
import EditSentence from "@/components/InterpreterView/MessageBuilder/tabs/EditSentence.vue";
import NewSentence from "@/components/InterpreterView/MessageBuilder/tabs/NewSentence.vue";

const tab = ref('build')

</script>

<template>
  <div id="message-builder-container">
    <div id="tab-group">
      <v-tabs id="tabs" v-model="tab">
        <v-tab value="build">
          <v-icon size="30" icon="mdi-comment-flash-outline"/>
        </v-tab>
        <v-tab value="new">
          <v-icon size="30" icon="mdi-comment-plus-outline"/>
        </v-tab>
        <v-tab value="edit">
          <v-icon size="30" icon="mdi-comment-edit-outline"/>
        </v-tab>
      </v-tabs>
    </div>

    <div id="builder-controls">
      <BuildSentence v-if="tab === 'build'"/>
      <NewSentence v-else-if="tab === 'new'"/>
      <EditSentence v-else-if="tab === 'edit'"/>
    </div>

  </div>
</template>

<style scoped>

#message-builder-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 5px 0 1px 0;
  gap: 1px;
}

#builder-controls {
  display: flex;
  align-items: center;
  overflow: auto;
  flex-grow: 1;
}

#tabs {
  height: fit-content;
  flex-grow: 0;
  margin: 0;
}

</style>