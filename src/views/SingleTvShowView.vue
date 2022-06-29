<template>
  <div v-if="isFetchingShowData || isFetchingImages">
    Loading...
  </div>
  <div v-else>
    <single-show-hero-section
      :image-url="featuredImage"
      :tv-show="showData"
    />

    <main class="flex flex-col space-y-12 mx-10 pt-10">
      <section class="flex flex-col mx-auto w-6/12 space-y-8">
        <section aria-label="overview">
          <genre-heading>Overview</genre-heading>
          <p
            class="leading-7"
            v-html="showData.summary"
          />
          <p class="pt-5 text-gray-700 text-sm">
            {{ formattedGenres }}
          </p>
        </section>
        <section aria-label="cast">
          <genre-heading>Cast</genre-heading>
          <p v-if="castMembers.length < 1">
            No cast was found.
          </p>
          <div
            v-else
            class="grid grid-cols-6 gap-6"
          >
            <div
              v-for="cast in castMembers"
              :key="cast.id"
            >
              <cast-member :person="cast.person" />
            </div>
          </div>
        </section>
      </section>
      <aside />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import _ from 'lodash'

import SingleShowHeroSection from '@/components/SingleShowHeroSection'
import GenreHeading from '@/components/GenreHeading'
import CastMember from '@/components/CastMember'

const route = useRoute()
const showData = ref({})
const isFetchingShowData = ref(true)
const isFetchingImages = ref(true)
const showImages = ref([])

const featuredImage = computed(() => {
  return showImages.value[0][0]?.resolutions.original.url
})

const castMembers = computed(() => {
  return showData.value._embedded.cast
})

const formattedGenres = computed(() => {
  return _.join(showData.value.genres, ' | ')
})

async function fetchShowData () {
  const response = await fetch(`https://api.tvmaze.com/shows/${route.params.id}?embed=cast`)
  showData.value = await response.json()

  isFetchingShowData.value = false
}

function fetchImages () {
  let imagesArray = []

  fetch(`https://api.tvmaze.com/shows/${route.params.id}/images`)
    .then(response => response.json())
    .then(json => _.reject(json, image => image.type !== 'background'))
    .then(backgroundImages => _.orderBy(backgroundImages, image => image.resolutions.original.width, 'desc'))
    .then(result => {
      imagesArray.push(result)
    })
    .finally(() => {
      showImages.value = imagesArray
      isFetchingImages.value = false
    })
}

onMounted(() => {
  fetchShowData()
  fetchImages()
})
</script>
