import { DEVICE_TYPES } from '../global.const';

export interface StyleSet {
  [styleObject: string]: React.CSSProperties;
}

export interface StyleSets {
  [DEVICE_TYPES.DESKTOP]: StyleSet;
  [DEVICE_TYPES.LAPTOP]?: StyleSet;
  [DEVICE_TYPES.TABLET]?: StyleSet;
  [DEVICE_TYPES.MOBILE]: StyleSet;
}

export function getStyleSet(deviceType: string, styleSets: StyleSets) {
  let currentStyleSet = styleSets.Desktop;
  if (deviceType !== DEVICE_TYPES.DESKTOP) {
    currentStyleSet = styleSets.Mobile;
  }
  switch (deviceType) {
    case DEVICE_TYPES.DESKTOP:
      currentStyleSet = styleSets[DEVICE_TYPES.DESKTOP];
      break;
    case DEVICE_TYPES.MOBILE:
      currentStyleSet = styleSets[DEVICE_TYPES.MOBILE];
      break;
    default:
      currentStyleSet = styleSets[DEVICE_TYPES.DESKTOP];
      break;
  }
  return currentStyleSet;
}
