import type { Metadata } from "next";
import PageIntro from "@/components/site/PageIntro";
import StudioIntro from "@/components/sections/StudioIntro";
import Team from "@/components/sections/Team";
import HowWeWork from "@/components/sections/HowWeWork";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import PartnersCta from "@/components/sections/PartnersCta";
import Achievements from "@/components/sections/Achievements";
import Awards from "@/components/sections/Awards";
import SelectedWork from "@/components/sections/SelectedWork";
import CtaBlock from "@/components/sections/CtaBlock";
import { extendedTeam } from "@/data/site";

export const metadata: Metadata = {
  title: "Studio",
  description: "The people, the process and the standards behind Create®.",
};

export default function StudioPage() {
  return (
    <PageIntro>
      <StudioIntro />
      <Team people={extendedTeam} />
      <HowWeWork />
      <ClientsMarquee heading="Teams who handed us their next chapter" compact />
      <PartnersCta />
      <Achievements />
      <Awards />
      <SelectedWork />
      <CtaBlock />
    </PageIntro>
  );
}
