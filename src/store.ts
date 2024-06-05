import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import type { Country } from '../src/types/country';

export const useCountryStore = defineStore('country', () => {
  const countries = ref<Country[]>([]);
  const favorites = ref<Country[]>([]);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const fetchCountries = async (): Promise<void> => {
    if (countries.value.length === 0) {
      isLoading.value = true;
      errorMessage.value = null;
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
        if (response.data.length === 0) {
          errorMessage.value = 'Sorry, the API is a bit slow. Please try again later.';
        } else {
          countries.value = response.data;
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        errorMessage.value = 'Ooopsie, it looks like country information took a wrong turn while traveling to us! Please try again later.';
      } finally {
        isLoading.value = false;
      }
    }
  };

  const addFavorite = (country: Country) => {
    if (!favorites.value.find(fav => fav.cca3 === country.cca3)) {
      favorites.value.push(country);
    }
  };

  const removeFavorite = (country: Country) => {
    favorites.value = favorites.value.filter(fav => fav.cca3 !== country.cca3);
  };

  const regions = computed(() => Array.from(new Set(countries.value.map(country => country.region))));
  const subregions = computed(() => Array.from(new Set(countries.value.flatMap(country => country.subregion ? [country.subregion] : []))));
  const languages = computed(() => Array.from(new Set(countries.value.flatMap(country => country.languages ? Object.values(country.languages) : []))));
  const currencies = computed(() => Array.from(new Set(countries.value.flatMap(country => country.currencies ? Object.keys(country.currencies) : []))));

  return { countries, favorites, isLoading, errorMessage, fetchCountries, addFavorite, removeFavorite, regions, subregions, languages, currencies };
});
