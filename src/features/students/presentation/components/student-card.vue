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
        <UserPlus class="h-8 w-8 text-gray-400" />
      </div>
      <CardTitle class="text-center text-gray-600 dark:text-gray-400">
        Agregar nuevo estudiante
      </CardTitle>
    </CardHeader>

    <CardHeader v-else class="p-6">
      <div class="flex flex-col sm:flex-row gap-6">
        <div class="flex flex-col items-center sm:items-start space-y-2">
          <Avatar
            class="h-24 w-24 sm:h-32 sm:w-32 ring-2 ring-offset-2 ring-offset-background ring-primary/20"
          >
            <AvatarImage :src="student.user.avatarUrl!" />
            <AvatarFallback
              class="text-2xl font-semibold bg-gradient-to-br from-primary/80 to-primary text-white"
            >
              {{ `${student.user.firstName[0]}${student.user.lastName[0]}` }}
            </AvatarFallback>
          </Avatar>
        </div>

        <div class="flex-1 min-w-0 space-y-4">
          <div>
            <CardTitle class="text-2xl font-bold truncate">
              {{ `${student.user.firstName} ${student.user.lastName}` }}
            </CardTitle>
            <CardDescription class="text-base mt-1">
              @{{ student.user.username }}
            </CardDescription>
          </div>

          <div class="grid grid-cols-1 gap-3">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail class="h-4 w-4 shrink-0" />
              <span class="truncate">{{ student.user.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Scale class="h-4 w-4 shrink-0" />
              <span>{{ student.weight }}kg</span>
              <span class="mx-1">•</span>
              <Ruler class="h-4 w-4 shrink-0" />
              <span>{{ student.height }}cm</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <Badge
              v-if="student.trainedBefore"
              variant="default"
              class="bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300 hover:bg-green-500/20"
            >
              Experiencia previa
            </Badge>
            <Badge
              v-if="student.medicalConditions"
              variant="default"
              class="bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300 hover:bg-yellow-500/20"
            >
              Condiciones médicas
            </Badge>
          </div>
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
import type { IStudent } from '../../interfaces/IStudent'
import { Mail, UserPlus, Scale, Ruler } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props = defineProps({
  student: {
    type: Object as () => IStudent,
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
</script>
