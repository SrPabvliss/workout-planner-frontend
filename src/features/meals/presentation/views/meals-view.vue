<script setup lang="ts">
import { ref, computed } from 'vue'
import ContentLayout from '@/core/layout/content-layout.vue'
import { useMeals } from '../../composable/use-meals-view'
import MealsSearchBar from '../components/meals-search-bar.vue'
import MealsGrid from '../components/meals-grid.vue'
import MealBreadcrumb from '../components/meal-breadcrumb.vue'

const { meals, addMeal } = useMeals()
const searchQuery = ref('')

const breadcrumbItems = ref([
  { label: 'Todas las comidas', href: 'comidas', current: true },
])

const filteredMeals = computed(() =>
  meals.value.filter(meal =>
    meal.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const onSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<template>
  <ContentLayout :title="'Comidas'">
    <template #content>
      <div class="space-y-4 mt-0 pt-0">
        <MealBreadcrumb :breadcrumbItems="breadcrumbItems" />
        <MealsSearchBar v-model="searchQuery" @search="onSearch" />
        <MealsGrid :meals="filteredMeals" @addMeal="addMeal" />
      </div>
    </template>
  </ContentLayout>
</template>
