<template>
  <Card
    @click="handleClick"
    class="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex justify-center items-center"
    :class="{ 'h-44': isAddCard }"
  >
    <CardHeader
      v-if="isAddCard"
      class="h-full flex flex-col items-center justify-center"
    >
      <Plus class="h-8 w-8 text-gray-400 mb-2" />
      <CardTitle class="">Agrega un nuevo estudiante</CardTitle>
    </CardHeader>

    <CardHeader v-else class="p-4">
      <div class="flex items-center gap-4">
        <Avatar class="h-32 w-32">
          <AvatarImage :src="student.user.avatarUrl!" />
          <AvatarFallback>
            {{ `${student.user.firstName[0]}${student.user.lastName[0]}` }}
          </AvatarFallback>
        </Avatar>

        <div class="flex-1 min-w-0">
          <CardTitle class="text-2xl truncate">
            {{ `${student.user.firstName} ${student.user.lastName}` }}
          </CardTitle>
          <CardDescription class="flex items-center gap-2 mt-1">
            <span class="truncate">@{{ student.user.username }}</span>
          </CardDescription>
          <div class="flex items-center gap-2 mt-2">
            <Badge
              variant="outline"
              class="flex items-center gap-1 justify-center"
            >
              <Mail class="h-3 w-3" />
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
import type { IStudent } from '../../interfaces/IStudent'
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
