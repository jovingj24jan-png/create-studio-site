export const site = {
  name: "Create®",
  wordmark: "Create® —  Design Studio",
  tagline: "Brands and products built to carry weight.",
  blurb:
    "An independent studio for brand, product and web, built for teams who need clarity as much as craft.",
  email: "hello@create.com",
  phone: "(310) 555-0165",
  addressA: ["Create Studio LLC.", "8 Sunset Blvd, Office 5", "Los Angeles, CA 90026"],
  addressB: ["Create Studio LLC.", "567 Sunset Blvd, Suite 501", "Los Angeles, CA 90026"],
  timezone: "UTC−8 LOS ANGELES",
};

export const nav = [
  { label: "WORK", href: "/work", count: 6 },
  { label: "STUDIO", href: "/studio" },
  { label: "WHISPERS", href: "/whispers", count: 7 },
  { label: "CONTACT", href: "/contact" },
];

export const footerNav = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/work", count: 6 },
  { label: "STUDIO", href: "/studio" },
  { label: "WHISPERS", href: "/whispers" },
  { label: "CONTACT", href: "/contact" },
];

export const footerLinks = [
  { label: "TERMS OF SERVICE", href: "/contact" },
  { label: "PRIVACY POLICY", href: "/contact" },
  { label: "DISCLAIMER", href: "/contact" },
  { label: "404", href: "/not-found-demo" },
];

export const socials = [
  { label: "X", href: "https://x.com" },
  { label: "Li", href: "https://linkedin.com" },
  { label: "IG", href: "https://instagram.com" },
  { label: "FB", href: "https://facebook.com" },
  { label: "WA", href: "https://wa.me/13105550165" },
];

export type Project = {
  slug: string;
  client: string;
  title: string;
  subtitle: string;
  brief: string;
  date: string;
  year: string;
  stack: string[];
  categories: string[];
  image: string;
  wide: string;
};

export const projects: Project[] = [
  {
    slug: "solvanne",
    client: "Solvanne",
    title: "Solvanne Coastal Retreat",
    subtitle: "Hospitality branding and website",
    brief: "Give a new coastal resort an identity and a booking platform worth the stay.",
    date: "August 21, 2025",
    year: "2025",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Edge CDN"],
    categories: ["Brand & Identity", "UI/UX Design", "Responsive Web Design", "Development"],
    image: "/img/project-solvanne.svg",
    wide: "/img/project-solvanne-wide.svg",
  },
  {
    slug: "harrowgate",
    client: "Harrowgate",
    title: "Harrowgate Motors",
    subtitle: "Automotive digital transformation",
    brief: "Rebrand a heritage marque and put its first electric line online.",
    date: "June 25, 2025",
    year: "2025",
    stack: ["React", "WebGL", "Node.js", "Serverless", "Vector Search"],
    categories: ["Strategy", "Product Design", "Animation & Motion", "Development"],
    image: "/img/project-harrowgate.svg",
    wide: "/img/project-harrowgate-wide.svg",
  },
  {
    slug: "verge",
    client: "Vantar",
    title: "Verge® 04",
    subtitle: "E-Mobility brand launch",
    brief: "Position a new e-bike as both a lifestyle object and a piece of hardware.",
    date: "June 19, 2025",
    year: "2025",
    stack: ["Framer", "Next.js", "Motion One", "WebGL", "Campaign tooling"],
    categories: ["Brand & Identity", "Digital Campaigns", "Content", "SEO"],
    image: "/img/project-verge.svg",
    wide: "/img/project-verge-wide.svg",
  },
  {
    slug: "plinth",
    client: "Plinth",
    title: "Plinth Architects",
    subtitle: "Architecture studio rebrand and platform",
    brief: "Move a practice past the static portfolio into a platform with a point of view.",
    date: "April 02, 2025",
    year: "2025",
    stack: ["Next.js", "Sanity CMS", "GSAP", "Vercel"],
    categories: ["Brand & Identity", "User Research", "UI/UX Design", "Development"],
    image: "/img/project-plinth.svg",
    wide: "/img/project-plinth-wide.svg",
  },
  {
    slug: "atelier",
    client: "Atelier",
    title: "Atelier Nord",
    subtitle: "Fashion label digital identity",
    brief: "Hold street-level origins and luxury ambition in one online voice.",
    date: "February 14, 2025",
    year: "2025",
    stack: ["Shopify Hydrogen", "TypeScript", "Motion", "Cloudflare"],
    categories: ["Brand & Identity", "E-commerce", "Social Media Marketing", "Content"],
    image: "/img/project-atelier.svg",
    wide: "/img/project-atelier-wide.svg",
  },
  {
    slug: "sundermark",
    client: "Sundermark",
    title: "Sundermark",
    subtitle: "Product platform and design system",
    brief: "Ship a system a growing product team can actually keep building on.",
    date: "November 09, 2024",
    year: "2024",
    stack: ["React", "Storybook", "Design tokens", "Playwright"],
    categories: ["Product Design", "UI/UX Design", "Strategy", "Development"],
    image: "/img/project-sundermark.svg",
    wide: "/img/project-sundermark-wide.svg",
  },
];

