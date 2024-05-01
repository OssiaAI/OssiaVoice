<script setup>
import {AlertStore} from "@/stores/AlertStore";
import {computed} from "vue";

const alertStore = AlertStore();

const color = computed(() => {
  if (alertStore.level === 'success') {
    return '#27d527'
  } else if (alertStore.level === 'info') {
    return '#456cff'
  } else {
    return '#ff9e37'
  }
})

const icon = computed(() => {
  if (alertStore.level === 'success') {
    return 'mdi-check-circle'
  } else if (alertStore.level === 'info') {
    return 'mdi-information'
  } else {
    return 'mdi-alert-circle'
  }
})

</script>

<template>
  <v-snackbar color="white" id="alert-bar" multi-line v-model="alertStore.viewError" :timeout="alertStore.timeout">
    <div style="display: flex; align-items: center">
      <v-icon :icon="icon" size="30" style="margin-right: 15px;" :color="color"/>
      <v-tooltip v-if="alertStore.msg.length > 40" :text="alertStore.msg" location="top">
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <div class="text-subtitle-1"> {{ alertStore.type }}</div>
            {{ alertStore.msg.substring(0, 40) + (alertStore.msg.length > 40 ? "..." : "") }}
          </div>
        </template>
      </v-tooltip>
      <div v-else>
        <div class="text-subtitle-1"> {{ alertStore.type }}</div>
        {{ alertStore.msg.substring(0, 40) + (alertStore.msg.length > 40 ? "..." : "") }}
      </div>
    </div>


    <template v-slot:actions>
      <div class="buttons-container">
        <v-btn :color="color" size="small" variant="text" @click="alertStore.resetAlert()">
          Close
        </v-btn>
      </div>
    </template>
  </v-snackbar>

</template>

<style scoped lang="scss">
@use '@/assets/theme';

@media (min-width: 1024px) {
  .buttons-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>