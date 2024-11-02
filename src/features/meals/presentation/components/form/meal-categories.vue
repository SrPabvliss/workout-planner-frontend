<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import MultiSelect from '@/components/ui/multi-select/MultiSelect.vue'
import { MEAL_CATEGORIES_CONFIG } from '@/features/meals/constants'

defineProps<{
  selectedCategories: number[]
  categoryOptions: { label: string; value: number }[]
  isLoadingCategories: boolean
  categoryError?: string
}>()

defineEmits<{
  'update:selectedCategories': [value: number[]]
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Categorías</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-2">
        <MultiSelect
          :model-value="selectedCategories"
          :options="categoryOptions"
          v-bind="MEAL_CATEGORIES_CONFIG"
          :placeholder="
            isLoadingCategories
              ? MEAL_CATEGORIES_CONFIG.placeholders.loading
              : MEAL_CATEGORIES_CONFIG.placeholders.default
          "
          :max-displayed-tags="2"
          @update:model-value="$emit('update:selectedCategories', $event)"
        />
        <span v-if="categoryError" class="text-sm text-red-500">
          {{ categoryError }}
        </span>
      </div>
    </CardContent>
  </Card>
</template>
