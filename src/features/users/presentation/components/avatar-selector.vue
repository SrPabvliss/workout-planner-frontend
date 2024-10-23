<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-vue-next'
import { useAvatarForm } from '../../composables/use-avatar-form'

const {
  updateOption,
  avatarUrl,
  categories,
  selectedOptions,
  saveAvatar,
  isSaving,
} = useAvatarForm()
</script>

<template>
  <div class="avatar-selector flex flex-col gap-4 justify-center">
    <div
      class="preview mb-4 p-5 flex flex-col items-center justify-center rounded-lg border mt-8 bg-white/80"
    >
      <img
        :src="avatarUrl"
        alt="Avatar Preview"
        class="w-96 h-96 rounded-full"
      />

      <Button
        class="mt-4 text-white"
        :disabled="isSaving"
        @click="saveAvatar"
        size="sm"
      >
        <Loader2Icon v-if="isSaving" class="mr-2 h-4 w-4 animate-spin" />
        {{ isSaving ? 'Guardando...' : 'Guardar cambios' }}
      </Button>
    </div>

    <div class="controls grid grid-cols-2 gap-4">
      <div v-for="category in categories" :key="category.id">
        <Label>
          {{ category.spanishLabel }}
        </Label>

        <Select
          :model-value="
            selectedOptions[category.id as keyof typeof selectedOptions]
          "
          @update:model-value="updateOption(category.id as any, $event)"
          :disabled="!category.options.length || isSaving"
        >
          <SelectTrigger class="w-full">
            <SelectValue :placeholder="category.label" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{{ category.spanishLabel }}</SelectLabel>
              <SelectItem
                v-for="option in category.options"
                :key="option.id"
                :value="option.value"
              >
                <div class="flex items-center gap-2">
                  <div
                    v-if="category.id.includes('Color')"
                    class="w-4 h-4 rounded-full"
                    :style="{ backgroundColor: `#${option.value}` }"
                  />
                  {{ option.label }}
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
