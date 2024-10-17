<script lang="ts" setup>
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ref } from 'vue'
import AccountSwitcher from './account-switcher.vue'
import Nav, { type LinkProp } from './nav-list.vue'
import ContentLayout from './content-layout.vue'
import Button from '@/components/ui/button/Button.vue'
import { ChevronLeft } from 'lucide-vue-next'

interface Props {
  accounts: {
    label: string
    email: string
    icon: string
  }[]
  defaultCollapsed?: boolean
  collapsedWidth: number
  expandedWidth: number
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false,
  collapsedWidth: 64,
  expandedWidth: 240,
})

const isCollapsed = ref(props.defaultCollapsed)

const links: LinkProp[] = [
  {
    title: 'Inbox',
    label: '128',
    icon: 'lucide:inbox',
    variant: 'default',
  },
  {
    title: 'Drafts',
    label: '9',
    icon: 'lucide:file',
    variant: 'ghost',
  },
  {
    title: 'Sent',
    label: '',
    icon: 'lucide:send',
    variant: 'ghost',
  },
  {
    title: 'Junk',
    label: '23',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
  {
    title: 'Trash',
    label: '',
    icon: 'lucide:trash',
    variant: 'ghost',
  },
  {
    title: 'Archive',
    label: '',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
]

const links2: LinkProp[] = [
  {
    title: 'Social',
    label: '972',
    icon: 'lucide:user-2',
    variant: 'ghost',
  },
  {
    title: 'Updates',
    label: '342',
    icon: 'lucide:alert-circle',
    variant: 'ghost',
  },
  {
    title: 'Forums',
    label: '128',
    icon: 'lucide:message-square',
    variant: 'ghost',
  },
  {
    title: 'Shopping',
    label: '8',
    icon: 'lucide:shopping-cart',
    variant: 'ghost',
  },
  {
    title: 'Promotions',
    label: '21',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
]

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

const title = 'Default title'
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
              'flex h-[52px] items-center',
              isCollapsed ? 'justify-center' : 'px-2',
            )
          "
        >
          <AccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
        </div>
        <Separator />
        <div class="flex-1 overflow-auto">
          <Nav :is-collapsed="isCollapsed" :links="links" />
          <Separator />
          <Nav :is-collapsed="isCollapsed" :links="links2" />
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
        <div class="flex-1 overflow-auto">
          <slot name="content-layout">
            <ContentLayout :title="title" />
          </slot>
        </div>
      </div>
    </div>
  </TooltipProvider>
</template>
