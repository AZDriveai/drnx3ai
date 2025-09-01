const exampleTool = {
  name: 'example_tool',
  description: 'أداة مثال للقيام بمهمة محددة',
  parameters: {
    type: 'object',
    properties: {
      param1: {
        type: 'string',
        description: 'المعامل الأول'
      },
      param2: {
        type: 'number',
        description: 'المعامل الثاني'
      }
    },
    required: ['param1']
  },
  execute: async (params: any) => {
    // تنفيذ منطق الأداة هنا
    return { result: `تم التنفيذ مع ${params.param1} و ${params.param2 || 'لا شيء'}` };
  }
};

export default exampleTool;
