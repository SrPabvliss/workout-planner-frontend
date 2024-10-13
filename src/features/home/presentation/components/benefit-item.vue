<script setup lang="ts">
import { IBenefit } from '../../interfaces/IBenefit'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'

defineProps<{
  benefit: IBenefit
  iconSize: number
  iconStrokeWidth: number
}>()
</script>

<template>
  <div class="flex items-center justify-center mb-4">
    <component
      :is="benefit.icon"
      class="text-[#5d87ff]"
      :size="iconSize"
      :stroke-width="iconStrokeWidth"
    />
  </div>
  <CardHeader>
    <CardTitle class="text-xl font-semibold text-gray-900">
      {{ benefit.title }}
    </CardTitle>
  </CardHeader>

  <CardContent>
    <p>{{ benefit.description }}</p>
  </CardContent>
</template>
