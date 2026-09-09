import type { Metadata } from "next";
import PageIntro from "@/components/site/PageIntro";
import WorkIndex from "@/components/sections/WorkIndex";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects in brand, product and web.",
};

export default function WorkPage() {
  return (
    <PageIntro>
      <WorkIndex />
      <ClientsMarquee heading="Teams we have built alongside" compact />
      <CtaBlock />
    </PageIntro>
  );
}
