import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const BG = '#0f2a4a';
const ACCENT = '#f5b335';
const font = 'system-ui, Helvetica, Arial, sans-serif';

const Scene = ({title, sub, n}: {title: string; sub: string; n?: string}) => {
  const f = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 14}});
  const out = interpolate(f, [durationInFrames - 12, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill style={{background: BG, alignItems: 'center', justifyContent: 'center', fontFamily: font, opacity: out}}>
      {n && <div style={{fontSize: 140, color: ACCENT, fontWeight: 800, transform: `scale(${s})`}}>{n}</div>}
      <div style={{fontSize: 96, color: '#fff', fontWeight: 700, textAlign: 'center', padding: '0 120px', transform: `translateY(${(1 - s) * 60}px)`, opacity: s}}>{title}</div>
      <div style={{fontSize: 48, color: '#c9d6e8', marginTop: 28, textAlign: 'center', padding: '0 160px', opacity: interpolate(f, [15, 35], [0, 1], {extrapolateRight: 'clamp'})}}>{sub}</div>
    </AbsoluteFill>
  );
};

const scenes: [string, string, string?][] = [
  ['Sistema de Pedidos', 'Compras de las estaciones, simples y ordenadas', undefined],
  ['Elegí del catálogo', 'Productos y ofertas de todos los proveedores en un solo lugar', '1'],
  ['Un carrito para toda la estación', 'Todo el equipo suma al mismo pedido', '2'],
  ['Cada proveedor prepara lo suyo', 'El pedido se divide en paquetes automáticamente', '3'],
  ['Seguí cada entrega', 'Estados y avisos por correo en cada paso', '4'],
  ['Factura y cobro al día', 'Todo registrado, sin planillas', '5'],
  ['Intersiglo', 'Pedí más fácil. Controlá todo.', undefined],
];
const D = [150, 120, 120, 120, 120, 120, 150];

export const Promo = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: BG}}>
      {scenes.map(([t, s, n], i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={D[i]}>
            <Scene title={t} sub={s} n={n} />
          </Sequence>
        );
        from += D[i];
        return el;
      })}
    </AbsoluteFill>
  );
};
