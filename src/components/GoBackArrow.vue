<template>
  <div class="absolute top-5 left-10">
    <a
      href="#"
      @click="router.go(-1)"
    >
      <i
        class="fa-solid fa-arrow-left-long text-white"
        style="font-size: 25px;"
      />
    </a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
