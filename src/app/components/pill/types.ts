import {PILL_COLORS, PILL_ROTATIONS} from './constants';

type ColorKey = keyof typeof PILL_COLORS;
export type PillColor = typeof PILL_COLORS[ColorKey];

type RotationKey = keyof typeof PILL_ROTATIONS;
export type PillRotation = typeof PILL_ROTATIONS[RotationKey];