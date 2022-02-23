import React from 'react';
import {Route, Routes} from "react-router-dom";
import SongsPage from "src/pages/notes/SongsPage";
import DefaultLayout from "src/layout/DefaultLayout";
import SongPage from "src/pages/notes/SongPage";
import SaveSongPage from "src/pages/notes/SaveSongPage";
import Administration from "src/pages/admin/Administration";
import LoginPage from "src/pages/login/LoginPage";
import './i18n/config';
import RequireAuth from "src/components/auth/RequireAuth";
import LoginLayout from "src/layout/LoginLayout";

const App = () => {


    return (
        <Routes>
            <Route path="/login" element={<LoginLayout/>}>
                <Route index element={<LoginPage/>}/>
            </Route>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<SongsPage/>}/>
                <Route path="songs" element={<SongsPage/>}/>
                <Route path="songs/:songCode" element={<SongPage/>}/>
                <Route path="songs/new" element={<RequireAuth redirect><SaveSongPage/></RequireAuth>}/>
                <Route path="songs/edit/:songCode" element={<RequireAuth redirect><SaveSongPage/></RequireAuth>}/>
                <Route path="admin" element={<RequireAuth redirect><Administration/></RequireAuth>}/>
            </Route>
        </Routes>
    );
};

export default App;
