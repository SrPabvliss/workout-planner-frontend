<script lang="ts" setup>
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ref } from 'vue'
import Nav from './nav-list.vue'
import Button from '@/components/ui/button/Button.vue'
import { ChevronLeft, Dumbbell } from 'lucide-vue-next'
import { useModulesStore } from '../context/modules-store'

interface Props {
  defaultCollapsed?: boolean
  collapsedWidth?: number
  expandedWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false,
  collapsedWidth: 64,
  expandedWidth: 240,
})

const isCollapsed = ref(props.defaultCollapsed)
const store = useModulesStore()
store.loadModules()

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div class="flex h-screen">
      <aside
        :class="
          cn(
            'transition-all duration-300 ease-in-out flex flex-col relative',
            isCollapsed ? `w-[${props.collapsedWidth}px]` : `w-[350px]`,
          )
        "
      >
        <div
          :class="
            cn(
              'flex h-[52px] items-center justify-center',
              isCollapsed ? 'justify-center' : 'px-2',
            )
          "
        >
          <Dumbbell :size="24" class="mr-2 text-primary" />
          <h1 :class="cn('font-bold text-lg', isCollapsed && 'sr-only')">
            FIT ME
          </h1>
        </div>
        <Separator />
        <div class="flex-1 overflow-auto">
          <Nav :is-collapsed="isCollapsed" :links="store.modules" />
        </div>

        <Button
          variant="outline"
          size="icon"
          class="absolute -right-[20px] top-[30px] z-10 rounded-full bg-background shadow-md"
          @click="toggleCollapse"
        >
          <ChevronLeft
            :class="
              cn('h-4 w-4 transition-transform', isCollapsed && 'rotate-180')
            "
          />
        </Button>
      </aside>

      <Separator orientation="vertical" />

      <div class="flex-1 overflow-hidden flex flex-col">
        <div class="flex-1 overflow-clip">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </TooltipProvider>
</template>
