<template>
  <div class="overflow-hidden">
    <header
      :style="`background-image: url(${imageUrl}); min-height: 800px; max-height: 800px;`"
      class="relative w-full bg-center bg-cover transition-all"
    />
    <p class="absolute top-0 text-white text-3xl">
      {{ tvShow.name }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

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
</script>
