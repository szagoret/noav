export type SongSearchQueryType = {
    title?: string,
    instrumentsIds?: String[],
    composersIds?: String[],
    topicsIds?: String[],
    vocalsIds?: String[],
    arrangersIds?: String[],
    orchestratorsIds?: String[],
    sort?: string,
    page?: number,
    size?: number,
};