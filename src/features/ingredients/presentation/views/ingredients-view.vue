<script setup lang="ts">
import { ref, computed } from 'vue'
import ContentLayout from '@/core/layout/content-layout.vue'
import { useIngredients } from '../../composable/use-ingredients'
import IngredientBreadcrumb from '../components/ingredient-breadcrumb.vue';
import IngredientSearchBar from '../components/ingredient-search-bar.vue';
import IngredientGrid from '../components/ingredient-grid.vue';

const { ingredients, addIngredient } = useIngredients()
const searchQuery = ref('')

const breadcrumbItems = ref([
  { label: 'Todos los ingredientes', href: 'ingredientes', current: true },
])

const filteredIngredients = computed(() =>
  ingredients.value.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const onSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<template>
  <ContentLayout :title="'Ingredientes'">
    <template #content>
      <div class="space-y-4 mt-0 pt-0">
        <IngredientBreadcrumb :breadcrumbItems="breadcrumbItems" />
        <IngredientSearchBar v-model="searchQuery" @search="onSearch" />
        <IngredientGrid
          :ingredients="filteredIngredients"
          @addIngredient="addIngredient"
        />
      </div>
    </template>
  </ContentLayout>
</template>
