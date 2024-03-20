<script setup>
import {ref} from "vue";
import {useMessageStore} from "@/stores/MessageStore.js";

const messageStore = useMessageStore()
const customEdit = ref('')

function setEditInstruction(instruction) {
  messageStore.editInstruction = instruction
}

</script>

<template>
  <div class="edit-sentence-container">

    <div class="edit-chip" style="background-color: #ffdd00">
      <div style="margin: 10px; display:flex; align-items:center">Hint</div>
      <div>
        <v-text-field class="edit-input"
                      @keydown.enter="setEditInstruction(customEdit); customEdit=''"
                      v-model="customEdit"
                      variant="solo"
                      rounded
                      hide-details bg-color="#ffe970"
                      density="comfortable">
          <template v-slot:append-inner>
            <v-icon
                id="sendButton"
                @click.stop="setEditInstruction(customEdit); customEdit=''"
            >
              mdi-auto-fix
            </v-icon>
          </template>
        </v-text-field>
      </div>
    </div>

    <div class="edit-chip" style="background-color: #c800ff">
      <v-btn class="emoji edit-btn" icon="" @click.stop="setEditInstruction('make the mood happier')">😁</v-btn>
      <v-btn class="emoji edit-btn" icon="" @click.stop="setEditInstruction('make the mood sadder')">😔</v-btn>
      <v-btn class="emoji edit-btn" icon="" @click.stop="setEditInstruction('make the mood angrier')">😡</v-btn>
      <v-btn class="emoji edit-btn" icon="" @click.stop="setEditInstruction('make the mood more surprised')">😮</v-btn>
      <v-btn class="emoji edit-btn" icon="" @click.stop="setEditInstruction('make the response funnier')">😂</v-btn>
    </div>

    <div class="edit-chip" style="background-color: #0051ff">
      <v-btn
          class="edit-btn"
          icon=""
          style="background-color: #5b91ff; color: white"
          @click.stop="setEditInstruction('make the response less polite')">
        <v-icon color="white" size="25">mdi-minus</v-icon>
      </v-btn>
      <div style="margin: 10px; color: white">Politeness</div>
      <v-btn
          class="edit-btn"
          icon="" style="background-color: #5b91ff; color: white"
          @click.stop="setEditInstruction('make the response more polite')">
        <v-icon color="white" size="25">mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="edit-chip" style="background-color: #6cd35b">
      <v-btn class="edit-btn long-btn"
             style="background-color: #8de881;
             color: #4d4d4d;"
             @click.stop="setEditInstruction('make the response past tense or about an earlier time')"
      >
        <v-icon size="25">mdi-step-backward</v-icon>
        Past
      </v-btn>
      <v-btn class="edit-btn long-btn"
             style="background-color: #8de881; color: #4d4d4d;"
             @click.stop="setEditInstruction('make the response present tense or about the current moment')"
      > Present</v-btn>
      <v-btn class="edit-btn long-btn"
             style="background-color: #8de881; color: #4d4d4d;"
             @click.stop="setEditInstruction('make the response future tense or about a later time')"
      > Future
        <v-icon size="25">mdi-step-forward</v-icon>
      </v-btn>
    </div>

    <div class="edit-chip" style="background-color: #62d0ff">
      <v-btn class="edit-btn" icon=""
             style="background-color: #00aeff; color: white"
             @click.stop="setEditInstruction('make the response more brief')"
      >
        <v-icon size="25">mdi-minus</v-icon>
      </v-btn>
      <div style="margin: 10px; color: black">Detail</div>
      <v-btn class="edit-btn" icon=""
             style="background-color: #00aeff; color: white"
             @click.stop="setEditInstruction('make the response more detailed')"
      >
        <v-icon size="25">mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="edit-chip" style="background-color: #f88a3c">
      <v-btn class="edit-btn long-btn"
             style="background-color: #ffa160; color: #4d4d4d;"
             @click.stop="setEditInstruction('make the response a question not a statement')"
      > Question </v-btn>
      <v-btn class="edit-btn long-btn"
             style="background-color: #ffa160; color: #4d4d4d;"
             @click.stop="setEditInstruction('make the response a statement not a question')"
      > Statement </v-btn>
    </div>

    <div class="edit-chip" style="background-color: #ff56a9">
      <v-btn class="edit-btn long-btn"
             style="background-color: #ff8bc1; color: #4d4d4d;"
             @click.stop="setEditInstruction('make the response sound factual not like an opinion')"
      > Fact </v-btn>
      <v-btn class="edit-btn long-btn"
             style="background-color: #ff8bc1; color: #4d4d4d;"
             @click.stop="setEditInstruction('make the response sound like an opinion not a fact')"
      > Opinion </v-btn>
    </div>

  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';
@use '@/assets/main';

.edit-sentence-container {
  display: flex;
  align-items: center;
  align-content: safe center;
  justify-content: safe center;
  flex-wrap: wrap;
  padding: 5px 25px;
}

#sendButton {
  &:hover {
    color: #5d5d5d;
  }

  &:active {
    color: #111111;
  }
}

.emoji {
  background-color: #db74f8;

  &.v-btn.v-btn--density-default {
    //padding-top: 1px;
  }
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
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 43px;
}

</style>