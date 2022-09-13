import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import styles from '../../../common/components/table/Table.module.css';
import study from '../../../assets/images/cardPackBtns/study.svg';
import edit from '../../../assets/images/cardPackBtns/edit.svg';
import deleteImg from '../../../assets/images/cardPackBtns/delete.svg';
import {PackType} from '../packs-api';
import {useNavigate} from 'react-router-dom';
import {routePath} from '../../../common/constants/routePath';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {changePackNameTC, deletePackTC} from '../packs-reducer';
import {EditAddModalPack} from '../edit-add-modal-pack/EditAddModalPack';
import {DeleteModal} from '../../../common/components/modals/delete-modal/DeleteModal';


type CustomTableRowPropsType = {
    el: PackType
    myID: string
    onClickNameHandler: (packId: string) => void
}

export const TablePacksBody = ({el, myID, onClickNameHandler}: CustomTableRowPropsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isNoCards = el.cardsCount === 0

    const redirectToStudy = () => {
        return navigate(routePath.cards.learn + el._id)
    }
    const changePackName = (name: string) => {
        dispatch(changePackNameTC({_id: el._id, name}))
    }
    const deletePack = () => {
        dispatch(deletePackTC(el._id))
    }

    const studyBtnClasses = isNoCards ? `${styles.btn} ${styles.btnDisabled}` : `${styles.btn}`
    return (
        <TableRow key={el._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row"
                       onClick={() => onClickNameHandler(el._id)}
                       style={{
                           cursor: 'pointer',
                           maxWidth: '200px',
                           overflowWrap: 'break-word'
                       }}
            >
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    {
                        //Проверка на длинну строки поставил, т.к. в некоторых колодах вместо адреса
                        // или base64 хардкодили текст типа "Some cover" и отображалась битая картинка
                        el.deckCover && el.deckCover.length > 15 &&
                        <img src={el.deckCover} style={{width: "60px", height: "40px", objectFit: "contain"}}/>
                    }
                    {el.name}
                </div>
            </TableCell>
            <TableCell align="left">{el.cardsCount}</TableCell>
            <TableCell align="left">{el.updated.toString()}</TableCell>
            <TableCell align="left">{el.user_name}</TableCell>
            <TableCell align="right">{
                myID === el.user_id
                    ? <div className={styles.btnBlock}>
                        <button onClick={redirectToStudy} disabled={isNoCards} className={studyBtnClasses}
                                style={{backgroundImage: `url(${study})`}}/>
                        <EditAddModalPack title="Edit pack"
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
                        <button onClick={redirectToStudy} disabled={isNoCards} className={studyBtnClasses}
                                style={{backgroundImage: `url(${study})`}}/>

                    </div>}

            </TableCell>
        </TableRow>
    );
};
