<template>
  <div class="flex flex-col items-center text-center">
    <img
      :src="person.image?.medium ?? 'https://via.placeholder.com/600x400'"
      alt=""
      class="object-cover h-24 w-24 rounded-full"
    >
    <p class="text-xs text-gray-700 pt-2">
      {{ person.name }}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  person: {
    type: Object,
    required: true,
    default () {
      return {
        image: {
          medium: 'https://via.placeholder.com/600x400',
        },
        name: 'Name not found',
      }
    },
  },
})
</script>
