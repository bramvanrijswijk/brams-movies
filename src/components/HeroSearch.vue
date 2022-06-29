<template>
  <div class="flex items-center justify-center absolute top-5 right-10">
    <div class="relative py-2">
      <input
        v-if="isSearchActive"
        ref="searchInput"
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
        @click="toggleSearchInput"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSearchActive = ref(false)
const searchTerm = ref('')
const searchInput = ref('')

function search () {
  router.push({
    path: '/search',
    query: {
      search: searchTerm.value,
    },
  })
}

function toggleSearchInput () {
  isSearchActive.value = !isSearchActive.value
  nextTick(() => {
    searchInput.value.focus()
  })
}
</script>
