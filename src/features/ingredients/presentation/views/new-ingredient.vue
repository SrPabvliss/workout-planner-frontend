<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import NewEditForm from '../components/new-edit-form.vue'
import IngredientBreadcrumb from '../components/ingredient-breadcrumb.vue'
import { ref } from 'vue'

const breadcrumbItems = ref([
  { label: 'Todos los ingredientes', href: 'ingredientes' },
  { label: 'Nuevo', href: 'newIngredient', current: true },
])
</script>

<template>
  <ContentLayout :title="'Agregar nuevo ingrediente'">
    <template #content>
      <IngredientBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm />
    </template>
  </ContentLayout>
</template>
