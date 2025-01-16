import { z } from 'zod';
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

const Props = z.object({
  rotationOffsetFrame: z.number(),
  dockerfileColor: z.string(),
});
type Args = z.infer<typeof Props>;

export function FirstDoll(args: Args) {
  const { rotationOffsetFrame, dockerfileColor } = Props.parse(args);

  const frame = useCurrentFrame();

  const width = '250px';
  const rotate =
    0 ??
    interpolate(
      frame,
      [rotationOffsetFrame, rotationOffsetFrame + 15],
      [0, -110],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );

  return (
    <div style={{ width: 'fit-content' }}>
      <Img
        src={staticFile('1t.png')}
        style={{
          display: 'block',
          width,
          marginBottom: '-40px',
          transform: `rotate(${rotate}deg)`,
          transformOrigin: '0 265px',
        }}
      />
      <Img
        src={staticFile('1b.png')}
        style={{ display: 'block', width, position: 'relative' }}
      />
      <span
        style={{
          fontWeight: 300,
          fontSize: '45px',
          width: '100%',
          display: 'block',
          letterSpacing: '3px',
          textAlign: 'center',
          marginTop: '25px',
          color: dockerfileColor,
        }}
      >
        Dockerfile
      </span>
    </div>
  );
}
