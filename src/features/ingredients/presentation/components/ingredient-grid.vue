<template>
  <ScrollArea class="h-[calc(100vh-200px)]">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 p-4">
      <IngredientCard :isAddCard="true" @add="addIngredient" />
      <IngredientCard
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
        @click="editIngredient(ingredient.id)"
      />
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import router from '@/router'
import IngredientCard from './ingredient-card.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { IIngredient } from '../../interfaces/IIngredient'

defineProps({
  ingredients: {
    type: Array as () => IIngredient[],
    required: true,
  },
})

const addIngredient = () => {
  router.push({ name: 'nuevo-ingrediente' })
}

const editIngredient = (id: number) => {
  router.push({ name: 'editar-ingrediente', params: { id } })
}
</script>
