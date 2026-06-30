import LenisProvider from "@/components/marketing/LenisProvider";
import Navbar from "@/components/marketing/Navbar";
import CursorTracker from "@/components/marketing/CursorTracker";
import { IntroWrapper } from "@/components/marketing/IntroWrapper";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <IntroWrapper />
      <CursorTracker />
      <Navbar />
      <main>{children}</main>
    </LenisProvider>
  );
}
