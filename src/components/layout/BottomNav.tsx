import { useNavStore } from '../../store';
import { NAV_ITEMS }   from '../../constants';

export function BottomNav() {
  const navigate = useNavStore((s) => s.navigate);
  const active   = useNavStore((s) => s.active);

  return (
    <nav
      style={{
        display:        'flex',
        height:         'var(--bottomnav-h)',
        background:     'var(--sp-black)',
        borderTop:      '1px solid var(--sp-dark3)',
        flexShrink:     0,
        paddingBottom:  'env(safe-area-inset-bottom)',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            style={{
              flex:           1,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            3,
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              color:          isActive ? 'var(--sp-white)' : 'var(--sp-gray)',
              padding:        '6px 0',
            }}
          >
            <Icon size={20} strokeWidth={2} fill={isActive ? 'currentColor' : 'none'} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.2px' }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}