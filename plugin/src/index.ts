import type { CollectionConfig, Config } from 'payload'

import type { PluginConfig } from './types.js'

export const puckEditorPlugin =
  (pluginOptions: PluginConfig) =>
  (config: Config): Config => {
    // Modify only the high-level structure for the plugin, now using the manual field injection

    if (!config.collections) {
      config.collections = []
    }

    const newCollection: CollectionConfig = {
      slug: 'example',
      fields: [],
    }

    if (!config.collections.some((collection) => collection.slug === newCollection.slug)) {
      config.collections.push(newCollection)
    }

    // Continue with other plugin logic here if needed...
    return config
  }
