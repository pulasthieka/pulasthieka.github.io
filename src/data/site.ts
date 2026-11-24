// All the copy that isn't a blog post lives here, so it can be edited in one place.

export const site = {
  name: 'Pulasthi Ekanayake',
  initials: 'PE',
  title: 'Pulasthi Ekanayake — biomedical engineer who also designs',
  description:
    'Biomedical engineer writing about biosignals, diagnostics and the machine learning behind them, with interactive explainers and some design work on the side.',
  email: 'hello@pulasthi.dev',
  location: 'Colombo → Melbourne',
  status: 'Colombo → Melbourne · PhD, Oct 2026',
  tagline: 'Biosignals, machine learning, design',
  byline:
    'a biomedical engineer who works on biosignals and the machine learning that reads them, and designs things on the side',
  links: {
    github: 'https://github.com/pulasthieka',
    linkedin: 'https://linkedin.com/in/pulasthi-ekanayake',
    behance: 'https://www.behance.net/pulasthieka',
  },
};

export const nav = [
  { href: '/blog/', label: 'Articles' },
  { href: '/research/', label: 'Research' },
  { href: '/creative/', label: 'Design' },
  { href: '/about/', label: 'About' },
] as const;

export const highlights = [
  {
    title: 'Undergraduate thesis',
    meta: 'Univ. of Moratuwa',
    sub: 'A reconfigurable device that measures endothelial function from several biosignals at once.',
    body: 'I built it to record blood pressure, temperature, bioimpedance and PPG, and validated it in a clinical study approved by the medical council. Supervised by Dr. Anjula De Silva.',
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
    sub: 'Real-time 3D reconstruction to make factory floors safer.',
    body: 'I built a reconstruction tool that other researchers went on to use for testing computer vision algorithms.',
  },
  {
    title: 'Current work',
    meta: 'ExpertIntelligence.ai',
    sub: 'Working out which compounds are in a sample, and how much, from mass spectrometry data.',
    body: 'I lead the research, which is heading toward spatial proteomics.',
  },
  {
    title: 'Conference presentations',
    meta: 'ASMS 2024',
    sub: 'Talks and posters.',
    body: 'On deep learning for LC-MS authentication, and on registering MALDI images.',
  },
];

export const timeline = [
  { when: 'Oct 2026 —', role: 'PhD candidate, biomedical engineering', org: 'University of Melbourne' },
  { when: '2024 — 2026', role: 'Machine learning engineer · research lead', org: 'ExpertIntelligence.ai' },
  { when: '2021 — 2022', role: 'Software engineer, then software architect', org: 'Yaala Labs' },
  { when: '2019', role: 'Industrial research intern, computer vision', org: 'CSIRO Data61, Brisbane' },
  { when: '2016 — 2021', role: 'BSc Eng (Hons) Biomedical Engineering — First Class', org: 'University of Moratuwa' },
];

// Creative work. `img` is a file in src/assets/work/ (covers pulled from
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
    body: 'A scheduling app that ran 100+ interviews when our university career fair had to go online during the pandemic. They brought it back the next year.',
    cta: 'Case study →',
    href: '/creative/virtual-career-fair/',
    mark: 'VCF',
  },
  {
    title: 'µMora Mathematics',
    kind: 'Web app · UI',
    body: 'A multilingual web app for a maths olympiad with more than 5,000 participants.',
    mark: 'µ',
    img: 'umora.webp',
    href: be('142240881/Mora-Online-Mathematics-Competition-UI'),
  },
  {
    title: 'Redesigns',
    kind: 'UI',
    body: 'A set of redesign exercises.',
    mark: 'Re',
    img: 'redesigns.webp',
    href: be('210597927/Redesigns'),
  },
  {
    title: 'Mora Fitness Challenge',
    kind: 'Poster',
    body: 'Branding and print for an event run by the university rowing club.',
    mark: 'MFC',
    img: 'mora-fitness.webp',
    href: be('72457441/Mora-Fitness-Challenge'),
  },
  {
    title: 'UI Experiments',
    kind: 'Case study',
    body: 'Interface studies, written up as case studies on Behance.',
    mark: 'UI',
    img: 'ui-experiments.webp',
    href: be('142236985/UI-Experiments'),
  },
  {
    title: 'AcneAid Plasters',
    kind: 'Pitch deck',
    body: 'The story and the slides for a healthcare product pitch.',
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
    body: 'A cover for a chemistry magazine.',
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
    body: 'Graphic design is one of my more productive hobbies. I made this to teach design basics to high-school students.',
    src: deck('Graphic Design Worshop.pptx'),
  },
  {
    title: 'Pulse oximeters',
    body: 'How the pulse oximeter, one of the simplest and most useful bits of medical sensing kit, actually works.',
    src: deck('Pulse Oximeters.pptx'),
  },
  {
    title: 'Ideation',
    body: 'How to come up with ideas, and how to pick the ones worth your time.',
    src: deck('Ideation.pptx'),
  },
  {
    title: 'Biomedical innovations',
    body: 'Another one from my series on biomedical innovation.',
    src: deck('Biomedical Innovations.pptx'),
  },
];
