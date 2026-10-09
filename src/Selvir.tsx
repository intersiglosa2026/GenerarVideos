import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const BG = '#1f3f7a';
const font = 'system-ui, Helvetica, Arial, sans-serif';

const Scene = ({title, sub, logo}: {title: string; sub: string; logo?: boolean}) => {
  const f = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 14}});
  const out = interpolate(f, [durationInFrames - 12, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, #2a5099, ${BG} 70%)`, alignItems: 'center', justifyContent: 'center', fontFamily: font, opacity: out}}>
      <div style={{fontSize: logo ? 220 : 96, color: '#fff', fontWeight: 900, fontStyle: logo ? 'italic' : 'normal', letterSpacing: logo ? 6 : 0, textAlign: 'center', padding: '0 120px', transform: `translateY(${(1 - s) * 60}px) scale(${logo ? 0.8 + 0.2 * s : 1})`, opacity: s}}>{title}</div>
      <div style={{fontSize: logo ? 52 : 48, color: '#c9d6e8', marginTop: 28, letterSpacing: logo ? 28 : 0, textAlign: 'center', padding: '0 160px', opacity: interpolate(f, [15, 35], [0, 1], {extrapolateRight: 'clamp'})}}>{sub}</div>
    </AbsoluteFill>
  );
};

const scenes: [string, string, boolean?][] = [
  ['SELVIR', 'REPUESTOS', true],
  ['Repuestos para tu vehículo', 'Todo lo que necesitás en un solo lugar'],
  ['Variedad y disponibilidad', 'Un catálogo pensado para el taller y el conductor'],
  ['Atención cercana', 'Te asesoramos para encontrar la pieza justa'],
  ['Calidad en la que podés confiar', 'Repuestos que cuidan tu auto'],
  ['SELVIR SA', 'www.selvir.com.uy', true],
];
const D = [150, 150, 150, 150, 150, 150];

export const Selvir = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: BG}}>
      {scenes.map(([t, s, l], i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={D[i]}>
            <Scene title={t} sub={s} logo={l} />
          </Sequence>
        );
        from += D[i];
        return el;
      })}
    </AbsoluteFill>
  );
};
