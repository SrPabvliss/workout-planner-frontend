<template>
  <Card
    @click="handleClick"
    class="cursor-pointer transition-all duration-200 hover:shadow-lg group relative overflow-hidden"
    :class="{
      'min-h-[11rem] border-dashed': isAddCard,
      'hover:bg-gray-50 dark:hover:bg-slate-800': isAddCard,
      'hover:scale-[1.02]': !isAddCard,
    }"
  >
    <CardHeader
      v-if="isAddCard"
      class="h-full flex flex-col items-center justify-center space-y-3"
    >
      <div class="bg-gray-100 dark:bg-gray-800 rounded-full p-4">
        <Plus class="h-8 w-8 text-gray-400" />
      </div>
      <CardTitle class="text-center text-gray-600 dark:text-gray-400">
        Agregar nueva comida
      </CardTitle>
    </CardHeader>

    <CardHeader v-else class="p-6">
      <div class="flex flex-col gap-4">
        <div>
          <CardTitle class="text-xl font-bold">
            {{ meal.name }}
          </CardTitle>
          <p class="text-sm text-muted-foreground mt-1 line-clamp-2">
            {{ meal.description }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <span class="text-sm text-muted-foreground">Calorías</span>
            <p class="font-medium">
              {{ meal.nutritionalInfo.calories ?? 0 }} kcal
            </p>
          </div>
          <div class="space-y-1">
            <span class="text-sm text-muted-foreground">Proteínas</span>
            <p class="font-medium">{{ meal.nutritionalInfo.protein ?? 0 }}g</p>
          </div>
          <div class="space-y-1">
            <span class="text-sm text-muted-foreground">Carbohidratos</span>
            <p class="font-medium">{{ meal.nutritionalInfo.carbs ?? 0 }}g</p>
          </div>
          <div class="space-y-1">
            <span class="text-sm text-muted-foreground">Grasas</span>
            <p class="font-medium">{{ meal.nutritionalInfo.fat ?? 0 }}g</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">Ingredientes:</span>
          <span class="text-sm font-medium">
            {{ meal.mealIngredients.length }}
          </span>
        </div>
      </div>
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-vue-next'
import type { IMeal } from '../../interfaces/IMeal'

const props = defineProps({
  meal: {
    type: Object as () => IMeal,
    default: null,
  },
  isAddCard: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['add'])

const handleClick = () => {
  if (props.isAddCard) {
    emit('add')
  }
}
</script>
