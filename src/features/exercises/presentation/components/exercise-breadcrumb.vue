<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import router from '@/router'
import { ChevronRight } from 'lucide-vue-next'

defineProps<{
  breadcrumbItems: {
    label: string
    href: string
    current?: boolean
  }[]
}>()

const handleNavigation = (href: string, current?: boolean) => {
  if (current) return

  router.push({
    name: href,
    params: { role: router.currentRoute.value.params.role },
  })
}
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem v-for="item in breadcrumbItems" :key="item.href">
        <BreadcrumbLink
          :class="{ 'cursor-default': item.current }"
          @click="handleNavigation(item.href, item.current)"
        >
          {{ item.label }}
        </BreadcrumbLink>
        <ChevronRight v-if="!item.current" class="h-4 w-4 my-0 py-0" />
      </BreadcrumbItem>
      <BreadcrumbSeparator v-if="breadcrumbItems.length > 1" aria-hidden="true">
        <BreadcrumbEllipsis />
      </BreadcrumbSeparator>
    </BreadcrumbList>
  </Breadcrumb>
</template>
