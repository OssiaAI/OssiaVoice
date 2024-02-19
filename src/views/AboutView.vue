<template>
  <div class="about">
    <img src="@/assets/ossia-logo.svg" alt="Ossia Logo">
    <h1>Ossia</h1>
  </div>
</template>

<style>
.about {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: relative;
}
img {
  height: min(75vh, 75vw);
  position: absolute;
}
h1 {
  position: absolute;
  font-size: min(15vh, 15vw);
  color: green;
}
</style>
