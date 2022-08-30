import React from 'react';
import {TableHead, TableRow} from "@mui/material";
import HeadCell from "./HeadCell/HeadCell";
import {HeadCellType} from "../Table";

export type CustomTableHeadPropsType = {
    headCells: Array<HeadCellType>
    sortCallback: (queryString:string)=>void
}

export const CustomTableHead = ({sortCallback,headCells}: CustomTableHeadPropsType) => {

   return (
        <TableHead style={{backgroundColor:"lightgray"}}>
            <TableRow>
                {headCells.map((headCell) => (
                   <HeadCell sortCallback={sortCallback} headCell={headCell}/>
                ))}
            </TableRow>
         </TableHead>
    );
 };
