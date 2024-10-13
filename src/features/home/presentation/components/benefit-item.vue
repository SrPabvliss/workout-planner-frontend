<script setup lang="ts">
import { IBenefit } from '../../interfaces/IBenefit'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

defineProps<{
  benefits: IBenefit[]
  iconSize: number
  iconStrokeWidth: number
}>()
</script>

<template>
  <Card
    v-for="benefit in benefits"
    :key="benefit.title"
    class="bg-gray-100 rounded-lg p-6 shadow border-slate-200 text-center"
  >
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
  </Card>
</template>
