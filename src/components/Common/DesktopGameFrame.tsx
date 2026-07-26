import type React from 'react';
import { DEVICE_TYPES } from '../../global.const';
import ArtifactHeader from './ArtifactHeader';

interface DesktopGameFrameProps {
  children: React.ReactNode;
  description: string;
  deviceType: string;
  title: string;
}

export default function DesktopGameFrame({ children, description, deviceType, title }: DesktopGameFrameProps) {
  const game =
    deviceType === DEVICE_TYPES.DESKTOP ? (
      children
    ) : (
      <div className="game-unavailable-page">
        <div className="game-unavailable-panel">
          <p className="section-label">Desktop arcade</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{title} is only implemented for desktop right now. Try it out on a computer.</p>
        </div>
      </div>
    );

  return (
    <div className="arcade-page">
      <ArtifactHeader category="Arcade" title={title} />
      <main className="arcade-stage">{game}</main>
    </div>
  );
}
