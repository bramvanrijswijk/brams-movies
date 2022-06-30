<template>
  <div class="overflow-hidden relative">
    <header
      :style="`background-image: url(${imageUrl}); min-height: 500px; max-height: 500px;`"
      class="w-full bg-center bg-cover brightness-50 transition-all"
    />
    <div
      class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-9/12 lg:w-1/2 text-white text-3xl text-center"
    >
      <p class="text-5xl xl:text-7xl font-bold">
        {{ title }}
      </p>
    </div>

    <go-back-arrow />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import GoBackArrow from '@/components/GoBackArrow'

defineProps({
  title: {
    type: String,
    required: true,
    default () {
      return {}
    },
  },
  imageUrl: {
    type: String,
    required: false,
    default () {
      return 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1729&q=80'
    },
  },
})
</script>
