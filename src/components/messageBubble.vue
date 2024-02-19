<script setup lang="ts">

const props = defineProps({
  message: Object<{ role: string, content: string }>
})

function getMessageContent(message) {
  try {
    const body = JSON.parse(message)
    if (body.text === undefined) {
      throw new Error();
    }
    return body.text
  } catch (error) {
    return message
  }
}

</script>

<template>
  <div :class="{ message: true,
                  messageOther: props.message.role === 'user',
                  messageSystem: props.message.role === 'system',
                  messageSelf: props.message.role === 'assistant'
                }">
    {{ getMessageContent(props.message.content) }}
  </div>

</template>

<style scoped>

.message {
  max-width: 70%;
  padding: 7px 13px;
  border-radius: 20px;
  margin: 20px;
}

.messageOther {
  background-color: rgba(203, 190, 204, 0.24);
  color: #090909;
  margin-left: 0px;
  margin-right: auto;
  width: fit-content;
}

.messageSystem {
  background-color: rgba(87, 87, 87, 0.24);
  color: #090909;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}

.messageSelf {
  background-color: #00b600;
  color: white;
  margin-left: auto;
  width: fit-content;
  margin-right: 0;
}

</style>