export const workCategories = [
  "Category",
  "Brand & Identity",
  "User Research",
  "UI/UX Design",
  "Strategy",
  "Responsive Web Design",
  "Product Design",
  "Content",
  "Copywriting",
  "AI Systems",
  "Digital Campaigns",
  "Social Media Marketing",
  "SEO",
  "E-commerce",
  "Development",
  "Animation & Motion",
];

export const performance = [
  { index: "//001", value: 86, suffix: "+", label: "Projects shipped" },
  { index: "//002", value: 80, suffix: "%", label: "Repeat collaborations" },
  { index: "//003", value: 32, suffix: "", label: "Industry awards" },
  { index: "//004", value: 89, suffix: "%", label: "Client retention rate" },
];

export const clients = [
  "sundermark",
  "plinth",
  "vantar",
  "weldon",
  "harrowgate",
  "solvanne",
  "atelier",
  "halden",
  "kestrel",
  "ostara",
];

export type Service = {
  no: string;
  kicker: string;
  title: string;
  copy: string;
  points: string[];
  image: string;
};

export const services: Service[] = [
  {
    no: "01",
    kicker: "Foundation",
    title: "Brand Identity",
    copy: "The base layer of every engagement — how a brand looks, sounds and holds together in use.",
    points: [
      "Positioning and messaging frameworks",
      "Visual identity systems",
      "Guidelines written to be followed",
      "Digital-first brand systems",
      "Asset kits across campaigns and touchpoints",
    ],
    image: "/img/service-identity.svg",
  },
  {
    no: "02",
    kicker: "Growth",
    title: "Strategy",
    copy: "Direction backed by research and planning, so the route from idea to execution stays short.",
    points: [
      "Market and audience research",
      "Product and campaign strategy",
      "User journey mapping",
      "Roadmaps and rollout planning",
      "Workshops and alignment sessions",
    ],
    image: "/img/service-strategy.svg",
  },
  {
    no: "03",
    kicker: "Creative",
    title: "Design & Innovation",
    copy: "From first concepts to shipped products people actually want to keep using.",
    points: [
      "UX and UI design",
      "Prototyping and user testing",
      "Digital product and service design",
      "Iteration and validation",
      "Launch planning and support",
    ],
    image: "/img/service-design.svg",
  },
  {
    no: "04",
    kicker: "Smart AI",
    title: "AI Systems",
    copy: "Applied, unglamorous uses of AI that make products and internal workflows measurably faster.",
    points: [
      "Define an AI vision and roadmap",
      "Intelligent experience design",
      "Prototyping and proof-of-concepts",
      "Integration into platforms and workflows",
      "Team enablement and training",
    ],
    image: "/img/service-ai.svg",
  },
  {
    no: "05",
    kicker: "Discoverable",
    title: "SEO",
    copy: "Structure, content and speed working together so the right people find the work.",
    points: [
      "Technical site audit",
      "Keyword research and content strategy",
      "On-page and metadata optimisation",
      "Link-building and authority growth",
      "Performance tracking and reporting",
    ],
    image: "/img/service-seo.svg",
  },
  {
    no: "06",
    kicker: "Build",
    title: "Development",
    copy: "Turning designs into products that stay fast, accessible and maintainable after handover.",
    points: [
      "Web and app development",
      "CMS integration and setup",
      "E-commerce builds and optimisation",
      "Custom feature development",
      "Ongoing technical support",
    ],
    image: "/img/service-development.svg",
  },
];

