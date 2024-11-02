<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useRoute } from 'vue-router'
import IngredientBreadcrumb from '../components/ingredient-breadcrumb.vue'
import { ref, onMounted, computed } from 'vue'
import NewEditForm from '../components/new-edit-form.vue'
import type { IIngredient } from '../../interfaces/IIngredient'
import { IngredientDataSourceImpl } from '../../services/ingredient-datasource'

const route = useRoute()
const ingredientId = Number(route.params.id)
const ingredient = ref<IIngredient | null>(null)
const ingredientValue = computed(() => ingredient.value)

const breadcrumbItems = ref([
  { label: 'Todos los ingredientes', href: 'ingredientes' },
  { label: 'Editar', href: 'editIngredient', current: true },
])

const getCurrentIngredient = async () => {
  const response =
    await IngredientDataSourceImpl.getInstance().getById(ingredientId)
  ingredient.value = response
}

onMounted(() => {
  getCurrentIngredient()
})
</script>

<template>
  <ContentLayout :title="'Editar ingrediente'">
    <template #content>
      <IngredientBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm
        v-if="ingredient"
        :ingredient="ingredientValue as IIngredient"
      />
    </template>
  </ContentLayout>
</template>
