<script lang="ts" setup>
import ContentLayout from './content-layout.vue'
import { accounts } from './data/mails'
import MailView from './layout-view.vue'

const title = 'Hola mundo'
</script>

<template>
  <div class="min-h-screen bg-background">
    <MailView :accounts="accounts" :nav-collapsed-size="4" :title="title">
      <template #content-layout>
        <ContentLayout :title="title">
          <template #content>
            <div>Hola mundo</div>
          </template>
        </ContentLayout>
      </template>
    </MailView>
  </div>
</template>
