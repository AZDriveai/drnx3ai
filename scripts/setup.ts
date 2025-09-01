import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { Search } from '@upstash/search';

// تحميل متغيرات البيئة
dotenv.config();

type KnowledgeContent = {
  text: string;
  section: string;
  title?: string;
};

// التحقق من وجود المتغيرات البيئية المطلوبة
if (!process.env.UPSTASH_SEARCH_REST_URL || !process.env.UPSTASH_SEARCH_REST_TOKEN) {
  throw new Error('يجب تعريف UPSTASH_SEARCH_REST_URL و UPSTASH_SEARCH_REST_TOKEN في ملف .env');
}

// Initialize Upstash Search client
const search = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN,
});

const index = search.index<KnowledgeContent>('knowledge-base');

async function setupKnowledgeBase() {
  try {
    // التحقق من وجود الملف
    const filePath = path.join(__dirname, 'essay.txt');
    if (!fs.existsSync(filePath)) {
      throw new Error('ملف essay.txt غير موجود في المسار: ' + filePath);
    }

    // Read and process the source file
    const content = fs.readFileSync(filePath, 'utf8');

    // Split content into meaningful chunks
    const chunks = content
      .split(/\n\s*\n/) // Split by double line breaks (paragraphs)
      .map(chunk => chunk.trim())
      .filter(chunk => chunk.length > 50); // Only keep substantial chunks

    // Upload chunks to Upstash Search in batches of 100
    const batchSize = 100;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize).map((chunk, j) => ({
        id: `chunk-${i + j}`,
        content: {
          text: chunk,
          section: `section-${Math.floor((i + j) / 10)}`,
          title: chunk.split('\n')[0]?.substring(0, 100) || `Chunk ${i + j + 1}`,
        },
      }));
      
      await index.upsert(batch);
      console.log(
        `Upserted ${Math.min(i + batch.length, chunks.length)} chunks out of ${chunks.length} chunks`,
      );
    }

    console.log('تم إعداد قاعدة المعرفة بنجاح!');
  } catch (error) {
    console.error('حدث خطأ أثناء إعداد قاعدة المعرفة:', error);
    throw error;
  }
}

// Run setup
setupKnowledgeBase().catch(console.error);
