<script setup lang="ts">
    import { 
        useLanguageStore, 
        useCartStore, 
        usePaymentCheckoutStore, 
        useCustomerStore 
    } from '../stores/global'
    import { formatter } from '@/helpers/money'
    import { onMounted, ref } from 'vue'
    import AlertMessageVue from './AlertMessage.vue'
    import ModalLayout from './ModalLayout.vue'
    import { Icon } from '@vicons/utils'
    import { IosArrowRtl24Filled, SpinnerIos20Filled } from '@vicons/fluent'
    import ItemsCart from './ItemsCart.vue'
    import { useOrder } from '../composables/useOrder'
    import { loadStripe } from '@stripe/stripe-js/pure';
    import type { StripeCardElement } from '@stripe/stripe-js'

    const storeLanguage = useLanguageStore()
    const storeCart = useCartStore()
    const storeCustomer = useCustomerStore()
    const storePaymentCheckout = usePaymentCheckoutStore()
    const { makeOrder } = useOrder()
    
    const stripe_pk = import.meta.env.VITE_STRIPE_PUBLIC_KEY
    const stripe = await loadStripe(stripe_pk)
    const elements = stripe?.elements()
    const cardConfig = {
        classes: { 
            base: 'p-2' 
        }, 
        style: { 
            base: { 
                color : '#9CA3AF'
            } 
        },
        hidePostalCode: true,
    }
    const cardElm = elements?.create('card', cardConfig)
    const paymentForm = ref<HTMLFormElement | null>(null)
    const htmlCardElement = ref<HTMLElement | null>(null)
    
    onMounted(() => {
        cardElm?.mount('#card-element')
        cardElm?.on('change', ({error}) => {
        let displayError = document.getElementById('card-errors');
        if (error) {
            if(displayError) displayError.textContent = error.message;
        } else {
            if(displayError) displayError.textContent = '';
        }
        });
    })

    const loading = ref(false)
    const show = ref(storePaymentCheckout.getShow())    
    const showAlert = ref(false)
    const alertMessage = ref('')
    const alertCallback = () => {
        showAlert.value = false
    }
    const back = () =>  storePaymentCheckout.setShow(false)

    const initiatePayment = async (e: Event) => { 
        e.preventDefault()

        if(!htmlCardElement.value?.classList.contains('StripeElement--complete')){
            alertMessage.value = 'Please fill in the payment information correctly.'
            showAlert.value  = true
            return false
        }

        loading.value = true
        const client_secret = await makeOrder(
            {
                customer: storeCustomer.customer,
                currency: storeLanguage.getCurrency,
                products: storeCart.getItems
            }
        )
        stripe?.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardElm as StripeCardElement,
                billing_details: {
                    name: storeCustomer.customer.name,
                    email: storeCustomer.customer.email
                }
            }
        }).then(res => {
            if(res.error){
                alertMessage.value = res.error.message ?? 'Error!'
                showAlert.value  = true
            }else{
                if(res.paymentIntent.status === 'succeeded') {
                    alertMessage.value = 'Success!'
                    showAlert.value  = true
                }

                storeCart.clearItems()
                back()
            }

            loading.value = false
        })
    }
</script>

<template>
    <ModalLayout id="paymentModal" :show="show" :onReturn="back" title="Payment Checkout">
        <template v-slot:content>
            <div class="text-white p-4">
                <h2 class="font-bold">Address</h2>
                <div class="flex mt-1 bg-slate-700 rounded p-2">
                    <div class="mr-2">
                        <p class="text-gray-400 font-bold">Home - John Doe</p>
                        <p class="text-gray-400">707-707 7th Ward, New Orleans, Louisiana</p>
                    </div>
                    <Icon class="self-center ml-auto">
                        <IosArrowRtl24Filled class="rotate-90" />
                    </Icon>
                </div>

                <h2 class="font-bold mt-4">Payment Method</h2>
                <div class="mt-1 bg-slate-700 rounded p-2">
                    <form id="payment-form" ref="paymentForm" @submit="initiatePayment">
                        <div ref="htmlCardElement" id="card-element"></div>
                    </form>
                    <span id="card-errors" class="text-red-600"></span>
                </div>
                
                <h2 class="font-bold mt-4">My Cart</h2>
                <ItemsCart class="mt-1" />
            </div>
        </template>
        <template v-slot:footer>
            <div class="content">
                <div v-if="storeCart.getItems.length > 0" class="flex items-center md:justify-center">
                    <p class="text-white font-bold text-2xl text-center mr-4">
                        {{ formatter(storeLanguage.getLanguage, storeCart.getTotal(storeLanguage.getCurrency)) }}
                    </p>
                    <button 
                        aria-label="Pay now"
                        :disabled="loading"
                        @click="paymentForm?.requestSubmit()"
                        class="p-3 bg-green-500 text-white rounded-sm font-bold text-center flex-1
                        transition-all md:flex-initial md:w-2/4 md:hover:bg-green-600 active:bg-green-600"
                    >
                        <Icon v-if="loading" class="align-middle animate-spin" size="20">
                            <SpinnerIos20Filled class="" />
                        </Icon>
                        <template v-else>
                            Pay Now
                        </template>
                    </button>
                </div>
                <div v-else>
                    <p class="text-slate-700 text-center">Add something to your cart to continue.</p>
                </div>
            </div>
        </template>
    </ModalLayout>

    <AlertMessageVue 
        :show="showAlert" 
        :callback="alertCallback"  
        :message="alertMessage"
    />
</template>