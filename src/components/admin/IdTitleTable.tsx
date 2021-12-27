import {
    Button,
    IconButton,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {IdTitleType} from "src/types/IdTitleType";

interface IdTitleTablePropsTypes {
    items: IdTitleType[],
    loading: boolean,
    handleEditItem: (item: IdTitleType) => void
    handleDeleteItem: (item: IdTitleType) => void
}

const IdTitleTable = ({items, loading, handleEditItem, handleDeleteItem}: IdTitleTablePropsTypes) => {

    return (
        <Paper sx={{
            width: '100%',
            overflow: 'hidden'
        }}>
            <Button
                variant={'text'}
                size="small"
                // onClick={() => handleEditItem({})}
                endIcon={<AddIcon/>}
            >
                Add
            </Button>
            {loading && <LinearProgress/>}
            <TableContainer sx={{maxHeight: 600}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align={'right'}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, i) => (
                            <TableRow key={i} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell>{row.title}</TableCell>
                                <TableCell align={'right'}>
                                    <IconButton aria-label="edit">
                                        <EditIcon color={'info'} onClick={() => handleEditItem(row)}/>
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon color={'error'} onClick={() => handleDeleteItem(row)}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default IdTitleTable;