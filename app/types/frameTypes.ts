export type ColumnSupportType = "hinged" | "roller" | "fixed" | "none";

import {
  FRAME_FRAME_LOAD_TYPES,
  FRAME_BEAM_LOAD_TYPES,
} from "../utils/frameloadTypes";
import { FrameReactions } from "../utils/frameReactions";
import { SimplifiedEquationResult } from "../utils/frameShearEquation";

export type Column = {
  length: number;
  momentOfInertia: number;
  supportType: ColumnSupportType;
  loadType: keyof typeof FRAME_FRAME_LOAD_TYPES;
  loadMagnitude: number;
};
interface PointLoadDistances {
  a?: number; // Distance from left end
  b?: number; // Distance from right end
}

export type Beam = {
  length: number;
  momentOfInertia: number;
  loadMagnitude: number;
  loadType: keyof typeof FRAME_BEAM_LOAD_TYPES;
  pointLoadDistances?: PointLoadDistances;
};

export interface FEMWithLabel {
  label: string;
  start: number;
  end: number;
}

export interface ShearEquationResult {
  shearEquation: string;
}

export interface CalculationResults {
  columns: FEMWithLabel[];
  beams: FEMWithLabel[];
  slopeDeflectionEquations: {
    memberLabel: string;
    startEquation: string;
    endEquation: string;
  }[];
  boundaryEquations: {
    eq1: string;
    eq2: string;
    eq3?: string;
  } | null;
  shearEquation: {
    shearEquation: string;
    simplifiedEquation: SimplifiedEquationResult;
  };
  solution: {
    thetaB: number;
    thetaC: number;
    thetaD?: number;
    delta: number;
  };
  finalMoments?: { [key: string]: number };
  horizontalReactions: FrameReactions;
  verticalReactions: FrameReactions;
  columnBMSF: Array<{
    sections: Array<{
      sectionLabel: string;
      x: number[];
      bendingMoment: number[];
      shearForce: number[];
    }>;
  }>;
  beamBMSF: Array<{
    x: number[];
    bendingMoment: number[];
    shearForce: number[];
  }>;
}
