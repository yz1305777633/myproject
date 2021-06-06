<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<style>
  [v-cloak] {
    display: none !important;
  }
  html,body,#app{
    height: 100%;
  }
  body{
    background: linear-gradient(91deg,#f1eefc,#9dc6ff 70%,#a5bcff);
  }
</style>
