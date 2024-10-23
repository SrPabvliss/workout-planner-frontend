export interface AvatarOption {
  id: string
  label: string
  value: string
}

export interface AvatarCategory {
  id: string
  label: string
  spanishLabel: string
  options: AvatarOption[]
}

export const AVATAR_CUSTOMIZATION_OPTIONS: AvatarCategory[] = [
  {
    id: 'eyes',
    label: 'Eyes',
    spanishLabel: 'Ojos',
    options: [
      { id: 'closed', label: 'Closed', value: 'closed' },
      { id: 'cry', label: 'Cry', value: 'cry' },
      { id: 'default', label: 'Default', value: 'default' },
      { id: 'eyeRoll', label: 'Eye Roll', value: 'eyeRoll' },
      { id: 'happy', label: 'Happy', value: 'happy' },
      { id: 'hearts', label: 'Hearts', value: 'hearts' },
      { id: 'side', label: 'Side', value: 'side' },
      { id: 'squint', label: 'Squint', value: 'squint' },
      { id: 'surprised', label: 'Surprised', value: 'surprised' },
      { id: 'wink', label: 'Wink', value: 'wink' },
      { id: 'winkWacky', label: 'Wink Wacky', value: 'winkWacky' },
      { id: 'xDizzy', label: 'X Dizzy', value: 'xDizzy' },
    ],
  },
  {
    id: 'hairColor',
    label: 'Hair Color',
    spanishLabel: 'Color de pelo',
    options: [
      { id: '2c1b18', label: 'Dark Brown', value: '2c1b18' },
      { id: '4a312c', label: 'Brown', value: '4a312c' },
      { id: '724133', label: 'Auburn', value: '724133' },
      { id: 'a55728', label: 'Light Brown', value: 'a55728' },
      { id: 'b58143', label: 'Sandy', value: 'b58143' },
      { id: 'c93305', label: 'Red', value: 'c93305' },
      { id: 'd6b370', label: 'Blonde', value: 'd6b370' },
      { id: 'e8e1e1', label: 'Platinum', value: 'e8e1e1' },
      { id: 'ecdcbf', label: 'Light Blonde', value: 'ecdcbf' },
      { id: 'f59797', label: 'Pink', value: 'f59797' },
    ],
  },
  {
    id: 'skinColor',
    label: 'Skin Color',
    spanishLabel: 'Color de piel',
    options: [
      { id: '614335', label: 'Dark Brown', value: '614335' },
      { id: 'ae5d29', label: 'Brown', value: 'ae5d29' },
      { id: 'd08b5b', label: 'Light Brown', value: 'd08b5b' },
      { id: 'edb98a', label: 'Light', value: 'edb98a' },
      { id: 'f8d25c', label: 'Warm', value: 'f8d25c' },
      { id: 'fd9841', label: 'Golden', value: 'fd9841' },
      { id: 'ffdbb4', label: 'Fair', value: 'ffdbb4' },
    ],
  },
  {
    id: 'top',
    label: 'Hairstyle',
    spanishLabel: 'Estilo de pelo',
    options: [
      { id: 'bigHair', label: 'Big Hair', value: 'bigHair' },
      { id: 'bob', label: 'Bob', value: 'bob' },
      { id: 'bun', label: 'Bun', value: 'bun' },
      { id: 'curly', label: 'Curly', value: 'curly' },
      { id: 'curvy', label: 'Curvy', value: 'curvy' },
      { id: 'dreads', label: 'Dreads', value: 'dreads' },
      { id: 'dreads01', label: 'Dreads 1', value: 'dreads01' },
      { id: 'dreads02', label: 'Dreads 2', value: 'dreads02' },
      { id: 'frida', label: 'Frida', value: 'frida' },
      { id: 'frizzle', label: 'Frizzle', value: 'frizzle' },
      { id: 'fro', label: 'Fro', value: 'fro' },
      { id: 'froBand', label: 'Fro Band', value: 'froBand' },
      { id: 'hat', label: 'Hat', value: 'hat' },
      { id: 'hijab', label: 'Hijab', value: 'hijab' },
      { id: 'longButNotTooLong', label: 'Long', value: 'longButNotTooLong' },
      { id: 'miaWallace', label: 'Mia Wallace', value: 'miaWallace' },
      { id: 'shaggy', label: 'Shaggy', value: 'shaggy' },
      { id: 'shaggyMullet', label: 'Shaggy Mullet', value: 'shaggyMullet' },
      { id: 'shavedSides', label: 'Shaved Sides', value: 'shavedSides' },
      { id: 'shortCurly', label: 'Short Curly', value: 'shortCurly' },
      { id: 'shortFlat', label: 'Short Flat', value: 'shortFlat' },
      { id: 'shortRound', label: 'Short Round', value: 'shortRound' },
      { id: 'shortWaved', label: 'Short Waved', value: 'shortWaved' },
      { id: 'sides', label: 'Sides', value: 'sides' },
      { id: 'straight01', label: 'Straight 1', value: 'straight01' },
      { id: 'straight02', label: 'Straight 2', value: 'straight02' },
      {
        id: 'straightAndStrand',
        label: 'Straight And Strand',
        value: 'straightAndStrand',
      },
      { id: 'theCaesar', label: 'The Caesar', value: 'theCaesar' },
      {
        id: 'theCaesarAndSidePart',
        label: 'Caesar Side Part',
        value: 'theCaesarAndSidePart',
      },
      { id: 'turban', label: 'Turban', value: 'turban' },
      { id: 'winterHat1', label: 'Winter Hat 1', value: 'winterHat1' },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    spanishLabel: 'Ropa',
    options: [
      {
        id: 'blazerAndShirt',
        label: 'Blazer and Shirt',
        value: 'blazerAndShirt',
      },
      {
        id: 'blazerAndSweater',
        label: 'Blazer and Sweater',
        value: 'blazerAndSweater',
      },
      {
        id: 'collarAndSweater',
        label: 'Collar and Sweater',
        value: 'collarAndSweater',
      },
      { id: 'graphicShirt', label: 'Graphic Shirt', value: 'graphicShirt' },
      { id: 'hoodie', label: 'Hoodie', value: 'hoodie' },
      { id: 'overall', label: 'Overall', value: 'overall' },
      { id: 'shirtCrewNeck', label: 'Crew Neck Shirt', value: 'shirtCrewNeck' },
      {
        id: 'shirtScoopNeck',
        label: 'Scoop Neck Shirt',
        value: 'shirtScoopNeck',
      },
      { id: 'shirtVNeck', label: 'V-Neck Shirt', value: 'shirtVNeck' },
    ],
  },
  {
    id: 'clothesColor',
    label: 'Clothing Color',
    spanishLabel: 'Color de ropa',
    options: [
      { id: '3c4f5c', label: 'Navy Blue', value: '3c4f5c' },
      { id: '65c9ff', label: 'Light Blue', value: '65c9ff' },
      { id: '262e33', label: 'Dark', value: '262e33' },
      { id: '5199e4', label: 'Blue', value: '5199e4' },
      { id: '25557c', label: 'Dark Blue', value: '25557c' },
      { id: '929598', label: 'Gray', value: '929598' },
      { id: 'a7ffc4', label: 'Mint Green', value: 'a7ffc4' },
      { id: 'b1e2ff', label: 'Sky Blue', value: 'b1e2ff' },
      { id: 'e6e6e6', label: 'Light Gray', value: 'e6e6e6' },
      { id: 'ff5c5c', label: 'Red', value: 'ff5c5c' },
      { id: 'ff488e', label: 'Pink', value: 'ff488e' },
      { id: 'ffafb9', label: 'Light Pink', value: 'ffafb9' },
      { id: 'ffffb1', label: 'Light Yellow', value: 'ffffb1' },
      { id: 'ffffff', label: 'White', value: 'ffffff' },
    ],
  },
]

export const DEFAULT_AVATAR_OPTIONS = {
  accessories: 'kurt',
  eyes: 'default',
  facialHair: 'beardLight',
  hairColor: '4a312c',
  skinColor: 'ae5d29',
  top: 'bigHair',
  clothing: 'blazerAndShirt',
  clothesColor: '3c4f5c',
}
