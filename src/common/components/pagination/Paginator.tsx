import React from 'react';
import {Pagination, Stack} from '@mui/material';
import Box from '@mui/material/Box';
import {useAppSelector} from "../../hooks/useAppSelector";

type PaginatorPropsType = {
    page: number
    totalCount: number
    rowsPerPage: number
    changePage: (newPage: number) => void
    changeRowsPerPage: (rowsPerPage: number) => void
    width:number
}

export const Paginator = (props: PaginatorPropsType) => {

    const status = useAppSelector(state=>state.app.status)
    const isLoading = status === "loading"
    const pageCount = Math.ceil(props.totalCount / props.rowsPerPage)
    const adaptiveSize = props.width < 991 ? "small" : "large"
    return (
        <>
            {
                props.totalCount > 10 &&
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}} maxWidth="md">
                    <Stack spacing={1}>

                        {pageCount > 1 && <Pagination
                            disabled={isLoading}
                            sx={{marginY: 3}}
                            page={props.page}
                            count={pageCount}
                            showFirstButton
                            showLastButton
                            hideNextButton
                            hidePrevButton
                            onChange={(_, page) => props.changePage(page)}
                            size={adaptiveSize}
                        />}
                    </Stack>

                    <div>
                        {props.width > 991 && "Show"}
                        {props.width > 991 &&  <select style={{marginLeft: 10, marginRight: 10}}
                                value={props.rowsPerPage}
                                onChange={(event) => props.changeRowsPerPage(parseInt(event.target.value))}
                                name="RowPerPage" id="RowPerPageID">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>}
                        {props.width > 991 && " Rows per page"}
                    </div>

                </Box>

            }
        </>
    )

};
