<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Star, X } from 'lucide-vue-next'

defineProps<{
  src: string
  isMain: boolean
}>()

defineEmits<{
  remove: []
  toggleMain: []
}>()
</script>

<template>
  <div class="relative group">
    <img :src="src" alt="Preview" class="w-full h-48 object-cover rounded-lg" />
    <div
      class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
    >
      <Button
        variant="ghost"
        size="icon"
        class="text-white hover:text-yellow-400"
        :class="{ 'text-yellow-400': isMain }"
        @click="$emit('toggleMain')"
      >
        <Star />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        class="text-white hover:text-red-400"
        @click="$emit('remove')"
      >
        <X />
      </Button>
    </div>
  </div>
</template>
