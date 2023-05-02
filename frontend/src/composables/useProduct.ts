import type { Product } from "@/types/global"
import { onMounted, ref } from "vue"

export function useProduct(){
    const products = ref<Product[]>([])
    const loading = ref(true)
    const api_endpoint = import.meta.env.VITE_BACKEND_API_URL

    onMounted(async () => {
        const res = await fetch(api_endpoint + "/products")
        products.value = await res.json()
        loading.value = false   
    })

    return { products, loading }
}