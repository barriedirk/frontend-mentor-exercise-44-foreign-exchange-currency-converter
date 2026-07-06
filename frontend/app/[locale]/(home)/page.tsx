import Dashboard from "@/features/dashboard/Dashboard";
import Header from "./_components/Header";
import LiveMarkets from "./_components/LiveMarkets";

export default function HomePage() {
  return (
    <>
      <Header />
      <LiveMarkets />
      <main>
        <Dashboard />
      </main>
    </>
  );
}
