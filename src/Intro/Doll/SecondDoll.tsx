import { z } from 'zod';
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

const Props = z.object({
  rotationOffsetFrame: z.number(),
});
type Args = z.infer<typeof Props>;

export function SecondDoll(args: Args) {
  const { rotationOffsetFrame } = Props.parse(args);

  const frame = useCurrentFrame();

  const width = '190px';
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
    <div
      style={{
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Img
        src={staticFile('2t.png')}
        style={{
          display: 'block',
          width,
          marginBottom: '-23px',
          transform: `rotate(${rotate}deg)`,
          transformOrigin: '1px 211px',
        }}
      />
      <Img
        src={staticFile('2b.png')}
        style={{ display: 'block', width, position: 'relative' }}
      />
    </div>
  );
}
