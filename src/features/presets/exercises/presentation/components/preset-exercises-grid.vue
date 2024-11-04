<template>
  <ScrollArea class="h-[calc(100vh-200px)]">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 p-4">
      <PresetExercisesCard :isAddCard="true" @add="addPreset" />
      <PresetExercisesCard
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
import type { IPresetExercise } from '../../interfaces/IPresetExercise'
import { ScrollArea } from '@/components/ui/scroll-area'
import PresetExercisesCard from './preset-exercises-card.vue'

defineProps({
  presets: {
    type: Array as () => IPresetExercise[],
    required: true,
  },
})

const addPreset = () => {
  router.push({ name: 'nueva-plantilla-ejercicio' })
}

const editPreset = (id: number) => {
  router.push({ name: 'editar-plantilla-ejercicio', params: { id } })
}
</script>
