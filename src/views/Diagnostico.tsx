import { useEffect, useState } from 'react';
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Thermometer,
  Gauge,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  unit: string;
  icon: typeof Cpu;
  color: 'primary' | 'accent' | 'success' | 'warning' | 'error';
}

interface ComponentStatus {
  name: string;
  status: 'ok' | 'warning' | 'error';
  detail: string;
}

const colorMap = {
  primary: 'from-primary-500 to-primary-600',
  accent: 'from-accent-500 to-accent-600',
  success: 'from-success-500 to-success-600',
  warning: 'from-warning-500 to-warning-600',
  error: 'from-error-500 to-error-600',
};

const textColorMap = {
  primary: 'text-primary-400',
  accent: 'text-accent-400',
  success: 'text-success-400',
  warning: 'text-warning-400',
  error: 'text-error-400',
};

const statusConfig = {
  ok: { icon: CheckCircle2, color: 'text-success-400', bg: 'bg-success-500/10', ring: 'ring-success-500/20', label: 'Saudável' },
  warning: { icon: AlertTriangle, color: 'text-warning-400', bg: 'bg-warning-500/10', ring: 'ring-warning-500/20', label: 'Atenção' },
  error: { icon: XCircle, color: 'text-error-400', bg: 'bg-error-500/10', ring: 'ring-error-500/20', label: 'Crítico' },
};

function CircularProgress({ value, color }: { value: number; color: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-28 w-28">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#1c2330"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" className={textColorMap[color as keyof typeof textColorMap]} />
            <stop offset="100%" stopColor="currentColor" className={textColorMap[color as keyof typeof textColorMap]} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${textColorMap[color as keyof typeof textColorMap]}`}>
          {Math.round(value)}
        </span>
        <span className="text-xs text-base-500">%</span>
      </div>
    </div>
  );
}

export default function Diagnostico() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'CPU', value: 34, unit: '%', icon: Cpu, color: 'primary' },
    { label: 'Memória RAM', value: 62, unit: '%', icon: MemoryStick, color: 'accent' },
    { label: 'Disco (SSD)', value: 71, unit: '%', icon: HardDrive, color: 'warning' },
    { label: 'GPU', value: 28, unit: '%', icon: Gauge, color: 'success' },
  ]);

  const [temperature, setTemperature] = useState(52);
  const [scanning, setScanning] = useState(false);
  const [components] = useState<ComponentStatus[]>([
    { name: 'Processador Intel Core i7-13700K', status: 'ok', detail: 'Funcionando normalmente' },
    { name: 'Memória RAM 32GB DDR5', status: 'ok', detail: 'Sem falhas detectadas' },
    { name: 'SSD NVMe 1TB', status: 'warning', detail: '78% de capacidade utilizada' },
    { name: 'GPU NVIDIA RTX 4070', status: 'ok', detail: 'Drivers atualizados' },
    { name: 'Fonte 750W 80+ Gold', status: 'ok', detail: 'Tensão estável' },
    { name: 'Cooler CPU', status: 'warning', detail: 'Rotação acima do ideal' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: Math.max(
            5,
            Math.min(95, m.value + (Math.random() - 0.5) * 12)
          ),
        }))
      );
      setTemperature((prev) =>
        Math.max(40, Math.min(75, prev + (Math.random() - 0.5) * 4))
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  const okCount = components.filter((c) => c.status === 'ok').length;
  const warningCount = components.filter((c) => c.status === 'warning').length;
  const errorCount = components.filter((c) => c.status === 'error').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Diagnóstico do Sistema</h2>
          <p className="mt-1 text-sm text-base-500">
            Monitoramento em tempo real dos componentes do seu computador
          </p>
        </div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="flex items-center gap-2 rounded-xl bg-primary-500/10 px-4 py-2.5 text-sm font-semibold text-primary-300 ring-1 ring-primary-500/30 transition-all hover:bg-primary-500/20 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
          {scanning ? 'Escaneando...' : 'Escanear novamente'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-base-800 p-4 ring-1 ring-base-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success-400" />
            <span className="text-sm text-base-500">Saudáveis</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{okCount}</p>
        </div>
        <div className="rounded-2xl bg-base-800 p-4 ring-1 ring-base-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning-400" />
            <span className="text-sm text-base-500">Atenção</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{warningCount}</p>
        </div>
        <div className="rounded-2xl bg-base-800 p-4 ring-1 ring-base-700">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-error-400" />
            <span className="text-sm text-base-500">Críticos</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{errorCount}</p>
        </div>
        <div className="rounded-2xl bg-base-800 p-4 ring-1 ring-base-700">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-accent-400" />
            <span className="text-sm text-base-500">Temp. CPU</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            {Math.round(temperature)}°<span className="text-base text-base-500">C</span>
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="flex items-center gap-6 rounded-2xl bg-base-850 p-5 ring-1 ring-base-700"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[metric.color]} shadow-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <CircularProgress value={metric.value} color={metric.color} />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{metric.label}</h3>
                <p className="mt-1 text-sm text-base-500">Uso atual</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-base-700">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${colorMap[metric.color]} transition-all duration-700`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-base-850 p-6 ring-1 ring-base-700">
        <h3 className="mb-4 text-lg font-bold text-white">Status dos Componentes</h3>
        <div className="space-y-2">
          {components.map((comp) => {
            const cfg = statusConfig[comp.status];
            const StatusIcon = cfg.icon;
            return (
              <div
                key={comp.name}
                className={`flex items-center gap-3 rounded-xl ${cfg.bg} px-4 py-3 ring-1 ${cfg.ring}`}
              >
                <StatusIcon className={`h-5 w-5 shrink-0 ${cfg.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{comp.name}</p>
                  <p className="text-xs text-base-500">{comp.detail}</p>
                </div>
                <span className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold ${cfg.bg} ${cfg.color} ring-1 ${cfg.ring}`}>
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
