import type { Metadata } from "next";
import "./v2.css";
import Nav from "@/components/v2/Nav";
import Hero from "@/components/v2/Hero";
import Manifesto from "@/components/v2/Manifesto";
import Grain from "@/components/v2/Grain";
import SmoothScroll from "@/components/v2/SmoothScroll";

export const metadata: Metadata = {
  title: "Create® — Design Studio",
  description: "Digital experiences that connect, scale and perform.",
};

export default function V2Page() {
  return (
    <div className="v2 relative overflow-x-hidden">
      <SmoothScroll />
      <Grain />
      <Nav />
      <Hero />
      <Manifesto />
    </div>
  );
}
