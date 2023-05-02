<script setup lang="ts">
    import { Icon } from '@vicons/utils'
    import { 
        Delete24Filled, Snooze24Filled
    } from "@vicons/fluent"
    import { useCartStore, useLanguageStore } from '../stores/global'
    import { formatter } from '@/helpers/money'

    const storeCart = useCartStore()
    const storeLanguage = useLanguageStore()
</script>
<template>
    <div v-if="storeCart.getItems.length > 0">
        <div class="bg-slate-700 p-4 rounded">
            <div v-for="product in storeCart.getItems" class="flex flex-row items-center mb-2" :key="product.id">
                <img 
                    class="w-16"
                    :src="product.images[0]" 
                    :alt="product.name"
                >
                <div class="flex-1 mx-2 text-white">
                <p class="font-bold">{{ product.metadata['title_' + storeLanguage.getLanguage] }}</p>
                <p>{{ formatter(storeLanguage.getLanguage, product.metadata['minimum_' + storeLanguage.getCurrency]) }}</p>
                </div>
                <button 
                    aria-label="Delete item"
                    @click.stop="storeCart.removeItem(product.id)" 
                    class="p-2 flex rounded bg-opacity-20 bg-slate-800 active:bg-slate-400 transition-all"
                >
                <Icon size="20" class="text-gray-300">
                    <Delete24Filled />
                </Icon>
                </button>
            </div>
        </div>
        <div class="bg-slate-700 mt-2 p-4 rounded font-light border-opacity-20 flex flex-col">
            <div class="flex text-gray-300">
            <span>Shipping</span><span class="ml-auto">{{ formatter(storeLanguage.getLanguage, 100) }}</span>
            </div>
            <div class="flex text-gray-300">
            <span>Subtotal</span><span class="ml-auto">{{ formatter(storeLanguage.getLanguage, storeCart.getTotal(storeLanguage.getCurrency) + 100) }}</span>
            </div>
            <div class="flex text-green-400">
            <span>Discount</span><span class="ml-auto">- {{ formatter(storeLanguage.getLanguage, 100) }}</span>
            </div>
            <div class="flex font-normal">
            <span>Total</span><span class="ml-auto">{{ formatter(storeLanguage.getLanguage, storeCart.getTotal(storeLanguage.getCurrency)) }}</span>
            </div>
        </div>
    </div>
    <template v-else>
        <div class="flex flex-col items-center text-slate-700 p-4">
            <Icon size="30">
                <Snooze24Filled />
            </Icon>
            <p>Your cart is empty</p>
        </div>
    </template>
</template>