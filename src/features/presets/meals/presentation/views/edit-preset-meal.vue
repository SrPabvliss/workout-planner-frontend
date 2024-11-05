<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useRoute } from 'vue-router'
import PresetMealsBreadcrumb from '../components/preset-meals-breadcrumb.vue'
import { ref, onMounted, computed } from 'vue'
import NewEditForm from '../components/new-edit-form.vue'
import { PresetMealDataSourceImpl } from '../../services/datasource'
import type { IPresetMeal } from '../../interfaces/IPresetMeals'

const route = useRoute()
const presetId = Number(route.params.id)
const preset = ref<IPresetMeal | null>(null)
const presetValue = computed(() => preset.value)

const breadcrumbItems = ref([
  { label: 'Plantillas de comidas', href: 'plantillas-alimentacion' },
  {
    label: 'Editar plantilla',
    href: 'editar-plantilla-alimentacion',
    current: true,
  },
])

const getCurrentPreset = async () => {
  const response =
    await PresetMealDataSourceImpl.getInstance().getById(presetId)
  preset.value = response
}

onMounted(() => {
  getCurrentPreset()
})
</script>

<template>
  <ContentLayout title="Editar plantilla de comidas">
    <template #content>
      <PresetMealsBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm v-if="preset" :preset="presetValue as IPresetMeal" />
    </template>
  </ContentLayout>
</template>
