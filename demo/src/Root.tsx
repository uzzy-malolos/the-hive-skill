import { registerRoot, Composition } from 'remotion';
import { HiveDemo } from './HiveDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HiveDemo"
      component={HiveDemo}
      durationInFrames={1140}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
