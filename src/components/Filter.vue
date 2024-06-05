<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  regions: string[];
  subregions: string[];
  languages: string[];
  currencies: string[];
}

const props = defineProps<Props>();

const emits = defineEmits([
  'update:selectedRegions',
  'update:selectedSubregion',
  'update:selectedLanguage',
  'update:selectedCurrency',
  'update:selectedPopulationRange',
]);

const selectedRegions = ref<string[]>([]);
const selectedSubregion = ref<string>('');
const selectedLanguage = ref<string>('');
const selectedCurrency = ref<string>('');
const selectedPopulationRange = ref<string>('');

const toggleRegion = (region: string): void => {
  if (selectedRegions.value.includes(region)) {
    selectedRegions.value = selectedRegions.value.filter(r => r !== region);
  } else {
    selectedRegions.value.push(region);
  }
  emits('update:selectedRegions', selectedRegions.value);
};

watch(selectedSubregion, () => emits('update:selectedSubregion', selectedSubregion.value));
watch(selectedLanguage, () => emits('update:selectedLanguage', selectedLanguage.value));
watch(selectedCurrency, () => emits('update:selectedCurrency', selectedCurrency.value));
watch(selectedPopulationRange, () => emits('update:selectedPopulationRange', selectedPopulationRange.value));
</script>

<template>
  <div class="filter-section">
    <div class="filter-region">
      <div class="filter-group">
        <div class="region-buttons">
          <button class="filter-button"
            v-for="region in props.regions"
            :key="region"
            @click="toggleRegion(region)"
            :class="{ active: selectedRegions.includes(region) }"
          >
            {{ region }}
          </button>
        </div>
      </div>
    </div>
    <div class="filter-select-groups">
      <div class="filter-group">
        <label for="subregion-select">Filter by Subregion:</label>
        <select id="subregion-select" v-model="selectedSubregion">
          <option value="">All Subregions</option>
          <option v-for="subregion in props.subregions" :key="subregion" :value="subregion">
            {{ subregion }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label for="language-select">Filter by Language:</label>
        <select id="language-select" v-model="selectedLanguage">
          <option value="">All Languages</option>
          <option v-for="language in props.languages" :key="language" :value="language">
            {{ language }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label for="currency-select">Filter by Currency:</label>
        <select id="currency-select" v-model="selectedCurrency">
          <option value="">All Currencies</option>
          <option v-for="currency in props.currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label for="population-range-select">Filter by Population:</label>
        <select id="population-range-select" v-model="selectedPopulationRange">
          <option value="">All Populations</option>
          <option value="small">Less than 1 million</option>
          <option value="medium">1 million to 10 million</option>
          <option value="large">More than 10 million</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>

.filter-section {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: center;
  width: 100%;
  color: #F0F7F4;
}
.filter-select-groups {
  width: 97%;
  margin-top: 20px;
}

.filter-select-groups, .filter-region { 
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 27px;
  justify-content: center;
  padding: 4px 0px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  color: #3C493F;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
}

.filter-group label {
  margin-bottom: 6px;
}

.filter-group select {
  width: 100%;
  padding: 6px 0px 6px 10px;
  border: 2px solid #3C493F;
  border-radius: 5px;
  background-color: #F0F7F4;
}

.region-buttons {
  display: flex;
  gap: 22px;
}

@media only screen and (max-width: 768px) {
  .filter-section {
    margin-top: 10px;
  }
  .region-buttons, .filter-select-groups {
    flex-direction: unset;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }
  .region-buttons button {
    width:49%;
  }
}
</style>
