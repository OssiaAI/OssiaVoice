import { ref } from 'vue'
import { defineStore } from 'pinia'

export const AlertStore = defineStore('error', () => {
  const level = ref()  // 'success', 'error', 'info'
  const title = ref()  // -1 to stay open
  const details = ref()
  const timeout = ref()
  const view = ref()
  const viewFullDetails = ref()

  function resetAlert() {
    timeout.value = -1
    view.value = false
    viewFullDetails.value = false
  }

  function showAlert(type_='error', title_='Unknown Error',
                     details_='No further information can be found', timeout_= 10000) {
    level.value = type_
    title.value = title_
    details.value = details_
    timeout.value = timeout_
    view.value = true
    viewFullDetails.value = false
  }

  resetAlert()

  return {
    type: title,
    msg: details,
    viewError: view,
    viewFullDetails,
    timeout,
    level,
    resetAlert,
    showAlert,
  }
})