<template>
  <div v-if="!isFetchingShowData || !isFetchingImages">
    <simple-hero-section
      :image-url="featuredImage"
      :title="showData.name"
    />

    <main class="flex flex-col space-y-12 mx-10 pt-10">
      <section class="flex flex-col mx-auto w-full md:w-6/12 space-y-8">
        <section aria-label="overview">
          <sub-title>Overview</sub-title>
          <p
            class="leading-7"
            v-html="showData.summary"
          />
          <p class="pt-5 text-gray-700 text-sm">
            {{ formattedGenres }}
          </p>
        </section>
        <section aria-label="cast">
          <sub-title>Cast</sub-title>
          <p v-if="castMembers.length < 1">
            No cast was found.
          </p>
          <div
            v-else
            class="grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-6 gap-6"
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
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import _ from 'lodash'

import SubTitle from '@/components/SubTitle'
import CastMember from '@/components/CastMember'
import SimpleHeroSection from '@/components/SimpleHeroSection'
import { API_URL } from '@/constants'

useHead({
  title: 'Brams Movies - Show page',
})

const route = useRoute()
const showData = ref({})
const isFetchingShowData = ref(true)
const isFetchingImages = ref(true)
const showImages = ref([])

const featuredImage = computed(() => {
  return showImages.value[0][0]?.resolutions.original.url
})

const castMembers = computed(() => {
  return showData.value._embedded?.cast ?? []
})

const formattedGenres = computed(() => {
  return _.join(showData.value.genres, ' | ')
})

async function fetchShowData () {
  const response = await fetch(`${API_URL}/shows/${route.params.id}?embed=cast`)
  showData.value = await response.json()

  isFetchingShowData.value = false
}

function fetchImages () {
  let imagesArray = []

  fetch(`${API_URL}/shows/${route.params.id}/images`)
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
