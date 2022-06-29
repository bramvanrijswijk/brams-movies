<template>
  <div>
    <div v-if="!isFetchingShows">
      <featured-hero-section
        :image-url="fetchFeaturedImage(featuredTvShow)"
        :tv-show="featuredTvShow"
      />
      <main class="flex flex-col space-y-12 mx-10 pt-10">
        <section aria-label="now-popular">
          <sub-title>Now popular</sub-title>
          <vue-horizontal
            class="vue-horizontal"
            snap="start"
          >
            <featured-card
              v-for="popularTvShow in _.take(popularTvShows, 20)"
              :key="popularTvShow.id"
              :class="{ 'brightness-125': featuredTvShow.id === popularTvShow.id}"
              :is-hovered="featuredTvShow.id === popularTvShow.id"
              :tv-show="popularTvShow"
              class="transition-all cursor-pointer"
              @mouseover="featuredTvShow = popularTvShow"
            />
          </vue-horizontal>
        </section>

        <section aria-label="action">
          <sub-title>Action</sub-title>
          <vue-horizontal
            class="vue-horizontal"
            snap="start"
          >
            <featured-card
              v-for="popularTvShow in _.take(popularTvShowsByGenre.Action, 20)"
              :key="popularTvShow.id"
              :tv-show="popularTvShow"
              class="transition-all cursor-pointer hover:brightness-125"
            />
          </vue-horizontal>
        </section>

        <section aria-label="comedy">
          <sub-title>Comedy</sub-title>
          <vue-horizontal
            class="vue-horizontal"
            snap="start"
          >
            <featured-card
              v-for="popularTvShow in _.take(popularTvShowsByGenre.Comedy, 20)"
              :key="popularTvShow.id"
              :tv-show="popularTvShow"
              class="transition-all cursor-pointer hover:brightness-125"
            />
          </vue-horizontal>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useHead } from '@vueuse/head'
import _ from 'lodash'
import VueHorizontal from 'vue-horizontal'

import tvShowsMockData from '@/mocks/tvshows.json'
import FeaturedHeroSection from '@/components/FeaturedHeroSection.vue'
import FeaturedCard from '@/components/FeaturedCard.vue'
import SubTitle from '@/components/SubTitle'
import { API_URL } from '@/constants'

useHead({
  title: 'Brams Movies - Homepage',
})

const tvShows = ref(null)
const loadMockData = ref(true)
const isFetchingShows = ref(true)
const featuredTvShow = ref(null)
const featuredTvShowsImages = ref([])
const isFetchingImages = ref(true)

const popularTvShows = computed(() => {
  const tvShowsWithRating = _.filter(tvShows.value, (tvShow) => tvShow.rating.average !== null)
  return _.orderBy(tvShowsWithRating, (tvShow) => tvShow.rating.average, 'desc')
})

const popularTvShowsByGenre = computed(() => {
  return _.groupBy(popularTvShows.value, tvShow => tvShow.genres[0])
})

function fetchMockData (callback) {
  return callback(tvShowsMockData)
}

async function fetchTvShows (callback) {
  const response = await fetch(`${API_URL}/shows`)
  const tvShows = await response.json()

  const responsePage2 = await fetch(`${API_URL}/shows?page=1`)
  const tvShowsPage2 = await responsePage2.json()

  return callback(_.concat(tvShows, tvShowsPage2))
}

function fetchFeaturedImage (tvShow) {
  if (!isFetchingImages.value) {
    return featuredTvShowsImages.value[_.findIndex(featuredTvShowsImages.value,
      imgData => imgData.id === tvShow.id)].images[0].resolutions.original.url
  }
}

function fetchImages () {
  let images = []

  _.take(popularTvShows.value, 20).forEach(popularTvShow => {
    fetch(`${API_URL}/shows/${popularTvShow.id}/images`)
      .then(response => response.json())
      .then(json => _.reject(json, image => image.type !== 'background'))
      .then(backgroundImages => _.orderBy(backgroundImages, image => image.resolutions.original.width, 'desc'))
      .then(result => {
        images.push({
          id: popularTvShow.id,
          images: result,
        })
      }).finally(() => {
      featuredTvShowsImages.value = images
      isFetchingImages.value = false
    })
  })
}

onMounted(() => {
  if (loadMockData.value) {
    fetchMockData((mockShows) => {
      tvShows.value = mockShows
      featuredTvShow.value = popularTvShows.value[0]

      fetchImages()
      isFetchingShows.value = false
    })

    return
  }

  fetchTvShows((result) => {
    tvShows.value = result
    featuredTvShow.value = popularTvShows.value[0]

    fetchImages()
    isFetchingShows.value = false
  })
})
</script>


