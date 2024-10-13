<script setup lang="ts">
import { IWorkflowStep } from '../../interfaces/IWorkflowStep'
defineProps<{
  step: IWorkflowStep
}>()
</script>

<template>
  <div
    class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
  >
    <span class="text-2xl font-bold text-blue-600">{{ step.number }}</span>
  </div>
  <h3 class="text-xl font-semibold text-gray-900 mb-2">
    {{ step.title }}
  </h3>
  <p class="text-gray-600">{{ step.description }}</p>
</template>
