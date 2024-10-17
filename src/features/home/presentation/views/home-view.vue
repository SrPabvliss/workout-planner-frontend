<script setup lang="ts">
import {
  HomeHeader,
  HomeHero,
  HomeBenefits,
  HomeMotivation,
  HomeWorkflow,
  HomeContact,
  HomeFooter,
} from '@/features/home/presentation/components'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HomeHeader />
    <main>
      <HomeHero />
      <HomeBenefits />
      <HomeMotivation />
      <HomeWorkflow />
      <HomeContact />
    </main>
    <HomeFooter />
  </div>
</template>
