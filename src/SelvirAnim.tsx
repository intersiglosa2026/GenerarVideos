import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Scene} from './Selvir';

const BLUE = '#1f3f7a';
const GROUND = 820;
const font = 'system-ui, Helvetica, Arial, sans-serif';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Person = ({x, color, hair, arm = 20, arm2 = 10, talk = false, flip = false, bob = 0}: {x: number; color: string; hair: string; arm?: number; arm2?: number; talk?: boolean; flip?: boolean; bob?: number}) => {
  const f = useCurrentFrame();
  const mouth = talk ? 4 + 8 * Math.abs(Math.sin(f / 3)) : 3;
  const y = GROUND + bob;
  const s = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s} 1)`}>
      <rect x={-45} y={-190} width={36} height={190} rx={14} fill="#26344d" />
      <rect x={9} y={-190} width={36} height={190} rx={14} fill="#26344d" />
      <rect x={-65} y={-400} width={130} height={230} rx={40} fill={color} />
      <line x1={0} y1={-370} x2={Math.cos((arm * Math.PI) / 180) * 150} y2={-370 + Math.sin((arm * Math.PI) / 180) * 150} stroke={color} strokeWidth={28} strokeLinecap="round" />
      <line x1={0} y1={-370} x2={-Math.cos((arm2 * Math.PI) / 180) * 150} y2={-370 + Math.sin((arm2 * Math.PI) / 180) * 150} stroke={color} strokeWidth={28} strokeLinecap="round" />
      <circle cx={0} cy={-455} r={58} fill="#f1c9a0" />
      <path d="M-58 -455 A58 58 0 0 1 58 -455 Q0 -500 -58 -455 Z" fill={hair} />
      <circle cx={-20} cy={-460} r={6} fill="#222" />
      <circle cx={20} cy={-460} r={6} fill="#222" />
      <ellipse cx={0} cy={-432} rx={14} ry={mouth} fill="#8a2d2d" />
    </g>
  );
};

const Bubble = ({x, y, text, from = 0}: {x: number; y: number; text: string; from?: number}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [from, from + 8], [0, 1], clamp);
  const sc = interpolate(f, [from, from + 8], [0.7, 1], clamp);
  return (
    <g transform={`translate(${x} ${y}) scale(${sc})`} opacity={o}>
      <rect x={-290} y={-70} width={580} height={110} rx={40} fill="#fff" />
      <polygon points="-30,40 30,40 0,90" fill="#fff" />
      <text x={0} y={-5} textAnchor="middle" fontSize={40} fontWeight={700} fill={BLUE} fontFamily={font}>{text}</text>
    </g>
  );
};

const Car = ({x}: {x: number}) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <rect x={-230} y={-130} width={460} height={90} rx={30} fill="#d94b4b" />
    <path d="M-130 -130 L-80 -210 L90 -210 L150 -130 Z" fill="#c23d3d" />
    <path d="M-105 -135 L-70 -195 L-10 -195 L-10 -135 Z M10 -135 L10 -195 L80 -195 L125 -135 Z" fill="#cfe6f7" />
    <circle cx={-140} cy={-35} r={42} fill="#222" /><circle cx={-140} cy={-35} r={18} fill="#aaa" />
    <circle cx={140} cy={-35} r={42} fill="#222" /><circle cx={140} cy={-35} r={18} fill="#aaa" />
  </g>
);

const Box = ({x, y}: {x: number; y: number}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-45} y={-35} width={90} height={70} fill="#c8924f" /><rect x={-45} y={-35} width={90} height={14} fill="#a8733a" />
    <text x={0} y={22} textAnchor="middle" fontSize={20} fontWeight={800} fill={BLUE} fontFamily={font}>SELVIR</text>
  </g>
);

const Caption = ({text}: {text: string}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', bottom: 60, width: '100%', textAlign: 'center', fontFamily: font, fontSize: 64, fontWeight: 800, color: BLUE, opacity: interpolate(f, [0, 12], [0, 1], clamp)}}>{text}</div>
  );
};

const Street = ({children, caption}: {children: React.ReactNode; caption: string}) => (
  <AbsoluteFill style={{background: 'linear-gradient(#8fc3ee, #dcefff 70%)'}}>
    <svg width={1920} height={1080}>
      <rect y={GROUND} width={1920} height={260} fill="#4a5568" />
      <rect y={GROUND - 20} width={1920} height={20} fill="#a0aec0" />
      <rect x={1350} y={300} width={450} height={GROUND - 320} fill="#e2e8f0" /><rect x={1350} y={260} width={450} height={50} fill={BLUE} />
      <text x={1575} y={297} textAnchor="middle" fontSize={34} fontWeight={900} fill="#fff" fontFamily={font}>SELVIR REPUESTOS</text>
      <rect x={1400} y={380} width={120} height={200} fill="#9ccbe9" /><rect x={1630} y={380} width={120} height={200} fill="#9ccbe9" />
      {children}
    </svg>
    <Caption text={caption} />
  </AbsoluteFill>
);

const Shop = ({children, caption}: {children: React.ReactNode; caption: string}) => (
  <AbsoluteFill style={{background: '#e9eef6'}}>
    <svg width={1920} height={1080}>
      <rect y={GROUND} width={1920} height={260} fill="#c9d3e3" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x={1100} y={250 + r * 150} width={720} height={14} fill="#7b8aa5" />
          {[0, 1, 2, 3, 4].map((c) => <rect key={c} x={1130 + c * 140} y={190 + r * 150} width={110} height={60} fill={['#c8924f', BLUE, '#d94b4b'][(r + c) % 3]} />)}
        </g>
      ))}
      {children}
      <rect x={1000} y={GROUND - 230} width={520} height={30} fill="#6b4a2b" /><rect x={1000} y={GROUND - 200} width={520} height={200} fill="#8b6239" />
    </svg>
    <Caption text={caption} />
  </AbsoluteFill>
);

const Arrive = () => {
  const f = useCurrentFrame();
  const carX = interpolate(f, [0, 60], [-300, 520], clamp);
  const px = interpolate(f, [50, 110], [560, 960], clamp);
  const walking = f > 50 && f < 110;
  return (
    <Street caption="Llega un cliente...">
      <Car x={carX} />
      {f >= 50 && <Person x={px} color="#3b82f6" hair="#3a2a1a" bob={walking ? Math.abs(Math.sin(f / 3)) * -10 : 0} arm={walking ? 70 + Math.sin(f / 3) * 25 : 70} arm2={walking ? 70 - Math.sin(f / 3) * 25 : 70} />}
      {f >= 110 && <Bubble x={px} y={GROUND - 600} text="¡Necesito un repuesto!" from={110} />}
    </Street>
  );
};

const Talk = () => {
  const f = useCurrentFrame();
  return (
    <Shop caption="Te asesoramos para encontrar la pieza justa">
      <Person x={700} color="#3b82f6" hair="#3a2a1a" arm={70} arm2={70} />
      <Person x={1260} color={BLUE} hair="#111" flip talk={f > 25 && f < 110} arm={150 - Math.abs(Math.sin(f / 5)) * 60} arm2={70} />
      {f < 60 && <Bubble x={700} y={GROUND - 600} text="¿Tienen esta pieza?" from={5} />}
      {f >= 60 && <Bubble x={1260} y={GROUND - 620} text="¡Sí, la tenemos en stock!" from={60} />}
    </Shop>
  );
};

const Hand = () => {
  const f = useCurrentFrame();
  const bx = interpolate(f, [20, 80], [1120, 840], clamp);
  const by = interpolate(f, [20, 80], [GROUND - 260, GROUND - 330], clamp);
  return (
    <Shop caption="Variedad y disponibilidad">
      <Person x={700} color="#3b82f6" hair="#3a2a1a" arm={f > 80 ? 30 : 70} arm2={f > 80 ? 30 : 70} talk={f > 95} />
      <Person x={1260} color={BLUE} hair="#111" flip arm={f < 80 ? 20 : 70} arm2={f < 80 ? 20 : 70} />
      <Box x={bx} y={by} />
      {f >= 95 && <Bubble x={700} y={GROUND - 600} text="¡Perfecto, gracias!" from={95} />}
    </Shop>
  );
};

const Leave = () => {
  const f = useCurrentFrame();
  const carX = interpolate(f, [60, 150], [520, 2300], clamp);
  return (
    <Street caption="Calidad en la que podés confiar">
      <Car x={f < 60 ? 520 : carX} />
      {f < 40 && <Person x={800} color="#3b82f6" hair="#3a2a1a" talk arm={-30 - Math.abs(Math.sin(f / 4)) * 40} arm2={70} />}
      {f < 40 && <Bubble x={800} y={GROUND - 620} text="¡Gracias, Selvir!" from={3} />}
    </Street>
  );
};

const D = [150, 150, 150, 150, 150, 150];
export const SelvirAnim = () => {
  const parts = [<Scene key="i" title="SELVIR" sub="REPUESTOS" logo />, <Arrive key="a" />, <Talk key="t" />, <Hand key="h" />, <Leave key="l" />, <Scene key="o" title="SELVIR SA" sub="www.selvir.com.uy" logo />];
  let from = 0;
  return (
    <AbsoluteFill style={{background: BLUE}}>
      {parts.map((p, i) => {
        const el = <Sequence key={i} from={from} durationInFrames={D[i]}>{p}</Sequence>;
        from += D[i];
        return el;
      })}
    </AbsoluteFill>
  );
};
