import {ThumbnailType} from "src/types/ThumbnailType";

export type SongFileType = {
    name: string,
    code: string,
    size: number,
    uploadedAt: Date,
    extension: string,
    primary: boolean,
    thumbnails: Array<ThumbnailType>
};