<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import type { IPresetMeal } from '../../interfaces/IPresetMeals'
import MealDayCard from './meal-day-card.vue'
import { usePresetMealForm } from '../../composable/use-student-form'

const props = defineProps<{
  preset?: IPresetMeal | null
}>()

const { schema, onSubmit, defaultValues, days, updateMeals, addDay } =
  usePresetMealForm(props.preset)
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
                <MealDayCard
                  :day="day"
                  @update:meals="updates => updateMeals(dayIndex, updates)"
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
