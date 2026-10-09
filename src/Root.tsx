import {Composition} from 'remotion';
import {Promo} from './Promo';
import {Selvir} from './Selvir';
import {SelvirAnim} from './SelvirAnim';
import {SelvirClips, clipsDuration} from './SelvirClips';
export const Root = () => (
  <>
    <Composition id="Promo" component={Promo} durationInFrames={900} fps={30} width={1920} height={1080} />
    <Composition id="Selvir" component={Selvir} durationInFrames={900} fps={30} width={1920} height={1080} />
    <Composition id="SelvirClips" component={SelvirClips} durationInFrames={clipsDuration()} fps={30} width={1920} height={1080} />
    <Composition id="SelvirAnim" component={SelvirAnim} durationInFrames={900} fps={30} width={1920} height={1080} />
  </>
);
