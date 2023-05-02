<script setup lang="ts">
    import { useLanguageStore, useItemStore, useCartStore } from '../stores/global'
    import { formatter } from '@/helpers/money'
    import { ref } from 'vue'
    import type { Product } from '@/types/global'
    import AlertMessageVue from './AlertMessage.vue'
    import ModalLayout from './ModalLayout.vue'

    const storeGlobal = useLanguageStore()
    const storeCart = useCartStore()
    const storeItem = useItemStore()
    const product = ref(storeItem.currentItem())
    const waitingImage = ref(true)
    
    const showCartAlert = ref(false)
    const cartAlertCallback = () => {
        back()
        showCartAlert.value = false
    }

    function back(){
        storeItem.removeItem()
        waitingImage.value = true
    }
    function addToCart(){
        const item = product.value as Product
        storeCart.addItem(item)
        showCartAlert.value = true
    }
</script>

<template>
    <ModalLayout id="itemModal" :show="product ? true : false" :onReturn="back" title="Detalhes">
        <template v-slot:content>
            <p class="text-white font-bold text-xl text-center">{{ product?.metadata['title_' + storeGlobal.getLanguage] }}</p>
            <div :class="`image-container mt-14 bg-slate-700 rotate-45 mx-auto rounded-3xl w-52 h-52 ${ waitingImage ? 'animate-pulse' : ''}`">
                <svg v-if="waitingImage" class="w-48 h-48 -rotate-45  text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
                <img v-show="!waitingImage"
                    class="w-52 h-52 object-contain -rotate-45" 
                    :src="product?.images[0]" 
                    :alt="product?.name"
                    :onLoad="() => waitingImage = false"
                >
            </div>
            <p class="text-white text-center drop-shadow-md mt-10">{{ product?.metadata['total_sold'] }} Orders</p>
        </template>
        <template v-slot:footer>
            <div class="flex items-center md:justify-center">
                <p class="text-white font-bold text-2xl text-center mr-8">{{ formatter(storeGlobal.getLanguage, product?.metadata['minimum_' + storeGlobal.getCurrency] ?? 0) }}</p>
                <button aria-label="Add to cart" @click="addToCart" class="bg-green-500 rounded-sm p-3 text-white text-lg font-bold flex-1
                    transition-all md:flex-initial md:w-2/4 md:hover:bg-green-600 active:bg-green-600"
                >Add to cart</button>
            </div>
            <p class="mt-8 text-gray-400">Description:</p>
            <p class="mt-2 text-gray-400 font-light">{{ product?.metadata['description_' + storeGlobal.getLanguage] }}</p>
        </template>
    </ModalLayout>

    <AlertMessageVue 
        :show="showCartAlert" 
        :callback="cartAlertCallback"  
        message="Item Added to Cart!"
    />
</template>
