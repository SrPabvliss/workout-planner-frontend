<script lang="ts" setup>
import { ref } from 'vue'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import router from '@/router'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

export interface Submenu {
  href: string
  title: string
  icon: string
  active?: boolean
}

export interface LinkProp {
  title: string
  label?: string
  icon: string
  variant: 'default' | 'ghost'
  href?: string
  children?: Submenu[]
}

interface NavProps {
  isCollapsed: boolean
  links: LinkProp[]
  onNavigate?: () => void
}

const props = defineProps<NavProps>()
const route = useRoute()

const expandedMenus = ref<string[]>([])

const determineActiveLink = (link?: string) => {
  if (!link) return false
  const currentModule = route.path.split('/').pop()
  return currentModule && currentModule.toUpperCase() === link.toUpperCase()
}

const handleNavigation = (href?: string) => {
  if (href) {
    router.push({ name: href })
    props.onNavigate?.()
  }
}

const isSubmenuActive = (submenus?: Submenu[]) => {
  if (!submenus) return false
  return submenus.some(submenu => determineActiveLink(submenu.href))
}

const toggleSubmenu = (title: string) => {
  const index = expandedMenus.value.indexOf(title)
  if (index === -1) {
    expandedMenus.value.push(title)
  } else {
    expandedMenus.value.splice(index, 1)
  }
}

const handleSubmenuNavigation = (link: LinkProp) => {
  if (link.children && link.children.length > 0) {
    const firstChild = link.children[0]
    if (firstChild.href) {
      handleNavigation(firstChild.href)
    }
  }
}
</script>

<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
  >
    <nav
      class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <template v-for="(link, index) in links">
        <template v-if="link.children">
          <Collapsible
            v-if="!isCollapsed"
            :key="`collapse-${index}`"
            :open="expandedMenus.includes(link.title)"
            @update:open="toggleSubmenu(link.title)"
          >
            <CollapsibleTrigger
              :class="
                cn(
                  buttonVariants({
                    variant: isSubmenuActive(link.children)
                      ? 'secondary'
                      : 'ghost',
                    size: 'sm',
                  }),
                  'w-full justify-between',
                )
              "
            >
              <div class="flex items-center">
                <Icon :icon="link.icon" class="mr-2 size-4" />
                {{ link.title }}
              </div>
              <Icon
                :icon="
                  expandedMenus.includes(link.title)
                    ? 'lucide:chevron-down'
                    : 'lucide:chevron-right'
                "
                class="ml-2 size-4 transition-transform duration-200"
              />
            </CollapsibleTrigger>
            <CollapsibleContent class="space-y-1 px-2 py-1">
              <a
                v-for="(submenu, subIndex) in link.children"
                :key="`submenu-${subIndex}`"
                href="#"
                :class="
                  cn(
                    buttonVariants({
                      variant: determineActiveLink(submenu.href)
                        ? 'secondary'
                        : 'ghost',
                      size: 'sm',
                    }),
                    'w-full justify-start pl-6',
                  )
                "
                @click.prevent="submenu.href && handleNavigation(submenu.href)"
              >
                <Icon :icon="submenu.icon" class="mr-2 size-4" />
                {{ submenu.title }}
              </a>
            </CollapsibleContent>
          </Collapsible>

          <Tooltip v-else :key="`tooltip-${index}`" :delay-duration="0">
            <TooltipTrigger as-child>
              <a
                href="#"
                :class="
                  cn(
                    buttonVariants({
                      variant: isSubmenuActive(link.children)
                        ? 'secondary'
                        : 'ghost',
                      size: 'icon',
                    }),
                    'h-9 w-9',
                  )
                "
                @click.prevent="handleSubmenuNavigation(link)"
              >
                <Icon :icon="link.icon" class="size-4" />
                <span class="sr-only">{{ link.title }}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right" class="flex items-center gap-4">
              {{ link.title }}
            </TooltipContent>
          </Tooltip>
        </template>

        <template v-else>
          <Tooltip
            v-if="isCollapsed"
            :key="`tooltip-${index}`"
            :delay-duration="0"
          >
            <TooltipTrigger as-child>
              <a
                href="#"
                :class="
                  cn(
                    buttonVariants({
                      variant: determineActiveLink(link.href)
                        ? 'secondary'
                        : 'ghost',
                      size: 'icon',
                    }),
                    'h-9 w-9',
                  )
                "
                @click.prevent="link.href && handleNavigation(link.href)"
              >
                <Icon :icon="link.icon" class="size-4" />
                <span class="sr-only">{{ link.title }}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right" class="flex items-center gap-4">
              {{ link.title }}
            </TooltipContent>
          </Tooltip>
          <a
            v-else
            :key="`link-${index}`"
            href="#"
            :class="
              cn(
                buttonVariants({
                  variant: determineActiveLink(link.href)
                    ? 'secondary'
                    : 'ghost',
                  size: 'sm',
                }),
                'justify-start',
              )
            "
            @click.prevent="link.href && handleNavigation(link.href)"
          >
            <Icon :icon="link.icon" class="mr-2 size-4" />
            {{ link.title }}
          </a>
        </template>
      </template>
    </nav>
  </div>
</template>
