<script setup lang="ts">
  import NewItemsBanner from '@/components/NewItemsBanner.vue'
  import ItemThumbnail from '@/components/ItemThumbnail.vue'
  import SearchBar from '@/components/SearchBar.vue'
  import MenuBar from '@/components/MenuBar.vue'
  import { formatter } from '@/helpers/money'
  import { useLanguageStore } from '../stores/global'
  import ItemDetails from '@/components/ItemDetails.vue'
  import PaymentCheckout from '@/components/PaymentCheckout.vue'
  import { useProduct } from '@/composables/useProduct';
  
  const storeLanguage = useLanguageStore()
  const { products, loading } = useProduct()

</script>

<template>
  <div class="bg-[rgba(9,25,54,0.9)]">
    <div class="bg-slate-900 py-8 pb-16 min-h-screen flex-row overflow-x-hidden max-w-[600px] md:mx-auto">
      <SearchBar />
      <NewItemsBanner
        class="mx-4"
        title="New items with <br/> discount"
        subtitle="Check it Out!"
      />

      <h2 class="text-white text-lg font-bold mt-12 px-4">Products</h2>

      <div id="accessories-container" class="my-2 overflow-x-scroll">
        <div 
          class="py-4 px-4 flex gap-x-1 w-max"
        >
          <ItemThumbnail v-for="product in products" :key="product.id"
            :loading="loading"
            :item="product"
            :id="product.id"
            :images_url="product.images"
            :title="product.metadata['title_' + storeLanguage.getLanguage]" 
            :price="formatter(storeLanguage.getLanguage, product.metadata['minimum_' + storeLanguage.getCurrency])"
          />
          <div v-if="loading"
            class="item rounded bg-slate-700 flex flex-col w-32 h-32 px-4 py-2 animate-pulse"
          >
            <div class="rounded bg-slate-500 w-10 h-3 mt-auto mr-auto animate-pulse"></div>
            <div class="rounded bg-slate-600 w-20 h-3 mt-2 mr-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      <MenuBar class="fixed left-0 right-0 bottom-0 z-[200]" />
      <ItemDetails />
      <PaymentCheckout />
    </div>
  </div>
</template>
