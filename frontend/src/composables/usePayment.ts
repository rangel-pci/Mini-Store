import type { Payment } from "@/types/global"
import { ref } from "vue"

export function usePayment(){
    const payments = ref<Payment[]>([])
    const loading = ref(true)
    const api_endpoint = import.meta.env.VITE_BACKEND_API_URL

    const getPayments = async (customer_id: string) => {
        loading.value = true
        const res = await fetch(api_endpoint + `/payments/${customer_id}`)
        payments.value = await res.json()
        loading.value = false   
    }

    return { getPayments, payments, loading }
}