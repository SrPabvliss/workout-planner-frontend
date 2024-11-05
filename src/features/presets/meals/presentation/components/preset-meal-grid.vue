<template>
  <ScrollArea class="h-[calc(100vh-200px)]">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 p-4">
      <PresetMealCard :isAddCard="true" @add="addPreset" />
      <PresetMealCard
        v-for="preset in presets"
        :key="preset.id"
        :preset="preset"
        @click="editPreset(preset.id)"
      />
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import router from '@/router'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { IPresetMeal } from '../../interfaces/IPresetMeals'
import PresetMealCard from './preset-meal-card.vue'

defineProps({
  presets: {
    type: Array as () => IPresetMeal[],
    required: true,
  },
})

const emit = defineEmits(['addPreset'])

const addPreset = () => {
  emit('addPreset')
  router.push({ name: 'nueva-plantilla-alimentacion' })
}

const editPreset = (id: number) => {
  router.push({ name: 'editar-plantilla-alimentacion', params: { id } })
}
</script>
