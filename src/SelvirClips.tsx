import {AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Scene} from './Selvir';
import {INTRO_SECONDS, MUSIC, OUTRO_SECONDS, clips} from './clips';

const FPS = 30;
export const clipsDuration = () =>
  (INTRO_SECONDS + OUTRO_SECONDS + clips.reduce((a, c) => a + c.seconds, 0)) * FPS;

const ClipScene = ({file, title, sub}: {file: string; title: string; sub?: string}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const fade = interpolate(f, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: fade, background: '#000'}}>
      <OffthreadVideo src={staticFile(`clips/${file}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} muted />
      <AbsoluteFill style={{background: 'linear-gradient(transparent 55%, rgba(31,63,122,0.9))', justifyContent: 'flex-end', padding: '0 100px 90px', fontFamily: 'system-ui, Helvetica, Arial, sans-serif'}}>
        <div style={{fontSize: 80, fontWeight: 800, color: '#fff'}}>{title}</div>
        {sub && <div style={{fontSize: 44, color: '#c9d6e8', marginTop: 10}}>{sub}</div>}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SelvirClips = () => {
  let from = 0;
  const seq = (frames: number, node: React.ReactNode, key: string) => {
    const el = <Sequence key={key} from={from} durationInFrames={frames}>{node}</Sequence>;
    from += frames;
    return el;
  };
  return (
    <AbsoluteFill style={{background: '#1f3f7a'}}>
      {MUSIC && <Audio src={staticFile(MUSIC)} volume={0.6} />}
      {seq(INTRO_SECONDS * FPS, <Scene title="SELVIR" sub="REPUESTOS" logo />, 'intro')}
      {clips.map((c, i) => seq(c.seconds * FPS, <ClipScene file={c.file} title={c.title} sub={c.sub} />, `c${i}`))}
      {seq(OUTRO_SECONDS * FPS, <Scene title="SELVIR SA" sub="www.selvir.com.uy" logo />, 'outro')}
    </AbsoluteFill>
  );
};
