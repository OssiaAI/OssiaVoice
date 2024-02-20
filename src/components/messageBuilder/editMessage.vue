<script setup>
import BuildSentence from "@/components/messageBuilder/editMessage/buildSentence.vue";
import {ref} from "vue";
import EditSentence from "@/components/messageBuilder/editMessage/editSentence.vue";

const tab = ref('build')

</script>

<template>
  <div id="edit-message-container">
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

    <div id="edit-controls">
      <BuildSentence v-if="tab === 'build'"/>
      <BuildSentence v-else-if="tab === 'new'"/>
      <EditSentence v-else-if="tab === 'edit'"/>
    </div>

  </div>
</template>

<style scoped>

#edit-message-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 5px 0px 1px 0px;
  gap: 1px;
}

#edit-controls {
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