export const processSteps = [
  {
    no: "//01",
    title: "Discovery",
    copy: "We start by listening. Goals, constraints and audience get mapped in the open, which sets the frame for everything after it.",
  },
  {
    no: "//02",
    title: "Strategy",
    copy: "With the insight in hand we set the route: positioning, priorities and the order design and build should happen in.",
  },
  {
    no: "//03",
    title: "Design & Build",
    copy: "Ideas take shape. Interface, motion and code develop together, with detail reviewed at every checkpoint.",
  },
  {
    no: "//04",
    title: "Launch & Grow",
    copy: "Delivery is a milestone, not the end. We measure, refine and scale so the work keeps performing.",
  },
];

export const studioProcess = [
  {
    no: "/01",
    title: "Discover and define",
    copy: "A focused workshop to clarify goals, audiences and metrics — ending with a sharp brief and a shared timeline.",
  },
  {
    no: "/02",
    title: "Concept and creative direction",
    copy: "We explore options, pressure-test the strongest ones and align quickly through short visual check-ins.",
  },
  {
    no: "/03",
    title: "Design and prototype",
    copy: "Concepts become something you can click. Interactive prototypes speed up decisions and keep feedback documented.",
  },
  {
    no: "/04",
    title: "Build and launch",
    copy: "Design and engineering ship together — clear sprints, no surprises, and a launch plan covering QA, accessibility and performance.",
  },
];

export const whyStats = [
  { value: 99.9, decimals: 1, suffix: "%", label: "Client satisfaction rate" },
  { value: 12, decimals: 0, suffix: "+", label: "Industries served" },
  { value: 24, decimals: 0, suffix: "h", label: "Average response time" },
  { value: 96, decimals: 0, suffix: "%", label: "First draft approved" },
  { value: 99, decimals: 0, suffix: "%", label: "Ship on-time" },
];

export const plans = [
  {
    no: "01",
    tier: "Core",
    name: "Starter Plan",
    audience: "For startups and first launches",
    price: "$2,800",
    was: "$3,500",
    unit: "/project",
    save: "SAVE 20%",
    copy: "Fast, focused and effective — enough to launch properly without carrying scope you do not need yet.",
    features: [
      "Brand & identity starter kit",
      "Website design (core pages)",
      "Standard revisions",
      "SEO setup essentials",
      "Licensed stock imagery",
      "Native source files included",
      "Final handoff files",
    ],
    notes: [
      "Clear milestones from start to finish",
      "You stay in the loop each week",
      "Feedback built into the process",
    ],
    timeline: "2–3 weeks",
    featured: false,
  },
  {
    no: "02",
    tier: "Studio",
    name: "Advanced Plan",
    audience: "For growing teams and serious builds",
    price: "$6,500",
    was: "$8,000",
    unit: "/project",
    save: "SAVE 18%",
    copy: "A fuller package with room to move — deeper design coverage and the support to grow into it.",
    features: [
      "Extended branding",
      "Full website design",
      "UX flows & product design",
      "Unlimited revisions",
      "Advanced SEO & content",
      "Priority support response",
      "Final handoff",
    ],
    notes: [
      "Deeper design coverage for complex needs",
      "Unlimited adjustments before launch",
      "Faster responses when it matters",
    ],
    timeline: "4–6 weeks",
    featured: true,
  },
  {
    no: "03",
    tier: "Scale",
    name: "Growth Plan",
    audience: "For established teams and long-term growth",
    price: "$12,000",
    was: "$15,000",
    unit: "/project",
    save: "SAVE 20%",
    copy: "Strategy, design and dedicated support for programmes that have to scale and stay polished.",
    features: [
      "End-to-end brand strategy",
      "Large-scale website & CMS",
      "Advanced UX & product design",
      "Dedicated senior leads",
      "Advanced micro-interactions",
      "Optimisation & support",
      "Enterprise-level handoff",
    ],
    notes: [
      "Scalable solutions designed for growth",
      "A dedicated lead across every stage",
      "Long-term support beyond launch",
    ],
    timeline: "6–8 weeks",
    featured: false,
  },
];

export const planTiers = [
  { name: "Core", copy: "For startups and first launches" },
  { name: "Studio", copy: "For growing teams and serious builds" },
  { name: "Scale", copy: "For established teams and long-term growth" },
];

export type Person = {
  slug: string;
  name: string;
  role: string;
  kpi?: string;
  kpiCopy?: string;
};

