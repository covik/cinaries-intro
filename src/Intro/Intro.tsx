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
import { ThirdDoll } from './Doll/ThirdDoll';

const colors = {
  neutral: '#737373',
  progressing: '#ed8500',
};

const dollEntranceDuration = 25;
const transmissionDuration = 15;
const dollOpenDuration = 15;

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

  const secondDollOpenStart = secondDollEndFrame + 10;
  const secondDollOpenEnd = secondDollOpenStart + dollOpenDuration;
  const secondDollOpen = interpolate(
    frame,
    [secondDollOpenStart, secondDollOpenEnd],
    [0, -110],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const thirdDollUnboxStart = secondDollOpenEnd + 10;
  const thirdDollUnboxDuration = 20;
  const thirdDollUnboxEnd = thirdDollUnboxStart + thirdDollUnboxDuration;
  const thirdDollX = [1230, 1510];
  const thirdDollUnboxLeft = interpolate(
    frame,
    [thirdDollUnboxStart, thirdDollUnboxEnd],
    thirdDollX,
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const thirdDollUnboxVertexX = (thirdDollX[0] + thirdDollX[1]) / 2;
  const thirdDollUnboxStartY = 585;
  const thirdDollUnboxPeakY = 285;
  const thirdDollUnboxSteepness =
    (thirdDollUnboxStartY - thirdDollUnboxPeakY) /
    (thirdDollX[0] - thirdDollUnboxVertexX) ** 2;
  const thirdDollUnboxTop =
    thirdDollUnboxSteepness *
      (thirdDollUnboxLeft - thirdDollUnboxVertexX) ** 2 +
    thirdDollUnboxPeakY;

  return (
    <>
      <GlobalStyle />
      <AbsoluteFill style={{ backgroundColor: '#f5f5f5', zIndex: 0 }}>
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
            <SecondDoll rotationDegree={secondDollOpen} />
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

        <Sequence from={secondDollEndFrame} name="Third doll">
          <div
            style={{
              position: 'absolute',
              top: `${thirdDollUnboxTop}px`,
              left: `${thirdDollUnboxLeft}px`,
              zIndex: -1,
            }}
          >
            <ThirdDoll />
          </div>
        </Sequence>
      </AbsoluteFill>
    </>
  );
}
