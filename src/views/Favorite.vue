<script setup lang="ts">
import { useCountryStore } from '../store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CountryInfo from '../components/CountryInfo.vue';
const store = useCountryStore();
const router = useRouter();

onMounted(() => {
  store.fetchCountries();
});

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>Favorite Countries</h1>
      <div class="worldopedia-box">
        <button @click="goBack">Back to Worldopedia</button>
        <img src="../assets/icons/arrow-right.svg" alt="Arrow right"/>
      </div>
    </header>
    <div class="wrapper-favorites">
      <div v-if="store.favorites.length > 0" class="favorite-section">
        <CountryInfo
          v-for="country in store.favorites"
          :key="country.cca3"
          :country="country"
          countryInfoClass="favorite-country-info"
          countryDetailsClass="favorite-details"
          countryFactsClass="favorite-facts"
          countryFlagClass="favorite-flag"
        >
          <template #actions>
            <button class="wrlp-button" @click="store.removeFavorite(country)">Remove from Favorites</button>
          </template>
        </CountryInfo>
      </div>
      <div v-else class="no-favorites">No favorite countries selected.</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.header {
  text-align: center;
  margin-bottom: 10px;
}

.wrapper-favorites {
  display: flex;
  flex-direction: row;
}

.favorite-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}
.no-favorites {
  font-size: 15px;
  display: flex;
  width: 100%;
  justify-content: center;
  color: #3C493F;
}
</style>