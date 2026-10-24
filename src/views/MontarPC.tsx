import { useState, useMemo } from 'react';
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Battery,
  Fan,
  ShoppingCart,
  Check,
  Plus,
  Minus,
  Wallet,
  X,
} from 'lucide-react';

interface Part {
  id: string;
  name: string;
  brand: string;
  price: number;
  specs: string;
}

interface Category {
  id: string;
  label: string;
  icon: typeof Cpu;
  parts: Part[];
}

const categories: Category[] = [
  {
    id: 'cpu',
    label: 'Processador',
    icon: Cpu,
    parts: [
      { id: 'cpu1', name: 'Core i5-13600K', brand: 'Intel', price: 1850, specs: '14 núcleos, 5.1GHz, LGA1700' },
      { id: 'cpu2', name: 'Ryzen 7 7800X3D', brand: 'AMD', price: 2790, specs: '8 núcleos, 5.0GHz, AM5, 3D V-Cache' },
      { id: 'cpu3', name: 'Core i9-14900K', brand: 'Intel', price: 3890, specs: '24 núcleos, 6.0GHz, LGA1700' },
      { id: 'cpu4', name: 'Ryzen 5 7600', brand: 'AMD', price: 1290, specs: '6 núcleos, 5.1GHz, AM5' },
    ],
  },
  {
    id: 'gpu',
    label: 'Placa de Vídeo',
    icon: Monitor,
    parts: [
      { id: 'gpu1', name: 'RTX 4070 Super', brand: 'NVIDIA', price: 4290, specs: '12GB GDDR6X, DLSS 3.5' },
      { id: 'gpu2', name: 'RTX 4060 Ti', brand: 'NVIDIA', price: 2590, specs: '8GB GDDR6, DLSS 3' },
      { id: 'gpu3', name: 'RX 7800 XT', brand: 'AMD', price: 3490, specs: '16GB GDDR6, FSR 3' },
      { id: 'gpu4', name: 'RTX 4090', brand: 'NVIDIA', price: 13990, specs: '24GB GDDR6X, Topo de linha' },
    ],
  },
  {
    id: 'ram',
    label: 'Memória RAM',
    icon: MemoryStick,
    parts: [
      { id: 'ram1', name: 'Vengeance 16GB', brand: 'Corsair', price: 380, specs: '2x8GB DDR5 5600MHz' },
      { id: 'ram2', name: 'Trident Z5 32GB', brand: 'G.Skill', price: 890, specs: '2x16GB DDR5 6000MHz RGB' },
      { id: 'ram3', name: 'Fury Beast 64GB', brand: 'Kingston', price: 1690, specs: '2x32GB DDR5 5600MHz' },
    ],
  },
  {
    id: 'storage',
    label: 'Armazenamento',
    icon: HardDrive,
    parts: [
      { id: 'st1', name: '980 Pro 1TB', brand: 'Samsung', price: 690, specs: 'NVMe PCIe 4.0, 7000MB/s' },
      { id: 'st2', name: 'MP600 2TB', brand: 'Corsair', price: 1190, specs: 'NVMe PCIe 4.0, 7100MB/s' },
      { id: 'st3', name: 'BX500 480GB', brand: 'Crucial', specs: 'SATA SSD, 540MB/s', price: 220 },
    ],
  },
  {
    id: 'psu',
    label: 'Fonte',
    icon: Battery,
    parts: [
      { id: 'psu1', name: 'RM750e', brand: 'Corsair', price: 590, specs: '750W 80+ Gold Modular' },
      { id: 'psu2', name: 'GX850', brand: 'MSI', price: 720, specs: '850W 80+ Gold Modular' },
      { id: 'psu3', name: 'FOC 1000W', brand: 'ASUS', price: 1190, specs: '1000W 80+ Platinum ATX 3.0' },
    ],
  },
  {
    id: 'cooler',
    label: 'Refrigeração',
    icon: Fan,
    parts: [
      { id: 'cl1', name: 'AK620', brand: 'DeepCool', price: 320, specs: 'Air Cooler Dual Tower 260W' },
      { id: 'cl2', name: 'H100i Elite', brand: 'Corsair', price: 690, specs: 'Water Cooler 240mm LCD' },
      { id: 'cl3', name: 'Peerless Assassin 120', brand: 'Thermalright', price: 240, specs: 'Air Cooler Dual Tower' },
    ],
  },
];

