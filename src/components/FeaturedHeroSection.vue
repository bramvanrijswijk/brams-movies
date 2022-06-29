<template>
  <div class="overflow-hidden relative">
    <header
      :style="`background-image: url(${imageUrl}); min-height: 800px; max-height: 800px;`"
      class="w-full bg-center bg-cover brightness-50 transition-all"
    />
    <div class="absolute top-1/2 -translate-y-1/2 left-52 text-white text-3xl w-1/2">
      <p class="text-7xl font-bold">
        {{ tvShow.name }}
      </p>
      <p class="flex space-x-6 text-base font-light pt-2 leading-8">
        <span>{{ formattedGenres }}</span>
        <span>
          <i
            v-for="star in amountOfStars"
            :key="star"
            class="fa-solid fa-star"
          />
        </span>
      </p>
      <p
        class="text-xl font-light pt-5 leading-8"
        v-html="shortSummary"
      />

      <router-link
        :to="`/show/${tvShow.id}`"
        class="text-base font-bold lowercase tracking-wider bg-red-900 px-5 py-3 mt-5 inline-block hover:brightness-125 transition-all"
      >
        More information
      </router-link>
    </div>
    <div class="flex items-center justify-center absolute top-5 right-10">
      <div class="relative py-2">
        <input
          v-if="isSearchActive"
          v-model="searchTerm"
          class="px-3 py-2 -mt-2 rounded bg-gray-400 focus:outline-none text-white"
          placeholder="Breaking Bad"
          type="text"
          @blur="isSearchActive = false"
          @keyup.enter="search()"
        >
        <i
          class="absolute right-3 fa-solid fa-magnifying-glass text-white cursor-pointer"
          style="font-size: 20px;"
          @click="isSearchActive = !isSearchActive"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
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

const router = useRouter()
const isSearchActive = ref(false)
const searchTerm = ref('')

function search () {
  router.push({
    path: '/search',
    query: {
      search: searchTerm.value,
    },
  })
}

const shortSummary = computed(() => {
  return _.truncate(props.tvShow.summary, {
    length: 200,
  })
})

const formattedGenres = computed(() => {
  return _.join(props.tvShow.genres, ' | ')
})

const amountOfStars = computed(() => {
  return _.round(props.tvShow.rating.average / 2, 0)
})
</script>
