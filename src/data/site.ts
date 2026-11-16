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
  { href: '/lab/', label: 'Lab', accent: 'plum' },
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

// Interactive pieces. Each one is a self-contained HTML page in
// public/interactive/<slug>/index.html, framed by the site at /lab/<slug>/.
export const lab = [
  {
    slug: 'ml-notation-atlas',
    title: 'ML Notation Atlas',
    kind: 'Reference',
    date: 'Nov 2026',
    summary:
      'A searchable atlas of the symbols and equations machine-learning papers use without explaining — from 𝔼 and ∇ to the ELBO, attention and diffusion.',
    glyphs: ['∇', '𝔼', 'θ', 'Σ'],
  },
];

export const works = [
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
    kind: 'Web app',
    body: 'Multilingual web app supporting a 5,000+ participant mathematics olympiad.',
    mark: 'µ',
  },
  {
    title: 'Mora Fitness Challenge',
    kind: 'Poster',
    body: 'Event branding and print for the university rowing club.',
    mark: 'MFC',
  },
  {
    title: 'UI Experiments',
    kind: 'Case study',
    body: 'Interface studies published as Behance case studies.',
    mark: 'UI',
  },
  {
    title: 'AcneAid',
    kind: 'Pitch deck',
    body: 'Narrative and slide design for a healthcare product pitch.',
    mark: 'Aa',
  },
  {
    title: 'Field Notes',
    kind: 'Photography',
    body: 'Colombo, mostly at dusk. A running personal series.',
    mark: 'ƒ/2',
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
