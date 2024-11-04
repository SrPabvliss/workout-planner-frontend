<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import NewEditForm from '../components/new-edit-form.vue'
import { PresetExerciseDataSourceImpl } from '../../services/datasource'
import type { IPresetExercise } from '../../interfaces/IPresetExercise'
import PresetExercisesBreadcrumb from '../components/preset-exercises-breadcrumb.vue'

const route = useRoute()
const presetId = Number(route.params.id)
const preset = ref<IPresetExercise | null>(null)
const presetValue = computed(() => preset.value)

const breadcrumbItems = ref([
  { label: 'Plantillas de ejercicios', href: 'plantillas-ejercicios' },
  { label: 'Editar', href: 'editar-plantilla-ejercicio', current: true },
])

const getCurrentPreset = async () => {
  const response =
    await PresetExerciseDataSourceImpl.getInstance().getById(presetId)
  preset.value = response
}

onMounted(() => {
  getCurrentPreset()
})
</script>

<template>
  <ContentLayout title="Editar plantilla">
    <template #content>
      <PresetExercisesBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm v-if="preset" :preset="presetValue as IPresetExercise" />
    </template>
  </ContentLayout>
</template>
