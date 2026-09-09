import type { Metadata } from "next";
import PageIntro from "@/components/site/PageIntro";
import WhispersIndex from "@/components/sections/WhispersIndex";
import CtaBlock from "@/components/sections/CtaBlock";

export const metadata: Metadata = {
  title: "Whispers",
  description: "Notes on design, strategy and making things work.",
};

export default function WhispersPage() {
  return (
    <PageIntro>
      <WhispersIndex />
      <CtaBlock />
    </PageIntro>
  );
}
