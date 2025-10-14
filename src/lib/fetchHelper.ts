
interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>
  }
  
  export async function apiFetch<T>(
    url: string,
    options?: FetchOptions
  ): Promise<T> {
    const { params, ...fetchOptions } = options || {}
  
    let fullUrl = url
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        fullUrl = `${url}?${queryString}`
      }
    }
  
    const response = await fetch(fullUrl, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Request failed: ${response.status}`)
    }
  
    return response.json()
  }