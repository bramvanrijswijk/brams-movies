<template>
  <router-link
    :to="`/show/${tvShow.id}`"
  >
    <div style="width: 200px; max-width: 200px;">
      <img
        :alt="`Poster of ${tvShow.name}`"
        :src="tvShow.image?.medium ?? 'https://via.placeholder.com/210x295'"
      >
      <p
        :class="{'font-bold': isHovered}"
        class="pt-2 pl-2 break-all"
      >
        {{ tvShow.name }}
      </p>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  tvShow: {
    type: Object,
    required: true,
    default () {
      return {}
    }
  },
  isHovered: {
    type: Boolean
  }
})
</script>
