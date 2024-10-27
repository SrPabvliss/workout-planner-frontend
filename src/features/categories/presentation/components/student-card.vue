<template>
  <Card
    @click="handleClick"
    class="cursor-pointer transition-all duration-200 hover:shadow-lg"
    :class="{
      'min-h-[11rem]': isAddCard,
      'hover:bg-gray-50 dark:hover:bg-slate-800': isAddCard,
      'hover:scale-[1.02]': !isAddCard,
    }"
  >
    <CardHeader
      v-if="isAddCard"
      class="h-full flex flex-col items-center justify-center space-y-3"
    >
      <Plus class="h-8 w-8 text-gray-400" />
      <CardTitle class="text-center text-gray-600 dark:text-gray-400">
        Agrega un nuevo estudiante
      </CardTitle>
    </CardHeader>

    <CardHeader v-else class="p-4">
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <Avatar class="h-24 w-24 sm:h-32 sm:w-32 shrink-0">
          <AvatarImage :src="student.user.avatarUrl!" />
          <AvatarFallback>
            {{ `${student.user.firstName[0]}${student.user.lastName[0]}` }}
          </AvatarFallback>
        </Avatar>

        <div class="flex-1 min-w-0 text-center sm:text-left">
          <CardTitle class="text-xl sm:text-2xl truncate">
            {{ `${student.user.firstName} ${student.user.lastName}` }}
          </CardTitle>
          <CardDescription
            class="flex items-center justify-center sm:justify-start gap-2 mt-1"
          >
            <span class="truncate">@{{ student.user.username }}</span>
          </CardDescription>
          <div
            class="flex items-center justify-center sm:justify-start gap-2 mt-2"
          >
            <Badge
              variant="outline"
              class="flex items-center gap-1 justify-center max-w-full"
            >
              <Mail class="h-3 w-3 shrink-0" />
              <span class="truncate">{{ student.user.email }}</span>
            </Badge>
          </div>
        </div>
      </div>
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import type { IStudent } from '../../interfaces/ICategory'
import { Mail, Plus } from 'lucide-vue-next'
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
