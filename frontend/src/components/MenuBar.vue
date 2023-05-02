<script setup lang="ts">
  import { Icon } from '@vicons/utils'
  import { 
    Cart24Filled, Person24Filled, Translate24Filled
  } from "@vicons/fluent"
  import BottomOffcanvas from './BottomOffcanvas.vue'
  import ItemsCart from './ItemsCart.vue'
  import ProfilePayments from './ProfilePayments.vue'
  import { ref } from 'vue'
  import { useCartStore, useLanguageStore, usePaymentCheckoutStore } from '../stores/global'

  defineProps<{
    class: string
  }>()

  const storeGlobal = useLanguageStore()
  const storeCart = useCartStore()
  const storePaymentCheckout = usePaymentCheckoutStore()
  const langOffcanvasShow = ref(false)
  const cartOffcanvasShow = ref(false)
  const profileOffcanvasShow = ref(false)

  function setLang(lang: string){
    storeGlobal.setLanguage(lang)
  }
  function closeAllOffcanvas() {
    langOffcanvasShow.value = false
    cartOffcanvasShow.value = false
    profileOffcanvasShow.value = false
  }
</script>

<template>
  <div id="menu-container" :class="'px-4 py-2 pb-3 bg-slate-900 flex justify-around max-w-[600px] mx-auto ' + $props.class">
    <button aria-label="menu button" class="relative flex gap-x-1 md:items-center items-end px-2" @click="cartOffcanvasShow ? cartOffcanvasShow = false : (closeAllOffcanvas(), cartOffcanvasShow = true)">
      <Icon size="30" class="text-white active:text-slate-400 transition-all">
        <Cart24Filled/>
      </Icon>
      <p class="text-white hidden md:block">My Cart</p>

      <div v-if="storeCart.getItems.length > 0" class="bg-white rounded-full px-2 absolute -top-2 right-0">
        {{ storeCart.getItems.length }}
      </div>
    </button>

    <button aria-label="menu button" class="flex gap-x-1 md:items-center items-end px-2" @click="langOffcanvasShow ? langOffcanvasShow = false : (closeAllOffcanvas(), langOffcanvasShow = true)">
      <Icon size="30" class="text-white active:text-slate-400 transition-all">
        <Translate24Filled/>
      </Icon>
      <p class="text-white hidden md:block">Currency</p>
    </button>

    <button aria-label="menu button" class="flex gap-x-1 md:items-center items-end px-2" @click="profileOffcanvasShow ? profileOffcanvasShow = false : (closeAllOffcanvas(), profileOffcanvasShow = true)">
      <Icon size="30" class="text-white active:text-slate-400 transition-all">
        <Person24Filled/>
      </Icon>
      <p class="text-white hidden md:block">My Payments</p>
    </button>    
  </div>

  <BottomOffcanvas
    :show="cartOffcanvasShow"
    :callback="() => cartOffcanvasShow = false"
  >
    <div class="bg-slate-700 py-1 px-2 rounded text-center mb-2">My Cart</div>
    <div class="flex flex-col">
      <ItemsCart />
      <button aria-label="Payment checkout"
        v-if="storeCart.getItems.length > 0"
        @click="storePaymentCheckout.setShow(true)"
        class="p-3 mt-4 bg-green-500 md:hover:bg-green-600 active:bg-green-600 text-white rounded-sm font-bold text-center"
      >
        Payment
    </button>
    </div>
  </BottomOffcanvas>

  <BottomOffcanvas
    :show="langOffcanvasShow"
    :callback="() => langOffcanvasShow = false"
  >
    <div class="bg-slate-700 py-1 px-2 rounded text-center mb-2">Currency</div>
    <div class="flex flex-col gap-1">
      <button aria-label="set currency en" class="p-2 rounded-lg transition-all
        md:hover:bg-slate-700 active:bg-slate-700"
        @click="setLang('en'), langOffcanvasShow = false"
      >
        USD
      </button>
      <button aria-label="set currency pt" class="p-2 rounded-lg transition-all
        md:hover:bg-slate-700 active:bg-slate-700"
        @click="setLang('pt'), langOffcanvasShow = false"
      >
        BRL
      </button>
    </div>
  </BottomOffcanvas>

  <BottomOffcanvas
    :show="profileOffcanvasShow"
    :callback="() => profileOffcanvasShow = false"
  >
    <div class="bg-slate-700 py-1 px-2 rounded text-center mb-2">My Payments</div>
    <ProfilePayments :show="profileOffcanvasShow" />
  </BottomOffcanvas>
</template>