<template>
  <div
    style="min-width: 200px;"
  >
    <img
      :src="tvShow.image.medium"
      alt=""
    >
    <p>{{ tvShow.name }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  tvShow: {
    type: Object,
    required: true,
    default () {
      return {}
    }
  },
})
</script>
