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
    data?: PaginatedResultType<SongType>,
    loading: boolean
}

const SongsListView = ({data, loading}: SongsListViewProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const columns: GridColDef[] = [
        {
            field: "title",
            headerName: t('pages.songs.common.title'),
            minWidth: 300,
            sortable: false,
            filterable: false,
            disableColumnMenu: true
        },
        {
            field: "composers",
            headerName: t('pages.songs.common.composers'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.composers, 'name'), ', ')),
            disableColumnMenu: true
        },
        {
            field: "arrangers",
            headerName: t('pages.songs.common.arrangers'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.arrangers, 'name'), ', ')),
            disableColumnMenu: true
        },
        {
            field: "orchestrators",
            headerName: t('pages.songs.common.orchestrators'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.orchestrators, 'name'), ', ')),
            disableColumnMenu: true
        },
        {
            field: "topics",
            headerName: t('pages.songs.common.topics'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.topics, 'title'), ', ')),
            disableColumnMenu: true
        },
        {
            field: "instruments",
            headerName: t('pages.songs.common.instruments'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            valueGetter: (({row}) => join(map(row.instruments, 'title'), ', ')),
            disableColumnMenu: true
        },
        {
            field: "publishDate",
            headerName: t('pages.songs.common.publishDate'),
            minWidth: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true
        }
    ];

    return (
        <Paper style={{height: 600, width: '100%'}}>
            <DataGrid rows={data?.content || []}
                      columns={columns}
                      loading={loading}
                      rowCount={data?.numberOfElements}
                      paginationMode="server"
                      onRowClick={(params => navigate(`/songs/${params.row.code}`))}
                      onPageChange={(page) => dispatch(setPageFilter(page - 1))}
                      onPageSizeChange={(pageSize) => dispatch(setPageSizeFilter(pageSize))}/>
        </Paper>
    );
};

export default SongsListView;