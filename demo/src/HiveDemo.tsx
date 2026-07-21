import React from 'react';
import { Sequence } from 'remotion';
import { BEATS } from './theme';
import { ColdOpen } from './beats/ColdOpen';
import { TitleBeat } from './beats/TitleBeat';
import { ProblemBeat } from './beats/ProblemBeat';
import { SixRolesBeat } from './beats/SixRolesBeat';
import { LiveRunBeat } from './beats/LiveRunBeat';
import { WhyItWorksBeat } from './beats/WhyItWorksBeat';
import { CTABeat } from './beats/CTABeat';

/**
 * Master composition: all beats sequenced together.
 * Total frames: 1140 at 30fps = 38 seconds.
 * Resolution: 1920x1080.
 */
export const HiveDemo: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, background: '#000' }}>
      <Sequence name="ColdOpen" from={BEATS.coldOpen.start} durationInFrames={BEATS.coldOpen.end - BEATS.coldOpen.start + 1}>
        <ColdOpen />
      </Sequence>

      <Sequence name="Title" from={BEATS.title.start} durationInFrames={BEATS.title.end - BEATS.title.start + 1}>
        <TitleBeat />
      </Sequence>

      <Sequence name="Problem" from={BEATS.problem.start} durationInFrames={BEATS.problem.end - BEATS.problem.start + 1}>
        <ProblemBeat />
      </Sequence>

      <Sequence name="SixRoles" from={BEATS.sixRoles.start} durationInFrames={BEATS.sixRoles.end - BEATS.sixRoles.start + 1}>
        <SixRolesBeat />
      </Sequence>

      <Sequence name="LiveRun" from={BEATS.liveRun.start} durationInFrames={BEATS.liveRun.end - BEATS.liveRun.start + 1}>
        <LiveRunBeat />
      </Sequence>

      <Sequence name="WhyItWorks" from={BEATS.whyItWorks.start} durationInFrames={BEATS.whyItWorks.end - BEATS.whyItWorks.start + 1}>
        <WhyItWorksBeat />
      </Sequence>

      <Sequence name="CTA" from={BEATS.cta.start} durationInFrames={BEATS.cta.end - BEATS.cta.start + 1}>
        <CTABeat />
      </Sequence>
    </div>
  );
};
