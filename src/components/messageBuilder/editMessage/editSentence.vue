<script setup>
let customEdit = ''

const emit = defineEmits(['modify'])

</script>

<template>
  <div class="centred-box"
       style="flex-wrap: wrap; display: flex; justify-content: center; align-content: center; flex-grow: 1;">
    <div class="editChip" style="background-color: #c800ff">
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response happier')">😁
      </v-btn>
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response sadder')">😔
      </v-btn>
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response angrier')">😡
      </v-btn>
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response seem more surprised')">😮
      </v-btn>
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response funnier')">😂
      </v-btn>
    </div>
    <div class="editChip" style="background-color: #00aeff">
      <v-btn icon="" style="background-color: #62d0ff; color: white"
             @click="emit('modify', 'make the tone more casual')">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <div style="margin: 10px; color: white">Formality</div>
      <v-btn icon="" style="background-color: #62d0ff; color: white"
             @click="emit('modify', 'make the tone more formal')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div class="editChip" style="background-color: #00aeff">
      <v-btn icon="" style="background-color: #62d0ff; color: white"
             @click="emit('modify', 'make the response more generic')">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <div style="margin: 10px; color: white">Detail</div>
      <v-btn icon="" style="background-color: #62d0ff; color: white"
             @click="emit('modify', 'make the response more specific')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div class="editChip" style="background-color: #6cd35b">
      <v-btn rounded="xl" style="background-color: #8de881; color: #4d4d4d; height: 48px;"
             @click="emit('modify', 'make the response past tense')">
        <v-icon>mdi-step-backward</v-icon>
        Past
      </v-btn>
      <v-btn rounded="xl" style="background-color: #8de881; color: #4d4d4d; height: 48px;"
             @click="emit('modify', 'make the response present tense')">Present
      </v-btn>
      <v-btn rounded="xl" style="background-color: #8de881; color: #4d4d4d; height: 48px;"
             @click="emit('modify', 'make the response in the future tense')">Future
        <v-icon>mdi-step-forward</v-icon>
      </v-btn>
    </div>
    <div class="editChip" style="background-color: #ffdd00">
      <div style="margin: 10px; display:flex; align-items:center">Hint</div>
      <div>
        <v-text-field @keydown.enter="emit('modify', customEdit)" variant="solo" rounded hide-details="auto" style="width: 200px" bg-color="#ffe970"
                      density="comfortable" v-model="customEdit">
          <template v-slot:append-inner>
            <v-icon @click="emit('modify', customEdit)" id="sendButton">mdi-send</v-icon>
          </template>
        </v-text-field>
      </div>
    </div>
    <div class="editChip" style="background-color: #c800ff">
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response about football')">⚽️
      </v-btn>
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response about food')">🧑‍🍳
      </v-btn>
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response about family')">👨‍👩‍👧
      </v-btn>
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response about the news')">🗞️
      </v-btn>
      <v-btn icon="" style="font-size: 25px; background-color: #db74f8"
             @click="emit('modify', 'make the response about health')">🏥
      </v-btn>
    </div>
  </div>
</template>

<style scoped>

.editChip {
  width: fit-content;
  border-radius: 30px;
  padding: 5px;
  margin: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

</style>