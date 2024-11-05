<script setup lang="ts">
import { ref, computed } from 'vue'
import type {
  LocalPresetMealDay,
  LocalPresetDayMeal,
} from '../../interfaces/ILocalPresetMeal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UtensilsCrossed, GripVertical, X } from 'lucide-vue-next'
import { useMeals } from '@/features/meals/composable/use-meals-view'
import { useSortable } from '@vueuse/integrations/useSortable'
import MultiSelect from '@/components/ui/multi-select/MultiSelect.vue'

const props = defineProps<{
  day: LocalPresetMealDay
}>()

const emit = defineEmits<{
  'update:meals': [updates: LocalPresetDayMeal[]]
}>()

const { meals } = useMeals()
const mealsList = ref<HTMLElement>()

const mealOptions = computed(() =>
  meals.value.map(meal => ({
    label: meal.name,
    value: meal.id.toString(),
    description: meal.description,
  })),
)

const localMeals = ref<LocalPresetDayMeal[]>(
  props.day.meals.map(meal => ({
    mealId: meal.mealId,
    order: meal.order,
    meal: meal.meal,
  })),
)

useSortable(mealsList, localMeals.value, {
  handle: '.handle',
  animation: 150,
  onUpdate: (e: { oldIndex?: number; newIndex?: number }) => {
    const { oldIndex, newIndex } = e
    if (oldIndex !== undefined && newIndex !== undefined) {
      const item = localMeals.value.splice(oldIndex, 1)[0]
      localMeals.value.splice(newIndex, 0, item)
      updateOrder()
    }
  },
})

const updateOrder = () => {
  const updatedMeals = localMeals.value.map((meal, index) => ({
    ...meal,
    order: index + 1,
  }))
  localMeals.value = updatedMeals
  emit('update:meals', localMeals.value)
}

const addMeal = (selectedIds: string[]) => {
  const newMeals: LocalPresetDayMeal[] = selectedIds.map(id => {
    const meal = meals.value.find(m => m.id === parseInt(id))!
    return {
      mealId: meal.id,
      order: localMeals.value.length + 1,
      meal,
    }
  })

  localMeals.value = [...localMeals.value, ...newMeals]
  emit('update:meals', localMeals.value)
}

const removeMeal = (index: number) => {
  localMeals.value.splice(index, 1)
  updateOrder()
}
</script>

<template>
  <Card class="border-0 shadow-none">
    <CardContent class="p-0">
      <div class="mb-4">
        <MultiSelect
          :options="mealOptions"
          @update:model-value="addMeal"
          title="Agregar comidas"
          placeholder="Buscar comidas..."
        />
      </div>

      <div ref="mealsList">
        <div
          v-for="(meal, index) in localMeals"
          :key="meal.mealId"
          class="group relative flex items-center gap-4 rounded-lg border p-4 mb-2 bg-white dark:bg-slate-950"
        >
          <div class="handle cursor-move">
            <GripVertical class="h-5 w-5 text-muted-foreground" />
          </div>

          <div class="flex-1 space-y-1">
            <div class="flex items-center gap-2">
              <UtensilsCrossed class="h-4 w-4" />
              <span class="font-medium">{{ meal.meal?.name }}</span>
            </div>
            <p class="text-sm text-muted-foreground line-clamp-1">
              {{ meal.meal?.description }}
            </p>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{{ meal.meal?.nutritionalInfo?.calories }} kcal</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            class="opacity-0 group-hover:opacity-100 transition-opacity"
            @click="removeMeal(index)"
          >
            <X class="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        v-if="localMeals.length === 0"
        class="text-center py-8 text-muted-foreground"
      >
        <p>No hay comidas agregadas para este día</p>
        <p class="text-sm">Usa el selector de arriba para agregar comidas</p>
      </div>
    </CardContent>
  </Card>
</template>
