import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import styles from '../Table.module.css';
import study from '../../../../assets/images/cardPackBtns/study.svg';
import edit from '../../../../assets/images/cardPackBtns/edit.svg';
import deleteImg from '../../../../assets/images/cardPackBtns/delete.svg';
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

