// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ZomboozledState {
  gameOver: boolean;
  deviceType: string;
}

export interface ZomboozledProps {
  deviceType: string;
}

export interface Weapons {
  [name: string]: Weapon;
}

export interface Weapon {
  id: string;
  ammoString: string;
  ammoCount: number;
  standingSpriteImgID: string;
  swingingSpriteImgID: string;
  shootingSpriteImgID: string;
  shootingSpriteLImgID: string;
  shootingSpriteRImgID: string;
}
