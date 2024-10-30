<script setup lang="ts">
import { ref, computed } from 'vue'
import ContentLayout from '@/core/layout/content-layout.vue'
import ExerciseGrid from '../components/exercise-grid.vue'
import { useExercises } from '../../composable/use-exercises-view'
import ExerciseBreadcrumb from '../components/exercise-breadcrumb.vue';
import ExercisesSearchBar from '../components/exercise-search-bar.vue';

const { exercises, addExercise } = useExercises()
const searchQuery = ref('')

const breadcrumbItems = ref([
  { label: 'Ejercicios', href: 'ejercicios', current: true },
])

const filteredExercises = computed(() =>
  exercises.value.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const onSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<template>
  <ContentLayout title="Ejercicios">
    <template #content>
      <div class="space-y-4 mt-0 pt-0">
        <ExerciseBreadcrumb :breadcrumbItems="breadcrumbItems" />
        <ExercisesSearchBar v-model="searchQuery" @search="onSearch" />
        <ExerciseGrid
          :exercises="filteredExercises"
          @addExercise="addExercise"
        />
      </div>
    </template>
  </ContentLayout>
</template>
