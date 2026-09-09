import PageIntro from "@/components/site/PageIntro";
import Hero from "@/components/sections/Hero";
import StatementMarquee from "@/components/sections/StatementMarquee";
import SelectedWork from "@/components/sections/SelectedWork";
import Performance from "@/components/sections/Performance";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import FeaturedCase from "@/components/sections/FeaturedCase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CustomWork from "@/components/sections/CustomWork";
import PricingTeaser from "@/components/sections/PricingTeaser";
import Partnership from "@/components/sections/Partnership";
import Pricing from "@/components/sections/Pricing";
import Team from "@/components/sections/Team";
import Faq from "@/components/sections/Faq";
import Testimonials from "@/components/sections/Testimonials";
import WhispersPreview from "@/components/sections/WhispersPreview";
import CtaBlock from "@/components/sections/CtaBlock";

export default function HomePage() {
  return (
    <PageIntro>
      <Hero />
      <StatementMarquee />
      <SelectedWork />
      <Performance />
      <ClientsMarquee />
      <Services />
      <Process />
      <FeaturedCase />
      <WhyChooseUs />
      <CustomWork />
      <PricingTeaser />
      <Partnership />
      <Pricing />
      <Team />
      <Faq />
      <Testimonials />
      <WhispersPreview />
      <CtaBlock />
    </PageIntro>
  );
}
