<script setup lang="ts">
import { ref, computed } from 'vue'
import type {
  LocalPresetDay,
  LocalPresetDayExercise,
} from '../../interfaces/ILocalPresetExercise'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dumbbell, GripVertical, X } from 'lucide-vue-next'
import { useExercises } from '@/features/exercises/composable/use-exercises-view'
import { useSortable } from '@vueuse/integrations/useSortable'
import MultiSelect from '@/components/ui/multi-select/MultiSelect.vue'

const props = defineProps<{
  day: LocalPresetDay
}>()

const emit = defineEmits<{
  'update:exercises': [updates: LocalPresetDayExercise[]]
}>()

const { exercises } = useExercises()
const exercisesList = ref<HTMLElement>()

const exerciseOptions = computed(() =>
  exercises.value.map(exercise => ({
    label: exercise.name,
    value: exercise.id.toString(),
    description: exercise.description,
  })),
)

const localExercises = ref<LocalPresetDayExercise[]>(
  props.day.exercises.map(exercise => ({
    exerciseId: exercise.exerciseId,
    sets: exercise.sets,
    reps: exercise.reps,
    order: exercise.order,
    exercise: exercise.exercise,
  })),
)

useSortable(exercisesList, localExercises.value, {
  handle: '.handle',
  animation: 150,
  onUpdate: (e: { oldIndex?: number; newIndex?: number }) => {
    const { oldIndex, newIndex } = e
    if (oldIndex !== undefined && newIndex !== undefined) {
      const item = localExercises.value.splice(oldIndex, 1)[0]
      localExercises.value.splice(newIndex, 0, item)
      updateOrder()
    }
  },
})

const updateOrder = () => {
  const updatedExercises = localExercises.value.map((exercise, index) => ({
    ...exercise,
    order: index + 1,
  }))
  localExercises.value = updatedExercises
  emit('update:exercises', localExercises.value)
}

const addExercise = (selectedIds: string[]) => {
  const newExercises: LocalPresetDayExercise[] = selectedIds.map(id => {
    const exercise = exercises.value.find(e => e.id === parseInt(id))!
    return {
      exerciseId: exercise.id,
      sets: 3,
      reps: 12,
      order: localExercises.value.length + 1,
      exercise,
    }
  })

  localExercises.value = [...localExercises.value, ...newExercises]
  emit('update:exercises', localExercises.value)
}

const removeExercise = (index: number) => {
  localExercises.value.splice(index, 1)
  updateOrder()
}

const updateSetsReps = (
  exercise: LocalPresetDayExercise,
  field: 'sets' | 'reps',
  value: string,
) => {
  const numValue = parseInt(value)
  if (!isNaN(numValue) && numValue > 0) {
    const updatedExercises = localExercises.value.map(ex =>
      ex.exerciseId === exercise.exerciseId ? { ...ex, [field]: numValue } : ex,
    )
    localExercises.value = updatedExercises
    emit('update:exercises', updatedExercises)
  }
}
</script>

<template>
  <Card class="border-0 shadow-none">
    <CardContent class="p-0">
      <div class="mb-4">
        <MultiSelect
          :options="exerciseOptions"
          @update:model-value="addExercise"
          title="Agregar ejercicios"
          placeholder="Buscar ejercicios..."
        />
      </div>

      <div ref="exercisesList">
        <div
          v-for="(exercise, index) in localExercises"
          :key="exercise.exerciseId"
          class="group relative flex items-center gap-4 rounded-lg border p-4 mb-2 bg-white dark:bg-slate-950"
        >
          <div class="handle cursor-move">
            <GripVertical class="h-5 w-5 text-muted-foreground" />
          </div>

          <div class="flex-1 space-y-1">
            <div class="flex items-center gap-2">
              <Dumbbell class="h-4 w-4" />
              <span class="font-medium">{{ exercise.exercise?.name }}</span>
            </div>
            <p class="text-sm text-muted-foreground line-clamp-1">
              {{ exercise.exercise?.description }}
            </p>
          </div>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <Input
                type="number"
                class="w-16"
                :model-value="exercise.sets.toString()"
                @update:model-value="
                  value => updateSetsReps(exercise, 'sets', value.toString())
                "
                min="1"
              />
              <span class="text-sm text-muted-foreground">series</span>
            </div>
            <div class="flex items-center gap-2">
              <Input
                type="number"
                class="w-16"
                :model-value="exercise.reps.toString()"
                @update:model-value="
                  value => updateSetsReps(exercise, 'reps', value.toString())
                "
                min="1"
              />
              <span class="text-sm text-muted-foreground">reps</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            class="opacity-0 group-hover:opacity-100 transition-opacity"
            @click="removeExercise(index)"
          >
            <X class="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        v-if="localExercises.length === 0"
        class="text-center py-8 text-muted-foreground"
      >
        <p>No hay ejercicios agregados para este día</p>
        <p class="text-sm">Usa el selector de arriba para agregar ejercicios</p>
      </div>
    </CardContent>
  </Card>
</template>
