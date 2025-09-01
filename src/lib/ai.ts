import { createOpenAI } from '@ai-sdk/openai';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// تكوين DeepSeek
export const deepseekProvider = createOpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// تكوين HuggingFace
export const huggingfaceProvider = createOpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_TOKEN,
});

// أنواع النماذج المتاحة
export type ModelType = 'deepseek' | 'huggingface';

// واجهة للأداة
export interface Tool {
  name: string;
  description: string;
  parameters: any;
  execute: (params: any) => Promise<any>;
}

// دالة لقراءة system prompt من الملف
export const readSystemPrompt = (fileName: string): string => {
  try {
    const filePath = join(process.cwd(), 'src', 'lib', fileName);
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading system prompt file ${fileName}:`, error);
    return '';
  }
};

// دالة لتحميل جميع الأدوات من Assistance_Tools
export const loadTools = async (): Promise<Record<string, Tool>> => {
  const toolsDir = join(process.cwd(), 'src', 'lib', 'Assistance_Tools');
  
  try {
    const toolFiles = readdirSync(toolsDir).filter(file => 
      file.endsWith('.ts') && !file.endsWith('.d.ts') && file !== 'index.ts'
    );
    
    const tools: Record<string, Tool> = {};
    
    for (const file of toolFiles) {
      try {
        // استخدام import الديناميكي لتحميل الأداة
        const toolPath = `./Assistance_Tools/${file.replace('.ts', '')}`;
        const toolModule = await import(toolPath);
        
        if (toolModule.default && toolModule.default.name) {
          tools[toolModule.default.name] = toolModule.default;
        }
      } catch (error) {
        console.error(`Error loading tool from ${file}:`, error);
      }
    }
    
    return tools;
  } catch (error) {
    console.error('Error reading tools directory:', error);
    return {};
  }
};

// دالة لإنشاء اكمال الدردشة مع النموذج المحدد
export const createChatCompletion = async (
  modelType: ModelType,
  messages: any[],
  systemPromptFile: string,
  tools?: Record<string, Tool>
) => {
  const systemPrompt = readSystemPrompt(systemPromptFile);
  const provider = modelType === 'deepseek' ? deepseekProvider : huggingfaceProvider;
  const modelName = modelType === 'deepseek' ? 'deepseek-chat' : 'openai/gpt-oss-120b';
  
  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];
  
  const completionOptions: any = {
    model: modelName,
    messages: fullMessages,
    stream: true,
  };
  
  // إذا كانت هناك أدوات متاحة
  if (tools && Object.keys(tools).length > 0) {
    completionOptions.tools = Object.values(tools).map(tool => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      },
    }));
  }
  
  return await provider.chat.completions.create(completionOptions);
};

// دالة لتنفيذ الأداة بناءً على الاسم
export const executeTool = async (
  toolName: string,
  parameters: any,
  tools: Record<string, Tool>
): Promise<any> => {
  const tool = tools[toolName];
  if (!tool) {
    throw new Error(`Tool ${toolName} not found`);
  }
  
  return await tool.execute(parameters);
};
