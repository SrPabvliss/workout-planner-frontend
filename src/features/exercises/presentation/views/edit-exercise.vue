<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useRoute } from 'vue-router'
import ExerciseBreadcrumb from '../components/exercise-breadcrumb.vue'
import { ref, onMounted, computed } from 'vue'
import NewEditForm from '../components/form/new-edit-form.vue'
import { ExerciseDataSourceImpl } from '../../services/exercise-datasource'
import type { IExercise } from '../../interfaces/IExercise'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()
const exerciseId = Number(route.params.id)
const exercise = ref<IExercise | null>(null)
const isLoading = ref(true)
const exerciseValue = computed(() => exercise.value)

const breadcrumbItems = ref([
  { label: 'Todos los ejercicios', href: 'ejercicios' },
  { label: 'Editar', href: 'editar-ejercicio', current: true },
])

const getCurrentExercise = async () => {
  try {
    isLoading.value = true
    const response =
      await ExerciseDataSourceImpl.getInstance().getById(exerciseId)
    exercise.value = response
  } catch (error) {
    console.error('Error fetching exercise:', error)
    toast.error('Error al cargar el ejercicio')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getCurrentExercise()
})
</script>

<template>
  <ContentLayout :title="'Editar ejercicio'">
    <template #content>
      <ExerciseBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        ></div>
      </div>
      <div v-else-if="!exercise" class="text-center py-8">
        <p class="text-gray-500">No se encontró el ejercicio</p>
      </div>
      <NewEditForm v-else :exercise="exerciseValue as IExercise" />
    </template>
  </ContentLayout>
</template>
