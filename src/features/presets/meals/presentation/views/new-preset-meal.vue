<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import NewEditForm from '../components/new-edit-form.vue'
import PresetMealsBreadcrumb from '../components/preset-meals-breadcrumb.vue'
import { ref } from 'vue'

const breadcrumbItems = ref([
  { label: 'Plantillas de comidas', href: 'plantillas-alimentacion' },
  {
    label: 'Nueva plantilla',
    href: 'nueva-plantilla-alimentacion',
    current: true,
  },
])
</script>

<template>
  <ContentLayout title="Crear nueva plantilla de comidas">
    <template #content>
      <PresetMealsBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm />
    </template>
  </ContentLayout>
</template>