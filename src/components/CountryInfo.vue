<script setup lang="ts">
import { defineProps } from 'vue';
import type { Country } from '../types/country';

const props = defineProps<{
  country: Country;
  countryInfoClass?: string;
  countryDetailsClass?: string;
  countryFactsClass?: string;
  countryFlagClass?: string;
}>();
</script>

<template>
  <div :class="countryInfoClass">
    <h2>{{ country.name.common }}</h2>
    <slot name="actions"></slot>
    <div :class="countryDetailsClass">
      <div :class="countryFactsClass">
        <p><b>Official Name:</b> {{ country.name.nativeName ? Object.values(country.name.nativeName)[0].official : 'N/A' }}</p>
        <p><b>Capital:</b> {{ country.capital ? country.capital[0] : 'N/A' }}</p>
        <p><b>Region:</b> {{ country.region }}</p>
        <p><b>Subregion:</b> {{ country.subregion }}</p>
        <p><b>Population:</b> {{ country.population.toLocaleString() }}</p>
        <p><b>Area:</b> {{ country.area.toLocaleString() }} km²</p>
        <p><b>Borders:</b> {{ country.borders ? country.borders.join(', ') : 'N/A' }}</p>
        <p><b>Languages:</b> {{ country.languages ? Object.values(country.languages).join(', ') : 'N/A' }}</p>
        <p><b>Currencies:</b> {{ country.currencies ? Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ') : 'N/A' }}</p>
      </div>
      <div :class="countryFlagClass">
        <img :src="country.flags.png" :alt="`Flag of ${country.name.common}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.country-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #F0F7F4;;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 10px #3C493F;
  margin-bottom: 40px;
}

.country-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.country-facts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
}

.country-facts p {
  margin: 4px;
}

.country-flag {
  margin-right: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.country-flag img {
  margin-top: 1em;
  max-width: 500px;
  border-radius: 5px;
}

.country-comparison {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F0F7F4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px #3C493F;
  margin-bottom: 30px;
}

.comparison-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comparison-facts {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.comparison-facts p {
  margin: 5px;
}

.favorite-country-info {
  background-color: #F0F7F4;
  display: flex;
  flex-direction: column;
  padding: 18px;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 10px #3C493F;
  margin-bottom: 40px;
}

.favorite-country-info p {
  margin: 4px;
}

.favorite-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.favorite-facts {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.comparison-facts p {
  margin: 5px;
}

@media only screen and (max-width: 768px) {
  .country-comparison {
    width: 100%;
  }
  .country-info {
    width: 100%;
  }
  .country-details {
    flex-direction: column;
    align-items: center;
  }
  .country-facts {
    margin-left: 0px;
    align-items: center;
  }
  .country-flag {
    margin-right: 0px;
  }
}

@media only screen and (max-width: 500px) {
  .country-flag img, .favorite-flag img, .comparison-flag img  {
    max-width: 250px;
  }
}
</style>
