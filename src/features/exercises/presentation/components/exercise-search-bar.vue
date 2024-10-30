<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const localQuery = ref(props.modelValue)

watch(localQuery, newQuery => {
  emit('update:modelValue', newQuery)
  emit('search', newQuery)
})

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  localQuery.value = target.value
}
</script>

<template>
  <div class="relative w-full">
    <Search
      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
    />
    <Input
      v-model="localQuery"
      @input="onInput"
      placeholder="Buscar ejercicios..."
      class="pl-9"
    />
  </div>
</template>
