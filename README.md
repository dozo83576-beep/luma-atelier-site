# ЛУМА — дом ухода за лицом и телом

Премиальный лендинг для салона эстетической косметологии в Москве. Диагностика кожи, персональные
программы ухода, специалисты, прайс и запись на консультацию — на одной странице.

**Live:** https://luma-atelier-site.vercel.app/

## Стек

- [Astro 7](https://astro.build/) — статическая сборка, без адаптера
- [Tailwind CSS v4](https://tailwindcss.com/) через `@tailwindcss/vite`
- React-остров (`@astrojs/react`) — только для анимированного Hero
- [Motion](https://motion.dev/) (Framer Motion) — оркестровка анимаций в Hero
- [Lenis](https://lenis.darkroom.engineering/) — плавный скролл
- Самостоятельный IntersectionObserver-reveal для остальных секций (`src/lib/reveal.ts`)

## Запуск

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # статическая сборка в dist/
npm run preview   # локальный просмотр собранного dist/
```

## Структура

```
src/
├── components/
│   ├── Hero.tsx              # единственный React-остров (client:load)
│   ├── Nav.astro
│   ├── SectionHead.astro     # переиспользуемый заголовок секции (индекс + label)
│   └── sections/              # все секции лендинга, по одной на файл
├── data/content.ts            # единый источник контента (тексты, цены, фото-пути)
├── layouts/Base.astro         # meta, OG, JSON-LD (schema.org HealthAndBeautyBusiness)
├── lib/reveal.ts              # scroll-reveal + Lenis + sticky-nav, без React
├── pages/index.astro          # порядок секций на странице
└── styles/global.css          # Tailwind v4 @theme токены, self-hosted шрифты
```

Весь текстовый и табличный контент (цены, шаги программ, отзывы, специалисты, FAQ) живёт в
`src/data/content.ts` — компоненты только рендерят структуру, тексты не хардкодятся в разметке.

## Дизайн

Тёмная кинематографичная тема с тёплым янтарным акцентом и точечными светлыми секциями для ритма.
Шрифты — Cormorant (display) и Onest (текст), самостоятельно захостены в `public/fonts` с
кириллическими woff2-подмножествами. Подробности исходного направления — в `DESIGN-DIRECTION.md`.

## Деплой

Статический сайт на Vercel, автодеплой при пуше в `main` (GitHub-интеграция, без адаптера — Vercel
раздаёт `dist/` как статику).
