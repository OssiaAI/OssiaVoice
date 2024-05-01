<script setup>
let props = defineProps(['color', 'active', 'index'])

let style = Object.assign(document.createElement("style"),
    {
      textContent: `.active-word${props.index} {border: 2px solid ${props.color} !important;
                     background: ${props.color}; color: white !important;}
                    .not-active-word${props.index}{border: 2px solid ${props.color} !important}`
    })
document.body.appendChild(style)


</script>

<template>
  <div id="word-chip"
       :class="[props.active ? 'active-word' + props.index : 'not-active-word' + props.index]">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/theme';

#word-chip {
  box-sizing: content-box;
  width: fit-content;
  padding: 5px 15px;
  margin: 5px;
  border-radius: 1.5em;
  height: 22px;
  cursor: pointer;
}

</style>