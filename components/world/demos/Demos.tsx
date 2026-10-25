"use client";

import { useId, useState, type FormEvent } from "react";
import type { DemoKind } from "@/types/world";
import { answerQuestion, GUIDE_SUGGESTIONS } from "@/lib/knowledge/search";
import styles from "./Demos.module.css";

interface DemoViewProps {
  kind: DemoKind;
  onOpenExhibit?: (exhibitId: string) => void;
}

export function DemoView({ kind, onOpenExhibit }: DemoViewProps) {
  switch (kind) {
    case "relativity":
      return <RelativityDemo />;
    case "decay":
      return <DecayDemo />;
    case "projectile":
      return <ProjectileDemo />;
    case "orbit":
      return <OrbitDemo />;
    case "perceptron":
      return <PerceptronDemo />;
    case "gradient":
      return <GradientDemo />;
    case "attention":
      return <AttentionDemo />;
    case "binary":
      return <BinaryDemo />;
    case "guide":
      return <GuideDemo onOpenExhibit={onOpenExhibit} />;
    default:
      return null;
  }
}

function RelativityDemo() {
  const [velocity, setVelocity] = useState(0.6);
  const gamma = 1 / Math.sqrt(1 - velocity * velocity);
  const shipTime = 1 / gamma;

  return (
    <div className={styles.demo}>
      <Slider label="Velocity" value={velocity} min={0} max={0.99} step={0.01} onChange={setVelocity} format={(value) => `${(value * 100).toFixed(0)}% c`} />
      <div className={styles.readouts}>
        <Readout label="Lorentz factor" value={`${gamma.toFixed(3)}×`} />
        <Readout label="1 year on Earth" value={`${shipTime.toFixed(3)} years on ship`} />
      </div>
      <div className={styles.barChart} aria-hidden="true">
        <div className={styles.barRow}>
          <span>Earth clock</span>
          <div className={styles.barTrack}><span style={{ width: "100%" }} /></div>
        </div>
        <div className={styles.barRow}>
          <span>Ship clock</span>
          <div className={styles.barTrack}><span style={{ width: `${Math.max(2, shipTime * 100)}%` }} /></div>
        </div>
      </div>
      <p className={styles.note}>
        Time dilation grows sharply as relative speed approaches the speed of light. This model ignores acceleration and gravity.
      </p>
    </div>
  );
}

function DecayDemo() {
  const [halfLife, setHalfLife] = useState(12);
  const [elapsed, setElapsed] = useState(24);
  const remaining = Math.pow(0.5, elapsed / halfLife);
  const nuclei = Array.from({ length: 48 }, (_, index) => index / 48 < remaining);

  return (
    <div className={styles.demo}>
      <Slider label="Half-life" value={halfLife} min={2} max={40} step={1} onChange={setHalfLife} format={(value) => `${value} years`} />
      <Slider label="Elapsed time" value={elapsed} min={0} max={120} step={1} onChange={setElapsed} format={(value) => `${value} years`} />
      <div className={styles.readouts}>
        <Readout label="Remaining sample" value={`${(remaining * 100).toFixed(1)}%`} />
        <Readout label="Half-lives elapsed" value={(elapsed / halfLife).toFixed(2)} />
      </div>
      <div className={styles.nuclei} aria-label={`${(remaining * 100).toFixed(1)} percent of the sample remains`}>
        {nuclei.map((active, index) => (
          <span key={index} data-active={active || undefined} />
        ))}
      </div>
      <p className={styles.note}>
        Each nucleus has a probability of decaying; the half-life is a statistical property of a large sample, not a scheduled event for one atom.
      </p>
    </div>
  );
}

