import {createSlice} from "@reduxjs/toolkit";
import {IdTitleType} from "src/types/IdTitleType";
import {IdNameType} from "src/types/IdNameType";


interface SongAdvancedFiltersSliceState {
    instruments?: IdTitleType[],
    topics?: IdTitleType[],
    vocals?: IdTitleType[],
    composers?: IdNameType[],
    arrangers?: IdNameType[],
    orchestrators?: IdNameType[],
    page?: number,
    size?: number,
    sortField: "publishDate" | "title",
    sortDirection: "ASC" | "DESC",
    viewMode: "grid" | "list"
}

const initialState: SongAdvancedFiltersSliceState = {
    instruments: [],
    topics: [],
    vocals: [],
    composers: [],
    arrangers: [],
    orchestrators: [],
    page: 0,
    size: 20,
    sortField: 'publishDate',
    sortDirection: 'DESC',
    viewMode: "grid"
}

export const songAdvancedFiltersSlice = createSlice({
    name: 'song-advanced-filters',
    initialState,
    reducers: {
        updateInstrumentFilter: (state, action) => {
            state.instruments = action.payload as IdTitleType[]
        },
        updateTopicFilter: (state, action) => {
            state.topics = action.payload as IdTitleType[]
        },
        updateVocalFilter: (state, action) => {
            state.vocals = action.payload as IdTitleType[]
        },
        updateComposerFilter: (state, action) => {
            state.composers = action.payload as IdNameType[]
        },
        updateArrangerFilter: (state, action) => {
            state.arrangers = action.payload as IdNameType[]
        },
        updateOrchestratorFilter: (state, action) => {
            state.orchestrators = action.payload as IdNameType[]
        },
        setPageFilter: (state, action) => {
            state.page = action.payload as number;
        },
        setPageSizeFilter: (state, action) => {
            state.size = action.payload as number;
        },
        setSortFieldFilter: (state, action) => {
            state.sortField = action.payload;
        },
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === "list" ? "grid" : "list";
        },
        toggleSortDirection: (state) => {
            state.sortDirection = state.sortDirection === "ASC" ? "DESC" : "ASC";
        },
        resetFilters: () => initialState
    }
});

export const {
    updateInstrumentFilter,
    updateTopicFilter,
    updateVocalFilter,
    updateComposerFilter,
    updateArrangerFilter,
    updateOrchestratorFilter,
    setPageFilter,
    toggleSortDirection,
    setSortFieldFilter,
    resetFilters,
    setPageSizeFilter,
    toggleViewMode
} = songAdvancedFiltersSlice.actions;

export default songAdvancedFiltersSlice.reducer;