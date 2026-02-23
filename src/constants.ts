import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  DollarSign, 
  Settings, 
  Star, 
  Video, 
  HelpCircle,
  User,
  Ruler,
  Zap,
  Utensils,
  Baby,
  FlaskConical,
  ClipboardList,
  FileText,
  MessageSquare,
  Target,
  FileCheck,
  ClipboardCheck,
  BarChart3
} from 'lucide-react';
import { NavItem, PatientMenuItem, Meal } from './types';

export const MAIN_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Users, label: 'Pacientes', id: 'pacientes' },
  { icon: BookOpen, label: 'Diários', id: 'diarios' },
  { icon: BarChart3, label: 'Análises', id: 'analises' },
  { icon: DollarSign, label: 'Financeiro', id: 'financeiro' },
  { icon: Settings, label: 'Configurações', id: 'configuracoes' },
  { icon: Star, label: 'Meus favoritos', id: 'favoritos' },
  { icon: Video, label: 'Videochamada', id: 'videochamada' },
  { icon: HelpCircle, label: 'Ajuda', id: 'ajuda' },
];

export const PATIENT_MENU: PatientMenuItem[] = [
  { icon: User, label: 'Editar paciente', id: 'edit' },
  { icon: Ruler, label: 'Antropometria', id: 'antropometria' },
  { icon: Zap, label: 'Cálculo energético', id: 'calculo' },
  { icon: Utensils, label: 'Plano alimentar', id: 'plano' },
  { icon: Baby, label: 'Acompanhamento gestacional', id: 'gestacional' },
  { icon: FlaskConical, label: 'Manipulado', id: 'manipulado' },
  { icon: ClipboardList, label: 'Exame', id: 'exame' },
  { icon: FileText, label: 'Anamnese', id: 'anamnese' },
  { icon: MessageSquare, label: 'Pré-consulta', id: 'pre-consulta' },
  { icon: BookOpen, label: 'Diário alimentar', id: 'diario-alimentar' },
  { icon: FileCheck, label: 'Instrução nutricional', id: 'instrucao' },
  { icon: ClipboardCheck, label: 'Prontuário', id: 'prontuario' },
  { icon: DollarSign, label: 'Financeiro e recibo', id: 'financeiro-recibo' },
  { icon: Target, label: 'Metas', id: 'metas' },
  { icon: FileText, label: 'Atestado', id: 'atestado' },
  { icon: ClipboardList, label: 'Questionários de saúde', id: 'questionarios' },
];

export const INITIAL_MEALS: Meal[] = [
  {
    id: '1',
    time: '08:00',
    name: 'Café da manhã',
    protein: 19.6,
    carbs: 30.5,
    fat: 20.2,
    calories: 384,
    image: 'https://picsum.photos/seed/breakfast/100/100',
    foods: [
      { id: 'f1', name: 'Ovo cozido (2 unidades)', protein: 12, carbs: 1, fat: 10, calories: 140 },
      { id: 'f2', name: 'Pão integral (2 fatias)', protein: 7.6, carbs: 29.5, fat: 10.2, calories: 244 },
    ]
  }
];
