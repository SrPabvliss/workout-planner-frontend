<script setup lang="ts">
import type { IExercise } from '../../interfaces/IExercise'
import ExerciseCard from './exercise-card.vue'

defineProps<{
  exercises: IExercise[]
}>()

const emit = defineEmits<{
  (e: 'addExercise'): void
}>()
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <ExerciseCard isAddCard @click="emit('addExercise')" />
    <ExerciseCard
      v-for="exercise in exercises"
      :key="exercise.id"
      :exercise="exercise"
    />
  </div>
</template>
