<template>
  <div class="w-full">
    <Input v-model="localQuery" @input="onInput" :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

const placeholder = computed(
  () =>
    `Buscar categorías de ${props.type === 'MEAL' ? 'alimentación' : 'ejercicios'}...`,
)

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
