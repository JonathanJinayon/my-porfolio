import type { Exhibit } from "@/types/world";

export const developerExhibits: Exhibit[] = [
  {
    id: "ada-lovelace",
    zone: "developer",
    kind: "person",
    title: "Ada Lovelace",
    subtitle: "The first published algorithm",
    eyebrow: "Pioneer",
    year: "1815 – 1852",
    summary:
      "Ada Lovelace translated and annotated a description of Charles Babbage's Analytical Engine, including a method for computing Bernoulli numbers that is often described as the first published algorithm intended for a machine.",
    tags: ["Algorithms", "Analytical Engine", "Computing history"],
    world: { x: 360, y: 540 },
    sections: [
      {
        heading: "Why the notes mattered",
        body: "Lovelace's 1843 notes were longer than the paper they accompanied. They described how the Analytical Engine could follow a sequence of operations, not merely calculate a single result. That separation between a machine and the instructions it follows is a central idea in modern computing.",
      },
      {
        heading: "Beyond arithmetic",
        body: "She also speculated that a general-purpose computing machine might manipulate symbols such as music, provided those symbols could be represented and operated on. The speculation was not implemented in her lifetime, but it anticipated the idea that computers process representations of many kinds of information.",
      },
    ],
    timeline: [
      {
        year: "1842",
        title: "Translates Menabrea's paper",
        description:
          "Lovelace translates Luigi Menabrea's account of the Analytical Engine and begins adding extensive notes.",
      },
      {
        year: "1843",
        title: "Publishes the notes",
        description:
          "The notes include the Bernoulli-number procedure and a discussion of general-purpose symbol manipulation.",
      },
    ],
    sources: [
      {
        label: "Encyclopaedia Britannica — Ada Lovelace",
        url: "https://www.britannica.com/biography/Ada-Lovelace",
      },
      {
        label: "Computer History Museum — Ada Lovelace",
        url: "https://computerhistory.org/profile/ada-lovelace/",
      },
    ],
    related: ["alan-turing", "language-history", "cs-milestones"],
  },
  {
    id: "alan-turing",
    zone: "developer",
    kind: "person",
    title: "Alan Turing",
    subtitle: "Machines, computation, and intelligence",
    eyebrow: "Pioneer",
    year: "1912 – 1954",
    summary:
      "Alan Turing gave a mathematical account of computation through the Turing machine, contributed to codebreaking during the Second World War, and proposed a practical test for machine intelligence.",
    tags: ["Turing machine", "Codebreaking", "AI"],
    world: { x: 460, y: 590 },
    sections: [
      {
        heading: "The Turing machine",
        body: "In 1936 Turing described an abstract machine with a tape, a read/write head, and a finite set of rules. The model was designed to study what can be computed in principle. It became one of the foundational models of computability and influenced the design of stored-program computers.",
      },
      {
        heading: "From Bletchley to the Turing test",
        body: "Turing worked on cryptanalysis at Bletchley Park, where methods for breaking the Enigma cipher were developed collaboratively. His 1950 paper 'Computing Machinery and Intelligence' reframed the question 'Can machines think?' as an operational imitation game.",
      },
    ],
    timeline: [
      {
        year: "1936",
        title: "Describes the Turing machine",
        description:
          "The abstract model formalizes what it means for a procedure to be computable.",
      },
      {
        year: "1939 – 1945",
        title: "Cryptanalysis at Bletchley Park",
        description:
          "Turing contributes to Allied codebreaking work, including methods for attacking Enigma traffic.",
      },
      {
        year: "1950",
        title: "Proposes the imitation game",
        description:
          "The paper 'Computing Machinery and Intelligence' introduces what is now called the Turing test.",
      },
    ],
    sources: [
      {
        label: "Stanford Encyclopedia of Philosophy — Alan Turing",
        url: "https://plato.stanford.edu/entries/turing/",
      },
      {
        label: "The Turing Digital Archive",
        url: "https://www.turingarchive.org/",
      },
    ],
    related: ["ada-lovelace", "perceptron", "attention"],
  },
  {
    id: "grace-hopper",
    zone: "developer",
    kind: "person",
    title: "Grace Hopper",
    subtitle: "Compilers and machine-independent programming",
    eyebrow: "Pioneer",
    year: "1906 – 1992",
    summary:
      "Grace Hopper worked on early computers and championed the idea that programmers should write in human-readable languages that a compiler translates into machine instructions.",
    tags: ["Compilers", "COBOL", "Programming languages"],
    world: { x: 560, y: 550 },
    sections: [
      {
        heading: "The compiler idea",
        body: "Hopper's work on the A-0 system in the early 1950s turned symbolic programs into machine code. The broader claim was controversial: many believed programming should remain close to the hardware. Her work helped establish that a compiler could produce usable code while making programs easier to write and maintain.",
      },
      {
        heading: "COBOL and standards",
        body: "Hopper was involved in the development of COBOL, a business-oriented language designed to be readable across different machines. The language's longevity illustrates both the value and the cost of standardization in software systems.",
      },
    ],
    timeline: [
      {
        year: "1944",
        title: "Works on the Harvard Mark I",
        description:
          "Hopper programs an early electromechanical computer and later writes a manual for it.",
      },
      {
        year: "1952",
        title: "A-0 compiler",
        description:
          "An early system translates symbolic instructions into machine code.",
      },
      {
        year: "1959",
        title: "COBOL takes shape",
        description:
          "Hopper contributes to the development of a common business language.",
      },
    ],
    sources: [
      {
        label: "Computer History Museum — Grace Hopper",
        url: "https://computerhistory.org/profile/grace-hopper/",
      },
      {
        label: "Yale — Grace Murray Hopper",
        url: "https://www.yale.edu/about-yale/grace-hopper",
      },
    ],
    related: ["language-history", "open-source", "ada-lovelace"],
  },
  {
    id: "language-history",
    zone: "developer",
    kind: "timeline",
    title: "A short history of programming languages",
    subtitle: "From machine code to expressive abstractions",
    eyebrow: "Timeline",
    summary:
      "Programming languages evolved as hardware, problem domains, and ideas about abstraction changed. Each generation solved some problems while adding new trade-offs.",
    tags: ["Programming languages", "Abstraction", "History"],
    world: { x: 660, y: 590 },
    sections: [
      {
        heading: "Why so many languages?",
        body: "A language is a set of choices: how memory is managed, what kinds of errors are caught before running, how concurrency is expressed, and which ecosystem is available. Different languages optimize for different constraints, which is why a systems language and a data-processing language can coexist.",
      },
      {
        heading: "Reading a language's design",
        body: "When you learn a language, look at its type system, memory model, standard library, and community conventions. Those choices often reveal the problems the language was designed to solve.",
      },
    ],
    timeline: [
      {
        year: "1957",
        title: "Fortran",
        description:
          "A language for scientific and engineering computation, with an early optimizing compiler.",
      },
      {
        year: "1958",
        title: "Lisp",
        description:
          "Introduced symbolic computation, garbage collection ideas, and code-as-data.",
      },
      {
        year: "1972",
        title: "C",
        description:
          "A portable systems language that influenced many later languages and operating systems.",
      },
      {
        year: "1995",
        title: "Java and JavaScript",
        description:
          "Two languages with similar names but very different designs and runtimes.",
      },
      {
        year: "2012",
        title: "TypeScript",
        description:
          "Adds a static type layer to JavaScript and compiles back to JavaScript.",
      },
    ],
    sources: [
      {
        label: "Computer History Museum — Software and languages timeline",
        url: "https://www.computerhistory.org/timeline/software-languages/",
      },
      {
        label: "TypeScript documentation",
        url: "https://www.typescriptlang.org/docs/",
      },
    ],
    related: ["grace-hopper", "open-source", "ada-lovelace"],
  },
  {
    id: "open-source",
    zone: "developer",
    kind: "concept",
    title: "Open source and collaborative software",
    subtitle: "Shared source, shared maintenance",
    eyebrow: "Practice",
    summary:
      "Open-source software makes source code available under licenses that permit study, use, modification, and redistribution. The model combines legal permissions with social and economic coordination.",
    tags: ["Open source", "Git", "Licensing"],
    world: { x: 390, y: 640 },
    sections: [
      {
        heading: "Licenses are interfaces",
        body: "A license defines what others may do with code. Permissive licenses allow broad reuse with limited conditions; copyleft licenses require derivative works to preserve certain freedoms. The choice affects adoption, commercial use, and community expectations.",
      },
      {
        heading: "The maintenance layer",
        body: "A successful project needs more than published source. It needs issue triage, documentation, review, testing, release management, and a way to handle conflict. Much of that work is invisible and unevenly distributed.",
      },
      {
        heading: "Git changed the workflow",
        body: "Distributed version control made it practical for contributors to work from full repository copies and for maintainers to integrate changes through branching and review. Platforms built around Git turned patches into a social workflow.",
      },
    ],
    sources: [
      {
        label: "Pro Git — A Short History of Git",
        url: "https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git",
      },
      {
        label: "Open Source Initiative",
        url: "https://opensource.org/osd",
      },
    ],
    related: ["grace-hopper", "language-history", "attention"],
  },
  {
    id: "cs-milestones",
    zone: "developer",
    kind: "timeline",
    title: "Computer science milestones",
    subtitle: "Ideas that became infrastructure",
    eyebrow: "Timeline",
    summary:
      "Modern computing is a layered stack of ideas: logic, stored programs, networks, abstractions, and human organizations. These milestones are a partial map of that stack.",
    tags: ["Computer science", "Networks", "Systems"],
    world: { x: 500, y: 650 },
    sections: [
      {
        heading: "The stored-program idea",
        body: "Treating instructions as data in memory made computers flexible. The same machine could run different programs without being physically rewired. That idea underpins the general-purpose computer.",
      },
      {
        heading: "Abstraction as leverage",
        body: "Operating systems, compilers, databases, and networks each hide details behind interfaces. The cost of a bad abstraction is high because many other systems come to depend on it.",
      },
    ],
    timeline: [
      {
        year: "1936",
        title: "Computability formalized",
        description:
          "Turing machines and related models give precise meaning to effective computation.",
      },
      {
        year: "1948",
        title: "Stored-program machines",
        description:
          "Early electronic computers begin to keep instructions and data in the same memory.",
      },
      {
        year: "1969",
        title: "ARPANET begins",
        description:
          "Packet switching connects the first nodes of what becomes the internet.",
      },
      {
        year: "2008",
        title: "Bitcoin whitepaper",
        description:
          "A distributed ledger design combines cryptography, incentives, and peer-to-peer networking.",
      },
    ],
    sources: [
      {
        label: "Computer History Museum — Timeline of Computer History",
        url: "https://www.computerhistory.org/timeline/",
      },
      {
        label: "Internet Society — Brief history of the internet",
        url: "https://www.internetsociety.org/internet/history-internet/brief-history-internet/",
      },
    ],
    related: ["alan-turing", "internet-history", "computing-history"],
  },
  {
    id: "binary-basics",
    zone: "developer",
    kind: "lab",
    title: "Binary workshop",
    subtitle: "Build a byte by hand",
    eyebrow: "Interactive",
    summary:
      "Computers represent information with physical states that are treated as bits. A byte is eight bits, and each bit position has a place value in base two.",
    tags: ["Binary", "Number systems", "Practice"],
    world: { x: 620, y: 660 },
    demo: "binary",
    demoHint: "Toggle bits until the binary byte matches the target decimal number.",
    sections: [
      {
        heading: "Place value in base two",
        body: "The rightmost bit has value 1, then 2, 4, 8, 16, 32, 64, and 128. Add the values of the bits that are on. This is the same positional idea as decimal, but with two symbols.",
      },
      {
        heading: "Why bits are useful",
        body: "A bit is an abstraction over a physical difference: high or low voltage, magnetic orientation, or another distinguishable state. Grouping bits and assigning encodings lets a machine represent numbers, text, images, and instructions.",
      },
    ],
    sources: [
      {
        label: "Computer History Museum — Binary numbers",
        url: "https://www.computerhistory.org/collections/catalog/102717693/",
      },
      {
        label: "CS Unplugged — Binary numbers",
        url: "https://csunplugged.org/en/topics/binary-numbers/",
      },
    ],
    related: ["cs-milestones", "language-history", "perceptron"],
  },
];
