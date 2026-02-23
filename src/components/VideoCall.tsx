import React from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Settings, Users, MessageSquare, Share2, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

export const VideoCall = () => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);
  const [activeCall, setActiveCall] = React.useState(false);

  const upcomingCalls = [
    { id: '1', patient: 'Ana Carolina', time: '16:30', status: 'ready' },
    { id: '2', patient: 'João Silva', time: '17:15', status: 'upcoming' },
    { id: '3', patient: 'Mariana Costa', time: '18:00', status: 'upcoming' },
  ];

  if (activeCall) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col animate-in fade-in duration-500">
        {/* Video Area */}
        <div className="flex-1 relative flex items-center justify-center p-8">
          <div className="w-full h-full max-w-5xl bg-slate-800 rounded-3xl overflow-hidden relative shadow-2xl border border-slate-700">
            {/* Remote Video Placeholder */}
            <img 
              src="https://picsum.photos/seed/patient/1280/720" 
              alt="Patient" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <p className="text-white font-bold text-sm">Ana Carolina (Paciente)</p>
            </div>

            {/* Local Video Preview */}
            <div className="absolute top-6 right-6 w-48 h-32 bg-slate-700 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
              {!isVideoOff ? (
                <img 
                  src="https://picsum.photos/seed/doctor/400/300" 
                  alt="Doctor" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <VideoOff className="w-8 h-8 text-slate-600" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
                <p className="text-[10px] text-white font-bold">Você</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-12">
          <div className="flex items-center gap-4">
            <button className="p-3 bg-slate-800 text-slate-400 rounded-2xl hover:bg-slate-700 transition-colors">
              <Users className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-800 text-slate-400 rounded-2xl hover:bg-slate-700 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "p-4 rounded-2xl transition-all active:scale-95",
                isMuted ? "bg-red-500 text-white" : "bg-slate-800 text-white hover:bg-slate-700"
              )}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => setActiveCall(false)}
              className="p-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={cn(
                "p-4 rounded-2xl transition-all active:scale-95",
                isVideoOff ? "bg-red-500 text-white" : "bg-slate-800 text-white hover:bg-slate-700"
              )}
            >
              {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-3 bg-slate-800 text-slate-400 rounded-2xl hover:bg-slate-700 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-800 text-slate-400 rounded-2xl hover:bg-slate-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Videochamada</h1>
          <p className="text-slate-500 text-sm">Realize teleconsultas com seus pacientes com segurança e qualidade.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all">Testar Equipamento</button>
          <button className="px-4 py-2 bg-nutrio-green text-white rounded-lg font-bold text-sm shadow-sm hover:bg-nutrio-green-dark transition-all">Agendar Nova</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-8 bg-slate-900 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Próxima Consulta</h2>
              <p className="text-slate-400 text-sm mb-8">Sua consulta com Ana Carolina começa em 15 minutos.</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Video className="w-8 h-8 text-nutrio-green" />
                </div>
                <div>
                  <p className="font-bold text-lg">Ana Carolina</p>
                  <p className="text-nutrio-green text-sm font-bold">Hoje às 16:30</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveCall(true)}
                className="px-8 py-3 bg-nutrio-green text-white font-bold rounded-xl hover:bg-nutrio-green-dark transition-all shadow-lg shadow-green-500/20"
              >
                Entrar na Sala
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-nutrio-green/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          </div>

          <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h3 className="font-bold text-slate-800">Histórico de Chamadas</h3>
            </div>
            <div className="p-0">
              {[
                { patient: 'Maria Silva', date: '20/03/2024', duration: '45 min', type: 'Retorno' },
                { patient: 'Carlos Souza', date: '19/03/2024', duration: '60 min', type: 'Primeira Vez' },
                { patient: 'Ana Costa', date: '18/03/2024', duration: '32 min', type: 'Acompanhamento' },
              ].map((call, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                      {call.patient[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{call.patient}</p>
                      <p className="text-[10px] text-slate-400">{call.date} • {call.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500">{call.duration}</p>
                    <button className="text-[10px] font-bold text-nutrio-green hover:underline">Ver gravação</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-slate-800 mb-4">Agenda de Hoje</h3>
            <div className="space-y-4">
              {upcomingCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-nutrio-green animate-pulse" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">{call.patient}</p>
                      <p className="text-[10px] text-slate-400">{call.time}</p>
                    </div>
                  </div>
                  {call.status === 'ready' && (
                    <button 
                      onClick={() => setActiveCall(true)}
                      className="px-3 py-1 bg-nutrio-green text-white text-[10px] font-bold rounded-lg"
                    >
                      Iniciar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-nutrio-green/5 border-nutrio-green/20">
            <h3 className="font-bold text-nutrio-green mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Segurança
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Todas as videochamadas são criptografadas de ponta a ponta e seguem as normas da LGPD e resoluções do conselho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
