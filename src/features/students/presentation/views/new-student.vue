<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import NewEditForm from '../components/new-edit-form.vue'
import StudentBreadcrumb from '../components/student-breadcrumb.vue'
import { ref } from 'vue'

const breadcrumbItems = ref([
  { label: 'Todos los estudiantes', href: 'estudiantes' },
  { label: 'Nuevo', href: 'newStudent', current: true },
])
</script>

<template>
  <ContentLayout :title="'Agregar nuevo estudiante'">
    <template #content>
      <StudentBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm />
    </template>
  </ContentLayout>
</template>
