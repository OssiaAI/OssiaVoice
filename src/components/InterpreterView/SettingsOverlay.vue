<script setup>
import {useSettingsStore} from "@/stores/SettingsStore.js";
import {ref} from "vue";

const settingsStore = useSettingsStore()

const emit = defineEmits(['close'])
const showOpenAIKey = ref(false)

</script>

<template>
  <div id="overlay-container">
    <div id="overlay">
      <div id="scrollable">
        <h2 id="title">Welcome to Ossia</h2>
        <div class="group-content">
          <h3 class="subheading">What is Ossia?</h3>
          <iframe id="video-embed" width="560" height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=XLleE46-lBIZBRWb" title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <h2 id="title">Settings</h2>
        <div class="group-content">
          <h3 class="subheading">OpenAI API Key</h3>
          <span>
        Ossia is built on top of ChatGPT. You need an OpenAI account to use Ossia, as you would if you were using ChatGPT
        normally. Visit their website <a href="https://platform.openai.com/api-keys">here</a> to generate a personal account key
        </span>
          <div id="api-key-input-wrapper">
            <v-text-field id="api-key-input"
                          :append-inner-icon="showOpenAIKey ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append-inner="showOpenAIKey = !showOpenAIKey"
                          :type="showOpenAIKey ? 'text' : 'password'"
                          v-model="settingsStore.openAIAPIKey"
                          label="Do not share this key (e.g. sf-lx3l5DaIyg... )"/>
            <strong id="important">Important!</strong> You will be charged for each request Ossia makes to ChatGPT -
            do not share your key with anyone! (We cannot and do not store your key - see the video for details)
          </div>
        </div>
        <div class="group-content">
          <h3 class="subheading">User Backstory</h3>
          Describe the user in as much detail as possible. e.g. name, hobbies, political leaning, temperament, family
          and close friends etc.
          <span id="example" @click="settingsStore.backstory = settingsStore.exampleBackstory">Or use an example</span>
          <div id="backstory-input-wrapper">
            <v-textarea id="backstory-input" label="user backstory" v-model="settingsStore.backstory" hide-details/>
          </div>
        </div>
        <div class="group-content">
          <h3 class="subheading">Terms & Conditions and Cookies </h3>
          <v-checkbox v-model="settingsStore.liabilityAgreement" label="I agree that by using this software in beta I am doing so
         entirely at my own risk. This website is intended entirely for testing, as a proof of concept, and I
         therefore do not hold Ossia, or anyone who has contributed to Ossia individually liable for any repercussions
         of its use. I agree that the data I enter to this site will be shared with OpenAI for generation."/>
          <v-checkbox v-model="settingsStore.cookieAgreement" label="We use cookies and local storage purely to aid your experience; by
         saving your settings and data only locally to your device, we have no need to collect any personal data
         ourselves. By ticking this box I accept the use of cookies and local storage."/>
        </div>
      </div>
      <v-btn
          id="save-btn"
          :disabled="!(settingsStore.liabilityAgreement &&
                     settingsStore.cookieAgreement &&
                     settingsStore.openAIAPIKey &&
                     settingsStore.backstory
                     )"
          @click="emit('close'); settingsStore.save()">
        Let's Go
      </v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';

#overlay-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

#overlay {
  display: flex;
  flex-direction: column;
  background: theme.$background-muted;
  border-radius: 14px;
  padding: 20px;
  height: calc(100vh - 40px);
  width: calc(100vw - 40px);
  max-width: 1350px;
  max-height: 750px;
}

#title-group {
  display: flex;
}

#title {
  color: darken(theme.$primary, 10%);
  margin: 10px 0 0 10px;
}

#scrollable {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}

.subheading {
  padding-bottom: 20px;
}

.group-content {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 30px 20px;
}

#api-key-input-wrapper {
  margin-top: 20px;
  max-width: 700px;
}

#backstory-input-wrapper {
  margin-top: 20px;
}

#backstory-input {
  &:deep(textarea) {
    height: 100%;
  }
}

#video-embed {
  margin: auto;
  max-width: 100%;
  height: 26vw;
  min-height: 200px;
  max-height: 350px;
  align-self: center;
}

a {
  color: darken(theme.$primary, 10%);
}

#important {
  color: darken(theme.$primary, 10%);
}

#example {
  color: darken(theme.$primary, 10%);
  cursor: pointer;
  width: fit-content;
}

#save-btn {
  background: theme.$primary;
  bottom: 0;
  width: 130px;
  height: 40px;
  margin: 10px 20px 10px auto;

  &:deep(span) {
    color: theme.$text-color;
  }
}

</style>