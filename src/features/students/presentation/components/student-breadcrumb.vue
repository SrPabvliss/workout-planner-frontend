<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-vue-next'

defineProps<{
  breadcrumbItems: {
    label: string
    href: string
  }[]
}>()
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem v-for="item in breadcrumbItems" :key="item.href">
        <BreadcrumbLink :href="item.href">
          {{ item.label }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <ChevronRight class="h-4 w-4 my-0 py-0" />
      <BreadcrumbSeparator aria-hidden="true">
        <BreadcrumbEllipsis />
      </BreadcrumbSeparator>
    </BreadcrumbList>
  </Breadcrumb>
</template>
