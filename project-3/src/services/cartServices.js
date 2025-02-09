import apiClient from "../utils/api-client";

export function addToCartAPI (id, quantity) {
    return apiClient.post(`/cart/${id}`, {quantity})
}

export async function getCartApi () {
    await apiClient.get('/cart')
}

export function removeFromCartAPi(id) {
    return apiClient.patch(`/cart/remove/${id}`)
}

export function increaseProductAPI(id){
    return apiClient.patch(`/cart/increase/${id}`)
}

export function decreaseProductAPI(id){
    return apiClient.patch(`/cart/decease/${id}`)
}