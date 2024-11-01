<script setup lang="ts">
import { StarIcon, TrashIcon } from 'lucide-vue-next'

defineProps<{
  src: string
  isMain: boolean
  disabled?: boolean
  isPending?: boolean
  showActions?: boolean
}>()

defineEmits<{
  remove: []
  'toggle-main': []
}>()
</script>

<template>
  <div class="relative group overflow-hidden rounded-lg">
    <img
      :src="src"
      class="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
      alt="Preview"
    />

    <div
      v-if="showActions"
      class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200"
    >
      <div class="flex gap-2">
        <button
          type="button"
          class="p-2 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transform hover:scale-110 transition-all duration-200 shadow-lg"
          :disabled="disabled"
          @click="$emit('remove')"
        >
          <TrashIcon class="w-5 h-5" />
        </button>

        <button
          type="button"
          class="p-2 rounded-full transform hover:scale-110 transition-all duration-200 shadow-lg"
          :class="[
            isMain
              ? 'bg-yellow-400 text-white hover:bg-yellow-500'
              : 'bg-white/90 text-gray-700 hover:bg-yellow-400 hover:text-white',
          ]"
          :disabled="disabled"
          @click="$emit('toggle-main')"
        >
          <StarIcon class="w-5 h-5" :class="{ 'fill-current': isMain }" />
        </button>
      </div>
    </div>

    <div
      v-if="isMain"
      class="absolute top-2 left-2 px-2 py-1 rounded-full bg-yellow-400 text-white text-xs font-medium shadow-lg flex items-center gap-1"
    >
      <StarIcon class="w-3 h-3 fill-current" />
      Principal
    </div>

    <div
      v-if="isPending"
      class="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/70 text-white text-xs font-medium shadow-lg"
    >
      <slot name="status">Pendiente</slot>
    </div>

    <div
      v-if="disabled"
      class="absolute inset-0 bg-gray-900/50 flex items-center justify-center"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.group:hover img {
  filter: brightness(0.9);
}
</style>
