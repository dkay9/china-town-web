import LenisProvider from "@/components/marketing/LenisProvider";
import Navbar from "@/components/marketing/Navbar";
import CursorTracker from "@/components/marketing/CursorTracker";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <CursorTracker />
      <Navbar />
      <main>{children}</main>
    </LenisProvider>
  );
}
