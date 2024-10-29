import type { LinkProp } from '../layout/nav-list.vue'

export default function useNavLinks(roleType: string) {
  const links = {
    trainer: [
      {
        title: 'Estudiantes',
        label: '',
        icon: 'lucide:user-circle',
        variant: 'ghost',
        href: 'estudiantes',
      },
      {
        title: 'Alimentación',
        label: '',
        icon: 'lucide:apple',
        variant: 'ghost',
        children: [
          {
            title: 'Comidas',
            label: '',
            icon: 'lucide:utensils',
            variant: 'ghost',
            href: 'comidas',
          },
          {
            title: 'Categorías',
            label: '',
            icon: 'lucide:list',
            variant: 'ghost',
            href: 'categorias-alimentacion',
          },
        ],
      },
      {
        title: 'Actividad Física',
        label: '',
        icon: 'lucide:dumbbell',
        variant: 'ghost',
        children: [
          {
            title: 'Ejercicios',
            label: '',
            icon: 'lucide:clipboard-list',
            variant: 'ghost',
            href: 'ejercicios',
          },
          {
            title: 'Categorías',
            label: '',
            icon: 'lucide:list',
            variant: 'ghost',
            href: 'categorias-ejercicios',
          },
        ],
      },
      {
        title: 'Rutinas',
        label: '',
        icon: 'lucide:clock',
        variant: 'ghost',
        href: 'rutinas',
      },
      {
        title: 'Mi perfil',
        label: '',
        icon: 'lucide:user-circle',
        variant: 'ghost',
        href: 'perfil',
      },
    ],
    student: [
      /*...*/
    ] as const,
  }

  return links[roleType as keyof typeof links] as LinkProp[]
}
