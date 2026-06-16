import { Button } from "@/shared/ui/Button";
import { CurrencySelectButton } from "@/shared/ui/CurrencySelectButton";
import { IconButton } from "@/shared/ui/IconButton";
import {
  ChevronDownIcon,
  ExchangeIcon,
  DeleteIcon,
} from "@/shared/assets/icons";

export default function ButtonShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-main p-[2.5rem] text-text-primary font-sans">
      <header className="mb-[3rem] border-b border-border-subtle pb-[1.5rem]">
        <h1 className="text-preset-1 font-bold text-brand">
          Button Variant System
        </h1>
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
          </div>
        </section>
      </div>
    </main>
  );
}
