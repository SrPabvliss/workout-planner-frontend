<template>
  <Card
    @click="handleClick"
    class="cursor-pointer transition-all duration-200 hover:shadow-lg overflow-hidden relative h-[140px]"
    :class="{
      'hover:bg-gray-50 dark:hover:bg-slate-800': isAddCard,
      'hover:scale-[1.02]': !isAddCard,
      'border-dashed': isAddCard,
    }"
  >
    <CardHeader
      v-if="isAddCard"
      class="h-full flex flex-col items-center justify-center space-y-3 p-4"
    >
      <div class="bg-gray-100 dark:bg-gray-800 rounded-full p-3">
        <Plus class="h-6 w-6 text-gray-400" />
      </div>
      <CardTitle class="text-center text-gray-600 dark:text-gray-400 text-sm">
        Agregar nueva categoría
      </CardTitle>
    </CardHeader>

    <div v-else class="h-full">
      <div
        class="absolute inset-0 opacity-10 bg-gradient-to-br"
        :class="getGradientClass(category)"
      ></div>

      <CardHeader class="h-full p-4 flex flex-col justify-between">
        <div class="flex items-center space-x-3">
          <div
            class="p-2 rounded-lg"
            :style="category.color ? { backgroundColor: category.color } : {}"
            :class="getIconBgClass(category)"
          >
            <Icon
              :icon="getIconByType(category.type)"
              class="h-5 w-5 text-white"
            />
          </div>
          <div class="flex-1">
            <CardTitle class="text-base font-semibold">
              {{ category.name }}
            </CardTitle>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <Badge
            variant="secondary"
            class="text-xs"
            :class="getBadgeClass(category)"
          >
            {{ getCategoryTypeLabel(category.type) }}
          </Badge>

          <div class="flex items-center text-xs text-muted-foreground">
            <Clock class="h-3 w-3 mr-1" />
            {{ formatDate(category.createdAt) }}
          </div>
        </div>
      </CardHeader>

      <div
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Button variant="ghost" size="sm" class="h-7 w-7 p-0">
          <Pencil class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ICategory } from '../../interfaces/ICategory'
import { Plus, Clock, Pencil } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@iconify/vue'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const props = defineProps({
  category: {
    type: Object as () => ICategory,
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

const getIconByType = (type: string) => {
  return type === 'MEAL' ? 'mdi:food-apple' : 'mdi:dumbbell'
}

const getCategoryTypeLabel = (type: string) => {
  return type === 'MEAL' ? 'Alimentación' : 'Ejercicio'
}

const formatDate = (date: string) => {
  return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })
}

const getGradientClass = (category: ICategory) => {
  if (category.color) {
    return `from-[${category.color}]/80 to-[${category.color}]`
  }
  return category.type === 'MEAL'
    ? 'from-green-500 to-emerald-700'
    : 'from-blue-500 to-indigo-700'
}

const getIconBgClass = (category: ICategory) => {
  if (category.color) {
    return `bg-[${category.color}]`
  }
  return category.type === 'MEAL'
    ? 'bg-green-500 dark:bg-green-600'
    : 'bg-blue-500 dark:bg-blue-600'
}

const getBadgeClass = (category: ICategory) => {
  if (category.color) {
    return `bg-[${category.color}]/10 text-[${category.color}] dark:bg-[${category.color}]/20 dark:text-[${category.color}]/90`
  }
  return category.type === 'MEAL'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
}
</script>
