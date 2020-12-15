<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0px;
  padding: 0px;
}
body{
  background: #333333;
}
#app {
  width: 1600px;
  height: 800px;
  background: silver;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-image: url("./assets/back.jpg");
  background-size:100% 100%;
  background-repeat:no-repeat;
  border-radius: 20px;
}
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #e2e1e1;
  border-radius: 2px;
}
</style>
