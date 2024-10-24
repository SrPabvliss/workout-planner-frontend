<template>
  <ContentLayout :title="'Estudiantes'">
    <template #content>
      <div class="space-y-4 mt-0 pt-0">
        <StudentBreadcrumb :breadcrumbItems="breadcrumbItems" />
        <StudentsSearchBar v-model="searchQuery" @search="onSearch" />
        <StudentGrid :students="filteredStudents" @addStudent="addStudent" />
      </div>
    </template>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudents } from '../../composable/use-students-view'
import StudentsSearchBar from '../components/students-search-bar.vue'
import StudentGrid from '../components/student-grid.vue'
import ContentLayout from '@/core/layout/content-layout.vue'
import StudentBreadcrumb from '../components/student-breadcrumb.vue'

const { students, addStudent } = useStudents()
const searchQuery = ref('')

const breadcrumbItems = ref([
  { label: 'Todos los estudiantes', href: '/estudiantes' },
])

const filteredStudents = computed(() =>
  students.value.filter(student =>
    student.user.username
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase()),
  ),
)

const onSearch = (query: string) => {
  searchQuery.value = query
}
</script>
