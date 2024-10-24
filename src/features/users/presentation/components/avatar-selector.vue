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
  <div class="avatar-selector flex flex-col gap-4">
    <div
      class="preview mb-4 p-3 md:p-5 flex flex-col items-center justify-center rounded-lg border mt-4 md:mt-8 bg-white/80"
    >
      <img
        :src="avatarUrl"
        alt="Avatar Preview"
        class="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full"
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

    <div class="controls grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      <div v-for="category in categories" :key="category.id" class="w-full">
        <Label class="text-sm">
          {{ category.spanishLabel }}
        </Label>

        <Select
          :model-value="
            selectedOptions[category.id as keyof typeof selectedOptions]
          "
          @update:model-value="updateOption(category.id as any, $event)"
          :disabled="!category.options.length || isSaving"
        >
          <SelectTrigger class="w-full mt-1">
            <SelectValue :placeholder="category.label" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{{ category.spanishLabel }}</SelectLabel>
              <SelectItem
                v-for="option in category.options"
                :key="option.id"
                :value="option.value"
                class="cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <div
                    v-if="category.id.includes('Color')"
                    class="w-4 h-4 rounded-full shrink-0"
                    :style="{ backgroundColor: `#${option.value}` }"
                  />
                  <span class="truncate">{{ option.label }}</span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
