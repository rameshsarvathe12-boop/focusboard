import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

/** Three Focus Notes slides as required by the assignment */
const SLIDES = [
  {
    id: 1,
    emoji: '🌅',
    heading: 'Plan Your Day',
    text:
      'Start each morning by reviewing your top 3 priorities. A clear plan converts intention into action and keeps distractions at bay throughout the day.',
    tag: 'Daily Routine',
    cls: 'slide-purple',
  },
  {
    id: 2,
    emoji: '📊',
    heading: 'Track Your Progress',
    text:
      'Celebrate small wins by moving tasks to Completed. Seeing progress builds momentum and reveals how far you have come — keep the streak going!',
    tag: 'Momentum',
    cls: 'slide-blue',
  },
  {
    id: 3,
    emoji: '🎯',
    heading: 'Embrace Deep Work',
    text:
      'Block 90-minute focus sessions with notifications silenced. Sustained, uninterrupted concentration is the fastest path to meaningful, high-quality results.',
    tag: 'Focus Mode',
    cls: 'slide-green',
  },
];

export default function FocusNotes() {
  const [activeIdx, setActiveIdx] = useState(0);

  const goTo = (i) => setActiveIdx(i);
  const prev = () => setActiveIdx(i => (i === 0 ? SLIDES.length - 1 : i - 1));
  const next = () => setActiveIdx(i => (i === SLIDES.length - 1 ? 0 : i + 1));

  // Keyboard support in dots
  const handleDotKey = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); }
  };

  const slide = SLIDES[activeIdx];

  return (
    <section className="focus-notes" aria-label="Focus Notes carousel">
      {/* Header */}
      <div className="focus-notes-header">
        <div className="focus-notes-label">
          <Lightbulb size={14} color="var(--primary)" aria-hidden="true" />
          Focus Notes
        </div>
        <span
          className="focus-notes-counter"
          aria-live="polite"
          aria-atomic="true"
        >
          {activeIdx + 1} of {SLIDES.length}
        </span>
      </div>

      {/* Slide */}
      <div
        className={`focus-slide ${slide.cls}`}
        role="region"
        aria-label={`Slide ${activeIdx + 1} of ${SLIDES.length}: ${slide.heading}`}
        key={slide.id}
      >
        <div className="slide-deco-1" aria-hidden="true" />
        <div className="slide-deco-2" aria-hidden="true" />

        <div>
          <div className="slide-emoji" aria-hidden="true">{slide.emoji}</div>
          <h3 className="slide-heading">{slide.heading}</h3>
          <p className="slide-text">{slide.text}</p>
        </div>
        <span className="slide-tag">{slide.tag}</span>
      </div>

      {/* Controls */}
      <div className="focus-controls">
        <button
          className="focus-nav-btn"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="focus-dots" role="tablist" aria-label="Slide indicators">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`focus-dot${i === activeIdx ? ' active' : ''}`}
              onClick={() => goTo(i)}
              onKeyDown={e => handleDotKey(e, i)}
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={`Go to slide ${i + 1}: ${s.heading}`}
              tabIndex={i === activeIdx ? 0 : -1}
            />
          ))}
        </div>

        <button
          className="focus-nav-btn"
          onClick={next}
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
