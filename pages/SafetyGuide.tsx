
import React from 'react';

const SafetyGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-gray-800 mb-4">Guia de Segurança e Reencontro</h1>
      <p className="text-gray-500 text-lg mb-12 font-medium">Sua segurança é nossa prioridade máxima. Leia atentamente antes de marcar encontros.</p>

      <div className="space-y-12">
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12" y1="17" y2="17.01"/></svg>
            </div>
            Como Identificar Golpes
          </h2>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex-shrink-0 flex items-center justify-center text-xs font-black">1</div>
              <div>
                <p className="font-bold text-gray-800">Pedido de Recompensa Antecipada</p>
                <p className="text-sm text-gray-500">Nunca envie dinheiro para "gasolina", "transporte" ou "clínica veterinária" antes de ver o animal pessoalmente.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex-shrink-0 flex items-center justify-center text-xs font-black">2</div>
              <div>
                <p className="font-bold text-gray-800">Localização Misteriosa</p>
                <p className="text-sm text-gray-500">Desconfie se a pessoa se recusa a dizer onde está ou se o local parece ser muito isolado.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex-shrink-0 flex items-center justify-center text-xs font-black">3</div>
              <div>
                <p className="font-bold text-gray-800">Urgência Artificial</p>
                <p className="text-sm text-gray-500">Gospistas costumam colocar pressão: "Se você não pagar agora, vou ter que doar ele". Mantenha a calma.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="bg-emerald-600 p-8 rounded-[2.5rem] shadow-xl text-white">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            Dicas para um Encontro Seguro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
              <p className="font-black mb-2">Locais Públicos</p>
              <p className="text-sm text-emerald-50 text-opacity-80">Marque em frente a delegacias, shopping centers ou praças movimentadas durante o dia.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
              <p className="font-black mb-2">Vá Acompanhado</p>
              <p className="text-sm text-emerald-50 text-opacity-80">Nunca vá a um encontro de resgate sozinho. Leve pelo menos um amigo ou familiar.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-6">Como Abordar um Cão de Rua</h2>
          <div className="space-y-4 text-gray-600">
            <p>1. Não corra em direção ao animal, isso pode assustá-lo.</p>
            <p>2. Aproxime-se lateralmente, nunca de frente ou por trás.</p>
            <p>3. Use comida (petiscos) para ganhar a confiança gradualmente.</p>
            <p>4. Evite contato visual direto prolongado, que pode ser interpretado como ameaça.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SafetyGuide;
