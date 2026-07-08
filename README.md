# Frontend Mentor - FX Checker

![Design preview for the FX Checker coding challenge](./preview.jpg)

Links:
🔗 Frontend Mentor profile: https://www.frontendmentor.io/solutions/foreign-exchange-currency-converter-p_QA1w9ac6
🔗 GitHub: https://github.com/barriedirk/frontend-mentor-exercise-44-foreign-exchange-currency-converter  
🔗 Live Demo: https://foreign-exchange-currency-converter-eta.vercel.app/en

# Frontend Mentor - FX Checker

Solution for the currency exchange and conversion application challenge from Frontend Mentor.

## 🚀 Technologies Used

The project is built using the following technical ecosystem:

*   **Framework:** Next.js 16 (using Turbopack for the local compiler).
*   **UI Library:** React 19.
*   **State Management:** Zustand 5 (for managing favorites and conversion history).
*   **Data Fetching & Caching:** TanStack Query v5 (React Query) combined with Axios to connect with the Frankfurter API.
*   **Charts:** Recharts 3 (for rate history time-series).
*   **Styling:** Tailwind CSS v4.
*   **Accessibility Components:** Radix UI Popover.
*   **Internationalization:** next-intl 4 (configured with initial support for `/en`).
*   **Package Manager:** pnpm v11.

---

## 🎯 Implemented Features

The application covers the visual and logical requirements from the design:

### 1. Currency Converter
*   Real-time calculation and conversion as the user types.
*   Interactive currency selector filtered by ISO code or name.
*   Swap button to quickly invert the selected currencies.
*   Option to save the active currency pair to favorites.

### 2. Currency Picker
*   Segmented list split between "Popular" and "Other currencies".
*   Visual flags corresponding to each individual currency.

### 3. Live Markets Ticker
*   Top banner displaying major currency pairs, showing their current rate and 24-hour percentage change.

### 4. History and Charts
*   Interactive area chart to track exchange rate evolution over time.
*   Functional time range selectors: 1D, 1W, 1M, 3M, 1Y, and 5Y.

### 5. Currency Comparison
*   Mass visualization block to compare the entered amount against multiple currencies in a single view.
*   Allows pinning or unpinning rows directly to the favorites section.

### 6. Local Persistence
*   Both the favorites list and the conversion log history are saved in the browser's `localStorage` so data persists across page reloads.

---

## 📦 Installation and Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/barriedirk/frontend-mentor-exercise-44-foreign-exchange-currency-converter.git](https://github.com/barriedirk/frontend-mentor-exercise-44-foreign-exchange-currency-converter.git)
    cd frontend-mentor-exercise-44-foreign-exchange-currency-converter
    ```

2.  **Install dependencies with pnpm:**
    ```bash
    pnpm install
    ```

3.  **Run the development environment:**
    ```bash
    pnpm --filter frontend dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.