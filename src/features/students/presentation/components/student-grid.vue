<template>
  <ScrollArea class="h-[calc(100vh-200px)]">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StudentCard :isAddCard="true" @add="addStudent" />
      <StudentCard
        v-for="student in students"
        :key="student.id"
        :student="student"
      />
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { IStudent } from '../../interfaces/IStudent'
import StudentCard from './student-card.vue'
import { ScrollArea } from '@/components/ui/scroll-area'

defineProps({
  students: {
    type: Array as () => IStudent[],
    required: true,
  },
})

const emit = defineEmits(['addStudent'])

const addStudent = () => {
  emit('addStudent')
}
</script>
