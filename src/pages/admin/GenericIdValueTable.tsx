import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface IdDrivenItem {
    id?: string
}

interface PropsTypes<T> {
    items: T[],
    getValue: (item: T) => string,
    handleEditItem: (item: T) => void
    handleDeleteItem: (item: T) => void
}

const GenericIdValueTable = <T extends IdDrivenItem>({
                                                         items,
                                                         getValue,
                                                         handleEditItem,
                                                         handleDeleteItem
                                                     }: PropsTypes<T>) => {
    return (

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
                        <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell>{getValue(row)}</TableCell>
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
    );
}

export default GenericIdValueTable;