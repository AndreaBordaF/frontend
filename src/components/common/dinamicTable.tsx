import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses} from '@mui/material';

interface TableProps<T> {
    data: T[];
    columns: {
        label: string;
        key: keyof T;
        align?: "left" | "center" | "right";
        render?: (value: T[keyof T], row: T) => React.ReactNode;
    }[];
    actionColumn?: {
        label: string;
        render: (row: T) => React.ReactNode;
    };
}

const StyleCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0F2634",
        color: theme.palette.common.white,
        border: 0,
      },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
}));

const StyleRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#F3F3F3",
        color: theme.palette.common.black,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function DinamicTable<T extends {}>({data, columns, actionColumn}: TableProps<T>){
    return(
        <TableContainer
            component={Paper}
            sx={{
              maxHeight: '72vh',
              overflow: 'auto',
            }}
        >
            <Table stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyleCell key={column.label} align={column.align || "left"}>{column.label}</StyleCell>
                        ))}
                        {actionColumn && (
                            <StyleCell>{actionColumn.label}</StyleCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <StyleRow key={rowIndex}>
                            {columns.map((column) => (
                                <StyleCell key={column.key as string} align={column.align || "left"}>
                                    {column.render 
                                        ? column.render(row[column.key], row) 
                                        : (row[column.key] as React.ReactNode)}
                                </StyleCell>
                            ))}
                            {actionColumn && (
                                <TableCell>
                                    {actionColumn.render(row)}
                                </TableCell>
                            )}
                        </StyleRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    )
}   
