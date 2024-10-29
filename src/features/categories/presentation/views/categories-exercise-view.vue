<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCategories } from '../../composable/use-categories-view'
import CategoriesSearchBar from '../components/categories-search-bar.vue'
import CategoryGrid from '../components/categories-grid.vue'
import ContentLayout from '@/core/layout/content-layout.vue'
import CategoryBreadcrumb from '../components/categories-breadcrumb.vue'
import { CategoryType } from '../../interfaces/ICategory'

const { categories } = useCategories(CategoryType.EXERCISE)
const searchQuery = ref('')

const breadcrumbItems = ref([
  {
    label: 'Categorías de ejercicios',
    href: 'categorias-ejercicios',
    current: true,
  },
])

const filteredCategories = computed(() =>
  categories.value.filter(category =>
    category.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const onSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<template>
  <ContentLayout title="Categorías de Ejercicios">
    <template #content>
      <div class="space-y-4 mt-0 pt-0">
        <CategoryBreadcrumb :breadcrumbItems="breadcrumbItems" />
        <CategoriesSearchBar
          v-model="searchQuery"
          @search="onSearch"
          :type="CategoryType.EXERCISE"
        />
        <CategoryGrid
          :categories="filteredCategories"
          :type="CategoryType.EXERCISE"
        />
      </div>
    </template>
  </ContentLayout>
</template>
