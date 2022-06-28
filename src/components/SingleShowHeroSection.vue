<template>
  <div class="overflow-hidden relative">
    <header
      :style="`background-image: url(${imageUrl}); min-height: 500px; max-height: 500px;`"
      class="w-full bg-center bg-cover brightness-50 transition-all"
    />
    <div class="absolute top-1/2 -translate-y-1/2 left-52 text-white text-3xl w-1/2">
      <p class="text-7xl font-bold">
        {{ tvShow.name }}
      </p>
      <p class="text-base font-light pt-2 leading-8">
        {{ formattedGenres }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import _ from 'lodash'

const props = defineProps({
  tvShow: {
    type: Object,
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
