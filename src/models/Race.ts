import type {RacePosition} from "@/models/RacePosition";

export interface Race {
    isFavourite: boolean,
    locality: string,
    country: string,
    positions: RacePosition[]
}