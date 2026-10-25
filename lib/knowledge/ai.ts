import type { Exhibit } from "@/types/world";

export const aiExhibits: Exhibit[] = [
  {
    id: "perceptron",
    zone: "ai",
    kind: "lab",
    title: "The perceptron",
    subtitle: "A tiny model with a decision boundary",
    eyebrow: "Interactive",
    summary:
      "A perceptron computes a weighted sum of inputs and applies a threshold. It can separate some patterns and fails on others. The limitation helped motivate multilayer networks.",
    tags: ["Neural networks", "Classification", "AI"],
    world: { x: 760, y: 720 },
    demo: "perceptron",
    demoHint:
      "Move the two inputs and change the weights to see the weighted sum and binary output.",
    sections: [
      {
        heading: "The computation",
        body: "Each input is multiplied by a weight, the products are added, and a bias shifts the result. A threshold function turns the sum into an output. Training adjusts the weights so the output matches examples.",
      },
      {
        heading: "The limitation",
        body: "A single perceptron draws one straight decision boundary. It cannot represent patterns that require an exclusive-or relationship. Stacking layers and using nonlinear activations allows networks to represent more complex functions.",
      },
      {
        heading: "Historical context",
        body: "Frank Rosenblatt's perceptron work in the late 1950s generated excitement and criticism. The subsequent debates about representation and learning are part of the longer history of artificial intelligence.",
      },
    ],
    sources: [
      {
        label: "Cornell — The perceptron algorithm",
        url: "https://www.cs.cornell.edu/courses/cs5740/2016sp/resources/perceptron.pdf",
      },
      {
        label: "Encyclopaedia Britannica — Perceptron",
        url: "https://www.britannica.com/technology/perceptron",
      },
    ],
    related: ["gradient-descent", "attention", "alan-turing"],
  },
  {
    id: "gradient-descent",
    zone: "ai",
    kind: "lab",
    title: "Gradient descent",
    subtitle: "Following a slope toward lower error",
    eyebrow: "Interactive",
    summary:
      "Gradient descent updates parameters in the direction that reduces a loss function. The learning rate controls step size; too small is slow, too large can overshoot or diverge.",
    tags: ["Optimization", "Machine learning", "Mathematics"],
    world: { x: 880, y: 710 },
    demo: "gradient",
    demoHint:
      "Adjust the learning rate and step through the iterations on a simple quadratic loss.",
    sections: [
      {
        heading: "The update rule",
        body: "For a parameter theta and loss L, the basic update is theta ← theta − learning_rate × dL/dtheta. The derivative tells us which direction increases loss; moving opposite reduces it locally.",
      },
      {
        heading: "Local information",
        body: "The gradient is a local signal. On complex loss surfaces, it can lead into valleys, plateaus, or unstable regions. Momentum, adaptive methods, and better initialization are responses to these difficulties.",
      },
      {
        heading: "A small demonstration",
        body: "The demo uses a one-dimensional quadratic. It is intentionally simple: real models have millions of parameters and stochastic estimates of the gradient.",
      },
    ],
    sources: [
      {
        label: "Deep Learning — Optimization",
        url: "https://www.deeplearningbook.org/contents/optimization.html",
      },
      {
        label: "Google Machine Learning — Gradient descent",
        url: "https://developers.google.com/machine-learning/crash-course/gradient-descent",
      },
    ],
    related: ["perceptron", "attention", "robotics"],
  },
  {
    id: "attention",
    zone: "ai",
    kind: "lab",
    title: "Attention and context",
    subtitle: "How tokens borrow information from each other",
    eyebrow: "Interactive",
    summary:
      "Attention mechanisms assign context-dependent weights to other parts of an input. Transformer models use attention to mix information across tokens and layers.",
    tags: ["Transformers", "Attention", "Language models"],
    world: { x: 1000, y: 720 },
    demo: "attention",
    demoHint:
      "Select a word to see a simplified attention pattern. The weights are illustrative, not from a trained model.",
    sections: [
      {
        heading: "Query, key, value",
        body: "In scaled dot-product attention, each token produces a query, a key, and a value. Similarity between a query and keys determines weights, and the weighted values are combined. Multiple heads let a layer represent several relationships at once.",
      },
      {
        heading: "Why it helped",
        body: "Attention can connect distant tokens more directly than a recurrent network's step-by-step state. It also maps well to parallel hardware, which helped transformers scale.",
      },
      {
        heading: "Reading the demo",
        body: "The visualization is a hand-authored example. It illustrates the idea of contextual weighting but does not reproduce a model's internal computation.",
      },
    ],
    sources: [
      {
        label: "arXiv — Attention Is All You Need",
        url: "https://arxiv.org/abs/1706.03762",
      },
      {
        label: "Google Research — Transformer",
        url: "https://research.google/pubs/attention-is-all-you-need/",
      },
    ],
    related: ["perceptron", "ai-guide", "alan-turing"],
  },
  {
    id: "ai-guide",
    zone: "ai",
    kind: "lab",
    title: "The local guide",
    subtitle: "A deterministic search over this world",
    eyebrow: "Interactive",
    summary:
      "This guide does not call a remote language model. It searches the local exhibit index, ranks matches, and answers by quoting short summaries with citations.",
    tags: ["Retrieval", "Local-first", "AI"],
    world: { x: 820, y: 755 },
    demo: "guide",
    demoHint:
      "Ask about a topic in the archive. Answers are assembled from local exhibit text and source links.",
    sections: [
      {
        heading: "What it does",
        body: "The guide normalizes your question, scores exhibit titles, tags, summaries, and sections, then returns the strongest matches. It can be wrong when a question is vague or outside the archive.",
      },
      {
        heading: "What it does not do",
        body: "It does not generate original prose, browse the web, store your questions, or call a paid API. The deterministic design keeps the experience fast, private, and available offline.",
      },
      {
        heading: "Why local-first matters",
        body: "Not every useful interaction needs a foundation model. Retrieval and transparent ranking can be enough for navigating a curated collection, and the failure modes are easier to inspect.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia — Turing test",
        url: "https://plato.stanford.edu/entries/turing-test/",
      },
      {
        label: "NIST — AI risk management framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
    related: ["attention", "memory-spacing", "konigsberg"],
  },
  {
    id: "ml-concepts",
    zone: "ai",
    kind: "concept",
    title: "Machine learning in four questions",
    subtitle: "Data, objective, optimization, evaluation",
    eyebrow: "Concepts",
    summary:
      "Most machine-learning systems can be examined through four questions: what data were used, what objective was optimized, how optimization worked, and how results were evaluated.",
    tags: ["Machine learning", "Evaluation", "Data"],
    world: { x: 950, y: 755 },
    sections: [
      {
        heading: "Data",
        body: "Datasets encode choices about what to include, how to label, and whom the system will represent. Gaps and biases in data can become gaps and biases in predictions.",
      },
      {
        heading: "Objective",
        body: "A loss function defines what the model is rewarded for. A model can optimize the stated objective while producing undesirable behavior outside it, a problem often called specification gaming.",
      },
      {
        heading: "Evaluation",
        body: "Accuracy alone can hide failures on rare classes or subgroups. Evaluation should match the deployment context, including distribution shift, false-positive costs, and human oversight.",
      },
    ],
    sources: [
      {
        label: "NIST — AI risk management framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
      {
        label: "Deep Learning — Introduction",
        url: "https://www.deeplearningbook.org/contents/intro.html",
      },
    ],
    related: ["perceptron", "gradient-descent", "memory-spacing"],
  },
];
