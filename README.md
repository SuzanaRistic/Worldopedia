# Worldopedia Vue.js application

- Worldopedia Vue.js application that provides detailed information about countries around the world. Users can view, filter, and compare countries, as well as mark their favorite countries.

**Features**

- View detailed information about countries
- Filter countries by name, region, subregion, language, currency and population
- Compare up to 3 countries side by side
- Mark and view favorite countries
- Color palette: https://coolors.co/3c493f-7e8d85-b3bfb8-f0f7f4-a2e3c4

**File Structure**

- `main.ts`: Entry point of the application, initializes the Vue app with the root component and Vuex store.
- `store.ts`: Pinia store configuration, sets up the Pinia instance for state management.
- `App.vue`: Root component of the application.
- `TheWorldopedia.vue`: Main view/component that includes filter and country comparison components.
- `Favorite.vue`: Secondary view/component with its own path that lists of favorite countries.
- `country.ts`: TypeScript interface for the `Country` object, ensuring consistent data structure.
- `CountryComparison.vue`: Component for comparing multiple countries.
- `CountryInfo.vue`: Component for displaying detailed information about a single country.
- `Filter.vue`: Component for filtering countries based on a search query.
- `Country.vue`: Component for displaying detailed information about a single country.
- `shims-vue.d.ts`: TypeScript declaration file for `.vue` modules.
- `index.ts`: Vue Router configuration, defining routes for the application.
- `main.css`: Global CSS styles for the application.


**Prerequisites**

- Node.js version v20.14.0


**Installation:**

1. Clone the repository from your local terminal

```
git clone https://github.com/SuzanaRistic/Worldopedia.git
```

2. Navigate to repository
```
cd Worldopedia
``` 

3. Install dependencies
```
npm install
```

4. Production mode - compile and minify
```
npm run build
```

5. Development mode - compile and hot-reloads on
```
npm run dev
```


**Usage:**

1. Open your browser and navigate to http://localhost:8080.
2. Use filter to filter countries in the search bar.
2. Use the search bar to filter countries by name.
3. Click on a country to view detailed information.
4. Add countries to your favorites to keep track of them.
5. Use the comparison feature to compare multiple countries.