import { Dumbbell, NotebookPen, Handshake } from 'lucide-vue-next'
import type { IWorkflowStep } from '../interfaces/IWorkflowStep'

export const benefits = [
  {
    title: 'Rutinas personalizadas',
    description:
      'Crea y sigue rutinas de ejercicios adaptadas a tus objetivos y nivel de condición física.',
    icon: Dumbbell,
  },
  {
    title: 'Seguimiento de progreso',
    description:
      'Visualiza tu avance con gráficos y estadísticas detalladas de tus entrenamientos.',
    icon: NotebookPen,
  },
  {
    title: 'Asesoramiento profesional',
    description:
      'Recibe orientación de entrenadores certificados para maximizar tus resultados.',
    icon: Handshake,
  },
]

export const iconSize: number = 45
export const iconStrokeWidth: number = 1.5

export const workflowSteps: IWorkflowStep[] = [
  {
    number: 1,
    title: 'Contacta a un entrenador',
    description:
      'Utiliza nuestro formulario para solicitar ser asignado a un entrenador certificado.',
  },
  {
    number: 2,
    title: 'Obtén tu cuenta',
    description:
      'Tu entrenador creará tu perfil y te proporcionará las credenciales de acceso.',
  },
  {
    number: 3,
    title: 'Comienza tu entrenamiento',
    description:
      'Accede a tu rutina personalizada y comienza a registrar tu progreso.',
  },
]
