import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {PaginatedResultType} from "src/types/PaginatedResultType";
import {SongType} from "src/types/SongType";
import React from "react";
import {Paper} from "@mui/material";
import {useAppDispatch} from "src/hooks/reduxHooks";
import {setPageFilter, setPageSizeFilter} from "src/store/song/songAdvancedFiltersSlice";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {join, map} from "lodash";

interface SongsListViewProps {
    data: PaginatedResultType<SongType>,
    loading: boolean
}

const SongsListView = ({data: {content: songs, numberOfElements}, loading}: SongsListViewProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const columns: GridColDef[] = [
        {
            field: "title",
            headerName: t('pages.songs.common.title'),
            minWidth: 200,
            sortable: false,
            filterable: false
        },
        {
            field: "composers",
            headerName: t('pages.songs.common.composers'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.composers, 'name'), ', '))
        },
        {
            field: "arrangers",
            headerName: t('pages.songs.common.arrangers'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.arrangers, 'name'), ', '))
        },
        {
            field: "orchestrators",
            headerName: t('pages.songs.common.orchestrators'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.orchestrators, 'name'), ', '))
        },
        {
            field: "topics",
            headerName: t('pages.songs.common.topics'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.topics, 'title'), ', '))
        },
        {
            field: "instruments",
            headerName: t('pages.songs.common.instruments'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.instruments, 'title'), ', '))
        },
        {
            field: "publishDate",
            headerName: t('pages.songs.common.publishDate'),
            minWidth: 200,
            sortable: false,
            filterable: false
        }
    ];

    return (
        <Paper style={{height: 600, width: '100%'}}>
            <DataGrid rows={songs || []}
                      columns={columns}
                      loading={loading}
                      rowCount={numberOfElements}
                      paginationMode="server"
                      onRowClick={(params => navigate(`/songs/${params.row.code}`))}
                      onPageChange={(page) => dispatch(setPageFilter(page - 1))}
                      onPageSizeChange={(pageSize) => dispatch(setPageSizeFilter(pageSize))}/>
        </Paper>
    );
};

export default SongsListView;