# AGENTS.md — luma-atelier-site

Премиальный одностраничный сайт салона красоты (skin & body atelier) «ЛУМА».
Кинематографичный тёмный дизайн с тёплым акцентом, динамичный анимированный hero.

## Стек

- **Astro 7** (static output) + **Tailwind v4** через `@tailwindcss/vite` (НЕ postcss).
- **React-остров** (`@astrojs/react`) только для hero (`src/components/Hero.tsx`) — **Framer Motion** (`motion`).
- **Lenis** — smooth scroll; reveal-анимации — IntersectionObserver (`src/lib/reveal.ts`).
- Шрифты self-host (`public/fonts/*.woff2`, кириллица+латиница), `@font-face` в `src/styles/global.css`.
- Иконок-зависимостей нет; декоративная графика — инлайн-SVG. В копии используется дефис, не тире.

## Команды

```bash
npm install        # установка
npm run dev        # дев-сервер (порт 4321; в launch.json — 4351)
npm run build      # прод-сборка в dist/
npm run preview    # предпросмотр прод-сборки
```

## Структура

- `src/data/content.ts` — **единый источник контента** (RU). Правь тексты/цены/имена здесь.
- `src/pages/index.astro` — сборка секций.
- `src/components/Hero.tsx` — анимированный hero (React island, `client:load`).
- `src/components/sections/*.astro` — статичные секции.
- `src/components/{Nav,SectionHead}.astro` — общие компоненты.
- `src/styles/global.css` — токены (`@theme`), `@font-face`, утилиты, reveal, reduced-motion.
- `public/img/*` — фото (Pexels, free commercial license).
- `public/fonts/*` — woff2 (OFL: Cormorant, Onest, JetBrains Mono).

## Quality gate

- `npm run build` зелёный; после build в `dist/client` присутствуют `*.woff2` (self-host работает).
- Кириллица рендерится без квадратов во всех начертаниях.
- `prefers-reduced-motion` отключает анимации (CSS + Hero через `useReducedMotion`).
- Анимируем только `transform`/`opacity`. Нет ошибок в консоли.
- Все плейсхолдеры (телефон, адрес, цены, имена специалистов, отзывы) заменены на реальные данные перед релизом.

## Важно (плейсхолдеры — заменить перед продакшеном)

Телефон, email, адрес, часы, цены, имена специалистов и тексты отзывов в `content.ts` — демонстрационные.
Форма записи (`Booking.astro`) — дизайн-заглушка без backend: при сабмите показывает успех, заявка
никуда не уходит. Подключение реальной доставки (email/Telegram/CRM) — отдельная задача.

Цикл сборки: см. скилл `build-modern-site` в `D:\Work` и базу знаний `D:\Work\llm-dev-wiki`.
