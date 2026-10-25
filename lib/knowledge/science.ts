import type { Exhibit } from "@/types/world";

export const scienceExhibits: Exhibit[] = [
  {
    id: "einstein-relativity",
    zone: "science",
    kind: "person",
    title: "Albert Einstein",
    subtitle: "Space, time, and the constancy of light",
    eyebrow: "Physics",
    year: "1879 – 1955",
    summary:
      "Einstein's special and general theories of relativity reshaped how physics describes space, time, gravity, and energy. The theories make precise predictions that have been tested in many experiments.",
    tags: ["Relativity", "Physics", "Time dilation"],
    world: { x: 1120, y: 540 },
    demo: "relativity",
    demoHint:
      "Raise the velocity to see the Lorentz factor and the time experienced by a moving clock.",
    sections: [
      {
        heading: "Special relativity",
        body: "The theory starts from two postulates: the laws of physics are the same in all inertial frames, and the speed of light in vacuum is the same for all inertial observers. Those postulates imply that measurements of time and length depend on relative motion.",
      },
      {
        heading: "General relativity",
        body: "General relativity treats gravity not as a force in the Newtonian sense but as the geometry of spacetime shaped by mass and energy. Its predictions include the bending of light, gravitational redshift, and gravitational waves.",
      },
      {
        heading: "What the demo shows",
        body: "The time-dilation display uses the Lorentz factor. It is a simplified model of a moving clock, not a complete description of an accelerating journey.",
      },
    ],
    timeline: [
      {
        year: "1905",
        title: "Special relativity",
        description:
          "Einstein publishes papers on special relativity, the photoelectric effect, and mass-energy equivalence.",
      },
      {
        year: "1915",
        title: "General relativity",
        description:
          "A geometric theory of gravity is presented to the Prussian Academy.",
      },
      {
        year: "2015",
        title: "Gravitational waves detected",
        description:
          "LIGO observes ripples in spacetime, a prediction of general relativity.",
      },
    ],
    sources: [
      {
        label: "Nobel Prize — Einstein facts",
        url: "https://www.nobelprize.org/prizes/physics/1921/einstein/facts/",
      },
      {
        label: "NASA — Einstein's relativity",
        url: "https://science.nasa.gov/universe/relativity/",
      },
    ],
    related: ["newton-motion", "katherine-johnson", "cosmic-scale"],
  },
  {
    id: "curie-radioactivity",
    zone: "science",
    kind: "person",
    title: "Marie Curie",
    subtitle: "Radioactivity as a property of matter",
    eyebrow: "Chemistry & physics",
    year: "1867 – 1934",
    summary:
      "Marie Curie's research on radioactivity helped establish it as an atomic phenomenon. She isolated polonium and radium and developed methods for measuring radiation.",
    tags: ["Radioactivity", "Chemistry", "Half-life"],
    world: { x: 1220, y: 590 },
    demo: "decay",
    demoHint:
      "Adjust the half-life and elapsed time to see how the remaining fraction of a sample changes.",
    sections: [
      {
        heading: "A new kind of radiation",
        body: "Curie's measurements showed that radiation came from the atoms themselves rather than from chemical reactions. This was a major shift in understanding matter and energy at the atomic scale.",
      },
      {
        heading: "Work, risk, and recognition",
        body: "Curie and her collaborators worked with radioactive materials before the hazards were well understood. She remains the first person to win Nobel Prizes in two different sciences: physics in 1903 and chemistry in 1911.",
      },
      {
        heading: "Half-life",
        body: "Radioactive decay is probabilistic at the level of individual nuclei, but a large sample has a characteristic half-life. The demo treats decay as a statistical model, not a prediction for one nucleus.",
      },
    ],
    timeline: [
      {
        year: "1898",
        title: "Polonium and radium",
        description:
          "Curie and Pierre Curie announce the discovery of new radioactive elements.",
      },
      {
        year: "1903",
        title: "Nobel Prize in Physics",
        description:
          "Shared with Pierre Curie and Henri Becquerel for work on radioactivity.",
      },
      {
        year: "1911",
        title: "Nobel Prize in Chemistry",
        description:
          "Awarded for the discovery of radium and polonium and the isolation of radium.",
      },
    ],
    sources: [
      {
        label: "Nobel Prize — Marie Curie facts",
        url: "https://www.nobelprize.org/prizes/physics/1903/marie-curie/facts/",
      },
      {
        label: "Nobel Prize — Marie Curie biography",
        url: "https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/biographical/",
      },
    ],
    related: ["newton-motion", "rosalind-franklin", "einstein-relativity"],
  },
  {
    id: "newton-motion",
    zone: "science",
    kind: "person",
    title: "Isaac Newton",
    subtitle: "Forces, motion, and universal gravitation",
    eyebrow: "Physics",
    year: "1643 – 1727",
    summary:
      "Newton's laws of motion and law of universal gravitation gave classical mechanics a compact framework that predicted terrestrial and celestial motion with remarkable accuracy.",
    tags: ["Mechanics", "Gravity", "Calculus"],
    world: { x: 1320, y: 550 },
    demo: "projectile",
    demoHint:
      "Change launch speed and angle to compare the simplified projectile trajectories.",
    sections: [
      {
        heading: "The three laws",
        body: "An object remains at rest or in uniform motion unless a net force acts on it; force changes momentum; and forces occur in equal and opposite pairs. These statements are a model of motion, not a complete description of nature at every scale.",
      },
      {
        heading: "Gravity as a universal interaction",
        body: "Newton proposed that the same gravitational interaction governs falling objects and the orbits of planets. The inverse-square form of the law fit astronomical observations and became a foundation for later physics.",
      },
      {
        heading: "Where the model ends",
        body: "Newtonian mechanics works extremely well for ordinary speeds and weak gravitational fields. Relativity is needed when speeds approach the speed of light or gravity is very strong; quantum mechanics is needed at atomic scales.",
      },
    ],
    timeline: [
      {
        year: "1687",
        title: "Principia",
        description:
          "Newton publishes the Principia, setting out laws of motion and universal gravitation.",
      },
      {
        year: "1687",
        title: "Calculus and change",
        description:
          "Newton's work on calculus provides tools for describing continuous change.",
      },
      {
        year: "1915",
        title: "A deeper description",
        description:
          "Einstein's general relativity extends the description of gravity beyond Newton's model.",
      },
    ],
    sources: [
      {
        label: "Encyclopaedia Britannica — Isaac Newton",
        url: "https://www.britannica.com/biography/Isaac-Newton",
      },
      {
        label: "NASA — Newton's laws of motion",
        url: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/",
      },
    ],
    related: ["einstein-relativity", "katherine-johnson", "einstein-relativity"],
  },
  {
    id: "katherine-johnson",
    zone: "science",
    kind: "person",
    title: "Katherine Johnson",
    subtitle: "Orbital calculations with pencil, paper, and precision",
    eyebrow: "Mathematics",
    year: "1918 – 2020",
    summary:
      "Katherine Johnson calculated trajectories and orbital parameters for NASA missions. Her work was part of a larger team of human computers whose calculations supported crewed spaceflight.",
    tags: ["Orbital mechanics", "NASA", "Mathematics"],
    world: { x: 1100, y: 620 },
    demo: "orbit",
    demoHint:
      "Change orbital altitude to see how the modelled period changes with distance from the primary body.",
    sections: [
      {
        heading: "Human computers",
        body: "Before electronic computers were ubiquitous, human computers performed numerical calculations by hand and with mechanical aids. Johnson's work included trajectory analysis and checks of computer-generated results.",
      },
      {
        heading: "Precision matters",
        body: "Orbital mechanics is unforgiving: small errors can grow into large trajectory differences. The work required careful modelling, arithmetic, and cross-checking. Johnson's contributions were part of a collaborative mission effort, not a solo achievement.",
      },
      {
        heading: "Kepler's third law",
        body: "The demo uses a simplified circular-orbit model based on Kepler's third law. Real mission planning involves much more: eccentric orbits, perturbations, fuel constraints, and numerical integration.",
      },
    ],
    timeline: [
      {
        year: "1953",
        title: "Joins Langley",
        description:
          "Johnson begins work at the National Advisory Committee for Aeronautics, later part of NASA.",
      },
      {
        year: "1962",
        title: "Friendship 7",
        description:
          "Her calculations are part of the trajectory verification work for John Glenn's orbital flight.",
      },
      {
        year: "1969",
        title: "Apollo 11",
        description:
          "Team calculations support the lunar landing mission.",
      },
      {
        year: "2015",
        title: "Presidential Medal of Freedom",
        description:
          "Johnson is recognized for her contributions to spaceflight.",
      },
    ],
    sources: [
      {
        label: "NASA — Katherine Johnson",
        url: "https://www.nasa.gov/people/katherine-johnson/",
      },
      {
        label: "NASA History — Katherine Johnson",
        url: "https://www.nasa.gov/history/katherine-johnson/",
      },
    ],
    related: ["newton-motion", "einstein-relativity", "space-exploration"],
  },
  {
    id: "rosalind-franklin",
    zone: "science",
    kind: "person",
    title: "Rosalind Franklin",
    subtitle: "X-ray diffraction and the structure of DNA",
    eyebrow: "Chemistry",
    year: "1920 – 1958",
    summary:
      "Rosalind Franklin's X-ray diffraction work produced evidence about the helical structure of DNA. Her data contributed to the wider effort that led to the double-helix model.",
    tags: ["DNA", "Crystallography", "Biophysics"],
    world: { x: 1310, y: 630 },
    sections: [
      {
        heading: "Seeing with diffraction",
        body: "X-ray diffraction reveals regular arrangements of atoms in crystals. Franklin and her collaborator Raymond Gosling produced images and measurements of DNA fibres, including the famous Photograph 51.",
      },
      {
        heading: "A collaborative discovery",
        body: "The double-helix model published by James Watson and Francis Crick drew on multiple strands of evidence, including Franklin's data and the work of Maurice Wilkins. Historical accounts increasingly recognize the collective and contested nature of the discovery.",
      },
      {
        heading: "Attribution matters",
        body: "Franklin died in 1958, before the Nobel Prize was awarded. Nobel Prizes are not awarded posthumously, and the social dynamics of the discovery have become a case study in credit and collaboration.",
      },
    ],
    sources: [
      {
        label: "Encyclopaedia Britannica — Rosalind Franklin",
        url: "https://www.britannica.com/biography/Rosalind-Franklin",
      },
      {
        label: "Nature — Rosalind Franklin and DNA",
        url: "https://www.nature.com/articles/421396a",
      },
    ],
    related: ["curie-radioactivity", "cosmic-scale", "memory-spacing"],
  },
];
