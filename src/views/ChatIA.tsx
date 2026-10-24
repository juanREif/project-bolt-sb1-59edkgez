import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Cpu, Wrench, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  { icon: Cpu, text: 'Qual processador devo escolher para jogos?' },
  { icon: Wrench, text: 'Meu PC está lento, o que posso fazer?' },
  { icon: Lightbulb, text: 'Dicas para melhorar o desempenho do meu PC' },
];

const aiResponses: Record<string, string> = {
  processador:
    'Para jogos, recomendo processadores com alta frequência single-core. As melhores opções atuais são:\n\n• **Intel Core i5-13600K** — excelente custo-benefício para jogos\n• **AMD Ryzen 7 7800X3D** — o melhor para jogos graças à tecnologia 3D V-Cache\n• **Intel Core i9-14900K** — desempenho máximo, ideal para jogos + streaming\n\nA escolha depende do seu orçamento e se você também faz streaming ou edição de vídeo.',
  lento:
    'Um PC lento pode ter várias causas. Aqui estão os passos que recomendo:\n\n1. **Verifique o uso de CPU e RAM** — vá em Diagnóstico para ver os dados em tempo real\n2. **Limpe arquivos temporários** — use a aba Otimização para remover caches\n3. **Desative programas de inicialização** — muitos apps iniciam sem necessidade\n4. **Verifique temperaturas** — superaquecimento causa throttling (redução de performance)\n5. **Considere um SSD** — se ainda usa HDD, a mudança para SSD é a maior melhoria possível\n\nQuer que eu analise algo específico?',
  desempenho:
    'Aqui estão as melhores formas de melhorar o desempenho do seu PC:\n\n• **Atualize os drivers** da GPU regularmente\n• **Aumente a RAM** para pelo menos 16GB (32GB ideal para jogos modernos)\n• **Use um SSD NVMe** como disco principal\n• **Mantenha o sistema limpo** de poeira para evitar superaquecimento\n• **Ative o modo de alto desempenho** nas opções de energia do Windows\n• **Feche apps em segundo plano** que consomem recursos\n\nPosso ajudar com algum desses pontos em detalhe!',
  default:
    'Olá! Sou o assistente IA do TechHub. Posso ajudar com:\n\n• Escolha de hardware e componentes\n• Diagnóstico de problemas de desempenho\n• Dicas de otimização do sistema\n• Montagem e compatibilidade de PCs\n\nO que você gostaria de saber?',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('processador') || lower.includes('cpu') || lower.includes('jogo')) return aiResponses.processador;
  if (lower.includes('lento') || lower.includes('devagar') || lower.includes('travando')) return aiResponses.lento;
  if (lower.includes('desempenho') || lower.includes('melhorar') || lower.includes('otimizar') || lower.includes('dica')) return aiResponses.desempenho;
  return aiResponses.default;
}

export default function ChatIA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: aiResponses.default,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getResponse(text),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-full flex-col animate-fade-in">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Chat IA</h2>
            <p className="text-sm text-base-500">Assistente técnico com inteligência artificial</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl bg-base-900 ring-1 ring-base-700 p-4 sm:p-6 space-y-4 min-h-[300px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                msg.role === 'user'
                  ? 'bg-base-600'
                  : 'bg-gradient-to-br from-primary-500 to-accent-500'
              }`}
            >
              {msg.role === 'user' ? (
                <User className="h-5 w-5 text-gray-300" />
              ) : (
                <Bot className="h-5 w-5 text-white" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary-500/10 text-gray-200 ring-1 ring-primary-500/20'
                  : 'bg-base-800 text-gray-300 ring-1 ring-base-700'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="rounded-2xl bg-base-800 px-4 py-3 ring-1 ring-base-700">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-base-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-base-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-base-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {messages.length <= 1 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {suggestions.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.text}
                onClick={() => send(s.text)}
                className="flex items-center gap-2 rounded-xl bg-base-850 px-4 py-3 text-left text-sm text-base-500 ring-1 ring-base-700 transition-all hover:text-gray-300 hover:ring-base-600"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary-400" />
                <span className="line-clamp-2">{s.text}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Digite sua pergunta sobre hardware, desempenho..."
          className="flex-1 rounded-xl bg-base-800 px-4 py-3 text-sm text-white placeholder-base-500 ring-1 ring-base-700 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || typing}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:shadow-primary-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:block">Enviar</span>
        </button>
      </div>
    </div>
  );
}
