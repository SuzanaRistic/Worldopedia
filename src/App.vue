<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
}

.header {
  width: 100%;
  background-color: #3C493F;
  color: #F0F7F4;
  text-align: center;
  font-size: 22px;
}

.header h1 {
  margin: 25px 0px 0px 0px;
}

.favorites-box, .worldopedia-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  margin-top: 8px;
}

.favorites-box button, .worldopedia-box button {
  display: flex;
  background-color: #3C493F;
  color: #F0F7F4;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.favorites-box img, .worldopedia-box img {
  margin-right: 8px; 
  cursor: pointer;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
}

.filter-button {
  padding: 6px 0px;
  width: 100%;
  border: 3px solid #3C493F;
  border-radius: 20px;
  color: #3C493F;
  background-color: #B3BFB8;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

.wrlp-button {
  padding: 6px 0px;
  width: 100%;
  border: 2px solid #3C493F;
  border-radius: 4px;
  background-color: #F0F7F4;
  color: #3C493F;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

.wrlp-button.active, .filter-button.active {
  background-color: #3C493F;
  color: #F0F7F4;
}

.wrlp-button:hover, .filter-button:hover {
  background-color: #3C493F;
  color: #F0F7F4;
}

@media only screen and (max-width: 1200px) {
  .wrapper {
    width: 100%;
  }
}
</style>
