"use client";
import { DataTicker } from "@/domain/currency/ui/DataTicker";

import { Button } from "@/shared/ui/Button";
import { CurrencySelectButton } from "@/domain/currency/ui/CurrencySelectButton";
import { IconButton } from "@/shared/ui/IconButton";
import {
  ChevronDownIcon,
  ExchangeIcon,
  DeleteIcon,
} from "@/shared/assets/icons";
import { Logo } from "@/shared/ui/Logo";
import { TabButton } from "@/shared/ui/TabButton";
import { SearchInput } from "@/shared/ui/SearchInput";
import { AmountInput } from "@/shared/ui/AmountInput";
import { InteractiveAmountWrapper } from "./_components/InteractiveAmountWrapper";
import { MOCK_FX_RATES } from "@/domain/currency/mocks";
import CurrencyDropdownWrapper from "./_components/CurrencyDropdownWrapper";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-surface-main p-[2.5rem] text-text-primary font-sans">
      <header className="mb-[3rem] border-b border-border-subtle pb-[1.5rem]">
        <h1 className="text-preset-1 font-bold text-brand">Design System</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-auto p-3">
            <Logo />
          </div>
          <div className="h-12 w-auto bg-white p-3">
            <Logo theme="light" />
          </div>
        </div>
        <p className="text-preset-4 text-text-secondary mt-[0.5rem]">
          Layout construido con Grid/Block para evitar el estiramiento de Flex.
        </p>
      </header>

      {/* Contenedor principal tipo Grid para evitar el flujo flex */}
      <div className="grid grid-cols-1 gap-[2.5rem]">
        {/* --- CATEGORÍA 1: ACTION LOGS --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-brand border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            1. Action Logs & Conversions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1rem]">
            <Button variant="action">Action Default</Button>
            <Button variant="actionActive">Action Active</Button>
            <Button variant="actionDoubleBorder">Double Border</Button>
            <Button variant="action" size="sm">
              Action Small
            </Button>
            <Button variant="action" size="lg">
              Action Large
            </Button>
            <Button variant="action" disabled>
              Action Disabled
            </Button>
          </div>
        </section>

        {/* --- CATEGORÍA 2: CLEARS --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-text-secondary border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            2. Clear Operations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1rem]">
            <Button variant="clear">Clear Flat</Button>
            <Button variant="clearBorder">Clear Bordered</Button>
            <Button variant="clear" size="sm">
              Clear SM
            </Button>
            <Button variant="clearBorder" size="lg">
              Clear LG
            </Button>
            <Button variant="clear" disabled>
              Clear Disabled
            </Button>
          </div>
        </section>

        {/* --- CATEGORÍA 3: FAVORITES & BADGES --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-success border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            3. Favorites & Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1rem]">
            <Button variant="favorite">Add Favorite</Button>
            <Button variant="favorited">Favorited</Button>
            <Button variant="favoriteOutline">Outline Favorite</Button>
            <Button variant="favoriteOutlineActive">Outline Active</Button>
            <Button variant="favorite" badgeCount={5}>
              With Badge
            </Button>
            <Button variant="favorite" size="sm" badgeCount={12}>
              SM Badge
            </Button>
          </div>
        </section>

        {/* --- CATEGORÍA 4: NAVIGATION TABS --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-text-muted border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            4. History & Navigation Tabs
          </h2>
          <div className="block">
            {/* Usamos inline-block para que los botones fluyan uno al lado del otro sin estirarse */}
            <div className="border-b border-border-subtle pt-[0.5rem]">
              <span className="inline-block mr-[1rem]">
                <Button variant="tabActive" badgeCount={3}>
                  Live Rates
                </Button>
              </span>
              <span className="inline-block mr-[1rem]">
                <Button variant="tab" badgeCount={24}>
                  Conversion History
                </Button>
              </span>
              <span className="inline-block">
                <Button variant="tab">Analytics</Button>
              </span>
            </div>
            <div className="mt-[0.75rem]">
              <span className="inline-block mr-[1rem]">
                <Button variant="tabBordered" badgeCount={7}>
                  Tab Bordered Box
                </Button>
              </span>
              <span className="inline-block">
                <Button variant="tabBordered" disabled>
                  Tab Box Disabled
                </Button>
              </span>
            </div>
          </div>
        </section>

        {/* --- CATEGORÍA 5: UTILITY ICONS --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-danger border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            5. Icon Sizing Modes
          </h2>
          <div className="grid grid-cols-3 gap-[1rem] justify-items-start">
            <Button variant="action" size="icon">
              <span>$</span>
            </Button>
            <Button variant="favorited" size="iconCircle">
              <span>★</span>
            </Button>
            <Button
              variant="clear"
              size="none"
              className="text-brand underline"
            >
              Plain Text Button
            </Button>
          </div>
        </section>

        {/* --- SECCIÓN 6: ACTION BUTTONS DE DIVISAS --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-brand border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            6. Transactional Specialty Buttons
          </h2>

          <div className="grid grid-cols-1 gap-[2rem]">
            {/* Sub-bloque 1: Selectores de Moneda */}
            <div>
              <h3 className="text-preset-4 text-text-secondary mb-[0.75rem]">
                Currency Dropdowns (Rest / Hover / Focus)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1rem] justify-items-start">
                <CurrencySelectButton
                  code="USD"
                  flagUrl="https://flagcdn.com/us.svg"
                />
                <CurrencySelectButton
                  code="EUR"
                  flagUrl="https://flagcdn.com/eu.svg"
                  className="bg-surface-hover"
                />
                <CurrencySelectButton
                  code="GBP"
                  flagUrl="https://flagcdn.com/gb.svg"
                  className="ring-2 ring-brand border-brand"
                />
              </div>
            </div>

            {/* Sub-bloque 2: Exchange e Inversión */}
            <div>
              <h3 className="text-preset-4 text-text-secondary mb-[0.75rem]">
                Exchange Action Buttons (ExchangeIcon)
              </h3>
              <div className="grid grid-cols-3 gap-[1rem] justify-items-start">
                <IconButton intent="exchange">
                  <ExchangeIcon />
                </IconButton>
                <IconButton intent="exchange" className="bg-surface-hover">
                  <ExchangeIcon />
                </IconButton>
                <IconButton
                  intent="exchange"
                  className="ring-2 ring-brand border-brand"
                >
                  <ExchangeIcon />
                </IconButton>
              </div>
            </div>

            {/* Sub-bloque 3: Delete / Borrado */}
            <div>
              <h3 className="text-preset-4 text-text-secondary mb-[0.75rem]">
                Row Delete Buttons (DeleteIcon)
              </h3>
              <div className="grid grid-cols-3 gap-[1rem] justify-items-start">
                <IconButton intent="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  intent="delete"
                  className="bg-surface-hover text-danger"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  intent="delete"
                  className="ring-2 ring-brand border-brand"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            <div>
              <h3 className="text-preset-4 text-text-secondary mb-[0.75rem]">
                Row ChevronDown Buttons (ChevronDownIcon)
              </h3>
              <div className="grid grid-cols-3 gap-[1rem] justify-items-start">
                <IconButton intent="delete">
                  <ChevronDownIcon />
                </IconButton>
                <IconButton
                  intent="delete"
                  className="bg-surface-hover text-danger"
                >
                  <ChevronDownIcon />
                </IconButton>
                <IconButton
                  intent="delete"
                  className="ring-2 ring-brand border-brand"
                >
                  <ChevronDownIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 8: TAB BUTTONS --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-brand border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            8. Tab Buttons with Count Badge
          </h2>

          <div className="bg-neutral-950 p-[3rem] rounded-12 flex flex-col gap-[2.5rem] items-start w-full max-w-[400px]">
            {/* 1. Estado Rest / Inactivo */}
            <div className="w-full">
              <p className="text-preset-5 text-text-muted mb-[0.5rem] font-mono">
                1. REST STATE
              </p>
              <TabButton label="History" count={4} isActive={false} />
            </div>

            {/* 2. Estado Active / Selected */}
            <div className="w-full">
              <p className="text-preset-5 text-text-muted mb-[0.5rem] font-mono">
                2. ACTIVE STATE (SELECTED)
              </p>
              <TabButton label="History" count={4} isActive={true} />
            </div>

            {/* 3. Simulación de Focus / Borde completo */}
            <div className="w-full">
              <p className="text-preset-5 text-text-muted mb-[0.5rem] font-mono">
                3. FOCUS STATE (KEYBOARD ACCESSIBLE)
              </p>
              {/* Forzamos las clases de focus de manera estática para la demo visual */}
              <TabButton
                label="History"
                count={4}
                isActive={false}
                className="ring-2 ring-brand rounded-12 px-[1rem] py-[0.75rem]"
              />
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 9: FORM INPUTS (SEARCH) --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-brand border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            9. Form Fields (Search Input)
          </h2>

          <div className="bg-neutral-950 p-[3rem] rounded-12 flex flex-col gap-[2rem] max-w-[500px]">
            {/* 1. Estado Rest con Placeholder */}
            <div>
              <p className="text-preset-5 text-text-muted mb-[0.5rem] font-mono">
                1. REST STATE (EMPTY)
              </p>
              <SearchInput placeholder="Search currencies..." />
            </div>

            {/* 2. Estado Filled (Con valor simulado) */}
            <div>
              <p className="text-preset-5 text-text-muted mb-[0.5rem] font-mono">
                2. FILLED STATE
              </p>
              <SearchInput
                defaultValue="Euro"
                placeholder="Search currencies..."
              />
            </div>

            {/* 3. Simulación de Focus */}
            <div>
              <p className="text-preset-5 text-text-muted mb-[0.5rem] font-mono">
                3. FOCUS STATE
              </p>
              {/* Forzamos de forma estática la clase focus:border-brand para visualizarlo en la grilla */}
              <SearchInput
                placeholder="Search currencies..."
                className="border-brand ring-1 ring-brand"
              />
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 10: FORM INPUTS (AMOUNT) --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card">
          <h2 className="text-preset-2-bold text-brand border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            10. Form Fields (Financial Amount Input)
          </h2>

          <div className="bg-neutral-950 p-[3rem] rounded-12 flex flex-col gap-[2.5rem] max-w-[450px]">
            {/* 1. Simulación Estado Rest (Vacío) */}
            <div>
              <p className="text-preset-5 text-text-muted mb-[0.5rem] font-mono">
                1. REST STATE (EMPTY / PLACEHOLDER)
              </p>
              <AmountInput value="" onChange={() => {}} placeholder="0" />
            </div>

            {/* 2. Simulación Estado Filled con línea basal estática */}
            <div>
              <p className="text-preset-5 text-text-muted mb-[0.5rem] font-mono">
                2. FILLED STATE (STATIC FIELD)
              </p>
              <AmountInput value="1000" onChange={() => {}} />
            </div>

            {/* 3. Campo Interactivo Real (Pruébalo escribiendo en el navegador) */}
            <div>
              <p className="text-preset-5 text-brand mb-[0.5rem] font-mono">
                3. INTERACTIVE EXPERIMENT (WRITE HERE)
              </p>
              <InteractiveAmountWrapper />
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 11: LIVE MARKET TICKER BAR --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card col-span-full">
          <h2 className="text-preset-2-bold text-brand border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            11. Live Financial Market Ticker Bar
          </h2>

          <p className="text-preset-4 text-text-muted mb-[1.5rem]">
            Componente agnóstico de mercado. Procesa automáticamente la
            dirección y los colores basados en el valor del atributo{" "}
            <code className="text-brand">change</code>.
          </p>

          {/* Inyección directa del componente en la UI */}
          <div className="border border-border-subtle rounded-12 overflow-hidden">
            <DataTicker rates={MOCK_FX_RATES} />
          </div>
        </section>

        {/* --- SECCIÓN 12: DROPDOWN --- */}
        <section className="border border-border-subtle p-[1.5rem] rounded-8 bg-surface-card col-span-full">
          <h2 className="text-preset-2-bold text-brand border-b border-border-subtle pb-[0.5rem] mb-[1rem]">
            12. Dropdown Currency Selector
          </h2>

          <div className="border border-border-subtle rounded-12 overflow-hidden">
            <CurrencyDropdownWrapper />
          </div>
        </section>
      </div>
    </main>
  );
}
