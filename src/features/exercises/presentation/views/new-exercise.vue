<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import NewEditForm from '../components/form/new-edit-form.vue'
import ExerciseBreadcrumb from '../components/exercise-breadcrumb.vue'
import { ref } from 'vue'

const breadcrumbItems = ref([
  { label: 'Todos los ejercicios', href: 'ejercicios' },
  { label: 'Nuevo', href: 'nuevo-ejercicio', current: true },
])
</script>

<template>
  <ContentLayout :title="'Agregar nuevo ejercicio'">
    <template #content>
      <ExerciseBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm />
    </template>
  </ContentLayout>
</template>
