<script lang="ts" setup>
import { accounts, mails } from './data/mails'
import MailView from './mail-view.vue';
</script>

<template>

  <div class="min-h-screen bg-background">
    <MailView
      :accounts="accounts"
      :mails="mails"
      :nav-collapsed-size="4"
    />
  </div>
</template>