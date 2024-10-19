import type { LinkProp } from '../layout/nav-list.vue'

export default function useNavLinks(roleType: string) {
  const links = {
    trainer: [
      {
        title: 'Estudiantes',
        label: '',
        icon: 'lucide:user-circle',
        variant: 'ghost',
        href: 'usuarios',
      },
      {
        title: 'Comidas',
        label: '',
        icon: 'lucide:apple',
        variant: 'ghost',
        href: 'comidas',
      },
      {
        title: 'Ejercicios',
        label: '',
        icon: 'lucide:clipboard-list',
        variant: 'ghost',
        href: 'ejercicios',
      },
      {
        title: 'Rutinas',
        label: '',
        icon: 'lucide:clock',
        variant: 'ghost',
        href: 'rutinas',
      },
    ],
    student: [
      {
        title: 'Projects',
        label: '',
        icon: 'lucide:layout-dashboard',
        variant: 'ghost',
        href: 'projects',
      },
      {
        title: 'Reports',
        label: '',
        icon: 'lucide:file-text',
        variant: 'ghost',
      },
    ] as const,
  }

  return links[roleType as keyof typeof links] as LinkProp[]
}
