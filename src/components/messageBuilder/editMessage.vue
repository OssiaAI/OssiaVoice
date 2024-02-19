<script setup>
import BuildSentence from "@/components/messageBuilder/editMessage/buildSentence.vue";
import {ref} from "vue";
import EditSentence from "@/components/messageBuilder/editMessage/editSentence.vue";
const tab = ref('build')

</script>

<template>
  <div id="edit-message-container">
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

    <BuildSentence v-if="tab === 'build'"/>
    <BuildSentence v-else-if="tab === 'new'"/>
    <EditSentence v-else-if="tab === 'edit'"/>

  </div>
</template>

<style scoped>

#edit-message-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 20px;
}

#tabs {
  flex-grow: 0;
  margin: 5px;
}

</style>