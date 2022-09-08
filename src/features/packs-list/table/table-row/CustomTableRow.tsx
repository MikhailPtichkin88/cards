import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import styles from '../Table.module.css';
import study from '../../../../assets/images/cardPackBtns/study.svg';
import edit from '../../../../assets/images/cardPackBtns/edit.svg';
import deleteImg from '../../../../assets/images/cardPackBtns/delete.svg';
import {PackType} from '../../packs-api';
import {useNavigate} from 'react-router-dom';
import {routePath} from '../../../../common/constants/routePath';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {changePackNameTC, deletePackTC} from '../../packs-reducer';
import {AddEditModalPack} from '../../modals/add-edit-modal-pack/AddEditModalPack';
import {DeleteModal} from '../../modals/delete-modal/DeleteModal';


type CustomTableRowPropsType = {
    el: PackType
    myID: string
    onClickNameHandler: (packId: string) => void
}

export const CustomTableRow = ({el, myID, onClickNameHandler}: CustomTableRowPropsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const redirectToStudy = () => {
        return navigate(routePath.cards.learn+el._id)
    }
    const changePackName = (name: string) => {
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
                        <AddEditModalPack title="Edit pack"
                                          name={el.name}
                                          saveCallback={changePackName}
                                          childrenDiv={<button className={styles.btn}
                                                               style={{backgroundImage: `url(${edit})`}}/>}
                        />
                        <DeleteModal title="Delete Pack"
                                     name={el.name}
                                     deleteCallback={deletePack}
                                     childrenDiv={<button className={styles.btn}
                                                          style={{backgroundImage: `url(${deleteImg})`}}/>}

                        />
                    </div>
                    :
                    <div className={styles.btnBlock}>
                        <button onClick={redirectToStudy} className={styles.btn}
                                style={{backgroundImage: `url(${study})`}}/>

                    </div>}

            </TableCell>
        </TableRow>
    );
};
