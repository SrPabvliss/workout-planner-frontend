<script setup lang="ts">
import { benefits, iconSize, iconStrokeWidth } from '@/features/home/constants'
import BenefitItem from './benefit-item.vue'
import { Card } from '@/components/ui/card'
</script>

<template>
  <section class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        Beneficios de WorkoutPlanner
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          v-for="benefit in benefits"
          :key="benefit.title"
          class="bg-gray-100 rounded-lg p-6 shadow border-slate-200 text-center"
        >
          <BenefitItem
            :benefit="benefit"
            :iconSize="iconSize"
            :iconStrokeWidth="iconStrokeWidth"
          />
        </Card>
      </div>
    </div>
  </section>
</template>
