import React from 'react';
import {Pagination, Stack} from "@mui/material";
import Box from "@mui/material/Box";

type PaginatorPropsType = {
    page: number
    totalCount: number
    rowsPerPage: number
    changePage: (newPage: number) => void
    changeRowsPerPage: (rowsPerPage: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
    const pageCount = Math.ceil(props.totalCount / props.rowsPerPage)
    return (
        <Box sx={{display: "flex", alignItems: "center",justifyContent:"space-around"}} maxWidth='md'>
            <Stack spacing={1}>

                {pageCount > 1 && <Pagination
                    sx={{marginY: 3}}
                    page={props.page}
                    count={pageCount}
                    showFirstButton
                    showLastButton
                    hideNextButton
                    hidePrevButton
                    onChange={(_, page) => props.changePage(page)}
                />}
            </Stack>

            <div>
                Show
                <select style={{marginLeft:10,marginRight:10}}
                        value={props.rowsPerPage}
                        onChange={(event)=>props.changeRowsPerPage(parseInt(event.target.value))}
                        name="RowPerPage" id="RowPerPageID">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                Rows per page
            </div>

        </Box>

    )

};
