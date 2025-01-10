import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FirstDoll } from './Doll/FirstDoll';
import { SecondDoll } from './Doll/SecondDoll';
import { GlobalStyle } from '../GlobalStyle';
import { DownloadIndicator } from './DownloadIndicator';

export function Intro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceFrameDuration = 25;
  const firstDollEntrance = interpolate(
    frame,
    [0, entranceFrameDuration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const firstDollMoveLeft = spring({ frame, fps, from: 0, to: -450, delay: 6 });

  const secondDollFrameDelay = 45;
  const secondDollEntrance = interpolate(
    frame,
    [secondDollFrameDelay, secondDollFrameDelay + entranceFrameDuration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  return (
    <>
      <GlobalStyle />
      <AbsoluteFill style={{ backgroundColor: '#f5f5f5' }}>
        <Sequence name="First doll">
          <AbsoluteFill style={{ opacity: firstDollEntrance }}>
            <div
              style={{
                position: 'absolute',
                top: '333px',
                left: '50%',
                transform: 'translateX(-50%)',
                marginLeft: firstDollMoveLeft,
              }}
            >
              <FirstDoll rotationOffsetFrame={50} />
            </div>
          </AbsoluteFill>
        </Sequence>

        <Sequence name="Transmission">
          <DownloadIndicator />
        </Sequence>

        <Sequence from={45} name="Second doll">
          <AbsoluteFill style={{ opacity: secondDollEntrance }}>
            <div
              style={{
                position: 'absolute',
                top: '433px',
                left: '50%',
                transform: 'translateX(-50%)',
                marginLeft: '330px',
              }}
            >
              <SecondDoll rotationOffsetFrame={50} />
            </div>
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>
    </>
  );
}
