<template>
  <ScrollArea class="h-[calc(100vh-200px)]">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 p-4">
      <CategoryCard :isAddCard="true" @add="addCategory" />
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @click="editCategory(category.id)"
      />
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import router from '@/router'
import type { ICategory } from '../../interfaces/ICategory'
import { ScrollArea } from '@/components/ui/scroll-area'
import CategoryCard from './category-card.vue'
import { computed } from 'vue'

const props = defineProps({
  categories: {
    type: Array as () => ICategory[],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

const routeNames = computed(() => ({
  new: props.type === 'EXERCISE' ? 'newExerciseCategory' : 'newMealCategory',
  edit: props.type === 'EXERCISE' ? 'editExerciseCategory' : 'editMealCategory',
}))

const addCategory = () => {
  router.push({ name: routeNames.value.new })
}

const editCategory = (id: number) => {
  router.push({ name: routeNames.value.edit, params: { id } })
}
</script>
