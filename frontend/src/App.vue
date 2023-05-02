<script setup lang="ts"> 
  document.title = import.meta.env.VITE_TITLE_EN
</script>

<template>
  <suspense>
    <router-view>
    </router-view>
  </suspense>
</template>