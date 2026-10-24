import { Activity, Zap, MessageSquare, Cpu, LayoutDashboard } from 'lucide-react';

export type ViewId = 'diagnostico' | 'otimizacao' | 'chat' | 'montar';

export interface NavItem {
  id: ViewId;
  label: string;
  icon: typeof Activity;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'diagnostico',
    label: 'Diagnóstico',
    icon: Activity,
    description: 'Análise de hardware e saúde do sistema',
  },
  {
    id: 'otimizacao',
    label: 'Otimização',
    icon: Zap,
    description: 'Melhorias de desempenho e limpeza',
  },
  {
    id: 'chat',
    label: 'Chat IA',
    icon: MessageSquare,
    description: 'Assistente técnico com inteligência artificial',
  },
  {
    id: 'montar',
    label: 'Montar PC',
    icon: Cpu,
    description: 'Monte sua configuração ideal de computador',
  },
];

export const LOGO_ICON = LayoutDashboard;
