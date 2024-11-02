<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import NewEditForm from '../components/form/new-edit-form.vue'
import MealBreadcrumb from '../components/meal-breadcrumb.vue'
import { ref } from 'vue'

const breadcrumbItems = ref([
  { label: 'Todas las comidas', href: 'comidas' },
  { label: 'Nueva', href: 'newMeal', current: true },
])
</script>

<template>
  <ContentLayout :title="'Agregar nueva comida'">
    <template #content>
      <MealBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm />
    </template>
  </ContentLayout>
</template>
