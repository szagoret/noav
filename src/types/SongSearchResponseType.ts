import {SongType} from "src/types/SongType";

export type SongSearchResponseType = {
    content: Array<SongType>,
    totalElements: number,
    size: number,
    pageable: any,
    sort: any
};