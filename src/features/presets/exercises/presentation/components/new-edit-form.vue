<script setup lang="ts">
import type { IPresetExercise } from '../../interfaces/IPresetExercise'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'

import { usePresetExerciseForm } from '../../composable/use-preset-exercise-form'
import ExerciseDayCard from './exercise-day-card.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'

const props = defineProps<{
  preset?: IPresetExercise | null
}>()

const { schema, onSubmit, defaultValues, days, updateExercises, addDay } =
  usePresetExerciseForm(props.preset)
</script>

<template>
  <Card>
    <CardContent>
      <AutoForm
        @submit="onSubmit"
        :schema="schema"
        :initial-values="defaultValues"
        class="mt-6"
        :field-config="{
          description: {
            label: 'Descripción',
            component: 'textarea',
          },
          name: {
            label: 'Nombre de la plantilla',
          },
        }"
      >
        <Button
          @click="addDay"
          @click.prevent
          :disabled="days.length >= 7"
          class="my-4 text-white"
          >Agregar día</Button
        >
        <ScrollArea class="h-[calc(100vh-500px)]">
          <div v-for="(day, dayIndex) in days" :key="day.dayOfWeek">
            <Card class="mb-4">
              <CardContent>
                <h1 class="text-md font-semibold mb-2 mt-4">
                  Día {{ dayIndex + 1 }}
                </h1>
                <ExerciseDayCard
                  :day="day"
                  @update:exercises="
                    updates => updateExercises(dayIndex, updates)
                  "
                />
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <Button type="submit">Guardar Plantilla</Button>
      </AutoForm>
    </CardContent>
  </Card>
</template>