export const team: Person[] = [
  {
    slug: "ivar-solheim",
    name: "Ivar Solheim",
    role: "Founder & CEO",
    kpi: "97%",
    kpiCopy: "Projects delivered on time under his oversight.",
  },
  {
    slug: "priya-raghavan",
    name: "Priya Raghavan",
    role: "Head of Strategy",
    kpi: "89%",
    kpiCopy: "Campaigns that hit or beat the agreed KPIs.",
  },
  {
    slug: "camille-okonkwo",
    name: "Camille Okonkwo",
    role: "Chief Creative Officer",
    kpi: "120+",
    kpiCopy: "Brand identities launched across industries.",
  },
  {
    slug: "dan-whitfield",
    name: "Dan Whitfield",
    role: "Technical Director",
    kpi: "3.4x",
    kpiCopy: "Faster site performance than the category average.",
  },
];

export const extendedTeam: Person[] = [
  ...team,
  { slug: "jonas-ferreira", name: "Jonas Ferreira", role: "Head of Projects", kpi: "99%", kpiCopy: "Milestones closed inside the agreed window." },
  { slug: "rea-lindqvist", name: "Rea Lindqvist", role: "Client Services Director", kpi: "24h", kpiCopy: "Median first response to any client thread." },
  { slug: "yara-haddad", name: "Yara Haddad", role: "Campaign Strategist", kpi: "84%", kpiCopy: "Average lift in campaign engagement." },
  { slug: "tomas-kovac", name: "Tomas Kovac", role: "Design Director", kpi: "40+", kpiCopy: "Design systems built and handed over." },
];

export const faqs = [
  {
    q: "What kind of projects does Create take on?",
    a: "Brand identity, digital products and websites that need design clarity and technical polish in equal measure.",
  },
  {
    q: "How do you approach new projects?",
    a: "We start with your goals and constraints, then set out milestones so you always know what is coming next and when.",
  },
  {
    q: "What is a realistic project timeline?",
    a: "Branding and smaller sites usually run two to four weeks. Larger sites and platforms run six to twelve, depending on scope.",
  },
  {
    q: "Who actually does the work?",
    a: "Senior designers and engineers lead every project. Nothing gets handed to a junior to figure out mid-flight.",
  },
  {
    q: "How do we communicate during the process?",
    a: "One main contact, a weekly written update, and quick replies in between. No status theatre.",
  },
  {
    q: "What happens after launch?",
    a: "We can stay on for fixes, updates and ongoing support, or hand over cleanly with documentation. Both are normal.",
  },
  {
    q: "Do you work with startups as well as larger companies?",
    a: "Yes. We have taken founders through a first launch and supported established teams moving into new markets.",
  },
  {
    q: "How do you measure success for a project?",
    a: "By what happens after launch — engagement, conversion and retention. We track performance and share what we find, rather than stopping at a nice-looking handover.",
  },
  {
    q: "Can we start small and scale later?",
    a: "Yes. Plenty of clients begin with a brand refresh or a site rebuild and expand into campaigns, strategy and ongoing support as they grow.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  date?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They did not just meet the brief, they lifted it. The whole engagement stayed collaborative, with clear updates, fast turns and an end result that carried our brand further than we had planned for.",
    name: "Iris Kalloway",
    role: "Marketing Lead",
    company: "Sundermark",
    date: "September 2025",
  },
  {
    quote:
      "Kickoff to launch moved quickly and never felt chaotic. Issues were solved before they became problems, and the ship date held.",
    name: "Theo Brandt",
    role: "Head of Product",
    company: "Plinth",
  },
  {
    quote:
      "We did not get a website, we got a framework we can keep growing into. Every decision came with a reason behind it.",
    name: "Ada Vasquez",
    role: "Brand Manager",
    company: "Vantar",
  },
  {
    quote:
      "They do not deliver and disappear. The team stayed close, fixed details on the fly and made launch week uneventful.",
    name: "Rowan Petit",
    role: "Creative Lead",
    company: "Weldon",
  },
  {
    quote:
      "The whole thing felt effortless. They understood the vision early and kept us aligned through clear milestones, and the site genuinely elevated our voice rather than decorating it.",
    name: "Nils Aaberg",
    role: "Creative Director",
    company: "Harrowgate",
  },
  {
    quote:
      "Every meeting was useful, every deadline held, and the result described our brand better than we could.",
    name: "Delia Sorensen",
    role: "Head of Design",
    company: "Solvanne",
  },
  {
    quote:
      "They took a messy brief and turned it into something we are proud to show. Fast, sharp, no overthinking.",
    name: "Owen Marsh",
    role: "Founder",
    company: "Kestrel",
  },
  {
    quote:
      "A rare balance of speed and detail. Complex flows came back simple, feedback turned around quickly, and the product is both usable and on-brand.",
    name: "Saskia Vance",
    role: "UX Lead",
    company: "Ostara",
  },
];

