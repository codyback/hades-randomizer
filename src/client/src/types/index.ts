export type Companion = string;

export type Heat = {
  name: string,
  tiers: number[],
  weighting: number,
}

export type Keepsake = {
  name: string,
  weighting: number,
}

export type Mirror = string[];

export type Weapon = {
  name: string,
  aspects: string[],
}
