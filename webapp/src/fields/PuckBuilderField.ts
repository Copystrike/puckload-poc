import { Field } from 'payload'

export const puckBuilderField = (options = {}): Field => ({
  name: 'puckBuilder',
  label: 'Puck Builder',
  type: 'ui',
  admin: {
    components: {
      Field: '@/components/admin/PuckBuilder',
    },
    ...options,
  },
})
