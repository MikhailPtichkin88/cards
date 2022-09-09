import React from 'react';
import {TableBody} from '@mui/material';
import {PackType} from '../../../../features/packs-list/packs-api';
import {TablePacksBody} from '../../../../features/packs-list/table-packs/TablePacksBody';

type CustomTableBodyPropsType = {
    elements: Array<PackType>
    myID: string
    onClickNameHandler: (packId: string) => void
}
export const CustomTableBody = ({elements, myID, onClickNameHandler}: CustomTableBodyPropsType) => {

    return (
        <TableBody>
            {elements.map((el) => (
                <TablePacksBody key={el._id} el={el} onClickNameHandler={onClickNameHandler} myID={myID}/>))}

        </TableBody>
    );
};

