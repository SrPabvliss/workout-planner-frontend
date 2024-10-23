<script lang="ts" setup>
import ContentLayout from './content-layout.vue'
import LayoutView from './layout-view.vue'

const title = 'Hola mundo'
</script>

<template>
  <div class="min-h-screen bg-background">
    <LayoutView>
      <template #content-layout>
        <ContentLayout :title="title">
          <template #content>
            <div>Hola mundo</div>
          </template>
        </ContentLayout>
      </template>
    </LayoutView>
  </div>
</template>
