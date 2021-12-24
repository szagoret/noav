import {IdNameType} from "src/types/IdNameType";
import {IdTitleType} from "src/types/IdTitleType";
import {SongFileType} from "src/types/SongFileType";

export type SongType = {
    code: string,
    title: string,
    originalTitle?: string,
    composers: Array<IdNameType>,
    arrangers: Array<IdNameType>,
    orchestrators: Array<IdNameType>,
    topics: Array<IdTitleType>,
    instruments: Array<IdTitleType>,
    vocals: Array<IdTitleType>,
    files: Array<SongFileType>
};