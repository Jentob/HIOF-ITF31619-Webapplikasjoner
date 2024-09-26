import type { ErrorResponse } from "../types";

export const createInternalServerErrorObject = (): ErrorResponse => {
    return {
        status: "500",
        code: "INTERNAL_SERVER_ERROR",
        title: "Intern tjenerfeil",
        detail: "En uventet feil oppstod under behandling av forespørselen.",
    };
};

export const createNotFoundErrorObject = (item?: string): ErrorResponse => {
    return {
        status: "404",
        code: (item ? item.toUpperCase : "") + "NOT_FOUND",
        title: "Ikke funnet",
        detail: "Forespurt ressurs ble ikke funnet.",
    };
};