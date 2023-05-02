<script setup lang="ts">
    import { useItemStore } from '../stores/global'
    import type { Product } from '../types/global';

    defineProps<{
        item: Product
        id: string,
        title: string,
        price: string,
        images_url: string[],
    }>()

    const storeItem = useItemStore()
</script>

<template>
    <button
        aria-label="show item details"
        class="item rounded bg-slate-700 flex flex-col w-36"
        @click="storeItem.setItem(item)"
    >
        <img 
            class="w-32 h-32 object-contain mx-auto" 
            :src="images_url[0]" 
            :alt="title"
            loading="lazy"
        >
        <div class="py-1 px-2 text-left">
            <p class="text-white font-bold text-lg">{{ price }}</p>
            <p class="text-gray-400">{{ title }}</p>
        </div>
    </button>
</template>