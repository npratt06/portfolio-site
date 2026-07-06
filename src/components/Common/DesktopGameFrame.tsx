import type React from 'react';
import { DEVICE_TYPES } from '../../global.const';
import PortfolioIcon from './PortfolioIcon';

interface DesktopGameFrameProps {
  children: React.ReactNode;
  description: string;
  deviceType: string;
  title: string;
}

export default function DesktopGameFrame({ children, description, deviceType, title }: DesktopGameFrameProps) {
  if (deviceType !== DEVICE_TYPES.DESKTOP) {
    return (
      <div className="game-unavailable-page">
        <div className="game-unavailable-panel">
          <p className="section-label">Desktop arcade</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{title} is only implemented for desktop right now. Try it out on a computer.</p>
          <div className="button-row">
            <a className="button button--primary" href="#/lab">
              Back to Lab
              <PortfolioIcon name="arrow" />
            </a>
            <a className="button button--secondary" href="#/">
              Current portfolio
              <PortfolioIcon name="arrow" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
