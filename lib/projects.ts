/** Central project catalog — used on homepage, /projects, and detail modal. */
export type FlowStep = { label: string; detail?: string };

export type ProjectRecord = {
  id: string;
  title: string;
  year: string;
  cat: 'ai' | 'ml' | 'cv';
  cat_label: string;
  info: string;
  tag: string;
  img: string;
  hover_src: string;
  desc: string;
  role: string;
  stack: string;
  action: string;
  github?: string | null;
  demo?: string | null;
  overview: string;
  problem: string;
  architecture: string;
  flow?: FlowStep[];
  highlights?: string[];
  features: string[];
  challenges: string[];
  results: string;
};

export const FEATURED_PROJECT_ID = 'enterprise-knowledge';

export const CURRENTLY_BUILDING = [
  { title: 'Financial Intelligence Platform', note: 'NLP-driven report analysis & investment insights', tags: ['NLP', 'LLMs', 'FinTech'] },
  { title: 'Multi-Agent AI Systems', note: 'Orchestrated agents for complex reasoning workflows', tags: ['Agents', 'LangChain'] },
  { title: 'Advanced RAG Applications', note: 'Hybrid retrieval, re-ranking, and grounded generation', tags: ['Vector Search', 'RAG'] },
] as const;

export function getFeaturedProject(): ProjectRecord {
  return PROJECTS.find((p) => p.id === FEATURED_PROJECT_ID) ?? PROJECTS[0];
}

export function getMajorProjects(): ProjectRecord[] {
  return PROJECTS.filter((p) => p.flow?.length);
}

