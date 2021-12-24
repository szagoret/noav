import {IdTitleType} from "src/types/IdTitleType";
import {IdNameType} from "src/types/IdNameType";

export type SongPropertiesType = {
    instruments: IdTitleType[],
    topics: IdTitleType[],
    vocals: IdTitleType[],
    authors: IdNameType[]
};
