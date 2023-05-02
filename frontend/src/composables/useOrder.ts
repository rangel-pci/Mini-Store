import type { Order } from "@/types/global"

export function useOrder(){
    const api_endpoint = import.meta.env.VITE_BACKEND_API_URL

    const makeOrder = async (data: Order): Promise<string> => {
        const res = await fetch(api_endpoint + "/orders", { 
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const { client_secret } = await res.json()
        return client_secret
    }

    return { makeOrder }
}