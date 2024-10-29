<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ICategory } from '../../interfaces/ICategory'
import { Plus, Clock, Pencil } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@iconify/vue'
import { useCategoryCard } from '../../composable/use-category-card'

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

const { handleClick, cardClasses, formatters, styles } = useCategoryCard(props)
</script>

<template>
  <Card
    @click="() => handleClick(emit)"
    :class="[cardClasses.base, cardClasses.conditional]"
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
        :class="styles.getGradientClass()"
      ></div>

      <CardHeader class="h-full p-4 flex flex-col justify-between">
        <div class="flex items-center space-x-3">
          <div
            class="p-2 rounded-lg"
            :style="category?.color ? { backgroundColor: category.color } : {}"
            :class="styles.getIconBgClass()"
          >
            <Icon
              :icon="formatters.getIconByType(category.type)"
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
            :class="styles.getBadgeClass()"
          >
            {{ formatters.getCategoryTypeLabel(category.type) }}
          </Badge>

          <div class="flex items-center text-xs text-muted-foreground">
            <Clock class="h-3 w-3 mr-1" />
            {{ formatters.formatDate(category.createdAt) }}
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
