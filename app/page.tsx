import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { MarqueeLogos } from "@/components/MarqueeLogos";
import { TrustSignals } from "@/components/TrustSignals";
import { Awards } from "@/components/Awards";
// Link intentionally unused in this page

export default function HomePage() {
  return (
    <main className="min-h-[100svh]">
      <Hero />
      <StatsStrip />

      {/* Trust Signals */}
      <TrustSignals />

      <Testimonials />
      <FAQ />
      <MarqueeLogos />
      <Awards />
    </main>
  );
}




