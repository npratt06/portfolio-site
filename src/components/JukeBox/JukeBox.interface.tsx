export const outerWrapper: React.CSSProperties = {
  position: 'relative',
  height: '100%'
};

export const rowElement: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
};

export interface JukeBoxProps {
  deviceType: string;
}

export interface JukeBoxState {
  navIndex: number;
  isMouseDownOnNavBtn: boolean;
  deviceType: string;
}
