import { useState } from 'react';
import {
  Zap,
  Trash2,
  Download,
  Shield,
  Power,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowRight,
  Settings,
} from 'lucide-react';

interface OptimizationTask {
  id: string;
  title: string;
  description: string;
  icon: typeof Zap;
  impact: 'Alto' | 'Médio' | 'Baixo';
  estTime: string;
  applied: boolean;
  applying: boolean;
}

const impactColors = {
  Alto: 'text-error-400 bg-error-500/10 ring-error-500/20',
  Médio: 'text-warning-400 bg-warning-500/10 ring-warning-500/20',
  Baixo: 'text-success-400 bg-success-500/10 ring-success-500/20',
};

const initialTasks: OptimizationTask[] = [
  {
    id: '1',
    title: 'Limpeza de Arquivos Temporários',
    description: 'Remove arquivos cache e temporários que ocupam espaço desnecessário no disco.',
    icon: Trash2,
    impact: 'Alto',
    estTime: '2 min',
    applied: false,
    applying: false,
  },
  {
    id: '2',
    title: 'Otimizar Inicialização do Sistema',
    description: 'Desativa programas desnecessários que iniciam junto com o Windows.',
    icon: Power,
    impact: 'Alto',
    estTime: '1 min',
    applied: false,
    applying: false,
  },
  {
    id: '3',
    title: 'Atualizar Drivers',
    description: 'Verifica e instala as versões mais recentes dos drivers de hardware.',
    icon: Download,
    impact: 'Médio',
    estTime: '5 min',
    applied: false,
    applying: false,
  },
  {
    id: '4',
    title: 'Verificação de Segurança',
    description: 'Escaneia o sistema em busca de malwares e vulnerabilidades.',
    icon: Shield,
    impact: 'Médio',
    estTime: '10 min',
    applied: false,
    applying: false,
  },
  {
    id: '5',
    title: 'Desfragmentação de Disco',
    description: 'Reorganiza arquivos fragmentados para acelerar a leitura do disco.',
    icon: Settings,
    impact: 'Baixo',
    estTime: '15 min',
    applied: false,
    applying: false,
  },
  {
    id: '6',
    title: 'Boost de Desempenho em Jogos',
    description: 'Libera recursos e prioriza processos de jogos para maior FPS.',
    icon: Rocket,
    impact: 'Alto',
    estTime: '1 min',
    applied: false,
    applying: false,
  },
];

export default function Otimizacao() {
  const [tasks, setTasks] = useState<OptimizationTask[]>(initialTasks);
  const [optimizing, setOptimizing] = useState(false);

  const appliedCount = tasks.filter((t) => t.applied).length;
  const progress = Math.round((appliedCount / tasks.length) * 100);

  const applyTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, applying: true } : t))
    );
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, applying: false, applied: true } : t
        )
      );
    }, 1500);
  };

  const optimizeAll = () => {
    setOptimizing(true);
    const pending = tasks.filter((t) => !t.applied);
    pending.forEach((task, index) => {
      setTimeout(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id ? { ...t, applying: true } : t
          )
        );
        setTimeout(() => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id ? { ...t, applying: false, applied: true } : t
            )
          );
          if (index === pending.length - 1) {
            setOptimizing(false);
          }
        }, 800);
      }, index * 900);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Otimização do Sistema</h2>
        <p className="mt-1 text-sm text-base-500">
          Aplique melhorias para aumentar o desempenho do seu computador
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-base-850 to-base-900 p-6 ring-1 ring-base-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Progresso da Otimização</h3>
              <p className="text-sm text-base-500">{appliedCount} de {tasks.length} tarefas aplicadas</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary-400">{progress}%</p>
            </div>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            onClick={optimizeAll}
            disabled={optimizing || appliedCount === tasks.length}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:shadow-primary-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Zap className={`h-5 w-5 ${optimizing ? 'animate-pulse' : ''}`} />
            {optimizing
              ? 'Otimizando...'
              : appliedCount === tasks.length
              ? 'Tudo otimizado!'
              : 'Otimizar tudo agora'}
          </button>
        </div>

        <div className="rounded-2xl bg-base-850 p-6 ring-1 ring-base-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-500/10 ring-1 ring-success-500/20">
              <Rocket className="h-5 w-5 text-success-400" />
            </div>
            <h3 className="font-bold text-white">Ganho Estimado</h3>
          </div>
          <p className="text-3xl font-bold text-success-400">+23%</p>
          <p className="mt-1 text-sm text-base-500">de desempenho geral após aplicar todas as otimizações</p>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const Icon = task.icon;
          return (
            <div
              key={task.id}
              className={`flex items-center gap-4 rounded-2xl p-5 ring-1 transition-all ${
                task.applied
                  ? 'bg-success-500/5 ring-success-500/15'
                  : 'bg-base-850 ring-base-700 hover:ring-base-600'
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
                  task.applied
                    ? 'bg-success-500/15'
                    : 'bg-base-700'
                }`}
              >
                <Icon className={`h-6 w-6 ${task.applied ? 'text-success-400' : 'text-gray-400'}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-white">{task.title}</h4>
                  <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ring-1 ${impactColors[task.impact]}`}>
                    {task.impact} impacto
                  </span>
                </div>
                <p className="mt-1 text-sm text-base-500">{task.description}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-base-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>~{task.estTime}</span>
                </div>
              </div>

              {task.applied ? (
                <div className="flex items-center gap-2 shrink-0 text-success-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-semibold hidden sm:block">Aplicado</span>
                </div>
              ) : (
                <button
                  onClick={() => applyTask(task.id)}
                  disabled={task.applying}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl bg-base-700 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all hover:bg-base-600 hover:text-white disabled:opacity-50"
                >
                  {task.applying ? (
                    <>
                      <ArrowRight className="h-4 w-4 animate-pulse" />
                      Aplicando
                    </>
                  ) : (
                    <>
                      Aplicar
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
