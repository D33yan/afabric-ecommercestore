# Afabric Store

A modern, accessible, and visually stunning e-commerce platform for sustainable African fashion, built with Next.js (App Router), React, and Tailwind CSS.

---

## ✨ Features
- **Modern, Premium UI:** Glassmorphism, tactile cards, and beautiful gradients for a high-end look.
- **Responsive Design:** Fully optimized for all devices and breakpoints.
- **Accessible:** ARIA labels, keyboard navigation, color contrast, and alt text for inclusivity.
- **Reusable Components:** Section, InfoCard, ProductCard, BrandLoader, and more for maintainability.
- **Microinteractions:** Animated loading, error, and success states for async actions.
- **Global Branded Loader:** Smooth, branded loading animation for page transitions and hero video.
- **Dark Mode Ready:** Theming structure in place for future dark mode support.
- **Performance Optimized:** Image optimization, lazy loading, and bundle size awareness.
- **Component Abstractions:** Cards, forms, and layouts are abstracted for consistency and reusability.

---

## 🛠️ Tech Stack
- **Framework:** [Next.js 13+ (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Image Optimization:** [next/image](https://nextjs.org/docs/pages/api-reference/components/image)
- **State Management:** React Context (Cart, Auth)

---

## 📦 Key Components & Structure
- `components/ui/Section.tsx` — Reusable section container for consistent layout and headings.
- `components/ui/InfoCard.tsx` — Modern, accessible card for info, products, or features.
- `components/layouts/ProductCard.tsx` — Premium product card with tactile effects and microinteractions.
- `components/ui/BrandLoader.tsx` — Branded, animated global loading spinner.
- `components/GlobalLoaderProvider.tsx` — Handles global loading animation on route changes.
- `components/layouts/CategoriesSection.tsx`, `FeaturedProducts.tsx`, `TrendingProducts.tsx` — Main homepage sections.
- `app/layout.tsx` — Root layout, wraps app with providers and loader.

---

## 🧑‍💻 Setup & Development
1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/afabric-store.git
   cd afabric-store
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) to view the app.**

---

## 🎨 Design Principles
- **Visual Hierarchy:** Consistent heading sizes, weights, and spacing for clarity.
- **Color & Contrast:** All UI elements meet accessibility contrast standards.
- **Spacing & Layout:** Responsive, even spacing for a clean, open feel.
- **Microinteractions:** Feedback for all async actions (loading, error, success).
- **Accessibility:** ARIA, alt text, keyboard navigation, and focus states throughout.
- **Component Reusability:** Abstracted UI patterns for maintainability.

---

## ♿ Accessibility & Performance
- All forms, buttons, and links have proper ARIA labels and keyboard support.
- Images use descriptive alt text and are optimized for size and loading.
- Color palette and overlays meet WCAG contrast standards.
- Lazy loading and bundle optimization for fast performance.

---

## 🚀 Improvement History
- **Visual hierarchy, color, spacing, and layout** standardized across all pages.
- **Global loader** and **hero video loader** implemented with brand style.
- **Accessibility** and **microinteractions** improved for all forms and async actions.
- **Component abstractions** (Section, InfoCard, ProductCard) created and adopted.
- **Hydration and SSR issues** resolved for smooth Next.js App Router experience.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](LICENSE)

---

## 🙏 Credits
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Unsplash](https://unsplash.com/) for demo images

---

**Afabric Store — Sustainable Fashion for Everyone**