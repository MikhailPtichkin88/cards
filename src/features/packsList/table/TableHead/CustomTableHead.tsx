import React from 'react';
import {TableHead, TableRow} from "@mui/material";
import HeadCell from "./HeadCell/HeadCell";
import {HeadCellType} from "../Table";

export type CustomTableHeadPropsType = {
    headCells: Array<HeadCellType>
}

export const CustomTableHead = ({headCells}: CustomTableHeadPropsType) => {

   return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                   <HeadCell {...headCell}/>
                ))}
            </TableRow>
         </TableHead>
    );
 };
