import { Img, staticFile } from 'remotion';

export function ThirdDoll() {
  const width = '120px';

  return (
    <Img
      src={staticFile('3.png')}
      style={{ display: 'block', width, position: 'relative' }}
    />
  );
}
