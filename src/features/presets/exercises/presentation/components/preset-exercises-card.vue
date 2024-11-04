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
        <FolderPlus class="h-8 w-8 text-gray-400" />
      </div>
      <CardTitle class="text-center text-gray-600 dark:text-gray-400">
        Crear nueva plantilla
      </CardTitle>
    </CardHeader>

    <CardHeader v-else class="p-6">
      <div class="flex flex-col space-y-4">
        <div class="space-y-2">
          <CardTitle class="text-2xl font-bold">
            {{ preset.name }}
          </CardTitle>
          <CardDescription class="text-base">
            {{ preset.description }}
          </CardDescription>
        </div>

        <div class="space-y-3">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar class="h-4 w-4 shrink-0" />
            <span>{{ dayCount }} días</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Dumbbell class="h-4 w-4 shrink-0" />
            <span>{{ totalExercises }} ejercicios</span>
          </div>
        </div>

        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar class="h-6 w-6">
            <AvatarImage :src="preset.createdBy.avatarUrl!" />
            <AvatarFallback>
              {{
                `${preset.createdBy.firstName[0]}${preset.createdBy.lastName[0]}`
              }}
            </AvatarFallback>
          </Avatar>
          <span
            >{{ preset.createdBy.firstName }}
            {{ preset.createdBy.lastName }}</span
          >
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
import type { IPresetExercise } from '../../interfaces/IPresetExercise'
import { Calendar, Dumbbell, FolderPlus } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { computed } from 'vue'

const props = defineProps({
  preset: {
    type: Object as () => IPresetExercise,
    default: null,
  },
  isAddCard: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['add'])

const dayCount = computed(() => props.preset?.days.length ?? 0)
const totalExercises = computed(
  () =>
    props.preset?.days.reduce((acc, day) => acc + day.exercises.length, 0) ?? 0,
)

const handleClick = () => {
  if (props.isAddCard) {
    emit('add')
  }
}
</script>
