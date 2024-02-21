<script setup>

</script>

<template>
  <div class="edit-sentence-container">

    <div class="edit-chip" style="background-color: #ffdd00">
      <div style="margin: 10px; display:flex; align-items:center">Hint</div>
      <div>
        <v-text-field class="edit-input"
                      @keydown.enter="emit('modify', customEdit)"
                      variant="solo"
                      rounded
                      hide-details bg-color="#ffe970"
                      density="comfortable">
          <template v-slot:append-inner>
            <v-icon id="sendButton">mdi-auto-fix</v-icon>
          </template>
        </v-text-field>
      </div>
    </div>

    <div class="edit-chip" style="background-color: #c800ff">
      <v-btn class="emoji edit-btn" icon="">😁</v-btn>
      <v-btn class="emoji edit-btn" icon="">😔</v-btn>
      <v-btn class="emoji edit-btn" icon="">😡</v-btn>
      <v-btn class="emoji edit-btn" icon="">😮</v-btn>
      <v-btn class="emoji edit-btn" icon="">😂</v-btn>
    </div>

    <div class="edit-chip" style="background-color: #0051ff">
      <v-btn class="edit-btn" icon="" style="background-color: #5b91ff; color: white">
        <v-icon color="white" size="25">mdi-minus</v-icon>
      </v-btn>
      <div style="margin: 10px; color: white">Formality</div>
      <v-btn class="edit-btn" icon="" style="background-color: #5b91ff; color: white">
        <v-icon color="white" size="25">mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="edit-chip" style="background-color: #6cd35b">
      <v-btn class="edit-btn long-btn" style="background-color: #8de881; color: #4d4d4d;">
        <v-icon size="25">mdi-step-backward</v-icon> Past
      </v-btn>
      <v-btn class="edit-btn long-btn" style="background-color: #8de881; color: #4d4d4d;"> Present </v-btn>
      <v-btn class="edit-btn long-btn" style="background-color: #8de881; color: #4d4d4d;"> Future
        <v-icon size="25">mdi-step-forward</v-icon>
      </v-btn>
    </div>

    <div class="edit-chip" style="background-color: #62d0ff">
      <v-btn class="edit-btn" icon="" style="background-color: #00aeff; color: white">
        <v-icon size="25">mdi-minus</v-icon>
      </v-btn>
      <div style="margin: 10px; color: black">Detail</div>
      <v-btn class="edit-btn" icon="" style="background-color: #00aeff; color: white">
        <v-icon size="25">mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="edit-chip" style="background-color: #f88a3c">
      <v-btn class="edit-btn long-btn" style="background-color: #ffa160; color: #4d4d4d;"> Question </v-btn>
      <v-btn class="edit-btn long-btn" style="background-color: #ffa160; color: #4d4d4d;"> Statement </v-btn>
    </div>

    <div class="edit-chip" style="background-color: #ff56a9">
      <v-btn class="edit-btn long-btn" style="background-color: #ff8bc1; color: #4d4d4d;"> Fact </v-btn>
      <v-btn class="edit-btn long-btn" style="background-color: #ff8bc1; color: #4d4d4d;"> Opinion </v-btn>
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