export const projects = [
  {
    id: 1,
    title: 'HACK SNU 2025 : JoJo Interview',
    date: 'Oct. 2025 – Present (In Progress)',
    image: '/static/img/snu_hack.png',
    description:
      'Developing System architecture and AI engine for JoJo Interview, a service enabling high school students to practice interviews anytime. Microservice architecture with asynchronous pipelines for scalable video analysis. AI modules include VLM/LLM for automated feedback and dynamic interview question generation.',
    members: ['Jaeho Lim', 'Hwanhoon Chung', 'Sunghyun Park'],
    highlight: 'Sunghyun Park',
    links: [
      { label: 'Homepage', url: 'https://jojomeeting.com', primary: true },
      { label: 'Watch Video', url: 'https://www.youtube.com/watch?si=JvINoFl9NnEpL8Cj&v=K6XNPr9C6Go&feature=youtu.be', primary: false },
    ],
  },
  {
    id: 2,
    title: 'My Academic Homepage',
    date: 'Jun. 2025 – Oct. 2025',
    image: '/static/img/homepage.png',
    description:
      'This website. Features Gallery and Blog — the Blog supports full-text search and parses Markdown files with category-based tree navigation.',
    members: ['Sunghyun Park'],
    highlight: 'Sunghyun Park',
    links: [
      { label: 'Code', url: 'https://github.com/SunghyunP-ark/sunghyunp-ark.github.io', primary: true },
    ],
  },
  {
    id: 3,
    title: 'LLM Course Project : Prompt Optimization',
    date: 'Jun. 2025',
    image: '/static/img/project3.png',
    description:
      'Implemented a prompt-optimization framework combining OPRO with an evolutionary algorithm (selection, crossover, mutation) and an LLM-based scorer for self-rewriting. Evaluated on GSM8K with Llama-3.1-8B-Instruct and Mistral-7B-Instruct.',
    members: ['Sunghyun Park'],
    highlight: 'Sunghyun Park',
    links: [
      { label: 'Read Slide', url: 'projects/LLM_final_project_2020162029_SunghyunPark.pdf', primary: true },
      { label: 'Watch Video', url: 'https://drive.google.com/file/d/157icn03gwgjtJ0IuxhiFkt-RF9sPYt42/view?usp=sharing', primary: false },
    ],
  },
  {
    id: 4,
    title: 'Reducing WebOS Boot Latency',
    date: 'Mar. 2025 – Jun. 2025',
    image: '/static/img/project2.png',
    description:
      'Used ftrace and kernel instrumentation to capture boot-time function traces, identify hotspots and page faults. Reorganized code sections via custom linker script and ELF binary layout optimization to reduce kernel page faults and improve boot times for embedded devices.',
    members: ['Sunghyun Park', 'Jonghyun Hwang', 'Sungyoon Lim', 'Changwon Kim'],
    highlight: 'Sunghyun Park',
    links: [
      { label: 'Read Poster', url: 'projects/webos.pdf', primary: true },
      { label: 'Watch Video', url: 'https://drive.google.com/file/d/1B6N1LI7d2y6uDq564PfLgFiYI12pRJII/view?usp=sharing', primary: false },
      { label: 'Code', url: 'https://github.com/BOOST-Yonsei', primary: false },
    ],
  },
  {
    id: 5,
    title: 'Force-Driven Mechano-Typing of B Cells',
    date: 'Dec. 2024 – Feb. 2025',
    image: '/static/img/project1.png',
    description:
      'Combined multi-threshold molecular tension probes and three-channel microscopy (DIC, RICM, TIRF) with a deep autoencoder to encode single-cell images into 32-D biophysical representations. Reveals how mechanical forces and CD40L mutations shape B-cell morphology and adhesion.',
    members: ['Sunghyun Park', 'Yelim Jeon', 'Hyunkyu Choi'],
    highlight: 'Sunghyun Park',
    links: [
      { label: 'Read Poster', url: 'projects/Force-Driven Mechano-Typing of B Cells - Multi-channel image analysis of cd40-cd40l interaction using autoencoder.pdf', primary: true },
    ],
  },
]
