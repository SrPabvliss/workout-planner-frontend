<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Check, PlusCircle } from 'lucide-vue-next'

interface Option {
  label: string
  value: string | number
  icon?: any
}

interface Props {
  title?: string
  options: Option[]
  modelValue?: (string | number)[]
  placeholder?: string
  emptyMessage?: string
  maxDisplayedTags?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Select options',
  modelValue: () => [],
  placeholder: 'Search...',
  emptyMessage: 'No results found.',
  maxDisplayedTags: 5,
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref('')
const selectedValues = computed(() => new Set(props.modelValue))

const filteredOptions = computed(() => {
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleSelect = (option: Option) => {
  const newSelection = new Set(selectedValues.value)

  if (newSelection.has(option.value)) {
    newSelection.delete(option.value)
  } else {
    newSelection.add(option.value)
  }

  emit('update:modelValue', Array.from(newSelection))
}

const handleClear = () => {
  emit('update:modelValue', [])
  searchQuery.value = ''
}

const selectedOptions = computed(() =>
  props.options.filter(option => selectedValues.value.has(option.value)),
)
</script>

<template>
  <div class="w-full">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="h-8 border-dashed w-full justify-start"
        >
          <PlusCircle class="mr-2 h-4 w-4" />
          {{ title }}
          <template v-if="selectedValues.size > 0">
            <Separator orientation="vertical" class="mx-2 h-4" />
            <Badge
              variant="outline"
              class="rounded-sm px-1 font-normal lg:hidden"
            >
              {{ selectedValues.size }} seleccionados
            </Badge>
            <div class="hidden space-x-1 lg:flex">
              <template v-if="selectedValues.size > maxDisplayedTags">
                <Badge variant="outline" class="rounded-sm px-1 font-normal">
                  {{ selectedValues.size }} seleccionados
                </Badge>
              </template>
              <template v-else>
                <Badge
                  v-for="option in selectedOptions"
                  :key="option.value"
                  variant="outline"
                  class="rounded-sm px-1 font-normal"
                >
                  {{ option.label }}
                </Badge>
              </template>
            </div>
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0" align="start">
        <Command>
          <CommandInput
            :placeholder="placeholder"
            @input="e => handleSearch((e.target as HTMLInputElement).value)"
          />
          <CommandList>
            <CommandEmpty>{{ emptyMessage }}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="option in filteredOptions"
                :key="option.value"
                :value="option"
                @select="() => handleSelect(option)"
              >
                <div
                  class="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary"
                  :class="[
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible',
                  ]"
                >
                  <Check class="h-4 w-4" />
                </div>
                <component
                  :is="option.icon"
                  v-if="option.icon"
                  class="mr-2 h-4 w-4 text-muted-foreground"
                />
                <span>{{ option.label }}</span>
              </CommandItem>
            </CommandGroup>
            <template v-if="selectedValues.size > 0">
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  :value="{ label: 'Clear filters', value: 'clear' }"
                  class="justify-center text-center"
                  @select="handleClear"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </template>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
