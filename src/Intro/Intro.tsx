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
import { Transmission } from './Transmission';

const colors = {
  neutral: '#737373',
  progressing: '#ed8500',
};

const dollEntranceDuration = 25;
const transmissionDuration = 15;

export function Intro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const firstDollEntrance = interpolate(
    frame,
    [0, dollEntranceDuration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const firstDollMoveLeft = spring({ frame, fps, from: 0, to: -450, delay: 6 });

  const transmissionStartFrame = dollEntranceDuration;
  const dockerfileColor =
    frame >= transmissionStartFrame + 1 ? colors.progressing : colors.neutral;

  const secondDollStartFrame = transmissionStartFrame + transmissionDuration;
  const secondDollEndFrame = secondDollStartFrame + dollEntranceDuration;
  const secondDollEntrance = interpolate(
    frame,
    [secondDollStartFrame, secondDollEndFrame],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const secondDollBytesDownloaded = interpolate(
    frame,
    [secondDollStartFrame, secondDollEndFrame],
    [0, 190],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const composerColor =
    frame >= secondDollEndFrame ? colors.progressing : colors.neutral;

  return (
    <>
      <GlobalStyle />
      <AbsoluteFill style={{ backgroundColor: '#f5f5f5' }}>
        <Sequence name="First doll">
          <div
            style={{
              position: 'absolute',
              top: '333px',
              left: '50%',
              transform: 'translateX(-50%)',
              marginLeft: firstDollMoveLeft,
              opacity: firstDollEntrance,
            }}
          >
            <FirstDoll
              rotationOffsetFrame={50}
              dockerfileColor={dockerfileColor}
            />
          </div>
        </Sequence>

        <Sequence from={transmissionStartFrame} name="Transmission">
          <div style={{ position: 'absolute', top: '809px', left: '643px' }}>
            <Transmission
              introDuration={transmissionDuration}
              composerColor={composerColor}
            />
          </div>
        </Sequence>

        <Sequence from={secondDollStartFrame} name="Second doll">
          <div
            style={{
              position: 'absolute',
              top: '433px',
              left: '50%',
              transform: 'translateX(-50%)',
              marginLeft: '330px',
              opacity: secondDollEntrance,
            }}
          >
            <SecondDoll rotationOffsetFrame={50} />
          </div>
        </Sequence>

        <Sequence from={secondDollStartFrame} name="Bytes downloaded">
          <span
            style={{
              fontWeight: 400,
              fontSize: '33px',
              display: 'block',
              letterSpacing: '2px',
              color: '#0066ff',
              position: 'absolute',
              top: '870px',
              left: '1226px',
            }}
          >
            {Math.trunc(secondDollBytesDownloaded)} MB
          </span>
        </Sequence>
      </AbsoluteFill>
    </>
  );
}
