import { tool, stepCountIs, generateText, generateId } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { Search } from '@upstash/search';
import fs from 'fs';

// محاولة تحميل dotenv إذا كان متاحاً
try {
  const dotenv = await import('dotenv');
  dotenv.config();
} catch (error) {
  console.warn('حزمة dotenv غير مثبتة، سيتم استخدام متغيرات البيئة الحالية.');
}

type KnowledgeContent = {
  text: string;
  section: string;
  title?: string;
};

// التحقق من وجود المتغيرات البيئية المطلوبة
if (!process.env.UPSTASH_SEARCH_REST_URL || !process.env.UPSTASH_SEARCH_REST_TOKEN || !process.env.HF_TOKEN) {
  throw new Error('يجب تعريف UPSTASH_SEARCH_REST_URL و UPSTASH_SEARCH_REST_TOKEN و HF_TOKEN في ملف .env أو في متغيرات البيئة');
}

const search = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN,
});

// تكوين Hugging Face client
const hfOpenAI = createOpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const index = search.index<KnowledgeContent>('knowledge-base');

async function main(prompt: string) {
  const { text } = await generateText({
    model: hfOpenAI("openai/gpt-oss-120b:novita"), // استخدام Hugging Face
    prompt,

    stopWhen: stepCountIs(5),
    tools: {
      addResource: tool({
        description: 'Add a new resource or piece of information to the knowledge base',
        inputSchema: z.object({
          resource: z.string().describe('The content or resource to add to the knowledge base'),
          title: z.string().optional().describe('Optional title for the resource'),
        }),
        execute: async ({ resource, title }) => {
          const id = generateId();
          await index.upsert({
            id,
            content: {
              text: resource,
              section: 'user-added',
              title: title || `Resource ${id.slice(0, 8)}`,
            },
          });
          return `Successfully added resource "${title || 'Untitled'}" to knowledge base with ID: ${id}`;
        },
      }),

      searchKnowledge: tool({
        description: 'Search the knowledge base to find relevant information for answering questions',
        inputSchema: z.object({
          query: z.string().describe('The search query to find relevant information'),
          limit: z.number().optional().describe('Maximum number of results to return (default: 3)'),
        }),
        execute: async ({ query, limit = 3 }) => {
          const results = await index.search({
            query,
            limit,
            reranking: true,
          });

          if (results.length === 0) {
            return 'No relevant information found in the knowledge base.';
          }

          return results.map((hit, i) => ({
            resourceId: hit.id,
            rank: i + 1,
            title: hit.content.title || 'Untitled',
            content: hit.content.text || '',
            section: hit.content.section || 'unknown',
            score: hit.score,
          }));
        },
      }),

      deleteResource: tool({
        description: 'Delete a resource from the knowledge base',
        inputSchema: z.object({
          resourceId: z.string().describe('The ID of the resource to delete'),
        }),
        execute: async ({ resourceId }) => {
          try {
            await index.delete({ ids: [resourceId] });
            return `Successfully deleted resource with ID: ${resourceId}`;
          } catch (error) {
            return `Failed to delete resource: ${error instanceof Error ? error.message : 'Unknown error'}`;
          }
        },
      }),

      analyzeImage: tool({
        description: 'Analyze an image and describe its content',
        inputSchema: z.object({
          imagePath: z.string().describe('Path to the image file to analyze'),
          question: z.string().optional().describe('Optional question about the image'),
        }),
        execute: async ({ imagePath, question = 'What is in this image?' }) => {
          try {
            const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

            const result = await generateText({
              model: hfOpenAI("openai/gpt-4-vision-preview"), // نموذج يدعم الرؤية
          
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      type: 'text',
                      text: question,
                    },
                    {
                      type: 'image',
                      image: imageBase64,
                    },
                  ],
                },
              ],
            });

            return result.text;
          } catch (error) {
            return `Failed to analyze image: ${error instanceof Error ? error.message : 'Unknown error'}`;
          }
        },
      }),
    },
    onStepFinish: ({ toolResults }) => {
      if (toolResults && toolResults.length > 0) {
        console.log('Tool results:');
        console.dir(toolResults, { depth: null });
      }
    },
  });

  return text;
}

// استخدام الأمثلة:
// const question = 'What are the two main things I worked on before college?';
// const imageQuestion = 'Analyze this image: ./public/assets/eclipse.jpg and tell me what the red things are';
// main(question).then(console.log).catch(console.error);
// main(imageQuestion).then(console.log).catch(console.error);
