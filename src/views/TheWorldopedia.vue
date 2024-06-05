<script setup lang="ts">
import { useCountryStore } from '../store';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Filter from '../components/Filter.vue';
import Country from '../components/Country.vue';
import CountryComparison from '../components/CountryComparison.vue';

const store = useCountryStore();
const router = useRouter();

const selectedRegions = ref<string[]>([]);
const selectedSubregion = ref<string>('');
const selectedLanguage = ref<string>('');
const selectedCurrency = ref<string>('');
const selectedPopulationRange = ref<string>('');
const selectedCountriesForComparison = ref<string[]>([]); // For comparison

const filteredCountries = computed(() => {
  return store.countries.filter(country => {
    const matchesRegion = selectedRegions.value.length
      ? selectedRegions.value.includes(country.region)
      : true;
    const matchesSubregion = selectedSubregion.value ? country.subregion === selectedSubregion.value : true;
    const matchesLanguage = selectedLanguage.value
      ? Object.values(country.languages || {}).includes(selectedLanguage.value)
      : true;
    const matchesCurrency = selectedCurrency.value
      ? Object.keys(country.currencies || {}).includes(selectedCurrency.value)
      : true;
    const matchesPopulationRange = selectedPopulationRange.value
      ? checkPopulationRange(country.population, selectedPopulationRange.value)
      : true;
    return matchesRegion && matchesSubregion && matchesLanguage && matchesCurrency && matchesPopulationRange;
  });
});

const checkPopulationRange = (population: number, range: string): boolean => {
  switch (range) {
    case 'small':
      return population < 1000000;
    case 'medium':
      return population >= 1000000 && population < 10000000;
    case 'large':
      return population >= 10000000;
    default:
      return true;
  }
};

const updateSelectedRegions = (value: string[]) => {
  selectedRegions.value = value;
};

const updateSelectedSubregion = (value: string) => {
  selectedSubregion.value = value;
};

const updateSelectedLanguage = (value: string) => {
  selectedLanguage.value = value;
};

const updateSelectedCurrency = (value: string) => {
  selectedCurrency.value = value;
};

const updateSelectedPopulationRange = (value: string) => {
  selectedPopulationRange.value = value;
};

const addCountryForComparison = (country: string) => {
  if (!selectedCountriesForComparison.value.includes(country)) {
    selectedCountriesForComparison.value.push(country);
    if (selectedCountriesForComparison.value.length > 3) {
      selectedCountriesForComparison.value.shift();
    }
  }
};

const removeCountryFromComparison = (country: string) => {
  selectedCountriesForComparison.value = selectedCountriesForComparison.value.filter(c => c !== country);
};

const navigateToFavorites = () => {
  router.push('/favorite');
};

onMounted(() => {
  store.fetchCountries();
});
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>Worldopedia</h1>
      <div class="favorites-box">
        <button @click="navigateToFavorites">Go to Favorites</button>
        <img src="../assets/icons/arrow-right.svg" alt="Arrow right"/>
      </div>
    </header>
    <div class="wrapper">
      <Filter
        :regions="store.regions"
        :subregions="store.subregions"
        :languages="store.languages"
        :currencies="store.currencies"
        @update:selectedRegions="updateSelectedRegions"
        @update:selectedSubregion="updateSelectedSubregion"
        @update:selectedLanguage="updateSelectedLanguage"
        @update:selectedCurrency="updateSelectedCurrency"
        @update:selectedPopulationRange="updateSelectedPopulationRange"
      />
      <Country
        :countries="store.countries"
        :filteredCountries="filteredCountries"
        :favorites="store.favorites"
        :errorMessage="store.errorMessage"
        @addFavorite="store.addFavorite"
        @removeFavorite="store.removeFavorite"
        @toggleComparison="addCountryForComparison"
      />
      <CountryComparison 
        :countries="store.countries" 
        :selectedCountries="selectedCountriesForComparison" 
        @removeComparison="removeCountryFromComparison" 
        @addFavorite="store.addFavorite" 
        @removeFavorite="store.removeFavorite" 
      />
    </div>
  </div>
</template>