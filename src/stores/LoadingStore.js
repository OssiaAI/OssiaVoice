import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const newWordsLoading = ref(0)
  const newSentenceLoading = ref(0)

  return {
    newWordsLoading,
    newSentenceLoading
  }
})
