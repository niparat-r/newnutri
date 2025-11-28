import React from 'react';
import { AnalysisResponse } from '../types';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

interface AnalysisViewProps {
  analysis: AnalysisResponse;
  loading: boolean;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis, loading }) => {
  if (loading) {
    return (
      <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl animate-pulse flex flex-col items-center justify-center min-h-[300px]">
        <svg className="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-bold">Nutri Advisor กำลังวิเคราะห์...</p>
      </div>
    );
  }

  const chartData = [
    { name: 'Health Score', uv: analysis.health_score_overall * 10, fill: '#10b981' }
  ];

  return (
    <div className="rounded-2xl bg-white shadow-xl border border-indigo-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🤖 Nutri Advisor Feedback
        </h2>
        <p className="opacity-90">{analysis.summary_th}</p>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Score & Verdict */}
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="h-40 w-40 relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <RadialBarChart innerRadius="70%" outerRadius="100%" barSize={10} data={chartData} startAngle={90} endAngle={-270}>
                     <RadialBar background dataKey="uv" cornerRadius={10} />
                   </RadialBarChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                    <span className="text-4xl font-bold">{analysis.health_score_overall}</span>
                    <span className="text-xs text-slate-400">/ 10</span>
                 </div>
             </div>
             <div className="mt-4 text-center">
                <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
                  {analysis.evaluation_th}
                </span>
             </div>
          </div>

          {/* Right: Advice & Risks */}
          <div className="flex-[2] space-y-4">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                ⚠️ สิ่งที่ควรระวัง
              </h3>
              <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                {analysis.risk_factors_th.map((risk, idx) => (
                  <li key={idx}>{risk}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-2">💡 คำแนะนำ</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{analysis.advice_th}</p>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        {analysis.suggested_alternatives.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="font-bold text-emerald-600 mb-4">✨ ทางเลือกที่สุขภาพดีกว่า</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.suggested_alternatives.map((alt, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                   <div className="min-w-8 h-8 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-xs font-bold">
                      {alt.from_category === 'main_dish' ? 'M' : alt.from_category === 'snack' ? 'S' : 'D'}
                   </div>
                   <div>
                     <p className="font-bold text-slate-800 text-sm">{alt.name_th}</p>
                     <p className="text-xs text-slate-500 mt-1">{alt.reason_th}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisView;