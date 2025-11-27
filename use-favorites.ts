import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useFavorites() {
  const { data, error, isLoading, mutate } = useSWR("/api/users/favorites", fetcher)

  const addToFavorites = async (item: any) => {
    try {
      const response = await fetch("/api/users/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        mutate()
        return true
      }
      return false
    } catch (error) {
      console.error("Error adding to favorites:", error)
      return false
    }
  }

  const removeFromFavorites = async (itemId: string) => {
    try {
      const response = await fetch(`/api/users/favorites?id=${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutate()
        return true
      }
      return false
    } catch (error) {
      console.error("Error removing from favorites:", error)
      return false
    }
  }

  return {
    favorites: data?.data || [],
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    mutate,
  }
}
