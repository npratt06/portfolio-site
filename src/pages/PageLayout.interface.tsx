// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageLayoutProps {}

export interface PageLayoutState {
  pages: JSX.Element[];
  windowWidth: number;
  windowHeight: number;
  deviceType: string;
}
