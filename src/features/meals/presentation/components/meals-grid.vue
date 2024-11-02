<template>
  <ScrollArea class="h-[calc(100vh-200px)]">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 p-4">
      <MealCard :isAddCard="true" @add="addMeal" />
      <MealCard
        v-for="meal in meals"
        :key="meal.id"
        :meal="meal"
        @click="editMeal(meal.id)"
      />
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import router from '@/router'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { IMeal } from '../../interfaces/IMeal'
import MealCard from './meal-card.vue';

defineProps({
  meals: {
    type: Array as () => IMeal[],
    required: true,
  },
})

const addMeal = () => {
  router.push({ name: 'nueva-comida' })
}

const editMeal = (id: number) => {
  router.push({ name: 'editar-comida', params: { id } })
}
</script>
