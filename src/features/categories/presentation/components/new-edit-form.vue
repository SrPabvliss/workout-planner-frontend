<script setup lang="ts">
import { useStudentForm } from '../../composable/use-student-form'
import type { IStudent } from '../../interfaces/ICategory'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const props = defineProps<{
  student?: IStudent | null
}>()

const { schema, onSubmit, defaultValues, mode } = useStudentForm(props.student)
</script>

<template>
  <div class="mx-auto max-w-7xl mt-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle
            >{{ mode === 'edit' ? 'Editar' : 'Nuevo' }} Estudiante</CardTitle
          >
        </CardHeader>
        <CardContent>
          <AutoForm
            v-if="defaultValues || mode === 'new'"
            class="space-y-4"
            :schema="schema"
            :initial-values="defaultValues"
            @submit="onSubmit"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-1">
                    <AutoFormField
                      name="firstName"
                      :field-config="{
                        label: 'Nombre',
                      }"
                    />
                  </div>
                  <div class="col-span-1">
                    <AutoFormField
                      name="lastName"
                      :field-config="{
                        label: 'Apellido',
                      }"
                    />
                  </div>
                </div>
                <AutoFormField
                  name="username"
                  :field-config="{
                    label: 'Nombre de usuario',
                  }"
                />
                <AutoFormField
                  name="email"
                  :field-config="{
                    label: 'Correo electrónico',
                  }"
                />
              </div>

              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-1">
                    <AutoFormField
                      name="height"
                      :field-config="{
                        label: 'Altura (m)',
                        inputProps: {
                          type: 'number',
                          step: '0.01',
                          min: '0',
                        },
                      }"
                    />
                  </div>
                  <div class="col-span-1">
                    <AutoFormField
                      name="weight"
                      :field-config="{
                        label: 'Peso (kg)',
                        inputProps: {
                          type: 'number',
                          step: '0.1',
                          min: '0',
                        },
                      }"
                    />
                  </div>
                </div>
                <AutoFormField
                  name="medicalConditions"
                  :field-config="{
                    label: 'Condiciones médicas',
                    description:
                      'Describe cualquier condición médica relevante',
                    component: 'textarea',
                  }"
                />
                <AutoFormField
                  name="trainedBefore"
                  :field-config="{
                    label: 'He entrenado antes',
                    component: 'checkbox',
                    description:
                      '¿Has tenido experiencia previa con entrenamiento personal?',
                  }"
                />
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <Button type="submit" class="w-full md:w-auto text-white">
                {{ mode === 'edit' ? 'Actualizar' : 'Crear' }} Estudiante
              </Button>
            </div>
          </AutoForm>
        </CardContent>
      </Card>

      <div class="hidden lg:block">
        <Card class="h-full">
          <CardContent class="h-full p-0 overflow-hidden">
            <img
              src="https://fcdn.thg-corporate.com/thg/Nutrition_Main_84eda93d55.jpg"
              alt="Fitness motivation"
              class="w-full h-full object-cover rounded-xl"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
