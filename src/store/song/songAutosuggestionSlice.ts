import {createSlice} from "@reduxjs/toolkit";
import {SongType} from "src/types/SongType";

interface SongAutosuggestionSliceState {
    searchTerm: string,
    songs: Array<SongType>
}

const initialState: SongAutosuggestionSliceState = {
    searchTerm: '',
    songs: [],
};
export const songAutosuggestionSlice = createSlice({
    name: 'song-autosuggestion',
    initialState,
    reducers: {
        addSongSuggestion: (state) => {
            // state.songs.push({
            //     code: "new song",
            //     originalTitle: "original title",
            //     title: "this is a nice title"
            // });
            state.searchTerm = 'Asta din persist';

        }
    }
});

export const {addSongSuggestion} = songAutosuggestionSlice.actions
export default songAutosuggestionSlice.reducer;
