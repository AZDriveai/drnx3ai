// src/components/ModelSelector.tsx
'use client';

import { useState } from 'react';

interface ModelSelectorProps {
  onGenerate: (modelType: string, systemPrompt: string) => void;
  loading: boolean;
}

export default function ModelSelector({ onGenerate, loading }: ModelSelectorProps) {
  const [modelType, setModelType] = useState<'deepseek' | 'huggingface'>('deepseek');
  const [systemPrompt, setSystemPrompt] = useState('systemPrompt_Essential.ts');

  const systemPromptOptions = [
    { value: 'systemPrompt_Essential.ts', label: 'النموذج الأساسي' },
    { value: 'systemPrompt_Normal.ts', label: 'النموذج العادي' },
    { value: 'systemPrompt_complex.ts', label: 'النموذج المعقد' },
    { value: 'systemPrompt_Video_generation_button.ts', label: 'إنشاء الفيديو' },
    { value: 'systemPrompt_Calling_ButtonR1.Showtheresultonly.ts', label: 'عرض النتائج فقط' },
  ];

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-bold mb-4">اختر النموذج والإعدادات</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">نموذج الذكاء الاصطناعي:</label>
          <select 
            value={modelType} 
            onChange={(e) => setModelType(e.target.value as 'deepseek' | 'huggingface')}
            className="w-full p-2 border rounded"
          >
            <option value="deepseek">DeepSeek</option>
            <option value="huggingface">HuggingFace</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2">نوع System Prompt:</label>
          <select 
            value={systemPrompt} 
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {systemPromptOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => onGenerate(modelType, systemPrompt)}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'جاري المعالجة...' : 'ابدأ التوليد'}
        </button>
      </div>
    </div>
  );
}
