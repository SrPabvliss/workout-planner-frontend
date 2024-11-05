<template>
  <Card
    @click="handleClick"
    class="cursor-pointer transition-all duration-200 hover:shadow-lg group relative overflow-hidden"
    :class="{
      'min-h-[11rem] border-dashed': isAddCard,
      'hover:bg-gray-50 dark:hover:bg-slate-800': isAddCard,
      'hover:scale-[1.02]': !isAddCard,
    }"
  >
    <CardHeader
      v-if="isAddCard"
      class="h-full flex flex-col items-center justify-center space-y-3"
    >
      <div class="bg-gray-100 dark:bg-gray-800 rounded-full p-4">
        <Plus class="h-8 w-8 text-gray-400" />
      </div>
      <CardTitle class="text-center text-gray-600 dark:text-gray-400">
        Crear nueva plantilla
      </CardTitle>
    </CardHeader>

    <CardHeader v-else class="p-6">
      <div class="flex flex-col space-y-4">
        <div>
          <CardTitle class="text-2xl font-bold">
            {{ preset.name }}
          </CardTitle>
          <CardDescription class="text-base mt-1">
            {{ preset.description }}
          </CardDescription>
        </div>

        <div class="space-y-3">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar class="h-4 w-4 shrink-0" />
            <span>{{ preset.days.length }} días</span>
          </div>

          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <UtensilsCrossed class="h-4 w-4 shrink-0" />
            <span> {{ getTotalMeals() }} comidas en total </span>
          </div>
        </div>

        <div class="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <Clock class="h-4 w-4 shrink-0" />
          <span>Creado {{ formatDate(preset.createdAt) }}</span>
        </div>
      </div>
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Plus, Calendar, UtensilsCrossed, Clock } from 'lucide-vue-next'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { IPresetMeal } from '../../interfaces/IPresetMeals'

const props = defineProps({
  preset: {
    type: Object as () => IPresetMeal,
    default: null,
  },
  isAddCard: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['add'])

const handleClick = () => {
  if (props.isAddCard) {
    emit('add')
  }
}

const getTotalMeals = () => {
  if (!props.preset) return 0
  return props.preset.days.reduce((total, day) => total + day.meals.length, 0)
}

const formatDate = (date: Date) => {
  return format(date, "d 'de' MMMM, yyyy", { locale: es })
}
</script>
