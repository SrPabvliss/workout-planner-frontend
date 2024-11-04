<script setup lang="ts">
import { computed } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, Calendar } from 'lucide-vue-next'
import type { LocalPresetDay } from '../../interfaces/ILocalPresetExercise'

const props = defineProps<{
  days: LocalPresetDay[]
}>()

const totalExercises = computed(() =>
  props.days.reduce((acc, day) => acc + day.exercises.length, 0),
)

const getDayName = (dayNumber: number) => {
  const days = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ]
  return days[dayNumber - 1]
}
</script>

<template>
  <ScrollArea class="h-[calc(100vh-250px)]">
    <div class="space-y-6">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm">
          <Calendar class="h-4 w-4" />
          <span>{{ days.length }} días de entrenamiento</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <Dumbbell class="h-4 w-4" />
          <span>{{ totalExercises }} ejercicios en total</span>
        </div>
      </div>

      <div v-for="day in days" :key="day.dayOfWeek" class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-medium">{{ getDayName(day.dayOfWeek) }}</h4>
          <Badge variant="secondary"
            >{{ day.exercises.length }} ejercicios</Badge
          >
        </div>

        <div class="space-y-2">
          <div
            v-for="exercise in day.exercises"
            :key="exercise.exercise?.id"
            class="text-sm flex items-center justify-between rounded-lg border px-3 py-2"
          >
            <span>{{ exercise.exercise?.name }}</span>
            <span class="text-muted-foreground">
              {{ exercise.sets }}×{{ exercise.reps }}
            </span>
          </div>

          <div
            v-if="day.exercises.length === 0"
            class="text-sm text-muted-foreground text-center py-2"
          >
            Sin ejercicios
          </div>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
