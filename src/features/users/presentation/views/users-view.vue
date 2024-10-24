<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import useProfileForm from '../../composables/use-profile-form'
import AvatarSelector from '../components/avatar-selector.vue'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useRoute } from 'vue-router'

const role = useRoute().query.role as string
const { schema, onSubmit, defaultValues } = useProfileForm(role)
</script>

<template>
  <ContentLayout :title="`Mi perfil`">
    <template #content>
      <div class="flex flex-col lg:flex-row gap-4 w-full">
        <Card class="w-full lg:w-1/2">
          <CardContent>
            <AvatarSelector />
          </CardContent>
        </Card>
        <Card class="w-full lg:w-1/2">
          <CardHeader>
            <h2 class="text-xl font-bold">Datos Personales</h2>
          </CardHeader>
          <CardContent>
            <AutoForm
              v-if="defaultValues"
              class="space-y-4"
              :schema="schema"
              :initial-values="defaultValues"
              @submit="onSubmit"
              :field-config="{
                firstName: {
                  label: 'Nombre',
                },
                lastName: {
                  label: 'Apellido',
                },
                username: {
                  label: 'Nombre de usuario',
                },
                email: {
                  label: 'Correo',
                },
                height: {
                  label: 'Altura',
                  inputProps: {
                    type: 'number',
                  },
                },
                weight: {
                  label: 'Peso',
                  inputProps: {
                    type: 'number',
                  },
                },
                medicalConditions: {
                  label: 'Condiciones médicas',
                  component: 'textarea',
                },
                trainedBefore: {
                  label: 'He entrenado antes',
                  component: 'checkbox',
                },
                specialization: {
                  label: 'Especialización',
                },
                yearsOfExperience: {
                  label: 'Años de experiencia',
                  inputProps: {
                    type: 'number',
                  },
                },
              }"
            >
              <Button type="submit" class="w-full text-white mt-10">
                Guardar Cambios
              </Button>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </template>
  </ContentLayout>
</template>
