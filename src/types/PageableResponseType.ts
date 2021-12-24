import {ResponseSortType} from "src/types/ResponseSortType";

export type PageableResponseType = {
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean
    sort: ResponseSortType
    unpaged: boolean
};