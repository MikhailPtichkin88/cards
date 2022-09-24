import React, {useState} from 'react';
import {TableCell, TableSortLabel} from '@mui/material';
import {HeadCellType} from '../../../../../features/packs-list/table-packs/TablePacks';
import {useAppSelector} from '../../../../hooks/useAppSelector';

type HeadCellPropsType = {
    sortCallback?: (queryString: string) => void
    headCell: HeadCellType
    width?: string
}
export const HeadCell = ({width, headCell, sortCallback}: HeadCellPropsType) => {
    const {sortKey, title, sortable} = headCell
    const [active, setActive] = useState(false)
    const [direction, setDirection] = useState(false)

    const status = useAppSelector(state => state.app.status)
    const isLoading = status === 'loading'

    const toggleDirection = () => {
        setDirection(!direction)
        sortCallback && sortCallback(`${direction ? '0' : '1'}${sortKey}`)
    }
    const onActiveHandler = () => {
        setActive(!active)
    }
    const directionString = direction ? 'asc' : 'desc'
    const alignCenter = (title==="Actions" || title==="Created by")  ? "center" : "left"

    return (
        <>
            {sortable ? <TableCell key={sortKey} sx={{maxWidth: width, textAlign: `${alignCenter}`}}>
                    <TableSortLabel
                        onClick={toggleDirection}
                        onFocus={onActiveHandler}
                        onBlur={onActiveHandler}
                        active={active}
                        direction={directionString}
                        disabled={isLoading}
                    >
                        {title}
                    </TableSortLabel>
                </TableCell>
                : <TableCell  key={sortKey}  sx={{textAlign: `${alignCenter}`}}>{title}</TableCell>}
        </>

    );
};