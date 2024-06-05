<script setup lang="ts">
import { computed } from 'vue';
import type { Country } from '../types/country';
import CountryInfo from './CountryInfo.vue';

interface Props {
  countries: Country[];
  selectedCountries: string[];
}

const props = defineProps<Props>();
const emits = defineEmits(['removeComparison', 'addFavorite', 'removeFavorite']);

const comparedCountries = computed(() => {
  return props.countries.filter(country => props.selectedCountries.includes(country.cca3));
});

const removeCountry = (country: string) => {
  emits('removeComparison', country);
};
</script>

<template>
  <div v-if="comparedCountries.length > 0" class="comparison-section">
    <h1>Country Comparison</h1>
    <div class="comparisons-list">
      <CountryInfo
        v-for="country in comparedCountries"
        :key="country.cca3"
        :country="country"
        countryInfoClass="country-comparison"
        countryDetailsClass="comparison-details"
        countryFactsClass="comparison-facts"
        countryFlagClass="comparison-flag"
      >
        <template #actions>
          <button class="wrlp-button" @click="removeCountry(country.cca3)">Remove from Comparison</button>
        </template>
      </CountryInfo>
    </div>
  </div>
</template>

<style scoped>
.comparison-section {
  display: flex;
  flex-direction: column; 
  align-items: center;
}

.comparisons-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}


@media only screen and (max-width: 1150px) {
  .comparisons-list {
    flex-wrap: wrap;
  }
}

@media only screen and (max-width: 768px) {
  .comparisons-list {
    width: 100%;
  }
  .comparison-section {
    width: 100%
  }
}
</style>
