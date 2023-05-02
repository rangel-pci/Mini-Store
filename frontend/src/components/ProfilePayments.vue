<script setup lang="ts">
  import { formatter } from '@/helpers/money';
  import { useCustomerStore } from '../stores/global'
  import { toRefs, watch } from 'vue';
  import { usePayment } from '../composables/usePayment';

  const props = defineProps<{
    show: boolean
  }>()

  const storeCustomer = useCustomerStore()
  const { show } = toRefs(props)
  const { loading, payments, getPayments } = usePayment()

  watch(show, (newValue) => {
    if(newValue){
      getPayments(storeCustomer.customer.email)
    }
  })
</script>

<template>
    <div class="flex flex-col gap-1">
        <div v-if="loading" class="bg-slate-700 w-100 h-56 rounded animate-pulse"></div>
        <div v-else class="bg-slate-700 p-4 rounded">
          <div v-for="payment in payments" class="flex items-center text-gray-300" :key="payment.id">
            <span class="ml-auto">{{ new Date(payment.created * 1000).toLocaleDateString() }}</span>
            <div class="bg-slate-600 h-[0.25px] w-100 flex-1 mx-2"></div>
            <span>{{ formatter(payment.currency, payment.amount) }}</span>
          </div>
        </div>
    </div>
</template>