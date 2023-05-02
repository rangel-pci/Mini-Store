<script setup lang="ts">
    import { Icon } from '@vicons/utils'
    import { 
      Search12Filled
    } from "@vicons/fluent"
</script>

<template>
    <div id="search-container" class="mx-4 bg-gray-700 rounded-3xl flex overflow-hidden">
        <button aria-label="Search" class="p-2 pl-4 hover:bg-gray-800 ease-linear duration-75">
          <Icon size="25" class="align-middle text-gray-400">
            <Search12Filled/>
          </Icon>
        </button>
        <input
          class="flex-1 bg-transparent text-gray-300 border-none outline-none p-2 pr-4"
          placeholder="What are you looking for?" type="text"
        />
    </div>
</template>