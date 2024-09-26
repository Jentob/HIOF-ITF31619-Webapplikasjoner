import {
    PublicProjectSchema as PPS,
    PublicProjectArraySchema as PPAS,
    CreateProjectSchema as CPS,
    type PublicProject as PP,
    type CreateProject as CP,
} from "../../../backend/src/types/project.types";

export const PublicProjectSchema = PPS;

export const PublicProjectArraySchema = PPAS;

export const CreateProjectSchema = CPS;

export type PublicProject = PP;

export type CreateProject = CP;
