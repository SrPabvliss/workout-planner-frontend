<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { Label } from '@/components/ui/label'
import MultiSelect from '@/components/ui/multi-select/MultiSelect.vue'
import { CATEGORIES_CONFIG } from '@/features/exercises/constants'

defineProps<{
  selectedCategories: number[]
  categoryOptions: { label: string; value: number; icon?: any }[]
  isLoadingCategories: boolean
  categoryError?: string
}>()

defineEmits<{
  'update:selectedCategories': [value: number[]]
}>()
</script>

<template>
  <div class="space-y-2">
    <Label>Categorías</Label>
    <MultiSelect
      :model-value="selectedCategories"
      :options="categoryOptions"
      v-bind="CATEGORIES_CONFIG"
      :placeholder="
        isLoadingCategories
          ? CATEGORIES_CONFIG.placeholders.loading
          : CATEGORIES_CONFIG.placeholders.default
      "
      @update:model-value="$emit('update:selectedCategories', $event)"
    />
    <span v-if="categoryError" class="text-sm text-red-500">
      {{ categoryError }}
    </span>
  </div>
</template>
