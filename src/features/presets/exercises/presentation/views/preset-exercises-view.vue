<script setup lang="ts">
import { ref, computed } from 'vue'
import ContentLayout from '@/core/layout/content-layout.vue'
import PresetExercisesBreadcrumb from '../components/preset-exercises-breadcrumb.vue';
import PresetExercisesSearchBar from '../components/preset-exercises-search-bar.vue';
import PresetExercisesGrid from '../components/preset-exercises-grid.vue';
import { usePresetExercises } from '../../composable/use-preset-exercises-view';

const { presets, addPreset } = usePresetExercises()
const searchQuery = ref('')

const breadcrumbItems = ref([
  {
    label: 'Plantillas de ejercicios',
    href: 'preset-exercises',
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
  <ContentLayout title="Plantillas de Ejercicios">
    <template #content>
      <div class="space-y-4 mt-0 pt-0">
        <PresetExercisesBreadcrumb :breadcrumbItems="breadcrumbItems" />
        <PresetExercisesSearchBar v-model="searchQuery" @search="onSearch" />
        <PresetExercisesGrid :presets="filteredPresets" @addPreset="addPreset" />
      </div>
    </template>
  </ContentLayout>
</template>
