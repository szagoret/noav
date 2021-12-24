import React from 'react';
import {Route, Routes} from "react-router-dom";
import SongsPage from "src/pages/notes/SongsPage";
import DefaultLayout from "src/layout/DefaultLayout";
import SongPage from "src/pages/notes/SongPage";
import SaveSongPage from "src/pages/notes/SaveSongPage";
import Administration from "src/pages/admin/Administration";

const App = () => {


    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<SongsPage/>}/>
                <Route path="songs" element={<SongsPage/>}/>
                <Route path="songs/:songCode" element={<SongPage/>}/>
                <Route path="songs/new" element={<SaveSongPage/>}/>
                <Route path="songs/edit/:songCode" element={<SaveSongPage/>}/>
                <Route path="admin" element={<Administration/>}/>
            </Route>
        </Routes>
    );
};

export default App;
