import React from 'react';
import {TableBody} from '@mui/material';
import {PackType} from '../../packs-api';
import {CustomTableRow} from "../tableRow/CustomTableRow";

type CustomTableBodyPropsType = {
    elements: Array<PackType>
    myID: string
    onClickNameHandler: (packId: string) => void
}
export const CustomTableBody = ({elements, myID, onClickNameHandler}: CustomTableBodyPropsType) => {

    return (
        <TableBody >
            {elements.map((el) => (
                <CustomTableRow el={el} onClickNameHandler={onClickNameHandler} myID={myID}/>))}

        </TableBody>
    );
};

