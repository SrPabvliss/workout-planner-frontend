<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import CategoryBreadcrumb from '../components/categories-breadcrumb.vue'
import { ref } from 'vue'
import NewEditForm from '../components/new-edit-form.vue'
import { CategoryType } from '../../interfaces/ICategory'

const breadcrumbItems = ref([
  { label: 'Categorías de Ejercicios', href: 'categorias-ejercicios' },
  { label: 'Nueva', href: 'newCategory', current: true },
])
</script>

<template>
  <ContentLayout title="Agregar nueva categoría de ejercicio">
    <template #content>
      <CategoryBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm :category-type="CategoryType.EXERCISE" />
    </template>
  </ContentLayout>
</template>
