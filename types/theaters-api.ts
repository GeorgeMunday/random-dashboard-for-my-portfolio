export interface GetTheatersParams {
    amount?: number;
    skip?: number;
}

export interface TheaterDocument {
    _id: string;
    theaterId: number;
    location: {
        address: {
            street1: string;
            city: string;
            state: string;
            zipcode: string;
        };
        geo: {
            type: string;
            coordinates: number[];
        };
    };
}

export interface GetTheatersResponse {
    connected: boolean;
    message: string;
    documents: TheaterDocument[];
}