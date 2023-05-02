import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '../types/global'
import type { Customer } from '../types/global';

const useLanguageStore = defineStore('global', () => {
    const appLanguage = ref<string>(localStorage.getItem('app_language') ?? 'en')
    const appCurrency = ref<string>(appLanguage.value === 'en' ? 'usd' : 'brl')

    const setLanguage = (lang: string) => {
        appLanguage.value = lang
        appCurrency.value = lang === 'en' ? 'usd' : 'brl'
        localStorage.setItem('app_language', lang)
    }

    const getLanguage = computed(() => appLanguage.value)
    const getCurrency = computed(() => appCurrency.value)
    const getIsoLanguage = computed(() => appLanguage.value == 'en' ? 'en-GB' : 'pt-BR')

    return { setLanguage, getLanguage, getIsoLanguage, getCurrency }
})

const useItemStore = defineStore('item', () => {
    const product = ref<Product | null>(null)
 
    const setItem = (item: Product) => product.value = item
    const currentItem = () => computed(() => product.value)
    const removeItem = () => product.value = null
    
    return { setItem, currentItem, removeItem }
})

const useCartStore = defineStore('cart', () => {
    const produtcs = ref<Product[]>([])
 
    const getItems = computed(() => produtcs.value)
    const getTotal = (currency: string) => produtcs.value
        .map(i => parseInt(i.metadata['minimum_' + currency]))
        .reduce(
            (total, value) => total + value, 0
        )
    const addItem = (item: Product) => {
        if(produtcs.value.findIndex(i => i.id === item.id) === -1) {
            produtcs.value.push(item)
        }
    }
    const removeItem = (id: string) => produtcs.value
    .splice(produtcs.value.findIndex(i => i.id === id), 1)

    const clearItems = () => produtcs.value = []
    
    return { addItem, getItems, removeItem, getTotal, clearItems }
})

const usePaymentCheckoutStore = defineStore('paymentCheckout', () => {
    const show = ref(false)
 
    const getShow = () => computed(() => show.value)
    const setShow = (value: boolean) => show.value = value
    
    return { setShow, getShow }
})

const useCustomerStore = defineStore('user', () => {
    const customer = reactive<Customer>({
        name: 'John Doe',
        email: 'john.doe@email.com',
    })
    
    return { customer }
})

export { 
    useLanguageStore, 
    useItemStore,
    useCartStore,
    usePaymentCheckoutStore,
    useCustomerStore
}