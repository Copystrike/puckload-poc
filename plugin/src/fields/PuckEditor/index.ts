import type { Field } from 'payload'

export const PuckBuilderField = (): Field => ({
  name: 'PuckEditor',
  type: 'ui',
  admin: {
    components: {
      Field: {
        path: '@puck/puck-editor/PuckEditor/client#PuckEditorComponent',
      },
    },
  },
  label: 'Puck Builder',
})
