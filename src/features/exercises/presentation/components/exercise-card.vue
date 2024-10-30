<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Youtube, PlusCircle, VideoOff } from 'lucide-vue-next'
import type { IExercise } from '../../interfaces/IExercise'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  exercise?: IExercise
  isAddCard?: boolean
}>()

const mainImage = computed(() => {
  if (!props.exercise?.images.length) return null
  return (
    props.exercise.images.find(img => img.isMain) || props.exercise.images[0]
  )
})

const imageUrl = computed(() => {
  if (props.isAddCard) return undefined
  return mainImage.value?.url || '/images/exercise-placeholder.jpg'
})

const categories = computed(() => {
  if (!props.exercise?.categories.length) return []
  return props.exercise.categories
})

const handleClick = () => {
  if (props.isAddCard) {
    router.push({ name: 'nuevo-ejercicio' })
  } else if (props.exercise) {
    router.push({ name: 'editar-ejercicio', params: { id: props.exercise.id } })
  }
}
</script>

<template>
  <Card
    class="group hover:border-primary transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-lg"
    @click="handleClick"
  >
    <CardContent class="p-0">
      <div
        v-if="isAddCard"
        class="flex items-center justify-center h-60 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div class="text-center">
          <PlusCircle
            class="w-12 h-12 mx-auto text-muted-foreground group-hover:text-primary transition-colors"
          />
          <p
            class="mt-2 text-lg font-medium text-muted-foreground group-hover:text-primary transition-colors"
          >
            Agregar ejercicio
          </p>
        </div>
      </div>
      <template v-else>
        <div class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-transform duration-300 group-hover:scale-105"
          ></div>

          <img
            :src="imageUrl"
            :alt="exercise?.name"
            class="aspect-video object-cover w-full transition-transform duration-300 group-hover:scale-105"
          />

          <div class="absolute top-2 right-2 flex gap-2 z-20">
            <div
              v-if="exercise?.youtubeUrl"
              class="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors"
              title="Ver video"
            >
              <Youtube class="w-4 h-4" />
            </div>
            <div
              v-else
              class="bg-zinc-700 text-white/70 p-1.5 rounded-full"
              title="Sin video"
            >
              <VideoOff class="w-4 h-4" />
            </div>
          </div>

          <div class="absolute bottom-2 left-2 flex flex-wrap gap-1.5 z-20">
            <Badge
              v-for="category in categories"
              :key="category.id"
              :style="{ backgroundColor: category.color || '#666' }"
              class="text-white text-xs font-medium px-2 py-0.5 rounded opacity-90 hover:opacity-100"
            >
              {{ category.name }}
            </Badge>
          </div>
        </div>

        <div class="p-4">
          <h3
            class="font-semibold text-lg mb-2 group-hover:text-primary transition-colors"
          >
            {{ exercise?.name }}
          </h3>
          <p class="text-sm text-muted-foreground line-clamp-2">
            {{ exercise?.description }}
          </p>
        </div>
      </template>
    </CardContent>
  </Card>
</template>