function ProjectileDemo() {
  const [speed, setSpeed] = useState(28);
  const [angle, setAngle] = useState(45);
  const radians = (angle * Math.PI) / 180;
  const velocityX = speed * Math.cos(radians);
  const velocityY = speed * Math.sin(radians);
  const gravity = 9.81;
  const flightTime = (2 * velocityY) / gravity;
  const range = velocityX * flightTime;
  const maxHeight = (velocityY * velocityY) / (2 * gravity);
  const plotWidth = 280;
  const plotHeight = 108;
  const xScale = plotWidth / Math.max(range, 1);
  const yScale = plotHeight / Math.max(maxHeight, 1);
  const points = Array.from({ length: 41 }, (_, index) => {
    const time = (index / 40) * flightTime;
    const x = 24 + velocityX * time * xScale;
    const y = 142 - (velocityY * time - 0.5 * gravity * time * time) * yScale;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className={styles.demo}>
      <Slider label="Launch speed" value={speed} min={10} max={60} step={1} onChange={setSpeed} format={(value) => `${value} m/s`} />
      <Slider label="Launch angle" value={angle} min={10} max={80} step={1} onChange={setAngle} format={(value) => `${value}°`} />
      <svg className={styles.plot} viewBox="0 0 340 164" role="img" aria-label={`Trajectory with range ${range.toFixed(1)} metres and peak height ${maxHeight.toFixed(1)} metres`}>
        <line x1="24" y1="142" x2="316" y2="142" className={styles.axis} />
        <line x1="24" y1="18" x2="24" y2="142" className={styles.axis} />
        <polyline points={points} className={styles.trajectory} />
      </svg>
      <div className={styles.readouts}>
        <Readout label="Range" value={`${range.toFixed(1)} m`} />
        <Readout label="Peak" value={`${maxHeight.toFixed(1)} m`} />
        <Readout label="Flight time" value={`${flightTime.toFixed(1)} s`} />
      </div>
      <p className={styles.note}>Idealised model: no air resistance, uniform gravity, and level ground.</p>
    </div>
  );
}

function OrbitDemo() {
  const [altitude, setAltitude] = useState(400);
  const earthRadius = 6371;
  const radius = earthRadius + altitude;
  const mu = 398600;
  const periodSeconds = 2 * Math.PI * Math.sqrt((radius * radius * radius) / mu);
  const periodMinutes = periodSeconds / 60;
  const visualRadius = 40 + (altitude / 40000) * 82;

  return (
    <div className={styles.demo}>
      <Slider label="Orbital altitude" value={altitude} min={200} max={40000} step={100} onChange={setAltitude} format={(value) => `${value.toLocaleString()} km`} />
      <svg className={styles.orbitPlot} viewBox="0 0 280 210" role="img" aria-label={`Circular orbit at ${altitude.toLocaleString()} kilometres altitude`}>
        <circle cx="140" cy="105" r={visualRadius} className={styles.orbitRing} />
        <circle cx="140" cy="105" r="22" className={styles.earth} />
        <text x="140" y="109" className={styles.planetLabel}>EARTH</text>
        <g className={styles.satelliteSpin} style={{ transformOrigin: "140px 105px" }}>
          <circle cx={140 + visualRadius} cy="105" r="4" className={styles.satellite} />
        </g>
      </svg>
      <div className={styles.readouts}>
        <Readout label="Orbital radius" value={`${radius.toLocaleString()} km`} />
        <Readout label="Period" value={periodMinutes >= 120 ? `${(periodMinutes / 60).toFixed(2)} h` : `${periodMinutes.toFixed(1)} min`} />
      </div>
      <p className={styles.note}>
        Simplified circular orbit using Kepler&apos;s third law. Real trajectories include eccentricity, perturbations, and mission constraints.
      </p>
    </div>
  );
}

function PerceptronDemo() {
  const [inputOne, setInputOne] = useState(0.6);
  const [inputTwo, setInputTwo] = useState(-1);
  const [weightOne, setWeightOne] = useState(0.9);
  const [weightTwo, setWeightTwo] = useState(0.7);
  const [bias, setBias] = useState(-0.1);
  const sum = inputOne * weightOne + inputTwo * weightTwo + bias;
  const output = sum >= 0 ? 1 : 0;
  const mapX = (value: number) => 30 + ((value + 1) / 2) * 200;
  const mapY = (value: number) => 170 - ((value + 1) / 2) * 140;
  const linePoints =
    Math.abs(weightTwo) > 0.001
      ? {
          x1: mapX(-1.2),
          y1: mapY((-bias - weightOne * -1.2) / weightTwo),
          x2: mapX(1.2),
          y2: mapY((-bias - weightOne * 1.2) / weightTwo),
        }
      : null;

  return (
    <div className={styles.demo}>
      <div className={styles.readouts}>
        <Readout label="Weighted sum" value={sum.toFixed(3)} />
        <Readout label="Output" value={output === 1 ? "1 / active" : "0 / inactive"} />
      </div>
      <svg className={styles.plot} viewBox="0 0 260 190" role="img" aria-label="Input space with decision boundary and current input point">
        <line x1="30" y1="170" x2="230" y2="170" className={styles.axis} />
        <line x1="130" y1="20" x2="130" y2="170" className={styles.axis} />
        {linePoints ? (
          <line {...linePoints} className={styles.boundary} />
        ) : (
          <line x1="130" y1="20" x2="130" y2="170" className={styles.boundary} />
        )}
        <circle cx={mapX(inputOne)} cy={mapY(inputTwo)} r="6" className={styles.inputPoint} />
      </svg>
      <Slider label="Input x₁" value={inputOne} min={-1} max={1} step={0.05} onChange={setInputOne} format={(value) => value.toFixed(2)} />
      <Slider label="Input x₂" value={inputTwo} min={-1} max={1} step={0.05} onChange={setInputTwo} format={(value) => value.toFixed(2)} />
      <Slider label="Weight w₁" value={weightOne} min={-2} max={2} step={0.05} onChange={setWeightOne} format={(value) => value.toFixed(2)} />
      <Slider label="Weight w₂" value={weightTwo} min={-2} max={2} step={0.05} onChange={setWeightTwo} format={(value) => value.toFixed(2)} />
      <Slider label="Bias" value={bias} min={-1} max={1} step={0.05} onChange={setBias} format={(value) => value.toFixed(2)} />
      <p className={styles.note}>One perceptron can learn only a linear boundary. Nonlinear patterns need hidden layers or different features.</p>
    </div>
  );
}

function GradientDemo() {
  const [learningRate, setLearningRate] = useState(0.3);
  const start = -3;
  const target = 2;
  const loss = (value: number) => (value - target) * (value - target);
  const sequence = [start];
  let current = start;

  for (let step = 0; step < 9; step += 1) {
    current = current - learningRate * 2 * (current - target);
    sequence.push(Number.isFinite(current) ? current : Number.NaN);
  }

  const final = sequence[sequence.length - 1];
  const diverged = !Number.isFinite(final) || Math.abs(final) > 12;
  const domainMin = -6;
  const domainMax = 10;
  const maxLoss = 64;
  const mapX = (value: number) => 24 + ((value - domainMin) / (domainMax - domainMin)) * 272;
  const mapY = (value: number) => 148 - (Math.min(loss(value), maxLoss) / maxLoss) * 118;
  const curve = Array.from({ length: 61 }, (_, index) => {
    const value = domainMin + (index / 60) * (domainMax - domainMin);
    return `${mapX(value).toFixed(1)},${mapY(value).toFixed(1)}`;
  }).join(" ");
  const points = sequence
    .filter((value) => Number.isFinite(value) && value >= domainMin && value <= domainMax)
    .map((value) => `${mapX(value)},${mapY(value)}`)
    .join(" ");

  return (
    <div className={styles.demo}>
      <Slider label="Learning rate" value={learningRate} min={0.02} max={1.2} step={0.02} onChange={setLearningRate} format={(value) => value.toFixed(2)} />
      <svg className={styles.plot} viewBox="0 0 320 164" role="img" aria-label="Quadratic loss curve and gradient descent steps">
        <line x1="24" y1="148" x2="300" y2="148" className={styles.axis} />
        <polyline points={curve} className={styles.lossCurve} />
        <polyline points={points} className={styles.descentPath} />
        <circle cx={mapX(target)} cy={mapY(target)} r="3" className={styles.targetPoint} />
      </svg>
      <div className={styles.readouts}>
        <Readout label="Start" value={`x = ${start}`} />
        <Readout label="Final" value={Number.isFinite(final) ? `x = ${final.toFixed(3)}` : "diverged"} />
        <Readout label="Final loss" value={Number.isFinite(final) ? loss(final).toFixed(3) : "∞"} />
      </div>
      {diverged ? (
        <p className={styles.warning}>The step size is large enough to overshoot. Try a smaller learning rate.</p>
      ) : (
        <p className={styles.note}>Each step moves opposite the local slope. A larger learning rate takes longer strides but can overshoot.</p>
      )}
    </div>
  );
}

const ATTENTION_TOKENS = ["The", "scientist", "studied", "the", "ancient", "stars"];
const ATTENTION_WEIGHTS = [
  [0.48, 0.16, 0.12, 0.08, 0.1, 0.06],
  [0.2, 0.28, 0.24, 0.06, 0.12, 0.1],
  [0.08, 0.34, 0.3, 0.08, 0.08, 0.12],
  [0.16, 0.12, 0.14, 0.4, 0.1, 0.08],
  [0.06, 0.18, 0.14, 0.08, 0.3, 0.24],
  [0.08, 0.14, 0.1, 0.06, 0.26, 0.36],
];

function AttentionDemo() {
  const [selected, setSelected] = useState(1);
  const weights = ATTENTION_WEIGHTS[selected] ?? ATTENTION_WEIGHTS[0];
  const max = Math.max(...weights);

  return (
    <div className={styles.demo}>
      <div className={styles.attentionRow}>
        {ATTENTION_TOKENS.map((token, index) => (
          <button
            key={`${token}-${index}`}
            type="button"
            className={styles.token}
            data-selected={selected === index || undefined}
            onClick={() => setSelected(index)}
          >
            {token}
          </button>
        ))}
      </div>
      <div className={styles.attentionBars}>
        {ATTENTION_TOKENS.map((token, index) => (
          <div className={styles.attentionBar} key={`${token}-weight`}>
            <span>{token}</span>
            <div className={styles.barTrack}>
              <span style={{ width: `${Math.max(2, (weights[index] / max) * 100)}%` }} />
            </div>
            <span className={styles.mono}>{(weights[index] * 100).toFixed(0)}</span>
          </div>
        ))}
      </div>
      <p className={styles.note}>
        Illustrative attention weights, not the output of a trained model. Each row could represent a different attention head or layer.
      </p>
    </div>
  );
}

const BINARY_TARGETS = [13, 42, 90, 5, 128, 64];

function BinaryDemo() {
  const [targetIndex, setTargetIndex] = useState(0);
  const [bits, setBits] = useState([false, false, false, false, false, false, false, false]);
  const values = [128, 64, 32, 16, 8, 4, 2, 1];
  const target = BINARY_TARGETS[targetIndex] ?? BINARY_TARGETS[0];
  const value = bits.reduce((total, active, index) => total + (active ? values[index] : 0), 0);
  const solved = value === target;

  function toggleBit(index: number) {
    setBits((current) => current.map((active, bitIndex) => (bitIndex === index ? !active : active)));
  }

  function next() {
    setTargetIndex((current) => (current + 1) % BINARY_TARGETS.length);
    setBits([false, false, false, false, false, false, false, false]);
  }

  return (
    <div className={styles.demo}>
      <div className={styles.readouts}>
        <Readout label="Target" value={String(target)} />
        <Readout label="Current byte" value={String(value)} />
        <Readout label="Status" value={solved ? "matched" : "adjusting"} />
      </div>
      <div className={styles.bits} role="group" aria-label="Toggle binary digits">
        {values.map((bitValue, index) => (
          <button
            key={bitValue}
            type="button"
            className={styles.bit}
            data-active={bits[index] || undefined}
            aria-pressed={bits[index]}
            onClick={() => toggleBit(index)}
          >
            <span>{bitValue}</span>
            <strong>{bits[index] ? 1 : 0}</strong>
          </button>
        ))}
      </div>
      <p className={solved ? styles.success : styles.note}>
        {solved
          ? `Correct: ${target} = ${target.toString(2).padStart(8, "0")} in 8-bit binary.`
          : "Add the place values of the bits you switch on until the byte matches the target."}
      </p>
      <button className={styles.action} type="button" onClick={next}>
        New target
      </button>
    </div>
  );
}

function GuideDemo({ onOpenExhibit }: { onOpenExhibit?: (exhibitId: string) => void }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const answer = answerQuestion(submitted);
  const inputId = useId();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(query);
  }

  return (
    <div className={styles.demo}>
      <form className={styles.guideForm} onSubmit={handleSubmit}>
        <label className={styles.guideLabel} htmlFor={inputId}>
          Ask the local archive
        </label>
        <div className={styles.guideInputRow}>
          <input
            id={inputId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="How does a perceptron work?"
            autoComplete="off"
            maxLength={120}
          />
          <button className={styles.action} type="submit">
            Search
          </button>
        </div>
      </form>

      <div className={styles.suggestions} aria-label="Suggested questions">
        {GUIDE_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className={styles.suggestion}
            onClick={() => {
              setQuery(suggestion);
              setSubmitted(suggestion);
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {submitted ? (
        <div className={styles.answer} role="status">
          <p>{answer.answer}</p>
          {answer.citations.length > 0 ? (
            <div className={styles.citations}>
              <span className={styles.citationLabel}>Read next</span>
              {answer.citations.map((citation) => (
                <button
                  key={citation.id}
                  type="button"
                  className={styles.citation}
                  onClick={() => onOpenExhibit?.(citation.id)}
                >
                  {citation.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <p className={styles.note}>
          Deterministic retrieval only. The guide searches exhibit text, ranks matches, and cites what it finds. It does not call a remote model.
        </p>
      )}
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
}

function Slider({ label, value, min, max, step, onChange, format }: SliderProps) {
  const id = useId();

  return (
    <div className={styles.sliderRow}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <output htmlFor={id}>{format(value)}</output>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.readout}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
