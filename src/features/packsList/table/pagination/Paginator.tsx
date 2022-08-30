import React, {useState} from 'react';
import {TablePagination} from "@mui/material";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {getPacksTC} from "../../packs-reducer";

type PaginatorPropsType = {
    totalCount:number
    page:number
    pageCount:number
    changePage:(newPage:number)=>void
    changeRowsPerPage:(rowsPerPage:number)=>void
}
export const Paginator = (props:PaginatorPropsType) => {
    const [page,setPage] = useState(0)
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        props.changePage(newPage);
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const rowsPerPage = parseInt(event.target.value, 10)
        props.changeRowsPerPage(rowsPerPage)
    };

    return (
        <TablePagination
            component="div"
            count={props.totalCount}
            page={page}
            rowsPerPage={props.pageCount}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
};