export const PROJECTS: ProjectRecord[] = [
  {
    id: 'enterprise-knowledge',
    title: 'Enterprise Knowledge Intelligence Platform',
    year: '2026',
    cat: 'ai',
    cat_label: 'Enterprise AI — RAG &amp; LLMs',
    info: 'Generative AI',
    tag: 'Python · FastAPI · RAG · LLMs',
    img: '/assets/projects/1.webp',
    hover_src: 'assets/projects/1.webp',
    desc: 'Built an <strong>enterprise knowledge platform</strong> that enables intelligent document search and question answering using Retrieval-Augmented Generation.',
    role: 'AI Engineer',
    stack: 'Python · FastAPI · RAG · Vector Database · LLMs',
    action: 'view details',
    github: 'https://github.com/mani44r',
    demo: null,
    overview:
      'An enterprise-grade knowledge intelligence system that transforms unstructured documents into a searchable, queryable AI knowledge base.',
    problem:
      'Organizations store critical knowledge across PDFs, wikis, and reports — but teams struggle to find accurate answers quickly without manual search.',
    architecture:
      'Document ingestion pipeline → chunking & embedding → vector store indexing → RAG retrieval layer → LLM synthesis via FastAPI backend → REST API for client apps.',
    features: [
      'Semantic document search across large corpora',
      'Context-aware Q&amp;A with source citations',
      'Vector database indexing for fast retrieval',
      'Modular FastAPI service architecture',
      'Pluggable LLM provider integration',
    ],
    challenges: [
      'Balancing chunk size vs. retrieval precision',
      'Reducing hallucinations with grounded context windows',
      'Designing scalable ingestion for heterogeneous file types',
    ],
    results:
      'Delivered a production-ready RAG pipeline capable of answering domain-specific queries with retrieved context — reducing manual document lookup time significantly.',
    highlights: ['RAG Architecture', 'Vector Search', 'LLM Integration', 'Enterprise Use Cases'],
    flow: [
      { label: 'Problem', detail: 'Scattered enterprise knowledge' },
      { label: 'Data Source', detail: 'PDFs, wikis, reports' },
      { label: 'Processing', detail: 'Chunking & embeddings' },
      { label: 'Model', detail: 'RAG + LLM synthesis' },
      { label: 'Output', detail: 'Grounded Q&A API' },
    ],
  },
  {
    id: 'financial-intelligence',
    title: 'Financial Intelligence Platform',
    year: '2026',
    cat: 'ai',
    cat_label: 'FinTech AI — NLP &amp; LLMs',
    info: 'Financial AI',
    tag: 'Python · NLP · LLMs',
    img: '/assets/projects/2.webp',
    hover_src: 'assets/projects/2.webp',
    desc: '<strong>AI-powered financial analysis system</strong> that extracts insights from reports and generates investment-oriented summaries.',
    role: 'AI Engineer',
    stack: 'Python · NLP · LLMs · Pandas',
    action: 'view details',
    github: 'https://github.com/mani44r',
    demo: null,
    overview:
      'A financial intelligence platform that reads earnings reports and market documents to produce structured, investment-oriented summaries.',
    problem:
      'Financial analysts spend hours parsing lengthy reports to extract key metrics, risks, and sentiment — a process ripe for intelligent automation.',
    architecture:
      'Report ingestion → NLP preprocessing → entity &amp; sentiment extraction → LLM summarization → structured insight dashboard.',
    features: [
      'Automated report summarization',
      'Key metric and risk extraction',
      'Sentiment analysis on financial narratives',
      'Investment-oriented summary generation',
      'Batch processing for multiple documents',
    ],
    challenges: [
      'Handling domain-specific financial terminology',
      'Ensuring factual grounding in source documents',
      'Structuring unstructured narrative into actionable insights',
    ],
    results:
      'Built an NLP-driven pipeline that converts dense financial reports into concise, analyst-ready summaries — accelerating research workflows.',
    flow: [
      { label: 'Problem', detail: 'Manual report analysis' },
      { label: 'Data Source', detail: 'Earnings & market docs' },
      { label: 'Processing', detail: 'NLP entity extraction' },
      { label: 'Model', detail: 'LLM summarization' },
      { label: 'Output', detail: 'Investment insights' },
    ],
  },
  {
    id: 'brain-tumor-analytics',
    title: 'Brain Tumor Data Analysis',
    year: '2025',
    cat: 'ml',
    cat_label: 'Medical AI — Data Analysis',
    info: 'Healthcare ML',
    tag: 'Python · EDA · Scikit-Learn',
    img: '/assets/projects/3.webp',
    hover_src: 'assets/projects/3.webp',
    desc: 'Exploratory data analysis and modeling on <strong>medical imaging datasets</strong> to uncover patterns in brain tumor classification.',
    role: 'ML Developer',
    stack: 'Python · Pandas · Scikit-Learn · Matplotlib',
    action: 'view details',
    github: 'https://github.com/mani44r/personalized-cancer-diagnosis',
    demo: null,
    overview:
      'A medical data analytics project applying EDA and machine learning to brain tumor imaging datasets for diagnostic insight.',
    problem:
      'Medical imaging datasets are high-dimensional and imbalanced — requiring careful exploration before building reliable classification models.',
    architecture:
      'Dataset exploration → preprocessing &amp; augmentation → feature analysis → model training → evaluation metrics &amp; explainability.',
    features: [
      'Comprehensive exploratory data analysis',
      'Class distribution and feature correlation studies',
      'Baseline ML model benchmarking',
      'Visualization of tumor region patterns',
      'Model explainability for clinical interpretability',
    ],
    challenges: [
      'Working with limited and imbalanced medical data',
      'Interpreting model outputs for non-technical stakeholders',
      'Avoiding overfitting on small specialized datasets',
    ],
    results:
      'Produced actionable EDA insights and baseline models that demonstrate feasibility of ML-assisted brain tumor analysis workflows.',
    flow: [
      { label: 'Problem', detail: 'Complex medical imaging data' },
      { label: 'Data Source', detail: 'Brain MRI datasets' },
      { label: 'Processing', detail: 'EDA & augmentation' },
      { label: 'Model', detail: 'ML classification' },
      { label: 'Output', detail: 'Diagnostic insights' },
    ],
  },
  {
    id: 'potato-disease',
    title: 'Potato Disease Classification',
    year: '2022',
    cat: 'cv',
    cat_label: 'Computer Vision — CNN',
    info: 'Deep Learning',
    tag: 'Python · CNN · TensorFlow',
    img: '/assets/projects/4.webp',
    hover_src: 'assets/projects/4.webp',
    desc: '<strong>CNN-based image classification</strong> system for detecting plant diseases from leaf imagery — enabling early agricultural intervention.',
    role: 'ML Developer',
    stack: 'Python · TensorFlow · CNN · OpenCV',
    action: 'view details',
    github: 'https://github.com/mani44r',
    demo: null,
    overview:
      'A convolutional neural network that classifies potato leaf images into healthy and diseased categories for early crop protection.',
    problem:
      'Farmers often detect plant diseases too late — computer vision can identify symptoms from leaf photos before widespread crop damage.',
    architecture:
      'Image dataset → augmentation pipeline → CNN model (transfer learning) → training &amp; validation → inference API for leaf image upload.',
    features: [
      'Multi-class disease classification',
      'Data augmentation for robust generalization',
      'Transfer learning with pre-trained CNN backbones',
      'Confidence scores per prediction',
      'Visual activation maps for interpretability',
    ],
    challenges: [
      'Limited labeled training images in field conditions',
      'Variations in lighting, angle, and background noise',
      'Achieving reliable performance across disease stages',
    ],
    results:
      'Achieved strong classification accuracy on held-out test sets — demonstrating practical feasibility for agricultural disease detection.',
    flow: [
      { label: 'Problem', detail: 'Late disease detection' },
      { label: 'Data Source', detail: 'Leaf image dataset' },
      { label: 'Processing', detail: 'Augmentation pipeline' },
      { label: 'Model', detail: 'CNN classifier' },
      { label: 'Output', detail: 'Disease prediction' },
    ],
  },
  {
    id: 'image-captioning',
    title: 'Image Captioning System',
    year: '2022',
    cat: 'cv',
    cat_label: 'Computer Vision — NLP',
    info: 'Deep Learning',
    tag: 'Python · CNN · LSTM · TensorFlow',
    img: '/assets/projects/5.webp',
    hover_src: 'assets/projects/5.webp',
    desc: 'An <strong>encoder-decoder deep learning model</strong> that generates natural language captions for input images.',
    role: 'ML Developer',
    stack: 'Python · TensorFlow · CNN · LSTM',
    action: 'view details',
    github: 'https://github.com/mani44r',
    demo: null,
    overview:
      'An image captioning system combining CNN feature extraction with sequence modeling to produce descriptive text for images.',
    problem:
      'Bridging the visual and language modalities requires architectures that understand image content and generate coherent natural language descriptions.',
    architecture:
      'CNN encoder (feature extraction) → LSTM/attention decoder (sequence generation) → beam search decoding → caption output.',
    features: [
      'End-to-end encoder-decoder architecture',
      'Attention mechanism for focused caption generation',
      'Beam search for higher-quality outputs',
      'BLEU score evaluation pipeline',
      'Batch inference on image datasets',
    ],
    challenges: [
      'Training stability across two heterogeneous model components',
      'Generating diverse captions beyond generic descriptions',
      'Managing long training times on limited GPU resources',
    ],
    results:
      'Built a working captioning pipeline that generates meaningful descriptions — establishing foundational multimodal AI experience.',
  },
];

export const TIMELINE = PROJECTS.map((p) => ({
  year: p.year,
  title: p.title.replace(' System', '').replace(' Platform', ' Platform'),
  id: p.id,
})).sort((a, b) => Number(a.year) - Number(b.year));

export function getProject(id: string): ProjectRecord | undefined {
  return PROJECTS.find((p) => p.id === id);
}
