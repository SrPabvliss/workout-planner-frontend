<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useRoute } from 'vue-router'
import StudentBreadcrumb from '../components/student-breadcrumb.vue'
import { ref, onMounted, computed } from 'vue'
import NewEditForm from '../components/new-edit-form.vue'
import { StudentDataSourceImpl } from '../../services/datasource'
import type { IStudent } from '../../interfaces/IStudent'

const route = useRoute()
const studentId = Number(route.params.id)
const student = ref<IStudent | null>(null)
const studentValue = computed(() => student.value)

const breadcrumbItems = ref([
  { label: 'Todos los estudiantes', href: 'estudiantes' },
  { label: 'Editar', href: 'editStudent', current: true },
])

const getCurrentStudent = async () => {
  const response = await StudentDataSourceImpl.getInstance().getById(studentId)
  student.value = response
}

onMounted(() => {
  getCurrentStudent()
})
</script>

<template>
  <ContentLayout :title="'Editar estudiante'">
    <template #content>
      <StudentBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm v-if="student" :student="studentValue as IStudent" />
    </template>
  </ContentLayout>
</template>
