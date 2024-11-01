<script setup lang="ts">
import { Label } from '@/components/ui/label'
import ImagePreview from './image-preview.vue'
import { IMAGES_CONFIG } from '@/features/exercises/constants'
import type { ImagePreviewInfo } from '@/features/exercises/interfaces/IExerciseImage';

defineProps<{
  imagesPreviews: ImagePreviewInfo[]
  isMainImage: (index: number) => boolean
  canManageImage: (index: number) => boolean
  onRemove: (index: number) => Promise<void>
  onToggleMain: (index: number) => Promise<void>
  onUpload: (event: Event) => void
  disabled?: boolean
}>()
</script>

<template>
  <div class="space-y-2">
    <Label>Imágenes</Label>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(preview, index) in imagesPreviews"
        :key="index"
        class="relative"
      >
        <ImagePreview
          :src="preview.url"
          :is-main="isMainImage(index)"
          :disabled="disabled"
          :is-pending="preview.isPending"
          :show-actions="canManageImage(index)"
          @remove="onRemove(index)"
          @toggle-main="onToggleMain(index)"
        >
          <template v-if="preview.isPending" #status>
            <span class="text-xs text-muted-foreground">
              Pendiente de guardar
            </span>
          </template>
        </ImagePreview>
      </div>
      <div
        v-if="!disabled"
        class="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-primary"
        @click="$refs.fileInput.click()"
      >
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="onUpload"
        />
        <span class="text-gray-500">{{ IMAGES_CONFIG.addButtonText }}</span>
      </div>
    </div>
  </div>
</template>
