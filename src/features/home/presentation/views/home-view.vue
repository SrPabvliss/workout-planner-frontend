<script setup lang="ts">
import { AxiosClient } from '../../../../core/infrastructure/http/axios-client'
import {
  HomeHeader,
  HomeHero,
  HomeBenefits,
  HomeMotivation,
  HomeWorkflow,
  HomeContact,
  HomeFooter,
} from '@/features/home/presentation/components'

const getUsers = async () => await AxiosClient.getInstance().get('/users/24')

getUsers()
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
