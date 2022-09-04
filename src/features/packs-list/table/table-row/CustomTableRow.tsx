import React, {useState} from 'react';
import {TableCell, TableRow} from '@mui/material';
import styles from '../Table.module.css';
import study from '../../../../assets/images/cardPackBtns/study.svg';
import edit from '../../../../assets/images/cardPackBtns/edit.svg';
import deleteImg from '../../../../assets/images/cardPackBtns/delete.svg';
import {PackType} from '../../packs-api';
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import {routePath} from '../../../../common/constants/routePath';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {changePackNameTC, deletePackTC} from '../../packs-reducer';
import common from '../../../../common/style/style.module.css';
import {AddEditPackModal} from "../../pack-modals/add-edit-pack-modal/AddEditPackModal";
import {DeletePackModal} from "../../pack-modals/delete-pack-modal/DeletePackModal";

export type ShowModalType = "close" | "edit" | "add" | "delete"

type CustomTableRowPropsType = {
    el: PackType
    myID: string
    onClickNameHandler: (packId: string) => void
}

export const CustomTableRow = ({el, myID, onClickNameHandler}: CustomTableRowPropsType) => {
    const [openModal, setOpenModal] = useState<ShowModalType>("close")
    const handleOpenEdit = () => setOpenModal("edit");
    const handleOpenDelete = () => setOpenModal("delete");
    const handleClose = () => setOpenModal("close");

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const redirectToStudy = () => {
        return navigate(routePath.cards.learnCards)
    }
    const changePackName = (name:string) => {
        dispatch(changePackNameTC({_id: el._id, name}))
    }
    const deletePack = () => {
        dispatch(deletePackTC(el._id))
    }
    return (
        <TableRow key={el._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row"
                       onClick={() => onClickNameHandler(el._id)}
                       style={{cursor: 'pointer', maxWidth: '200px', overflowWrap: 'break-word'}}
            >
                {el.name}
            </TableCell>
            <TableCell align="left">{el.cardsCount}</TableCell>
            <TableCell align="left">{el.updated.toString()}</TableCell>
            <TableCell align="left">{el.user_name}</TableCell>
            <TableCell align="left">{
                myID === el.user_id
                    ? <div className={styles.btnBlock}>
                        <button onClick={redirectToStudy} className={styles.btn}
                                style={{backgroundImage: `url(${study})`}}/>
                        <button onClick={handleOpenEdit} className={styles.btn} style={{backgroundImage: `url(${edit})`}}/>
                        <button onClick={handleOpenDelete} className={styles.btn} style={{backgroundImage: `url(${deleteImg})`}}/>
                        {
                            openModal==="edit" && <AddEditPackModal open={openModal}
                                              handleClose={handleClose}
                                              title="Edit pack"
                                              packName={el.name}
                                              saveCallback={changePackName}/>
                        }
                        {
                            openModal==="delete" && <DeletePackModal open={openModal==="delete"}
                                                                    handleClose={handleClose}
                                                                    title="Delete Pack"
                                                                    packName={el.name}
                                                                    deleteCallback={deletePack}/>
                        }

                    </div>
                    :
                    <div className={styles.btnBlock}>
                        <button onClick={redirectToStudy} className={styles.btn}
                                style={{backgroundImage: `url(${study})`}}/>

                    </div>}
                :
            </TableCell>
        </TableRow>
    );
};