interface SelectedPart {
  category: string;
  part: Part;
}

export default function MontarPC() {
  const [selected, setSelected] = useState<SelectedPart[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('cpu');

  const totalPrice = useMemo(
    () => selected.reduce((sum, s) => sum + s.part.price, 0),
    [selected]
  );

  const selectPart = (category: string, part: Part) => {
    setSelected((prev) => {
      const filtered = prev.filter((s) => s.category !== category);
      return [...filtered, { category, part }];
    });
  };

  const removePart = (category: string) => {
    setSelected((prev) => prev.filter((s) => s.category !== category));
  };

  const activeCat = categories.find((c) => c.id === activeCategory)!;
  const selectedInCategory = selected.find((s) => s.category === activeCategory);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Montar PC</h2>
          <p className="mt-1 text-sm text-base-500">
            Monte sua configuração ideal selecionando os melhores componentes
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 px-5 py-3 ring-1 ring-primary-500/20">
          <Wallet className="h-5 w-5 text-primary-400" />
          <div>
            <p className="text-xs text-base-500">Total</p>
            <p className="text-xl font-bold text-white">
              R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="rounded-2xl bg-base-850 p-2 ring-1 ring-base-700">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const hasPart = selected.find((s) => s.category === cat.id);
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                    isActive ? 'bg-primary-500/10 ring-1 ring-primary-500/30' : 'hover:bg-base-800'
                  }`}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary-400' : 'text-base-500'}`} />
                  <span className={`flex-1 text-sm font-medium ${isActive ? 'text-primary-300' : 'text-base-500'}`}>
                    {cat.label}
                  </span>
                  {hasPart ? (
                    <Check className="h-4 w-4 text-success-400" />
                  ) : (
                    <Plus className="h-4 w-4 text-base-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-base-500">
            {activeCat.label} — Escolha um componente
          </h3>
          {activeCat.parts.map((part) => {
            const isSelected = selectedInCategory?.part.id === part.id;
            return (
              <button
                key={part.id}
                onClick={() => selectPart(activeCat.id, part)}
                className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all ${
                  isSelected
                    ? 'bg-primary-500/10 ring-2 ring-primary-500/40'
                    : 'bg-base-850 ring-1 ring-base-700 hover:ring-base-600'
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isSelected ? 'bg-primary-500/20' : 'bg-base-700'}`}>
                  <activeCat.icon className={`h-5 w-5 ${isSelected ? 'text-primary-400' : 'text-base-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary-400">{part.brand}</span>
                  </div>
                  <p className="font-semibold text-white truncate">{part.name}</p>
                  <p className="text-xs text-base-500 mt-0.5">{part.specs}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-white">
                    R$ {part.price.toLocaleString('pt-BR')}
                  </p>
                  {isSelected && (
                    <div className="mt-1 flex items-center justify-end gap-1 text-xs text-success-400">
                      <Check className="h-3 w-3" /> Selecionado
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-4 rounded-2xl bg-base-850 p-5 ring-1 ring-base-700">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-5 w-5 text-primary-400" />
              <h3 className="font-bold text-white">Sua Configuração</h3>
            </div>

            {selected.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-base-800 mb-3">
                  <Cpu className="h-8 w-8 text-base-600" />
                </div>
                <p className="text-sm text-base-500">
                  Nenhum componente selecionado ainda.
                </p>
                <p className="text-xs text-base-600 mt-1">
                  Comece escolhendo um processador.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {selected.map((s) => {
                  const cat = categories.find((c) => c.id === s.category)!;
                  const Icon = cat.icon;
                  return (
                    <div
                      key={s.category}
                      className="group flex items-center gap-3 rounded-xl bg-base-800 p-3 ring-1 ring-base-700"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-base-700">
                        <Icon className="h-4 w-4 text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-base-500">{cat.label}</p>
                        <p className="text-sm font-semibold text-white truncate">{s.part.name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-white">
                          R$ {s.part.price.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <button
                        onClick={() => removePart(s.category)}
                        className="shrink-0 rounded-lg p-1 text-base-600 opacity-0 transition-opacity hover:text-error-400 group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {selected.length > 0 && (
              <div className="mt-4 border-t border-base-700 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-base-500">Total</span>
                  <span className="text-xl font-bold text-primary-400">
                    R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:shadow-primary-500/30">
                  <ShoppingCart className="h-4 w-4" />
                  Finalizar Configuração
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
