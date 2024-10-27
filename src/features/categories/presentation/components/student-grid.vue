<template>
  <ScrollArea class="h-[calc(100vh-200px)]">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 p-4">
      <StudentCard :isAddCard="true" @add="addStudent" />
      <StudentCard
        v-for="student in students"
        :key="student.id"
        :student="student"
        @click="editStudent(student.id)"
      />
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import router from '@/router'
import type { IStudent } from '../../interfaces/ICategory'
import StudentCard from './student-card.vue'
import { ScrollArea } from '@/components/ui/scroll-area'

defineProps({
  students: {
    type: Array as () => IStudent[],
    required: true,
  },
})

const addStudent = () => {
  router.push({ name: 'newStudent' })
}

const editStudent = (id: number) => {
  console.log(id)
  router.push({ name: `editStudent`, params: { id } })
}
</script>
