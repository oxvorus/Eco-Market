import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useCart() {
  const { data, error, isLoading, mutate } = useSWR("/api/cart", fetcher)

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      })

      if (response.ok) {
        mutate()
        return true
      }
      return false
    } catch (error) {
      console.error("Error adding to cart:", error)
      return false
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutate()
        return true
      }
      return false
    } catch (error) {
      console.error("Error removing from cart:", error)
      return false
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      })

      if (response.ok) {
        mutate()
        return true
      }
      return false
    } catch (error) {
      console.error("Error updating quantity:", error)
      return false
    }
  }

  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      })

      if (response.ok) {
        mutate()
        return true
      }
      return false
    } catch (error) {
      console.error("Error clearing cart:", error)
      return false
    }
  }

  return {
    cart: data?.data || [],
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    mutate,
  }
}
