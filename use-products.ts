import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useProducts(category?: string, search?: string) {
  const params = new URLSearchParams()
  if (category) params.append("category", category)
  if (search) params.append("search", search)

  const url = `/api/products${params.toString() ? "?" + params.toString() : ""}`

  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    products: data?.data || [],
    isLoading,
    error,
    mutate,
  }
}
