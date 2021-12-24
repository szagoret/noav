import {PageableResponseType} from "src/types/PageableResponseType";
import {ResponseSortType} from "src/types/ResponseSortType";

export type PaginatedResultType<T> = {
    content: T[],
    empty: boolean,
    first: boolean,
    last: boolean
    number: number,
    numberOfElements: number,
    pageable: PageableResponseType,
    size: number,
    sort: ResponseSortType,
    totalElements: number,
    totalPages: number,
};