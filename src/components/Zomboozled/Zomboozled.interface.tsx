// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ZomboozledProps {

}

export interface Weapons {
    [name: string]: Weapon
}

export interface Weapon {
    id: string,
    ammoString: string,
    ammoCount: number,
    standingSprite?: HTMLElement | null,
    swingingSprite?: HTMLElement | null,
    shootingSprite?: HTMLElement | null,
    shootingSpriteL?: HTMLElement | null,
    shootingSpriteR?: HTMLElement | null
}