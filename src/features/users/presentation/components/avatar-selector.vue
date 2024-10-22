<template>
  <div class="avatar-selector flex flex-col gap-4 justify-center">
    <div class="preview mb-4 p-5 flex items-center justify-center">
      <img
        :src="avatarUrl"
        alt="Avatar Preview"
        class="w-96 h-96 rounded-full"
      />
    </div>

    <div class="controls grid grid-cols-2 gap-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Seed" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Seed</SelectLabel>
            <SelectItem v-for="option in seed" :key="option" :value="option">
              {{ option }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Background Color" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Background Color</SelectLabel>
            <SelectItem
              v-for="color in backgroundColors"
              :key="color"
              :value="color"
            >
              {{ color }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Hair Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Hair Style</SelectLabel>
            <SelectItem v-for="top in topStyles" :key="top" :value="top">
              {{ top }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Hair Color" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Hair Color</SelectLabel>
            <SelectItem v-for="color in hairColors" :key="color" :value="color">
              {{ color }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Skin Color" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Skin Color</SelectLabel>
            <SelectItem v-for="color in skinColors" :key="color" :value="color">
              {{ color }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Accessory" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Accessory</SelectLabel>
            <SelectItem
              v-for="accessory in accessoryOptions"
              :key="accessory"
              :value="accessory"
            >
              {{ accessory }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Clothing Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Clothing Type</SelectLabel>
            <SelectItem v-for="type in clothingTypes" :key="type" :value="type">
              {{ type }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Clothing Color" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Clothing Color</SelectLabel>
            <SelectItem
              v-for="color in clothingColors"
              :key="color"
              :value="color"
            >
              {{ color }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const seed = ['Felix', 'Aneka']
const backgroundColors = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf']
const topStyles = [
  'bigHair',
  'bob',
  'bun',
  'curly',
  'curvy',
  'dreads',
  'fro',
  'hat',
  'hijab',
  'shortCurly',
  'shavedSides',
]
const accessoryOptions = ['none', 'eyepatch', 'kurt', 'sunglasses']
const hairColors = ['2c1b18', '4a312c', '724133', 'b58143', 'd6b370']
const skinColors = ['614335', 'ae5d29', 'd08b5b', 'edb98a', 'ffdbb4']
const clothingTypes = ['blazerAndShirt', 'hoodie', 'shirtCrewNeck']
const clothingColors = ['3c4f5c', '65c9ff', 'ff5c5c', 'ffffff']

const selectedSeed = ref(seed[0])
const selectedBackgroundColor = ref(backgroundColors[0])
const selectedTop = ref(topStyles[0])
const selectedHairColor = ref(hairColors[0])
const selectedSkinColor = ref(skinColors[0])
const selectedAccessory = ref(accessoryOptions[0])
const selectedClothingType = ref(clothingTypes[0])
const selectedClothingColor = ref(clothingColors[0])

const baseUrl = 'https://api.dicebear.com/9.x/avataaars/svg'
const avatarUrl = computed(() => {
  const params = new URLSearchParams({
    seed: selectedSeed.value,
    backgroundColor: selectedBackgroundColor.value,
    top: selectedTop.value,
    hairColor: selectedHairColor.value,
    skinColor: selectedSkinColor.value,
    accessories:
      selectedAccessory.value === 'none' ? '' : selectedAccessory.value,
    clothing: selectedClothingType.value,
    clothingColor: selectedClothingColor.value,
  })
  return `${baseUrl}?${params.toString()}`
})
</script>
