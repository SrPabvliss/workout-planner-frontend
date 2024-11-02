<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ref, watch } from 'vue'

const props = defineProps<{
  name: string
  description: string
  preparation: string
}>()

const emit = defineEmits<{
  'update:name': [value: string]
  'update:description': [value: string]
  'update:preparation': [value: string]
}>()

const localName = ref(props.name)
const localDescription = ref(props.description)
const localPreparation = ref(props.preparation)

watch(localName, newValue => {
  emit('update:name', newValue)
})

watch(localDescription, newValue => {
  emit('update:description', newValue)
})

watch(localPreparation, newValue => {
  emit('update:preparation', newValue)
})

watch(
  () => props.name,
  newValue => {
    localName.value = newValue
  },
)

watch(
  () => props.description,
  newValue => {
    localDescription.value = newValue
  },
)

watch(
  () => props.preparation,
  newValue => {
    localPreparation.value = newValue
  },
)
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Información básica</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div class="space-y-2">
          <Label>Nombre</Label>
          <Input v-model="localName" placeholder="Nombre de la comida" />
        </div>

        <div class="space-y-2">
          <Label>Descripción</Label>
          <Input v-model="localDescription" placeholder="Breve descripción" />
        </div>

        <div class="space-y-2">
          <Label>Instrucciones de preparación</Label>
          <Textarea
            v-model="localPreparation"
            placeholder="Detalla los pasos de preparación..."
            class="min-h-[150px] resize-none"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
