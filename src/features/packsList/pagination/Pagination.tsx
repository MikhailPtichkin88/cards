import React from 'react';
import {TablePagination} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {PaginationActions} from "./PaginationActions";

type PaginationType = {
    rows: number
}

export const Pagination = (props: PaginationType) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const rows = props.rows
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
            colSpan={3}
            count={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
                inputProps: {
                    'aria-label': 'rows per page',
                },
                native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={PaginationActions}
        />
    );
};

