<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
  nutritionalInfo: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Información Nutricional</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <span class="text-sm text-muted-foreground">Calorías</span>
            <p class="text-2xl font-bold">
              {{ Math.round(nutritionalInfo.calories) }}
            </p>
          </div>
          <div class="space-y-1">
            <span class="text-sm text-muted-foreground">Proteínas</span>
            <p class="text-2xl font-bold">
              {{ nutritionalInfo.protein.toFixed(1) }}g
            </p>
          </div>
          <div class="space-y-1">
            <span class="text-sm text-muted-foreground">Carbohidratos</span>
            <p class="text-2xl font-bold">
              {{ nutritionalInfo.carbs.toFixed(1) }}g
            </p>
          </div>
          <div class="space-y-1">
            <span class="text-sm text-muted-foreground">Grasas</span>
            <p class="text-2xl font-bold">
              {{ nutritionalInfo.fat.toFixed(1) }}g
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
