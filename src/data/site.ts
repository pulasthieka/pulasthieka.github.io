// All the copy that isn't a blog post lives here, so it can be edited in one place.

export const site = {
  name: 'Pulasthi Ekanayake',
  initials: 'PE',
  title: 'Pulasthi Ekanayake — biomedical engineer & occasional designer',
  description:
    'Biomedical engineer working on biosignals, diagnostics and the models that read them. Writing, interactive explainers and design work.',
  email: 'hello@pulasthi.dev',
  location: 'Colombo → Melbourne',
  status: 'Colombo → Melbourne · PhD, Oct 2026',
  links: {
    github: 'https://github.com/pulasthieka',
    linkedin: 'https://linkedin.com/in/pulasthi-ekanayake',
    behance: 'https://www.behance.net/pulasthieka',
  },
};

export const nav = [
  { href: '/research/', label: 'Researcher', accent: 'blue' },
  { href: '/blog/', label: 'Blog', accent: 'blue' },
  { href: '/creative/', label: 'Creative', accent: 'rust' },
  { href: '/about/', label: 'About', accent: 'green' },
] as const;

export const highlights = [
  {
    title: 'Undergraduate thesis',
    meta: 'Univ. of Moratuwa',
    sub: 'Reconfigurable multimodal biosignal acquisition system for measuring endothelial function.',
    body: 'Built a device recording blood pressure, temperature, bioimpedance and PPG signals, validated in a medical-council-approved clinical study. Supervised by Dr. Anjula De Silva.',
  },
  {
    title: 'Best Paper Award',
    meta: 'IEEE ICIIS 2023',
    sub: 'Endo-MASS: Multi-Signal Acquisition System and Software for Non-Invasive Assessment of Endothelial Function.',
    body: '',
  },
  {
    title: 'Industrial research',
    meta: 'CSIRO, Brisbane',
    sub: 'Real-time 3D reconstruction for factory-floor safety.',
    body: 'Built a reconstruction tool now used by other researchers evaluating computer vision algorithms.',
  },
  {
    title: 'Current work',
    meta: 'ExpertIntelligence.ai',
    sub: 'Compound identification and quantification from mass spectrometry data.',
    body: 'Leading research toward spatial proteomics applications.',
  },
  {
    title: 'Conference presentations',
    meta: 'ASMS 2024',
    sub: 'Oral and poster presentations.',
    body: 'Deep learning for LC-MS authentication, and MALDI image registration.',
  },
];

export const timeline = [
  { when: 'Oct 2026 —', role: 'PhD candidate, biomedical engineering', org: 'University of Melbourne' },
  { when: '2024 — 2026', role: 'Machine learning engineer · research lead', org: 'ExpertIntelligence.ai' },
  { when: '2021 — 2022', role: 'Software engineer, then software architect', org: 'Yaala Labs' },
  { when: '2019', role: 'Industrial research intern, computer vision', org: 'CSIRO Data61, Brisbane' },
  { when: '2016 — 2021', role: 'BSc Eng (Hons) Biomedical Engineering — First Class', org: 'University of Moratuwa' },
];

// Creative work. `img` is a file in public/img/work/ (covers pulled from
// Behance); without one the tile falls back to the typographic `mark`.
// `href` is the Behance project or an internal case study.
const be = (path: string) => `https://www.behance.net/gallery/${path}`;

export const works: {
  title: string;
  kind: string;
  body: string;
  mark: string;
  img?: string;
  href?: string;
  cta?: string;
}[] = [
  {
    title: 'Virtual Career Fair',
    kind: 'React · UX',
    body: 'Scheduling platform that handled 100+ interviews during a pandemic-era university career fair. Reused the following year.',
    cta: 'Case study →',
    href: '/creative/virtual-career-fair/',
    mark: 'VCF',
  },
  {
    title: 'µMora Mathematics',
    kind: 'Web app · UI',
    body: 'Multilingual web app supporting a 5,000+ participant mathematics olympiad.',
    mark: 'µ',
    img: 'umora.webp',
    href: be('142240881/Mora-Online-Mathematics-Competition-UI'),
  },
  {
    title: 'Redesigns',
    kind: 'UI',
    body: 'A collection of redesign exercises.',
    mark: 'Re',
    img: 'redesigns.webp',
    href: be('210597927/Redesigns'),
  },
  {
    title: 'Mora Fitness Challenge',
    kind: 'Poster',
    body: 'Event branding and print for the university rowing club.',
    mark: 'MFC',
    img: 'mora-fitness.webp',
    href: be('72457441/Mora-Fitness-Challenge'),
  },
  {
    title: 'UI Experiments',
    kind: 'Case study',
    body: 'Interface studies published as Behance case studies.',
    mark: 'UI',
    img: 'ui-experiments.webp',
    href: be('142236985/UI-Experiments'),
  },
  {
    title: 'AcneAid Plasters',
    kind: 'Pitch deck',
    body: 'Narrative and slide design for a healthcare product pitch.',
    mark: 'Aa',
    img: 'acneaid.webp',
    href: be('142238209/A-Pitch-Deck-AcneAid-Plasters'),
  },
  {
    title: 'Biomedical Innovations',
    kind: 'Pitch deck',
    body: 'Slides for a talk series on innovation in biomedical engineering.',
    mark: 'Bi',
    img: 'biomedical-innovations.webp',
    href: be('142239625/Biomedical-Innovations-Pitch-Deck'),
  },
  {
    title: 'Ceygiri Labs',
    kind: 'UI',
    body: 'Interface design for Ceygiri Labs.',
    mark: 'CL',
    img: 'ceygiri-labs.webp',
    href: be('139333187/Ceygiri-Labs-UI'),
  },
  {
    title: 'Chemistry Magazine',
    kind: 'Cover design',
    body: 'Cover artwork for a chemistry magazine.',
    mark: 'Ch',
    img: 'chemistry-magazine.webp',
    href: be('139335411/Chemistry-Magazine-Cover'),
  },
];

const deck = (file: string) =>
  'https://view.officeapps.live.com/op/embed.aspx?src=' +
  encodeURIComponent(
    `https://github.com/pulasthieka/presentations/raw/9b62f8794a67f17760e0cd474a17045d8d44f689/${file}`,
  );

export const talks = [
  {
    title: 'Graphic design workshop',
    body: 'Graphic design is one of my more productive hobbies. A presentation made to teach design concepts to high-school students.',
    src: deck('Graphic Design Worshop.pptx'),
  },
  {
    title: 'Pulse oximeters',
    body: 'How one of the simplest, yet most useful, pieces of medical sensing equipment works.',
    src: deck('Pulse Oximeters.pptx'),
  },
  {
    title: 'Ideation',
    body: 'How to generate ideas and select the ones that are worth working on.',
    src: deck('Ideation.pptx'),
  },
  {
    title: 'Biomedical innovations',
    body: 'Another presentation in my series on biomedical innovation.',
    src: deck('Biomedical Innovations.pptx'),
  },
];
