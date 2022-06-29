<template>
  <div v-if="!isFetchingShowData">
    <simple-hero-section
      :title="`Search results for: &quot;${route.query.search}&quot;`"
    />
    <main class="flex flex-col space-y-12 mx-10 pt-10">
      <section aria-label="search-results">
        <sub-title>Search results for "{{ route.query.search }}"</sub-title>
        <vue-horizontal
          class="vue-horizontal"
          snap="start"
        >
          <featured-card
            v-for="result in results"
            :key="result.show.id"
            :tv-show="result.show"
            class="transition-all cursor-pointer hover:brightness-125"
          />
        </vue-horizontal>
      </section>

      <section
        aria-label="search-results"
        class="flex flex-col justify-center items-center pt-12"
      >
        <p class="text-gray-500 font-medium">
          Didn't find what you were looking for?
        </p>
        <input
          v-model="searchTerm"
          class="border border-gray-300 mt-2 w-full md:w-4/12 px-3 py-2 rounded focus:ring-2 focus:outline-none"
          placeholder="Breaking Bad"
          type="text"
          @keyup.enter="search()"
        >
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute, useRouter } from 'vue-router'
import VueHorizontal from 'vue-horizontal'

import SimpleHeroSection from '@/components/SimpleHeroSection'
import SubTitle from '@/components/SubTitle'
import FeaturedCard from '@/components/FeaturedCard'
import { API_URL } from '@/constants'

useHead({
  title: 'Brams Movies - Search results',
})

const route = useRoute()
const router = useRouter()
const results = ref({})
const isFetchingShowData = ref(true)
const searchTerm = ref('')

function search () {
  router.push({
    path: '/search',
    query: {
      search: searchTerm.value,
    },
  })

  fetchShowsBasedOnSearch()
  searchTerm.value = ''
}

async function fetchShowsBasedOnSearch () {
  const response = await fetch(`${API_URL}/search/shows?q=${searchTerm.value}`)
  results.value = await response.json()

  isFetchingShowData.value = false
}

onMounted(() => {
  searchTerm.value = route.query.search
  fetchShowsBasedOnSearch()
  searchTerm.value = ''
})
</script>
