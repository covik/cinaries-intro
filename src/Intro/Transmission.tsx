import { interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';

const Props = z.object({
  introDuration: z.number().positive(),
  composerColor: z.string(),
});
type Args = z.infer<typeof Props>;

export function Transmission(args: Args) {
  const { introDuration, composerColor } = Props.parse(args);
  const frame = useCurrentFrame();
  const clipLeft = interpolate(frame, [0, introDuration], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '22px',
        clipPath: `rect(0 ${clipLeft}% 100% 0%)`,
      }}
    >
      <svg
        width="180"
        height="32"
        viewBox="0 0 180 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fill: '#ed8500',
        }}
      >
        <path d="M180 16L163.996 1.0045e-05L163.996 12L23.3252 12C21.6848 7.32 17.2438 4 12.0027 4C8.81935 4 5.76641 5.26428 3.51547 7.51471C1.26454 9.76515 1.67699e-06 12.8174 1.39876e-06 16C1.12053e-06 19.1826 1.26454 22.2348 3.51547 24.4852C5.76641 26.7356 8.81935 27.9999 12.0027 27.9999C17.2438 27.9999 21.6848 24.68 23.3252 20L163.996 20L163.996 32L180 16Z" />
      </svg>

      <span
        style={{
          fontWeight: 300,
          fontSize: '45px',
          display: 'block',
          letterSpacing: '3px',
          color: '#ed8500',
        }}
      >
        COPY --from=<span style={{ color: composerColor }}>composer:2</span>
      </span>
    </div>
  );
}
