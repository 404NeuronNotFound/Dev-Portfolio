import { useRef, useState } from 'react';
import { GraduationCap, Monitor, Sparkles, ChevronDown, CpuIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Tag } from '../components/ui';
import { useScrollSpy } from '../hooks';
import { experience } from '../data';

const ICONS: LucideIcon[]  = [CpuIcon ,GraduationCap, Monitor, Sparkles];
const GRADIENTS             = ['emerald', 'blue', 'purple'];

export function ExperiencePage() {
  const [openId, setOpenId] = useState<number | null>(experience[0]?.id ?? null);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const { activeIndex, lineFill, setItemRef } = useScrollSpy(experience.length);

  // per-connector line refs so we can measure fill height
  const lineTrackRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="page">
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--sp-green)', marginBottom: 10 }}>
        Experience
      </p>
      <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--sp-white)', letterSpacing: '-1px', marginBottom: 4 }}>
        My journey
      </h1>
      <p style={{ fontSize: 14, color: 'var(--sp-gray)', marginBottom: 36 }}>
        From "Hello, World!" to shipping full-stack projects.
      </p>

      <div style={{ maxWidth: 640, position: 'relative' }}>
        {experience.map((job, i) => {
          const isOpen   = openId === job.id;
          const isActive = i <= activeIndex;
          const isLast   = i === experience.length - 1;
          const Icon     = ICONS[i % ICONS.length];
          const gradient = GRADIENTS[i % GRADIENTS.length];

          // fill % for this connector segment — 0–100
          const segFill = i < activeIndex
            ? 100                                       // fully passed
            : i === activeIndex && !isLast
              ? lineFill                                // currently filling
              : 0;                                      // not yet reached

          return (
            <div
              key={job.id}
              ref={setItemRef(i)}
              style={{ display: 'flex', gap: 20 }}
            >
              {/* ── connector column ────────────────────────── */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>

                {/* node */}
                <div
                  className={isActive ? `grad-${gradient}` : ''}
                  style={{
                    width:       48,
                    height:      48,
                    borderRadius: '50%',
                    display:     'flex',
                    alignItems:  'center',
                    justifyContent: 'center',
                    flexShrink:  0,
                    background:  isActive ? undefined : 'var(--sp-dark3)',
                    boxShadow:   isActive && isOpen
                      ? '0 0 0 3px var(--sp-dark), 0 0 0 5px var(--sp-green)'
                      : isActive
                        ? '0 0 0 3px var(--sp-dark), 0 0 0 4px rgba(29,185,84,.4)'
                        : 'none',
                    transition:  'box-shadow .3s, background .4s',
                  }}
                >
                  <Icon
                    size={20}
                    color={isActive ? '#fff' : 'var(--sp-gray)'}
                    strokeWidth={2}
                    style={{ transition: 'color .3s' }}
                  />
                </div>

                {/* connecting line track */}
                {!isLast && (
                  <div
                    ref={(el) => { lineTrackRefs.current[i] = el; }}
                    style={{
                      flex:       1,
                      width:      2,
                      background: 'var(--sp-dark3)',
                      marginTop:  6,
                      marginBottom: 6,
                      minHeight:  32,
                      position:   'relative',
                      overflow:   'hidden',
                      borderRadius: 1,
                    }}
                  >
                    {/* fill layer */}
                    <div
                      style={{
                        position:   'absolute',
                        top:        0,
                        left:       0,
                        right:      0,
                        height:     `${segFill}%`,
                        background: 'var(--sp-green)',
                        borderRadius: 1,
                        transition: 'height .35s cubic-bezier(.4,0,.2,1)',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* ── content ─────────────────────────────────── */}
              <button
                onClick={() => toggle(job.id)}
                aria-expanded={isOpen}
                style={{
                  flex:       1,
                  minWidth:   0,
                  textAlign:  'left',
                  background: 'none',
                  border:     'none',
                  cursor:     'pointer',
                  paddingBottom: isLast ? 0 : 28,
                  color:      'inherit',
                  font:       'inherit',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize:      11,
                        fontWeight:    700,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color:         isActive ? 'var(--sp-green)' : 'var(--sp-gray)',
                        marginBottom:  4,
                        transition:    'color .3s',
                      }}
                    >
                      {job.period} · {job.type}
                    </div>
                    <div
                      style={{
                        fontSize:   16,
                        fontWeight: 700,
                        color:      isActive ? 'var(--sp-white)' : 'var(--sp-gray)',
                        marginBottom: 2,
                        transition: 'color .3s',
                      }}
                    >
                      {job.role}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--sp-gray)' }}>{job.company}</div>
                  </div>
                  <ChevronDown
                    size={18}
                    style={{
                      color:      isActive ? 'var(--sp-gray)' : 'var(--sp-dark4)',
                      flexShrink: 0,
                      marginTop:  4,
                      transition: 'transform .2s, color .3s',
                      transform:  isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </div>

                {/* expandable detail */}
                <div
                  style={{
                    maxHeight:  isOpen ? 400 : 0,
                    opacity:    isOpen ? 1 : 0,
                    overflow:   'hidden',
                    transition: 'max-height .35s ease, opacity .25s ease',
                  }}
                >
                  <p style={{ fontSize: 14, color: 'var(--sp-gray)', lineHeight: 1.7, margin: '14px 0 12px' }}>
                    {job.description}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {job.tags.map((t) => <Tag key={t} variant="green">{t}</Tag>)}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}