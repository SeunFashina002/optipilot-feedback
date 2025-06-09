import { computed } from 'vue'
import { useAdminAuth } from '@/stores/adminAuth'

export function useAdminInitials() {
  const adminAuth = useAdminAuth()

  const adminInitials = computed(() => {
    if (!adminAuth.admin?.name) return ''
    return adminAuth.admin.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  })

  return {
    adminInitials,
  }
}
