# 🕯️ ЛУМА — лендинг дома ухода за лицом и телом

Премиальный одностраничный лендинг салона эстетической косметологии «ЛУМА» (Москва): диагностика
кожи, персональные программы ухода, специалисты, прайс и запись на консультацию.

**Живой сайт:** https://luma-atelier-site.vercel.app

> ⚠️ Демо-проект. Телефон, адрес, почта, часы, цены, имена специалистов и отзывы — **вымышленные
> плейсхолдеры** (см. `src/data/content.ts`). Ссылки на Telegram/WhatsApp/VK в футере — заглушки
> (`#`). Фото — со стоков (Pexels, free commercial license).

## Стек

- **[Astro 7](https://astro.build)** — статическая сборка (SSG), без адаптера.
- **[Tailwind CSS v4](https://tailwindcss.com)** через `@tailwindcss/vite`.
- **React-остров** (`@astrojs/react`) — только для анимированного Hero (`src/components/Hero.tsx`,
  `client:load`).
- **[Motion](https://motion.dev)** (Framer Motion) — оркестровка анимаций в Hero.
- **[Lenis](https://lenis.darkroom.engineering)** — плавный скролл.
- Самостоятельный `IntersectionObserver`-reveal для остальных секций (`src/lib/reveal.ts`), без React.
- Шрифты self-host (Cormorant + Onest + JetBrains Mono, latin + cyrillic subsets) в `public/fonts/`.

## Структура

```text
src/
├── components/
│   ├── Hero.tsx              # единственный React-остров (client:load)
│   ├── Nav.astro, SectionHead.astro
│   └── sections/              # секции лендинга, по одной на файл
├── data/content.ts            # весь контент: тексты, цены, фото-пути, контакты
├── layouts/Base.astro         # meta, OG, JSON-LD (schema.org HealthAndBeautyBusiness)
├── lib/reveal.ts              # scroll-reveal + Lenis + sticky-nav, без React
├── pages/index.astro           # сборка страницы из секций
└── styles/global.css          # Tailwind v4 @theme токены, self-hosted шрифты
public/
├── fonts/*.woff2               # self-host шрифты (latin + cyrillic)
└── img/*.jpg                   # фото (Pexels)
```

Дизайн-направление зафиксировано в [`DESIGN-DIRECTION.md`](DESIGN-DIRECTION.md), рабочие конвенции —
в [`AGENTS.md`](AGENTS.md).

## Локальный запуск

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # статическая сборка в dist/
npm run preview    # локальный просмотр собранного dist/
```

## Форма записи

Форма в разделе «Запись» (`Booking.astro`) — пока **дизайн-заглушка без бэкенда**: клиентская
валидация, при сабмите показывает сообщение об успехе и сбрасывается, но заявка никуда не уходит
(серверного роута нет). Подключение реальной доставки (email / Telegram-бот / CRM) сознательно
отложено на отдельную задачу — канал ещё не выбран.

## Деплой

Статический сайт на **Vercel**, автодеплой при пуше в `main` (GitHub-интеграция, без адаптера —
Vercel раздаёт `dist/` как статику).

## Лицензии ассетов

- Шрифты — Cormorant, Onest: SIL Open Font License; JetBrains Mono: Apache License 2.0.
- Фото — Pexels License (свободное коммерческое использование, атрибуция не обязательна).
