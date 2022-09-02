import React from 'react';
import {TableCell, TableHead, TableRow} from '@mui/material';
import {HeadCellType} from '../Table';
import {HeadCell} from './HeadCell/HeadCell';

export type CustomTableHeadPropsType = {
    headCells: Array<HeadCellType>
    sortCallback: (queryString: string) => void
    isMy?: boolean
    title?: string
    sortKey?: string
    width?: string
}

export const CustomTableHead = ({width, sortKey, title, isMy, sortCallback, headCells}: CustomTableHeadPropsType) => {

    return (
        <TableHead style={{backgroundColor: 'lightgray'}}>
            <TableRow>
                {headCells.map((headCell) => (
                    <HeadCell sortCallback={sortCallback}
                              headCell={headCell}
                              width={width}
                    />
                ))}
                {isMy &&
                    <TableCell
                        sx={{width: '50px'}}
                        key={sortKey}>
                        {title}
                    </TableCell>}
            </TableRow>
        </TableHead>
    );
};
