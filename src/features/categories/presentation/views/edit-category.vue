<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useRoute } from 'vue-router'
import CategoryBreadcrumb from '../components/categories-breadcrumb.vue'
import { ref, onMounted, computed } from 'vue'
import { CategoryDataSourceImpl } from '../../services/datasource'
import { CategoryType, type ICategory } from '../../interfaces/ICategory'
import NewEditForm from '../components/new-edit-form.vue'

const route = useRoute()
const categoryId = Number(route.params.id)
const category = ref<ICategory | null>(null)
const categoryValue = computed(() => category.value)

const breadcrumbItems = computed(() => {
  const baseRoute =
    category.value?.type === CategoryType.MEAL
      ? 'categorias-alimentacion'
      : 'categorias-ejercicios'
  const baseLabel =
    category.value?.type === CategoryType.MEAL
      ? 'Categorías de Alimentación'
      : 'Categorías de Ejercicios'

  return [
    { label: baseLabel, href: baseRoute },
    { label: 'Editar', href: 'editCategory', current: true },
  ]
})

const getCurrentCategory = async () => {
  const response =
    await CategoryDataSourceImpl.getInstance().getById(categoryId)
  category.value = response
}

onMounted(() => {
  getCurrentCategory()
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
