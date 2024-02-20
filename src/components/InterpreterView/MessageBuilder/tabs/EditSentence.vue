<script setup>
let customEdit = ''

const emit = defineEmits(['modify'])

</script>

<template>
  <div class="centred-box"
       style="flex-wrap: wrap; display: flex; justify-content: center; align-content: center; flex-grow: 1;">
    <div class="edit-chip" style="background-color: #c800ff">
      <v-btn class="emoji edit-btn" icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response happier')">😁
      </v-btn>
      <v-btn class="emoji edit-btn" icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response sadder')">😔
      </v-btn>
      <v-btn class="emoji edit-btn" icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response angrier')">😡
      </v-btn>
      <v-btn class="emoji edit-btn" icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response seem more surprised')">😮
      </v-btn>
      <v-btn class="emoji edit-btn" icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response funnier')">😂
      </v-btn>
    </div>
    <div class="edit-chip" style="background-color: #00aeff">
      <v-btn class="edit-btn" icon="" style="background-color: #62d0ff; color: white"
             @click="emit('modify', 'make the tone more casual')">
        <v-icon size="25">mdi-minus</v-icon>
      </v-btn>
      <div style="margin: 10px; color: white">Formality</div>
      <v-btn class="edit-btn" icon="" style="background-color: #62d0ff; color: white"
             @click="emit('modify', 'make the tone more formal')">
        <v-icon size="25">mdi-plus</v-icon>
      </v-btn>
    </div>
    <div class="edit-chip" style="background-color: #00aeff">
      <v-btn class="edit-btn" icon="" style="background-color: #62d0ff; color: white"
             @click="emit('modify', 'make the response more generic')">
        <v-icon size="25">mdi-minus</v-icon>
      </v-btn>
      <div style="margin: 10px; color: white">Detail</div>
      <v-btn class="edit-btn" icon="" style="background-color: #62d0ff; color: white"
             @click="emit('modify', 'make the response more specific')">
        <v-icon size="25">mdi-plus</v-icon>
      </v-btn>
    </div>
    <div class="edit-chip" style="background-color: #6cd35b">
      <v-btn class="edit-btn long-btn" style="background-color: #8de881; color: #4d4d4d;"
             @click="emit('modify', 'make the response past tense')">
        <v-icon size="25">mdi-step-backward</v-icon>
        Past
      </v-btn>
      <v-btn class="edit-btn long-btn" style="background-color: #8de881; color: #4d4d4d;"
             @click="emit('modify', 'make the response present tense')"> Present
      </v-btn>
      <v-btn class="edit-btn long-btn" style="background-color: #8de881; color: #4d4d4d;"
             @click="emit('modify', 'make the response in the future tense')"> Future
        <v-icon size="25">mdi-step-forward</v-icon>
      </v-btn>
    </div>
    <div class="edit-chip" style="background-color: #ffdd00">
      <div style="margin: 10px; display:flex; align-items:center">Hint</div>
      <div>
        <v-text-field class="edit-input" @keydown.enter="emit('modify', customEdit)" variant="solo" rounded
                      hide-details bg-color="#ffe970"
                      density="comfortable" v-model="customEdit">
          <template v-slot:append-inner>
            <v-icon @click="emit('modify', customEdit)" id="sendButton">mdi-send</v-icon>
          </template>
        </v-text-field>
      </div>
    </div>
    <div class="edit-chip" style="background-color: #c800ff">
      <v-btn class='emoji edit-btn' icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response about football')">⚽️
      </v-btn>
      <v-btn class='emoji edit-btn' icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response about food')">🧑‍🍳
      </v-btn>
      <v-btn class='emoji edit-btn' icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response about family')">👨‍👩‍👧
      </v-btn>
      <v-btn class='emoji edit-btn' icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response about the news')">🗞️
      </v-btn>
      <v-btn class='emoji edit-btn' icon="" style="background-color: #db74f8"
             @click="emit('modify', 'make the response about health')">🏥
      </v-btn>
    </div>
  </div>
</template>

<style scoped>

.edit-btn {
  font-size: 25px;
  width: 10px;

  &.v-btn--icon.v-btn--density-default {
    width: 33px;
    height: 33px;
  }

  &:deep(*) {
    text-transform: none;
  }

}

.emoji {
  &.v-btn.v-btn--density-default {
    padding-top: 1px;
  }
}

.long-btn {
  font-size: 15px;
  width: fit-content;
  border-radius: 17px;
}

.edit-input {
  &:deep(.v-field__input) {
    min-height: 33px;
    width: 120px;
    padding: 2px 10px 2px 15px;
  }
}

.v-btn--size-default {
  padding: 0 10px;
}

.edit-chip {
  width: fit-content;
  border-radius: 30px;
  padding: 5px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 43px;
}

</style>