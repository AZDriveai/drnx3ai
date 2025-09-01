# 🚀 DRNX3AI - تطبيق الذكاء الاصطناعي المتطور

![DRNX3AI Logo](./public/ic_vector_dr.x_logo.png)

## 🌟 نظرة عامة

DRNX3AI هو تطبيق ويب متطور مبني بتقنية Next.js يستخدم الذكاء الاصطناعي لتوفير تجربة تفاعلية متميزة. التطبيق مصمم بواجهة حديثة ومتجاوبة مع دعم كامل للغة العربية.

## 🎯 المميزات الرئيسية

- 🤖 **واجهة ذكاء اصطناعي متطورة**: محادثة تفاعلية مع AI
- 🌙 **تصميم عصري**: واجهة مستخدم حديثة مع خلفيات متحركة
- 📱 **تصميم متجاوب**: يعمل بشكل مثالي على جميع الأجهزة
- 🚀 **أداء عالي**: مبني بـ Next.js 14 مع App Router
- 🎨 **تخصيص كامل**: نظام تصميم مرن وقابل للتخصيص
- 🔒 **آمن**: أفضل ممارسات الأمان المطبقة

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React + Custom Components
- **Icons**: Lucide React
- **Deployment**: Vercel Ready

## 📋 متطلبات النظام

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn أو pnpm
- Git

## 🚀 التثبيت والإعداد

### 1. استنساخ المشروع

```bash
git clone https://github.com/AZDriveai/drnx3ai.git
cd drnx3ai
```

### 2. تثبيت التبعيات

```bash
npm install
# أو
yarn install
# أو
pnpm install
```

### 3. إعداد متغيرات البيئة

أنشئ ملف `.env.local` في جذر المشروع:

```env
NEXT_PUBLIC_APP_NAME=DRNX3AI
NEXT_PUBLIC_API_URL=your_api_url_here
```

### 4. تشغيل التطبيق

```bash
npm run dev
# أو
yarn dev
# أو
pnpm dev
```

افتح [http://localhost:3000](http://localhost:3000) في متصفحك لرؤية التطبيق.

## 📁 هيكل المشروع

```
drnx3ai/
├── public/                 # الملفات العامة والصور
│   ├── ic_vector_dr.x_logo.png
│   ├── bg_dr.x_wordmark.png
│   └── favicon.svg
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # الأنماط العامة
│   │   ├── layout.tsx     # التخطيط الرئيسي
│   │   └── page.tsx       # الصفحة الرئيسية
│   └── components/        # المكونات القابلة لإعادة الاستخدام
│       └── chat/
│           └── ChatInterface.tsx
├── package.json
└── README.md
```

## 🔧 الميزات المُصححة

### ✅ مشكلة الشاشة السوداء
- **السبب**: عدم تحميل المكونات بشكل صحيح أو مشاكل في CSS
- **الحل**: تم إعادة هيكلة الكود وإضافة fallback components

### ✅ تركيب اللوجو
- **المشكلة**: عدم ظهور اللوجو في المكان الصحيح
- **الحل**: تم إضافة اللوجو في الهيدر مع أنماط مناسبة

### ✅ تحسين الواجهة
- تحسين التخطيط العام
- إضافة خلفيات متحركة
- تحسين الاستجابة على الأجهزة المختلفة

## 🎨 التخصيص

### تغيير اللوجو
استبدل الملف `public/ic_vector_dr.x_logo.png` بلوجو جديد مع الحفاظ على نفس الاسم.

### تخصيص الألوان
عدّل ملف `src/app/globals.css` لتغيير نظام الألوان:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

## 📱 البناء للإنتاج

```bash
npm run build
npm start
```

## 🚀 النشر

### نشر على Vercel (موصى به)

1. ارفع الكود إلى GitHub
2. ادخل إلى [Vercel](https://vercel.com)
3. اربط المستودع ونشر المشروع

### نشر على Netlify

1. بناء المشروع: `npm run build`
2. ارفع مجلد `out` إلى Netlify

## 🐛 استكشاف الأخطاء وإصلاحها

### مشكلة الشاشة السوداء
1. تأكد من تثبيت جميع التبعيات
2. تحقق من console للأخطاء
3. تأكد من أن متغيرات البيئة صحيحة

### مشكلة عدم ظهور اللوجو
1. تأكد من وجود ملف اللوجو في `public/`
2. تحقق من مسار الصورة في الكود
3. تأكد من صيغة الصورة مدعومة

## 🤝 المساهمة

1. Fork المشروع
2. أنشئ فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- **GitHub**: [AZDriveai](https://github.com/AZDriveai)
- **البريد الإلكتروني**: zyz151224@gmail.com
- **المشروع**: [drnx3ai](https://github.com/AZDriveai/drnx3ai)

## 🙏 شكر وتقدير

شكراً لجميع المساهمين الذين ساعدوا في تطوير هذا المشروع.

---

**ملاحظة**: هذا المشروع في مرحلة التطوير النشط. للحصول على أحدث التحديثات، تابع المستودع على GitHub.

## 🔄 سجل التحديثات

### الإصدار 1.0.0
- ✅ إصلاح مشكلة الشاشة السوداء
- ✅ إضافة اللوجو بشكل صحيح
- ✅ تحسين واجهة المستخدم
- ✅ إضافة دعم كامل للغة العربية
- ✅ تحسين الأداء والاستجابة
