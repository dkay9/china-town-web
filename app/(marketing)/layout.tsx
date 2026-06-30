import LenisProvider from "@/components/marketing/LenisProvider";
import Navbar from "@/components/marketing/Navbar";
import CursorTracker from "@/components/marketing/CursorTracker";
import { IntroWrapper } from "@/components/marketing/IntroWrapper";
import { IntroGate } from "@/components/marketing/IntroGate";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IntroWrapper />
      <IntroGate>
        <LenisProvider>
          <CursorTracker />
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </IntroGate>
    </>
  );
}
