import React, {useState} from 'react';
import {TableCell, TableSortLabel} from "@mui/material";
import {HeadCellType} from "../../Table";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {GetSortPacksType} from "../../../packs-api";
import {getPacksTC} from "../../../packs-reducer";

const HeadCell = ({sortPart, title, sortable}: HeadCellType) => {
    const [active, setActive] = useState(false)
    const dispatch = useAppDispatch()
    const [direction, setDirection] = useState(false)

    const getQuerySortString = (): GetSortPacksType  => {
        if (sortPart !== "actions") {
            switch (direction) {
                case true: {
                    return `0${sortPart}`
                }
                case false: {
                    return `1${sortPart}`
                }
                default: return ""
            }
        }
        return ""
    }
    //const sortQueryString:GetSortPacksType = `${direction && direction === "asc" ? 0 : 1}${key}`

    const toggleDirection = () => {
        setDirection(!direction)
        const queryString = getQuerySortString()
        dispatch(getPacksTC({sortPacks:queryString}))
    }
    const onActiveHandler = () => {
        setActive(!active)
    }
    const directionString = direction?"asc":"desc"
    return (
        <TableCell
            key={sortPart}
        >
            {sortable ? <TableSortLabel
                    onClick={toggleDirection}
                    onFocus={onActiveHandler}
                    onBlur={onActiveHandler}
                    active={active}
                    direction={directionString}
                >
                    {title}
                </TableSortLabel>
                : <TableSortLabel>
                    {title}
                </TableSortLabel>}
        </TableCell>
    );
};

export default HeadCell;