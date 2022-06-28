<template>
  <div>
    <div v-if="!isFetchingShows">
      Content
    </div>
    <p v-else>
      Loading...
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import _ from 'lodash'
import tvShowsMockData from '../mocks/tvshows.json'

const tvShows = ref(null)
const loadMockData = ref(true)
const isFetchingShows = ref(true)

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

async function fetchTvShows () {
  const response = await fetch('https://api.tvmaze.com/shows')
  const tvShows = await response.json()

  const responsePage2 = await fetch('https://api.tvmaze.com/shows?page=1')
  const tvShowsPage2 = await responsePage2.json()

  tvShows.value = _.concat(tvShows, tvShowsPage2)
}

onMounted(() => {
  if (loadMockData.value) {
    fetchMockData((mockShows) => {
      tvShows.value = mockShows
      isFetchingShows.value = false

      console.log(popularTvShows.value)
    })

    return
  }

  fetchTvShows()
})
</script>