export type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: "product-design-with-intelligence",
    date: "Jul 30, 2025",
    title: "Rethinking Product Design with Intelligence",
    excerpt:
      "How AI belongs inside products and workflows as a foundation rather than a bolted-on widget.",
    author: "Dan Whitfield",
    authorRole: "Technical Director",
    image: "/img/whisper-1.svg",
  },
  {
    slug: "digital-identities-across-cultures",
    date: "Jul 25, 2025",
    title: "Digital Identities Across Cultures",
    excerpt:
      "What happens when a label has to hold street-level energy and high-fashion polish in the same interface.",
    author: "Owen Marsh",
    authorRole: "Marketing Lead",
    image: "/img/whisper-2.svg",
  },
  {
    slug: "architecture-in-the-digital-age",
    date: "Jul 20, 2025",
    title: "Architecture in the Digital Age",
    excerpt:
      "Why practices need to move past the static gallery and build platforms that carry ambition and authority.",
    author: "Rowan Petit",
    authorRole: "Creative Lead",
    image: "/img/whisper-3.svg",
  },
  {
    slug: "future-of-e-mobility-marketing",
    date: "Jul 15, 2025",
    title: "The Future of E-Mobility Marketing",
    excerpt:
      "Launching an e-bike brand taught us more about positioning and culture than about hardware.",
    author: "Theo Brandt",
    authorRole: "Head of Product",
    image: "/img/whisper-4.svg",
  },
  {
    slug: "how-automotive-brands-win-online",
    date: "Dec 7, 2025",
    title: "How Automotive Brands Win Online",
    excerpt:
      "Configurators, storytelling and interaction that can hold their own against a test drive.",
    author: "Nils Aaberg",
    authorRole: "UX Strategist",
    image: "/img/whisper-5.svg",
  },
  {
    slug: "designing-trust",
    date: "Oct 8, 2025",
    title: "Designing Trust: Why Simplicity Wins",
    excerpt:
      "In a loud market, clarity reads as credibility. Structure and restraint do most of the work.",
    author: "Priya Raghavan",
    authorRole: "Head of Strategy",
    image: "/img/whisper-6.svg",
  },
  {
    slug: "hospitality-as-destination",
    date: "Oct 7, 2025",
    title: "Hospitality Sites That Feel Like Destinations",
    excerpt:
      "How resorts can design a digital arrival that matches the atmosphere of the physical one.",
    author: "Camille Okonkwo",
    authorRole: "Chief Creative Officer",
    image: "/img/whisper-7.svg",
  },
];

export const awards = [
  {
    name: "Signal Awards 2025",
    copy: "Recognised for overall excellence in digital design, execution and innovation across multiple projects.",
    category: "Best Creative Agency",
    year: "2025",
  },
  {
    name: "Cascade",
    copy: "Honoured for visual direction, interactive storytelling and technical performance on a resort platform.",
    category: "Site of the Day",
    year: "2025",
  },
  {
    name: "Northline Design Prize",
    copy: "Honoured for balanced structure, high usability and a strong identity carried across many layouts.",
    category: "Site of the Month",
    year: "2024",
  },
  {
    name: "Blackmark Design",
    copy: "Celebrated for seamless user experience, motion design and a brand-led e-mobility launch.",
    category: "Best Product Design",
    year: "2024",
  },
  {
    name: "Agency of the Year",
    copy: "Recognised for blending structure, storytelling and craft in a minimalist architectural showcase.",
    category: "Innovation & UI Excellence",
    year: "2024",
  },
  {
    name: "Interface Craft Awards",
    copy: "Recognised for elevating product storytelling with motion-led interaction and precise visual flow.",
    category: "Product & Marketing",
    year: "2023",
  },
];

export const studioStats = [
  { index: "//001", value: 48, suffix: "%", label: "New clients onboarded" },
  { index: "//002", value: 120, suffix: "%", label: "Projects delivered" },
  { index: "//003", value: 87, suffix: "%", label: "Repeat collaborations" },
];
