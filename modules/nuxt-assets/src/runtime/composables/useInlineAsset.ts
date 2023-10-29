import type { NitroFetchOptions } from 'nitropack'
import { useRuntimeConfig } from '#imports'
import type { Script } from '@unhead/schema'

export function useInlineAsset(url: string, options?: { encoding: string; integrity: string }) {
  const { routePrefix } = useRuntimeConfig().public['nuxt-assets']
  const fetchParams: NitroFetchOptions<string> = {
    query: {
      src: encodeURIComponent(url),
      integrity: options?.integrity ? encodeURIComponent(options.integrity) : undefined,
    },
  }
  if (options?.encoding)
    fetchParams.headers = { accept: options.encoding }
  return $fetch<Script>(`${routePrefix}/inline`, fetchParams)
}
