<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import NewEditForm from '../components/new-edit-form.vue'
import { ref } from 'vue'
import PresetExercisesBreadcrumb from '../components/preset-exercises-breadcrumb.vue';

const breadcrumbItems = ref([
  { label: 'Plantillas de ejercicios', href: 'plantillas-ejercicios' },
  { label: 'Nueva', href: 'nueva-plantilla-ejercicio', current: true },
])
</script>

<template>
  <ContentLayout title="Crear nueva plantilla">
    <template #content>
      <PresetExercisesBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm />
    </template>
  </ContentLayout>
</template>
