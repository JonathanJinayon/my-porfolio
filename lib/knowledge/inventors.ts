import type { Exhibit } from "@/types/world";

export const inventorExhibits: Exhibit[] = [
  {
    id: "printing-press",
    zone: "inventors",
    kind: "person",
    title: "Johannes Gutenberg and the printing press",
    subtitle: "Mechanical reproduction of text",
    eyebrow: "Invention",
    year: "c. 1440",
    summary:
      "Gutenberg's press combined movable metal type, a screw press, and an oil-based ink into a reproducible printing system. The result changed the economics of copying text.",
    tags: ["Printing", "Movable type", "Information"],
    world: { x: 300, y: 640 },
    sections: [
      {
        heading: "A system, not a single gadget",
        body: "Movable type existed in East Asia before Gutenberg, and presses existed for other purposes. The innovation was the integration of type casting, ink, paper, and press mechanics into a workflow that could produce many consistent copies.",
      },
      {
        heading: "Network effects of copying",
        body: "Cheaper reproduction did not automatically create open societies, but it changed the scale at which texts, disputes, and technical knowledge could circulate. Printing became infrastructure for science, religion, politics, and commerce.",
      },
      {
        heading: "From manuscripts to editions",
        body: "Printing encouraged standard editions, indexes, title pages, and eventually newspapers and journals. Each format changed how readers found and trusted information.",
      },
    ],
    timeline: [
      {
        year: "c. 1440",
        title: "Movable type system",
        description:
          "Gutenberg develops a practical combination of metal type, ink, and press.",
      },
      {
        year: "1455",
        title: "The Gutenberg Bible",
        description:
          "A large printed Bible demonstrates the system's commercial and technical potential.",
      },
      {
        year: "1500",
        title: "Printing spreads",
        description:
          "Printing shops operate across much of Europe, expanding the circulation of texts.",
      },
    ],
    sources: [
      {
        label: "Encyclopaedia Britannica — Johannes Gutenberg",
        url: "https://www.britannica.com/biography/Johannes-Gutenberg",
      },
      {
        label: "British Library — Gutenberg Bible",
        url: "https://www.bl.uk/collection-items/gutenberg-bible",
      },
    ],
    related: ["computing-history", "internet-history", "open-source"],
  },
  {
    id: "internet-history",
    zone: "inventors",
    kind: "timeline",
    title: "The internet and the web",
    subtitle: "Packets, protocols, and pages",
    eyebrow: "Timeline",
    summary:
      "The internet is a network of networks built on shared protocols. The World Wide Web is one application that made hyperlinked documents accessible through browsers.",
    tags: ["Internet", "Web", "Protocols"],
    world: { x: 420, y: 620 },
    sections: [
      {
        heading: "Internet is not the web",
        body: "The internet carries many services: email, file transfer, video, messaging, and the web. The web uses HTTP, URLs, and HTML to link documents. Confusing the two is common, but the distinction matters.",
      },
      {
        heading: "Packet switching",
        body: "Instead of reserving a continuous circuit for a conversation, packet-switched networks split data into packets that can travel independently and be reassembled. This design is resilient and flexible, though it shifts complexity into protocols and endpoints.",
      },
      {
        heading: "Open standards",
        body: "The internet grew through layered standards and rough consensus. A protocol becomes useful when enough systems implement it, and interoperability is often more important than technical elegance.",
      },
    ],
    timeline: [
      {
        year: "1969",
        title: "ARPANET",
        description:
          "The first packet-switched network links research sites.",
      },
      {
        year: "1983",
        title: "TCP/IP adoption",
        description:
          "A common protocol suite allows different networks to interconnect.",
      },
      {
        year: "1989 – 1991",
        title: "World Wide Web",
        description:
          "Tim Berners-Lee proposes and implements a hypertext system at CERN.",
      },
      {
        year: "1993",
        title: "Mosaic browser",
        description:
          "A graphical browser helps bring the web to a wider public.",
      },
    ],
    sources: [
      {
        label: "Internet Society — Brief history of the internet",
        url: "https://www.internetsociety.org/internet/history-internet/brief-history-internet/",
      },
      {
        label: "CERN — The birth of the web",
        url: "https://home.cern/science/computing/birth-web",
      },
    ],
    related: ["cs-milestones", "computing-history", "printing-press"],
  },
  {
    id: "computing-history",
    zone: "inventors",
    kind: "timeline",
    title: "The evolution of computing machines",
    subtitle: "From relays to integrated circuits",
    eyebrow: "Timeline",
    summary:
      "Computing hardware advanced through changes in switching technology, memory, manufacturing, and programming. Each layer made new kinds of software practical.",
    tags: ["Hardware", "Transistors", "Computing history"],
    world: { x: 540, y: 640 },
    sections: [
      {
        heading: "Switching and scale",
        body: "Relays, vacuum tubes, transistors, and integrated circuits are different ways to implement switching. Smaller, cheaper, and more reliable switches allowed computers to grow from room-sized machines to embedded systems.",
      },
      {
        heading: "Memory and storage",
        body: "Computing is shaped by the cost of remembering. Delay lines, magnetic cores, semiconductor memory, and storage hierarchies each changed what programs could do and how they were structured.",
      },
      {
        heading: "The software response",
        body: "As hardware changed, software adapted: operating systems, high-level languages, time-sharing, networking, and virtualization. Hardware and software co-evolve rather than advancing independently.",
      },
    ],
    timeline: [
      {
        year: "1946",
        title: "ENIAC",
        description:
          "A large electronic general-purpose computer uses vacuum tubes and plugboard programming.",
      },
      {
        year: "1947",
        title: "The transistor",
        description:
          "A compact solid-state switch begins to replace vacuum tubes.",
      },
      {
        year: "1958",
        title: "Integrated circuit",
        description:
          "Multiple components are fabricated on a single chip.",
      },
      {
        year: "1971",
        title: "Microprocessor",
        description:
          "A CPU on a chip makes personal computing and embedded control practical.",
      },
    ],
    sources: [
      {
        label: "Computer History Museum — Timeline",
        url: "https://www.computerhistory.org/timeline/",
      },
      {
        label: "Encyclopaedia Britannica — Computer",
        url: "https://www.britannica.com/technology/computer",
      },
    ],
    related: ["cs-milestones", "internet-history", "language-history"],
  },
  {
    id: "robotics",
    zone: "inventors",
    kind: "concept",
    title: "Robotics and automation",
    subtitle: "Sensing, acting, and feedback",
    eyebrow: "Engineering",
    summary:
      "Robots connect perception, decision-making, and physical action. Industrial automation often succeeds by constraining the environment and making repeated tasks precise.",
    tags: ["Robotics", "Control", "Automation"],
    world: { x: 660, y: 630 },
    sections: [
      {
        heading: "The feedback loop",
        body: "A robot needs a way to sense its state, compare that state with a goal, and adjust its actuators. Control theory provides the language for stability and error, while sensors determine what the system can know.",
      },
      {
        heading: "Structured versus open worlds",
        body: "Factory robots often operate in carefully structured spaces. Mobile robots in homes, roads, or hospitals face uncertainty and must handle imperfect perception, unexpected obstacles, and safety constraints.",
      },
      {
        heading: "Automation is organizational",
        body: "Automation changes work, responsibility, and failure modes. A technically impressive system can still fail if maintenance, training, or accountability are not designed alongside it.",
      },
    ],
    sources: [
      {
        label: "Encyclopaedia Britannica — Robot technology",
        url: "https://www.britannica.com/technology/robot-technology",
      },
      {
        label: "IEEE — Robotics and automation",
        url: "https://www.ieee-ras.org/",
      },
    ],
    related: ["computing-history", "attention", "gradient-descent"],
  },
  {
    id: "space-exploration",
    zone: "inventors",
    kind: "timeline",
    title: "Space exploration",
    subtitle: "Engineering beyond the atmosphere",
    eyebrow: "Timeline",
    summary:
      "Spaceflight combines propulsion, guidance, life support, communications, materials, and operations. Its history is international and includes both crewed and robotic missions.",
    tags: ["Spaceflight", "NASA", "Engineering"],
    world: { x: 700, y: 650 },
    sections: [
      {
        heading: "The tyranny of the rocket equation",
        body: "Propulsion must carry not only payload but also the propellant needed to accelerate it. This constraint shapes launch vehicles, mission design, and the economics of reaching orbit.",
      },
      {
        heading: "Robotic and human exploration",
        body: "Robotic missions can go farther and stay longer; crewed missions can adapt and investigate in ways that are difficult to automate. Both depend on robust communications and operations.",
      },
      {
        heading: "Collaboration at scale",
        body: "Large missions require coordination across agencies, contractors, universities, and international partners. The International Space Station is one example of sustained technical and political cooperation.",
      },
    ],
    timeline: [
      {
        year: "1957",
        title: "Sputnik 1",
        description:
          "The first artificial Earth satellite begins the space age.",
      },
      {
        year: "1961",
        title: "First human in orbit",
        description:
          "Yuri Gagarin completes an orbital flight aboard Vostok 1.",
      },
      {
        year: "1969",
        title: "Apollo 11",
        description:
          "Humans land on the Moon and return samples to Earth.",
      },
      {
        year: "1998",
        title: "International Space Station",
        description:
          "Assembly begins for a long-duration orbital laboratory.",
      },
    ],
    sources: [
      {
        label: "NASA — The Apollo Program",
        url: "https://www.nasa.gov/the-apollo-program/",
      },
      {
        label: "NASA — International Space Station",
        url: "https://www.nasa.gov/international-space-station/",
      },
    ],
    related: ["katherine-johnson", "computing-history", "cosmic-scale"],
  },
];
