import type { CollectionSlug } from 'payload'

export type PluginConfig = {
  /**
   * List of collections to enhance with the Puck Editor field
   */
  collections?: Partial<Record<CollectionSlug, true>>

  /**
   * Disable all plugin behavior but preserve schema (e.g. for safe deploys/migrations)
   */
  disabled?: boolean
}
