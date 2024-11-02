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

const handleNavigaion = (href: string, current?: boolean) => {
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
        <BreadcrumbLink @click="handleNavigaion(item.href, item.current)">
          {{ item.label }}
        </BreadcrumbLink>
        <ChevronRight class="h-4 w-4 my-0 py-0" />
      </BreadcrumbItem>
      <BreadcrumbSeparator aria-hidden="true">
        <BreadcrumbEllipsis />
      </BreadcrumbSeparator>
    </BreadcrumbList>
  </Breadcrumb>
</template>
