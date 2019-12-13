<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">NASA Images Search</h1>
        <h2 class="subtitle">
          Type something (try "mars" or "earth") in the input below and click "Search" <span role="img" aria-label="smile">🙂</span>
        </h2>

        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" v-model="query" v-on:keyup.enter="search" v-bind:disabled="loading">
          </div>
          <div class="control">
            <button class="button is-success" v-on:click="search" v-bind:class="loading ? 'is-loading' : null">Search</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">

        <div class="image-grid" v-if="images">
          <img v-for="image in images" v-bind:key="image.id" v-bind:src="image.uri" />

          <p v-if="images.length === 0">No results found.</p>
        </div>

      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ImageData } from './models';
import { NasaImagesApiService } from './services';

export default Vue.extend({
  name: "app",
  data: () => ({
    query: '',
    images: null,
    loading: false,
    error: null
  }),
  methods: {
    search() {
      if (this.query === '') {
        return;
      }
      
      this.error = null;
      this.loading = true;
      this.images = null;

      NasaImagesApiService
        .getImages(this.query)
        .then((data: any) => {
          this.loading = false;
          this.images = data;
        }) 
    }
  }
});
</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1em;
}
</style>