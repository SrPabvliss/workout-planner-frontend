<script setup lang="ts">
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { Separator } from '@/components/ui/separator'
import ModeToggle from './mode-toggle.vue'
import UserNav from './user-nav.vue'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex items-center px-4 py-2">
    <h1 class="text-xl font-bold">{{ title }}</h1>
    <div class="ml-auto">
      <div class="flex flex-1 items-center justify-end">
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  </div>
  <Separator />
  <ScrollArea class="h-screen flex p-4">
    <slot name="content">
      <p>Content</p>
    </slot>
  </ScrollArea>
</template>
