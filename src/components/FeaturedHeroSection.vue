<template>
  <div class="overflow-hidden relative">
    <header
      :style="`background-image: url(${imageUrl}); min-height: 800px; max-height: 800px;`"
      class="w-full bg-center bg-cover brightness-50 transition-all"
    />
    <div class="absolute top-1/2 -translate-y-1/2 left-10 lg:left-52 text-white text-3xl w-9/12 lg:w-1/2">
      <p class="text-5xl xl:text-7xl font-bold">
        {{ tvShow.name }}
      </p>
      <p class="flex flex-col md:flex-row space-x-0 md:space-x-6 text-base font-light pt-2 leading-8">
        <span>{{ formattedGenres }}</span>
        <span>
          <i
            v-for="star in calculateNumberOfStars(tvShow.rating.average)"
            :key="star"
            class="fa-solid fa-star"
          />
        </span>
      </p>
      <!-- eslint-disable-next-line -->
      <p class="text-base md:text-lg xl:text-xl font-light pt-5 leading-6 xl:leading-8" v-html="shortSummary"/>

      <router-link
        :to="`/show/${tvShow.id}`"
        class="text-base font-bold lowercase tracking-wider bg-red-800 px-5 py-3 mt-5 inline-block hover:brightness-125 transition-all"
      >
        More information
      </router-link>
    </div>
    <hero-search />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue'
import _ from 'lodash'
import calculateNumberOfStars from '@/utilities/calculateNumberOfStars'
import { TvShow } from '@/interfaces'

import HeroSearch from '@/components/HeroSearch.vue'

const props = defineProps({
  tvShow: {
    type: Object as PropType<TvShow>,
    required: true,
    default () {
      return {}
    },
  },
  imageUrl: {
    type: String,
    required: true,
    default () {
      return '#'
    },
  },
})

const shortSummary = computed(() => {
  return _.truncate(props.tvShow.summary, {
    length: 200,
  })
})

const formattedGenres = computed(() => {
  return _.join(props.tvShow.genres, ' | ')
})
</script>
