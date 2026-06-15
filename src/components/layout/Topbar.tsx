import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavStore } from '../../store';
import { SITE }        from '../../constants';
import { Avatar }      from '../../components/ui';
import type { LucideIcon } from 'lucide-react';

interface ArrowBtnProps {
  label:   string;
  onClick: () => void;
  enabled: boolean;
  Icon:    LucideIcon;
}

function ArrowBtn({ label, onClick, enabled, Icon }: ArrowBtnProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      disabled={!enabled}
      style={{ width: 32, height: 32, background: 'rgba(0,0,0,.7)', border: 'none', borderRadius: '50%', color: enabled ? 'var(--sp-white)' : 'var(--sp-gray2)', cursor: enabled ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s' }}
      onMouseEnter={(e) => { if (enabled) e.currentTarget.style.background = 'rgba(255,255,255,.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,.7)'; }}
    >
      <Icon size={18} />
    </button>
  );
}

export function Topbar() {
  const back       = useNavStore((s) => s.back);
  const forward    = useNavStore((s) => s.forward);
  const canBack    = useNavStore((s) => s.canBack)();
  const canForward = useNavStore((s) => s.canForward)();

  return (
    <div style={{ background: 'rgba(18,18,18,.92)', backdropFilter: 'blur(12px)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1c1c1c', flexShrink: 0, height: 'var(--topbar-h)' }}>
      <div style={{ display: 'flex', gap: 8 }} className="hide-on-mobile">
        <ArrowBtn label="Go back"    onClick={back}    enabled={canBack}    Icon={ChevronLeft} />
        <ArrowBtn label="Go forward" onClick={forward} enabled={canForward} Icon={ChevronRight} />
      </div>

      {/* mobile brand mark, shown instead of back/forward arrows */}
      <span className="hide-on-desktop" style={{ fontSize: 15, fontWeight: 900, color: 'var(--sp-white)', letterSpacing: '-.3px' }}>
        Keybeen
      </span>

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--sp-dark3)', padding: '4px 10px 4px 4px', borderRadius: 24, cursor: 'pointer', transition: 'background .15s' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#333'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--sp-dark3)'; }}
      >
        <Avatar size={28} />
        <span className="hide-on-mobile" style={{ fontSize: 13, fontWeight: 700, color: 'var(--sp-white)' }}>{SITE.role}</span>
        <ChevronDown size={14} color="var(--sp-gray)" className="hide-on-mobile" />
      </div>
    </div>
  );
}