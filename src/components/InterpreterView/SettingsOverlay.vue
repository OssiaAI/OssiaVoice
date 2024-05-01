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
      <div id="accept-terms-prompt" v-if="settingsStore.showSettingsWarning">
        You must enter an OpenAI API Key (and accept the terms and conditions) before Ossia Voice can do anything smart!
      </div>
      <div id="scrollable">
        <h2 class="title">Welcome to Ossia</h2>
        <div class="group-content">
          <h3 class="subheading">What is Ossia?</h3>
          <iframe id="video-embed" width="560" height="315"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=XLleE46-lBIZBRWb" title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <h2 class="title">Settings</h2>
        <div class="group-content">
          <h3 class="subheading"><span style="color: red">*</span> OpenAI API Key</h3>
          <span>
        Ossia is built on top of ChatGPT. You need an OpenAI account to use Ossia, as you would if you were using ChatGPT
        normally. Visit their website <a href="https://platform.openai.com/api-keys">here</a> to generate a personal account key.
            We suggest also setting spending limits to control your spend with OpenAI.
        </span>
          <div id="api-key-input-wrapper">
            <v-text-field id="api-key-input"
                          :append-inner-icon="showOpenAIKey ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append-inner="showOpenAIKey = !showOpenAIKey"
                          :type="showOpenAIKey ? 'text' : 'password'"
                          v-model="settingsStore.openAIAPIKey"
                          label="Do not share this key. E.g. sf-lx3l5DaIyg..."/>
            <strong id="important">Important!</strong> You will be charged for each request Ossia makes to ChatGPT -
            do not share your key with anyone! (We cannot and do not store your key - see the video for details)
          </div>
        </div>
        <div class="group-content">
          <h3 class="subheading"><span style="color: red">*</span> User Backstory</h3>
          Describe the user in as much detail as possible. e.g. name, hobbies, political leaning, temperament, family
          and close friends etc.
          <span id="example-link"
                @click="settingsStore.backstory = settingsStore.exampleBackstory">Or use an example</span>
          <div id="backstory-input-wrapper">
            <v-textarea id="backstory-input" label="user backstory" v-model="settingsStore.backstory" hide-details/>
          </div>
        </div>
        <div class="group-content">
          <h3 class="subheading"><span style="color: red">*</span> Terms & Conditions and Cookies </h3>
          <v-checkbox v-model="settingsStore.liabilityAgreement" label="I agree that by using this software in beta I am doing so
         entirely at my own risk. This website is intended entirely for testing, as a proof of concept, and I
         therefore do not hold Ossia, or anyone who has contributed to Ossia individually liable for any repercussions
         of its use. I agree that the data I enter to this site can be shared with OpenAI through ChatGPT prompts."/>
          <v-checkbox v-model="settingsStore.cookieAgreement" label="We use cookies and local storage purely to aid your experience; by
         saving your settings and data locally to your device, we have no need to collect any personal data
         ourselves. By ticking this box I accept the use of cookies and local storage."/>
        </div>
        <h2 class="title">Contact & About</h2>
        <div class="group-content">
          Ossia was developed by James Arney as a concept for interacting using AI, for those who need it
          most. Thoughts, ideas and contributions are very much welcomed. Please reach out if you would like to be
          involved!
          <div id="contact-links">
            <a href="https://twitter.com/arneyjfs" rel="noopener noreferrer" target="_blank">
              <v-icon>mdi-twitter</v-icon>
            </a>
            <a href="https://github.com/OssiaAI/OssiaVoice" rel="noopener noreferrer" target="_blank">
              <v-icon>mdi-github</v-icon>
            </a>
            <a href="https://www.linkedin.com/in/james-arney-50246711a/" rel="noopener noreferrer" target="_blank">
              <v-icon>mdi-linkedin</v-icon>
            </a>
          </div>

          <!--          <a id="buy-me-a-coffee" class="raised" href="https://www.buymeacoffee.com/arneyjfs" target="_blank"-->
          <!--             rel="noopener noreferrer">-->
          <!--            <img-->
          <!--                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"-->
          <!--                alt="Buy Me A Coffee"-->
          <!--            >-->
          <!--          </a>-->

          © James Arney, 2024
        </div>
      </div>
      <div id="bottom-buttons">
        <v-btn
            id="complete-later-btn"
            @click="emit('close')">
          Complete later
        </v-btn>
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

.title {
  color: darken(theme.$primary, 10%);
  margin: 10px 0 0 10px;
}

#accept-terms-prompt{
  background: orange;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  text-align: center;
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

#example-link {
  color: darken(theme.$primary, 10%);
  cursor: pointer;
  width: fit-content;
}

#contact-links {
  display: flex;
  gap: 10px;
  padding: 10px 0px;
}

#bottom-buttons {
  display: flex;
  justify-content: end;
}

#complete-later-btn {
  background: #e1e1e1;
  width: 130px;
  height: 40px;
  margin: 10px 10px 0 20px;
  text-transform: none;

  //&:deep(span) {
  //  color: theme.$text-color;
  //}
}

#save-btn {
  background: theme.$primary;
  width: 115px;
  height: 40px;
  margin: 10px 20px 0 10px;
  text-transform: none;


  &:deep(span) {
    color: theme.$text-color;
  }
}

#buy-me-a-coffee {
  margin: 10px 0 20px 0;
  width: 145px;
  height: 40px;
  border-radius: 7px;
  position: relative;

  &:deep(img) {
    width: 145px;
    height: 40px;

    &:hover {
      filter: brightness(98%)
    }

    &:active {
      filter: brightness(95%)
    }
  }
}

</style>