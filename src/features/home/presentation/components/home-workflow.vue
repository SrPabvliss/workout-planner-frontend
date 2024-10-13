<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-vue-next'
import { workflowSteps } from '@/features/home/constants'
import WorkflowStep from './workflow-step.vue'
</script>

<template>
  <section class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">
        Cómo funciona WorkoutPlanner
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="step in workflowSteps"
          :key="step.title"
          class="text-center"
        >
          <WorkflowStep :step="step" />
        </div>
      </div>
      <Alert class="mt-8 flex items-center gap-4">
        <div>
          <Info class="mt-0 h-auto w-6" />
        </div>
        <div>
          <AlertTitle class="font-semibold text-lg flex gap-4 items-center">
            Nota
          </AlertTitle>
          <AlertDescription>
            El registro de usuarios es realizado exclusivamente por los
            entrenadores para garantizar una experiencia personalizada.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  </section>
</template>
