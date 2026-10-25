import type { Exhibit } from "@/types/world";

export const libraryExhibits: Exhibit[] = [
  {
    id: "memory-spacing",
    zone: "library",
    kind: "concept",
    title: "Memory, forgetting, and spaced practice",
    subtitle: "Why recall is not the same as recognition",
    eyebrow: "Psychology",
    summary:
      "Human memory is reconstructive and cue-dependent. Research on forgetting and retrieval practice shows that how we revisit information can matter as much as how often we encounter it.",
    tags: ["Memory", "Learning", "Psychology"],
    world: { x: 1120, y: 640 },
    sections: [
      {
        heading: "The forgetting curve",
        body: "Hermann Ebbinghaus's late-nineteenth-century experiments measured how quickly memorized material was forgotten. The familiar curve is a simplified summary of a complex literature, but the general pattern—rapid initial loss followed by slower loss—is widely cited in learning research.",
      },
      {
        heading: "Retrieval beats rereading",
        body: "Trying to recall information strengthens later access more than passively rereading it. Spacing practice over time also tends to improve durable retention compared with massed repetition.",
      },
      {
        heading: "A practical experiment",
        body: "Choose a small set of concepts. Review them at increasing intervals and attempt recall before checking notes. Track what you miss. This is a personal experiment, not a universal prescription for every kind of learning.",
      },
    ],
    sources: [
      {
        label: "Encyclopaedia Britannica — Forgetting curve",
        url: "https://www.britannica.com/science/forgetting-curve",
      },
      {
        label: "American Psychological Association — Spacing effect",
        url: "https://www.apa.org/pubs/journals/features/xap-0000136.pdf",
      },
    ],
    related: ["konigsberg", "ship-theseus", "ai-guide"],
  },
  {
    id: "konigsberg",
    zone: "library",
    kind: "concept",
    title: "The bridges of Königsberg",
    subtitle: "A puzzle that became graph theory",
    eyebrow: "Mathematics",
    summary:
      "Euler's analysis of a walking route through Königsberg is a classic example of turning a concrete puzzle into an abstract structure. The abstraction revealed why the requested route was impossible.",
    tags: ["Graph theory", "Euler", "Abstraction"],
    world: { x: 1220, y: 620 },
    sections: [
      {
        heading: "The puzzle",
        body: "The city of Königsberg had seven bridges connecting land areas. The question was whether a walk could cross every bridge exactly once and return to the start. Euler represented land areas as vertices and bridges as edges.",
      },
      {
        heading: "The parity argument",
        body: "An Eulerian circuit requires every vertex to have even degree. In the Königsberg graph, four vertices had odd degree, so the requested circuit could not exist. The impossibility was a theorem, not a failed search.",
      },
      {
        heading: "Why abstraction works",
        body: "By discarding distances and shapes, the problem became a statement about connections. The same graph-theoretic ideas now describe networks, dependencies, schedules, and state spaces.",
      },
    ],
    sources: [
      {
        label: "Wolfram MathWorld — Königsberg bridge problem",
        url: "https://mathworld.wolfram.com/KoenigsbergBridgeProblem.html",
      },
      {
        label: "Encyclopaedia Britannica — Graph theory",
        url: "https://www.britannica.com/science/graph-theory",
      },
    ],
    related: ["godel", "memory-spacing", "cs-milestones"],
  },
  {
    id: "ship-theseus",
    zone: "library",
    kind: "concept",
    title: "The Ship of Theseus",
    subtitle: "Identity through change",
    eyebrow: "Philosophy",
    summary:
      "The Ship of Theseus asks what makes an object the same object over time when its parts are replaced. The puzzle is about identity, persistence, and the criteria we choose.",
    tags: ["Philosophy", "Identity", "Thought experiment"],
    world: { x: 1320, y: 640 },
    sections: [
      {
        heading: "The setup",
        body: "As the ship's planks are replaced one by one, is it still the same ship? If the removed planks are reassembled into another ship, which one is the original? The thought experiment isolates intuitions about continuity and composition.",
      },
      {
        heading: "Competing criteria",
        body: "One answer emphasizes material continuity; another emphasizes form or pattern; another treats identity as a social or legal convention. Each criterion can be precise, but they disagree in the puzzle.",
      },
      {
        heading: "Software analogy",
        body: "Programs are also revised piece by piece. A project may keep its name while replacing its implementation, or keep its implementation while changing its purpose. Deciding what counts as 'the same system' depends on the question being asked.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy — Identity over time",
        url: "https://plato.stanford.edu/entries/identity-time/",
      },
      {
        label: "Internet Encyclopedia of Philosophy — Personal identity",
        url: "https://iep.utm.edu/person-i/",
      },
    ],
    related: ["godel", "memory-spacing", "open-source"],
  },
  {
    id: "godel",
    zone: "library",
    kind: "concept",
    title: "Gödel's incompleteness theorems",
    subtitle: "Limits of formal systems",
    eyebrow: "Logic",
    summary:
      "Gödel's incompleteness theorems show that sufficiently expressive formal systems cannot be both consistent and complete. The result changed how mathematicians and philosophers think about proof and formalization.",
    tags: ["Logic", "Mathematics", "Computability"],
    world: { x: 1360, y: 620 },
    sections: [
      {
        heading: "The core idea",
        body: "For a formal system that is consistent, expressive enough to describe arithmetic, and effectively axiomatized, there are true statements that cannot be proved within the system. The result depends on precise conditions; it is not a claim that mathematics is arbitrary.",
      },
      {
        heading: "Self-reference",
        body: "The proof constructs a sentence that encodes a statement about its own provability. This technique connects to the liar paradox and to computability results such as the halting problem, though the arguments are distinct.",
      },
      {
        heading: "What it does not say",
        body: "Incompleteness does not mean that anything goes or that ordinary mathematical reasoning is useless. It identifies a structural limit on certain kinds of formal systems and has become a touchstone for careful thinking about limitations.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy — Gödel's incompleteness theorems",
        url: "https://plato.stanford.edu/entries/goedel-incompleteness/",
      },
      {
        label: "Encyclopaedia Britannica — Gödel's theorem",
        url: "https://www.britannica.com/science/Godels-theorem",
      },
    ],
    related: ["konigsberg", "alan-turing", "ship-theseus"],
  },
  {
    id: "cosmic-scale",
    zone: "library",
    kind: "concept",
    title: "The scale of the universe",
    subtitle: "Distance, time, and perspective",
    eyebrow: "Astronomy",
    summary:
      "Cosmic distances are measured through overlapping methods, from radar in the solar system to parallax and standard candles beyond it. Each method has assumptions and a range where it is reliable.",
    tags: ["Astronomy", "Cosmology", "Measurement"],
    world: { x: 1080, y: 620 },
    sections: [
      {
        heading: "The distance ladder",
        body: "Astronomers cannot stretch a tape measure to a star. They combine methods: parallax for nearby stars, Cepheid variables and supernovae for greater distances, and redshift for cosmology. The ladder is calibrated step by step, and disagreements between rungs are important evidence.",
      },
      {
        heading: "Light as a time machine",
        body: "Because light travels at a finite speed, looking far away means looking into the past. The cosmic microwave background is ancient light from the early universe, and its tiny temperature variations encode information about conditions long ago.",
      },
      {
        heading: "Scale and humility",
        body: "The numbers are difficult to grasp: the nearest star is about four light-years away, while the observable universe is tens of billions of light-years across. Scale models can help, but intuition is a poor guide beyond the solar system.",
      },
    ],
    sources: [
      {
        label: "NASA — Scale of the universe",
        url: "https://science.nasa.gov/universe/scale-of-the-universe/",
      },
      {
        label: "NASA — Cosmic distance ladder",
        url: "https://science.nasa.gov/universe/exoplanets/cosmic-distance-ladder/",
      },
    ],
    related: ["einstein-relativity", "space-exploration", "rosalind-franklin"],
  },
  {
    id: "systems-thinking",
    zone: "library",
    kind: "concept",
    title: "Systems thinking",
    subtitle: "Feedback, delays, and unintended consequences",
    eyebrow: "Engineering & design",
    summary:
      "Complex systems produce behavior that cannot be understood by looking at parts in isolation. Feedback loops, delays, stocks and flows, and incentives help explain why interventions often surprise us.",
    tags: ["Systems", "Feedback", "Design"],
    world: { x: 1120, y: 690 },
    sections: [
      {
        heading: "Feedback and delay",
        body: "A reinforcing loop amplifies change; a balancing loop counteracts it. When feedback is delayed, a system can oscillate or overshoot. Managing such systems requires thinking about time, not just static snapshots.",
      },
      {
        heading: "Local fixes, global effects",
        body: "Optimizing one component can degrade the whole: adding lanes can invite more traffic, and a faster release process can increase review debt. System boundaries determine which effects are counted.",
      },
      {
        heading: "Software as a system",
        body: "A software product includes code, infrastructure, users, documentation, incentives, and maintenance. Reliability is a property of that whole arrangement, not only of the code repository.",
      },
    ],
    sources: [
      {
        label: "MIT — System dynamics",
        url: "https://systemdynamics.org/",
      },
      {
        label: "Encyclopaedia Britannica — Systems thinking",
        url: "https://www.britannica.com/topic/systems-thinking",
      },
    ],
    related: ["konigsberg", "robotics", "open-source"],
  },
];
