import { useMemo } from 'react';
import {SongFileType} from "src/types/SongFileType";

export default (file: SongFileType) => useMemo(() => file && ['png', 'jpg', 'jpeg', 'pdf'].includes(file.extension), [file]);