<script setup lang="ts">
import { ref, computed } from 'vue'
import ContentLayout from '@/core/layout/content-layout.vue'
import { usePresetMeals } from '../../composable/use-preset-meals-view'
import PresetMealsBreadcrumb from '../components/preset-meals-breadcrumb.vue'
import PresetMealsSearchBar from '../components/preset-meals-search-bar.vue'
import PresetMealGrid from '../components/preset-meal-grid.vue'

const { presets, addPreset } = usePresetMeals()
const searchQuery = ref('')

const breadcrumbItems = ref([
  {
    label: 'Plantillas de comidas',
    href: 'preset-meals',
    current: true,
  },
])

const filteredPresets = computed(() =>
  presets.value.filter(preset =>
    preset.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const onSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<template>
  <ContentLayout title="Plantillas de Comidas">
    <template #content>
      <div class="space-y-4 mt-0 pt-0">
        <PresetMealsBreadcrumb :breadcrumbItems="breadcrumbItems" />
        <PresetMealsSearchBar v-model="searchQuery" @search="onSearch" />
        <PresetMealGrid :presets="filteredPresets" @addPreset="addPreset" />
      </div>
    </template>
  </ContentLayout>
</template>
