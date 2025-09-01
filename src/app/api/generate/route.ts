import { NextRequest } from 'next/server';
import { createChatCompletion, loadTools, executeTool, ModelType } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { messages, modelType, systemPromptFile, toolCalls } = await req.json();
    
    // تحميل الأدوات المتاحة
    const tools = await loadTools();
    
    // إذا كان هناك طلبات لأدوات، قم بتنفيذها
    if (toolCalls && toolCalls.length > 0) {
      const toolResults = [];
      
      for (const toolCall of toolCalls) {
        try {
          const result = await executeTool(toolCall.name, toolCall.parameters, tools);
          toolResults.push({
            name: toolCall.name,
            result: result
          });
        } catch (error) {
          toolResults.push({
            name: toolCall.name,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
      
      return Response.json({ toolResults });
    }
    
    // إنشاء اكمال الدردشة
    const stream = await createChatCompletion(
      modelType as ModelType,
      messages,
      systemPromptFile,
      tools
    );

    // تحويل الدفق إلى Response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
            
            // إذا كانت هناك استدعاءات لأدوات في الرد
            if (chunk.choices[0]?.delta?.tool_calls) {
              controller.enqueue(encoder.encode(JSON.stringify({
                tool_calls: chunk.choices[0]?.delta?.tool_calls
              })));
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked'
      },
    });
  } catch (error) {
    console.error('Error in generate API:', error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
