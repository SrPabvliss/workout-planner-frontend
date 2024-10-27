<template>
  <div class="w-full">
    <Input
      v-model="localQuery"
      @input="onInput"
      placeholder="Busca estudiantes..."
    />
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ref, watch } from 'vue'
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'search'])

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
