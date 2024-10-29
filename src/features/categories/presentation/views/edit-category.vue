<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import CategoryBreadcrumb from '../components/categories-breadcrumb.vue'
import { onMounted } from 'vue'
import { type ICategory } from '../../interfaces/ICategory'
import NewEditForm from '../components/new-edit-form.vue'
import { useEditCategory } from '../../composable/use-edit-category'

const { category, categoryValue, breadcrumbItems, loadCategory } =
  useEditCategory()

onMounted(() => {
  loadCategory()
})
</script>

<template>
  <ContentLayout title="Editar categoría">
    <template #content>
      <CategoryBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm
        v-if="category"
        :category="categoryValue as ICategory"
        :category-type="category.type"
      />
    </template>
  </ContentLayout>
</template>
