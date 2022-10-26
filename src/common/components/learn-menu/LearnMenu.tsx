import * as React from 'react';
import styles from "./LearnMenu.module.css";
import {DeleteModal} from "../modals/delete-modal/DeleteModal";
import {changePackNameTC, deletePackTC} from "../../../features/packs-list/packs-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {EditAddModalPack} from "../../../features/packs-list/edit-add-modal-pack/EditAddModalPack";
import edit from "../../../assets/images/cardPackBtns/edit.svg";
import deleteImg from "../../../assets/images/cardPackBtns/delete.svg";
import study from "../../../assets/images/cardPackBtns/study.svg";
import {useNavigate} from "react-router-dom";
import {routePath} from "../../constants/routePath";
import {useAppSelector} from "../../hooks/useAppSelector";
import Paper from "@mui/material/Paper/Paper";
import {Tooltip, Zoom} from "@mui/material";

type KebabLearnMenuPropsType = {
    packId: string | null | undefined
    packName: string
}

export const LearnMenu = (props: KebabLearnMenuPropsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const title = useAppSelector(state => state.packs.packs.cardPacks.find(pack => pack._id === props.packId))
    const titleName = title ? title.name : props.packName

    const redirectToStudy = () => {
        if (props.packId) {
            return navigate(routePath.cards.learn + props.packId)
        }
    }

    const changePackName = (name: string) => {
        if (props.packId) {
            dispatch(changePackNameTC({_id: props.packId, name}))
        }
    }

    const deletePack = () => {
        if (props.packId) {
            dispatch(deletePackTC(props.packId))
        }
    }

    return (
        <Paper className={styles.wrapper}>
            <Tooltip title="Start learning" TransitionComponent={Zoom} arrow>
                <button onClick={redirectToStudy} className={styles.btn}
                        style={{backgroundImage: `url(${study})`}}/>
            </Tooltip>

            <EditAddModalPack title="Edit pack"
                              name={titleName}
                              saveCallback={changePackName}
                              childrenDiv={<Tooltip title="Edit cards pack" TransitionComponent={Zoom} arrow>
                                  <button className={styles.btn}
                                          style={{backgroundImage: `url(${edit})`}}/>
                              </Tooltip>}/>

            <DeleteModal title="Delete Pack"
                         name={titleName}
                         deleteCallback={deletePack}
                         childrenDiv={<Tooltip title="Delete this pack" TransitionComponent={Zoom} arrow>
                             <button className={styles.btn}
                                     style={{backgroundImage: `url(${deleteImg})`}}/>
                         </Tooltip>}/>

        </Paper>
    );
}