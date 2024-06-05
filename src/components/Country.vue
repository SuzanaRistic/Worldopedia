<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import type { Country } from '../types/country';
import CountryInfo from '../components/CountryInfo.vue';

interface Props {
  countries: Country[];
  filteredCountries: Country[];
  favorites: Country[];
  errorMessage: string | null;
}

const props = defineProps<Props>();

const emits = defineEmits(['addFavorite', 'removeFavorite', 'toggleComparison']);

const selectedCountry = ref<string | null>(null);
const countryInfo = ref<Country | null>(null);

const handleCountryChange = (): void => {
  countryInfo.value = props.countries.find(country => country.cca3 === selectedCountry.value) || null;
};

const toggleFavorite = (country: Country) => {
  if (props.favorites.find(fav => fav.cca3 === country.cca3)) {
    emits('removeFavorite', country);
  } else {
    emits('addFavorite', country);
  }
};

const isFavorite = (country: Country) => {
  return props.favorites.find(fav => fav.cca3 === country.cca3) !== undefined;
};

const addToComparison = (country: Country) => {
  emits('toggleComparison', country.cca3);
};

const sortedFilteredCountries = computed(() => {
  return [...props.filteredCountries].sort((a, b) => a.name.common.localeCompare(b.name.common));
});

watch(selectedCountry, handleCountryChange);

onMounted(() => {
  handleCountryChange();
});
</script>

<template>
  <div class="country-section">
    <div class="country-group">
      <label class="country-label" for="country-select">Choose a country:</label>
      <select id="country-select" v-model="selectedCountry">
        <option selected disabled>Select a country</option>
        <option v-for="country in sortedFilteredCountries" :key="country.cca3" :value="country.cca3">
          {{ country.name.common }}
        </option>
      </select>
    </div>
    <transition name="fade">
      <div v-if="props.errorMessage" class="error-message">{{ props.errorMessage }}</div>
      <div v-else-if="!countryInfo" class="no-data-message">No country selected. Click on the dropdown to choose a country and start learning!</div>
      <div v-else class="country-info-component">
        <CountryInfo
          :country="countryInfo"
          countryInfoClass="country-info"
          countryDetailsClass="country-details"
          countryFactsClass="country-facts"
          countryFlagClass="country-flag"
        >
          <template #actions>
            <div class="country-actions">
              <button class="wrlp-button" @click="toggleFavorite(countryInfo)">{{ isFavorite(countryInfo) ? 'Remove from Favorites' : 'Add to Favorites' }}</button>
              <button class="wrlp-button" @click="addToComparison(countryInfo)">Add to Comparison</button>
            </div>
          </template>
        </CountryInfo>
      </div>
    </transition>
  </div>
</template>

<style scoped>

.country-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10px 0px;
  padding: 20px 0px;
}

.country-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-weight: 600;
  font-size: 32px;
}

.country-label {
  margin-bottom: 6px;
}

.country-group select {
  width: 100%;
  height: 50px;
  border: 1px solid #3C493F;
  border-radius: 5px;
  background-color: #F0F7F4;
  color: #3C493F;
  margin-bottom: 2em;
  padding-left: 20px;
}

.country-info-component {
  width: 100%;
}

.country-actions {
  display: flex;
  flex-direction: row;
  gap: 40px; 
  width: 95%;
}

@media only screen and (max-width: 500px) {
  .country-actions {
    gap: 10px;
  }
}
</style>
