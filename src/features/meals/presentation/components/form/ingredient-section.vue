<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Trash2 } from 'lucide-vue-next'
import type { IUnit } from '../../../interfaces/IMeal'
import type { IIngredient } from '@/features/ingredients/interfaces/IIngredient'

const selectedIngredient = ref('')
const selectedUnit = ref('')
const quantity = ref('')

const props = defineProps<{
  modelValue: Array<{
    ingredientId: number
    unitId: number
    quantity: number
  }>
  ingredients: IIngredient[]
  units: IUnit[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

const addIngredient = () => {
  if (!selectedIngredient.value || !selectedUnit.value || !quantity.value)
    return

  emit('update:modelValue', [
    ...props.modelValue,
    {
      ingredientId: Number(selectedIngredient.value),
      unitId: Number(selectedUnit.value),
      quantity: Number(quantity.value),
    },
  ])

  selectedIngredient.value = ''
  selectedUnit.value = ''
  quantity.value = ''
}

const removeIngredient = (index: number) => {
  const newValue = [...props.modelValue]
  newValue.splice(index, 1)
  emit('update:modelValue', newValue)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Ingredientes</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-5">
            <Select v-model="selectedIngredient">
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar ingrediente" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea class="h-[200px]">
                  <SelectItem
                    v-for="ingredient in ingredients"
                    :key="ingredient.id"
                    :value="ingredient.id.toString()"
                  >
                    {{ ingredient.name }}
                  </SelectItem>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>

          <div class="col-span-3">
            <Select v-model="selectedUnit">
              <SelectTrigger>
                <SelectValue placeholder="Unidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="unit in units"
                  :key="unit.id"
                  :value="unit.id.toString()"
                >
                  {{ unit.name }} ({{ unit.symbol }})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="col-span-2">
            <Input
              v-model="quantity"
              type="number"
              min="0"
              step="0.1"
              placeholder="Cantidad"
            />
          </div>

          <div class="col-span-2">
            <Button
              type="button"
              variant="outline"
              class="w-full"
              @click="addIngredient"
            >
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div v-if="modelValue.length > 0" class="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingrediente</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(ing, index) in modelValue" :key="index">
                <TableCell>
                  {{ ingredients.find(i => i.id === ing.ingredientId)?.name }}
                </TableCell>
                <TableCell>{{ ing.quantity }}</TableCell>
                <TableCell>
                  {{ units.find(u => u.id === ing.unitId)?.symbol }}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="removeIngredient(index)"
                  >
                    <Trash2 class="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
