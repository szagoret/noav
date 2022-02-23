import {baseApiService} from "src/services/baseApiService";
import {SongFileType} from "src/types/SongFileType";

export const songFileApiService = baseApiService.injectEndpoints({
    endpoints: (build) => ({
        getFilesBySongCode: build.query<SongFileType[], string>({
            query: (songCode) => ({
                url: `/song/${songCode}/files`
            }),
            providesTags: ['SongFiles']
        }),
        saveSongFile: build.mutation({
            async queryFn(args, api, options, baseQuery) {
                await Promise.all(args.files.map(async (file: File) => {
                    const data = new FormData();
                    data.append('file', file);
                    await baseQuery({
                        url: `/song/${args.songCode}/files`,
                        method: 'PUT',
                        body: data
                    });
                }));
                return {data: {}}
            },
            invalidatesTags: ['SongFiles']
        }),
        makeSongFilePrimary: build.mutation<void, { songCode: string, fileCode: string, isPrimary: boolean }>({
            query: ({songCode, fileCode, isPrimary}) => ({
                url: `/song/${songCode}/files/${fileCode}/primary`,
                method: 'POST',
                params: {isPrimary},
                body: {}
            }),
            invalidatesTags: ['SongFiles', 'Songs']
        }),
        createFileThumbnail: build.mutation<void, { songCode: string, fileCode: string }>({
            query: ({songCode, fileCode}) => ({
                url: `/song/${songCode}/files/${fileCode}/thumbs`,
                method: 'POST'
            }),
            invalidatesTags: ['SongFiles', 'Songs']
        }),
        deleteSongFile: build.mutation<void, { songCode: string, fileCode: string }>({
            query: ({songCode, fileCode}) => ({
                url: `/song/${songCode}/files/${fileCode}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SongFiles', 'Songs']
        })
    }),
    overrideExisting: false
});

export const {
    useGetFilesBySongCodeQuery,
    useSaveSongFileMutation,
    useMakeSongFilePrimaryMutation,
    useCreateFileThumbnailMutation,
    useDeleteSongFileMutation
} = songFileApiService;