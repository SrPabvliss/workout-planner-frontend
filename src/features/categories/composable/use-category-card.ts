import { computed } from 'vue'
import type { ICategory } from '../interfaces/ICategory'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function useCategoryCard(props: {
  category?: ICategory | null
  isAddCard: boolean
}) {
  const handleClick = (emit: (event: 'add') => void) => {
    if (props.isAddCard) {
      emit('add')
    }
  }

  const cardClasses = computed(() => ({
    base: 'cursor-pointer transition-all duration-200 hover:shadow-lg overflow-hidden relative h-[140px]',
    conditional: {
      'hover:bg-gray-50 dark:hover:bg-slate-800': props.isAddCard,
      'hover:scale-[1.02]': !props.isAddCard,
      'border-dashed': props.isAddCard,
    },
  }))

  const formatters = {
    getIconByType: (type: string) => {
      return type === 'MEAL' ? 'mdi:food-apple' : 'mdi:dumbbell'
    },

    getCategoryTypeLabel: (type: string) => {
      return type === 'MEAL' ? 'Alimentación' : 'Ejercicio'
    },

    formatDate: (date: string) => {
      return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })
    },
  }

  const styles = computed(() => {
    if (!props.category) {
      return {
        getGradientClass: () => '',
        getIconBgClass: () => '',
        getBadgeClass: () => '',
      }
    }

    return {
      getGradientClass: () => {
        if (props.category?.color) {
          return `from-[${props.category.color}]/80 to-[${props.category.color}]`
        }
        return props.category?.type === 'MEAL'
          ? 'from-green-500 to-emerald-700'
          : 'from-blue-500 to-indigo-700'
      },

      getIconBgClass: () => {
        if (props.category?.color) {
          return `bg-[${props.category.color}]`
        }
        return props.category?.type === 'MEAL'
          ? 'bg-green-500 dark:bg-green-600'
          : 'bg-blue-500 dark:bg-blue-600'
      },

      getBadgeClass: () => {
        if (props.category?.color) {
          return `bg-[${props.category.color}]/10 text-[${props.category.color}] dark:bg-[${props.category.color}]/20 dark:text-[${props.category.color}]/90`
        }
        return props.category?.type === 'MEAL'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      },
    }
  })

  return {
    handleClick,
    cardClasses,
    formatters,
    styles,
  }
}
