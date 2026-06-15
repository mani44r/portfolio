/** Site-wide brand & SEO constants for Manikanta Ramineni's portfolio. */
export const SITE = {
  name: 'Manikanta Ramineni',
  shortName: 'mani',
  title: 'AI Engineer & Machine Learning Developer',
  tagline:
    'Building intelligent systems with Machine Learning, Deep Learning, Generative AI, and scalable full-stack engineering.',
  description:
    'Portfolio of Manikanta Ramineni — AI Engineer, Machine Learning Developer, and Full-Stack Builder. Building intelligent systems that solve real-world problems with ML, deep learning, and generative AI.',
  keywords: [
    'AI Engineer',
    'Machine Learning Engineer',
    'Data Science Student',
    'Generative AI Developer',
    'Full Stack Developer',
    'Manikanta Ramineni',
    'CBIT',
    'Python',
    'TensorFlow',
    'PyTorch',
    'RAG',
    'LangChain',
  ],
  email: 'manikantaramineni113@gmail.com',
  resume: '/Manikanta-Ramineni-Resume.pdf',
  github: 'https://github.com/mani44r',
  linkedin: 'https://www.linkedin.com/in/manikanta-ramineni-08861228b',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/assets/og-cover.svg',
} as const;

export const TECH_MARQUEE = [
  'Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'FastAPI', 'React', 'Next.js',
  'AWS', 'Docker', 'LangChain', 'RAG', 'Vector DB', 'OpenAI', 'Gemini',
  'Flask', 'Node.js', 'PostgreSQL', 'Git', 'GitHub', 'OpenCV', 'Pandas',
] as const;
