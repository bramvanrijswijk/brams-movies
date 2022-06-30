<template>
  <div>
    <div v-if="!isFetchingShows || !isFetchingImages">
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

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useHead } from '@vueuse/head'
import _ from 'lodash'
import VueHorizontal from 'vue-horizontal'

import FeaturedHeroSection from '@/components/FeaturedHeroSection.vue'
import FeaturedCard from '@/components/FeaturedCard.vue'
import SubTitle from '@/components/SubTitle.vue'
import { API_URL } from '@/constants'
import { TvShow, Image, ImagesByShow } from '@/interfaces'

useHead({
  title: 'Brams Movies - Homepage',
})

const tvShows = ref<TvShow[]>([])
const isFetchingShows = ref(true)
const featuredTvShow = ref<TvShow>()
const featuredTvShowsImages = ref<ImagesByShow>()
const isFetchingImages = ref(true)

const popularTvShows = computed(() => {
  const tvShowsWithRating = _.filter(tvShows.value, (tvShow) => tvShow.rating.average !== null)
  return _.orderBy(tvShowsWithRating, (tvShow) => tvShow.rating.average, 'desc')
})

const popularTvShowsByGenre = computed(() => {
  return _.groupBy(popularTvShows.value, tvShow => tvShow.genres[0])
})

async function fetchTvShows (callback) {
  const response = await fetch(`${API_URL}/shows`)
  const tvShows = await response.json()

  const responseMoreShows = await fetch(`${API_URL}/shows?page=1`)
  const moreShows = await responseMoreShows.json()

  return callback(_.concat(tvShows, moreShows))
}

function fetchFeaturedImage (tvShow: TvShow) {
  if (!isFetchingImages.value) {
    const index: number = _.findIndex(featuredTvShowsImages.value, (imgData: ImagesByShow) => imgData.tvShowId === tvShow.id)
    return featuredTvShowsImages.value[index].images[0].resolutions.original.url
  }
}

function fetchImages () {
  let imagesByShow: ImagesByShow[] = []

  _.take(popularTvShows.value, 20).forEach(popularTvShow => {
    fetch(`${API_URL}/shows/${popularTvShow.id}/images`)
      .then(response => response.json())

      // only fetch background images
      .then(json => _.reject(json, image => image.type !== 'background'))

      // sort them by width so the one with the highest resolution can be chosen
      .then(backgroundImages => _.orderBy(backgroundImages, image => image.resolutions.original.width, 'desc'))
      .then(result => {
        imagesByShow.push({
          tvShowId: popularTvShow.id,
          images: result,
        })
      }).finally(() => {
      featuredTvShowsImages.value = imagesByShow
      isFetchingImages.value = false
    })
  })
}

onMounted(() => {
  fetchTvShows((result: TvShow[]) => {
    tvShows.value = result
    featuredTvShow.value = popularTvShows.value[0]

    fetchImages()
    isFetchingShows.value = false
  })
})
</script>


