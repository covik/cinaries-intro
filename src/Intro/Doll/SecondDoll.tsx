import { z } from 'zod';
import { Img, staticFile } from 'remotion';

const Props = z.object({
  rotationDegree: z.number().min(-110).max(0),
});
type Args = z.infer<typeof Props>;

export function SecondDoll(args: Args) {
  const { rotationDegree } = Props.parse(args);

  const width = '190px';

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
          transform: `rotate(${rotationDegree}deg)`,
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
