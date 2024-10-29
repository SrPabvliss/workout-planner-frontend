<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

withDefaults(
  defineProps<{
    color: string
    customClass?: string
  }>(),
  {
    customClass: '',
  },
)
</script>

<template>
  <Card :class="customClass">
    <CardHeader>
      <CardTitle>Vista Previa</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div
          class="p-6 rounded-lg transition-colors"
          :style="{
            backgroundColor: `${color}20`,
            borderLeft: `4px solid ${color}`,
          }"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-4 h-4 rounded-full"
              :style="{ backgroundColor: color }"
            />
            <span class="font-medium">Ejemplo de categoría</span>
          </div>
          <p class="mt-2 text-sm">
            Así es como se verá tu categoría en el listado
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
