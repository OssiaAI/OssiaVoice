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
        <v-tab value="edit">
          <v-icon size="30" icon="mdi-comment-edit-outline"/>
        </v-tab>
        <v-tab value="new">
          <v-icon size="30" icon="mdi-comment-plus-outline"/>
        </v-tab>
      </v-tabs>
    </div>

    <div id="builder-controls">
      <BuildSentence v-if="tab === 'build'"/>
      <EditSentence v-else-if="tab === 'edit'"/>
      <NewSentence v-else-if="tab === 'new'"/>
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
  flex-grow: 1;
}

#tabs {
  height: fit-content;
  flex-grow: 0;
  margin: 0;
}

</style>