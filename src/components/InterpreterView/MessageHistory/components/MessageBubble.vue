<script setup>

const props = defineProps(['message'])

</script>

<template>
  <div :class="{ message: true,
                  messageOther: props.message.role === 'user',
                  messageSystem: props.message.role === 'system',
                  messageSelf: props.message.role === 'assistant'
                }">
    {{ props.message.content }}
  </div>

</template>

<style scoped>

.message {
  max-width: 50%;
  padding: 7px 13px;
  border-radius: 20px;
  margin: 20px;
  overflow-wrap: break-word;
}

.messageOther {
  background-color: rgba(203, 190, 204, 0.24);
  color: #090909;
  align-self: start;
  width: fit-content;
}

.messageSystem {
  background-color: rgba(87, 87, 87, 0.24);
  color: #090909;
  align-self: center;
  width: fit-content;
}

.messageSelf {
  background-color: #00b600;
  color: white;
  align-self: end;
  width: fit-content;
}

@media screen and (max-width: 1900px) {

  .message {
    max-width: 60%;
    margin: 12px;
  }

}


@media screen and (max-width: 1600px) {

.message {
  max-width: 70%;
  margin: 12px;
}

}

@media screen and (max-width: 950px) {

.message {
  max-width: 85%;
  margin: 7px;
}

}

</style>