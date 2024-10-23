<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
</script>

<template>
  <ContentLayout :title="'Bienvenido!'">
    <template #content>
      <p>Bienvenido de vuelta</p>
    </template>
  </ContentLayout>
</template>