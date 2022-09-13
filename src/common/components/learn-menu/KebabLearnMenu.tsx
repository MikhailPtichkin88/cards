import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from "../table/Table.module.css";
import styles1 from '../../../common/components/table/Table.module.css';
import edit from "../../../assets/images/cardPackBtns/edit.svg";
import {DeleteModal} from "../modals/delete-modal/DeleteModal";
import deleteImg from "../../../assets/images/cardPackBtns/delete.svg";
import {changePackNameTC, deletePackTC} from "../../../features/packs-list/packs-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {EditAddModalPack} from "../../../features/packs-list/edit-add-modal-pack/EditAddModalPack";
import study from "../../../assets/images/cardPackBtns/study.svg";
import {useNavigate} from "react-router-dom";
import {routePath} from "../../constants/routePath";
import {useAppSelector} from "../../hooks/useAppSelector";

type KebabLearnMenuPropsType = {
    packId: string | null | undefined
    packName: string
}

export const KebabLearnMenu = (props: KebabLearnMenuPropsType) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const title = useAppSelector(state => state.packs.packs.cardPacks.find(pack => pack._id === props.packId))
    const titleName = title ? title.name : props.packName

    const redirectToStudy = () => {
        if (props.packId) {
            return navigate(routePath.cards.learn + props.packId)
        }
        setAnchorEl(null);
    }

    const changePackName = (name: string) => {
        if (props.packId) {
            dispatch(changePackNameTC({_id: props.packId, name}))
        }
        setAnchorEl(null);
    }

    const deletePack = () => {
        if (props.packId) {
            dispatch(deletePackTC(props.packId))
        }
        setAnchorEl(null);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{marginRight: "auto"}}>
            <IconButton
                aria-label="more"
                id="long-button"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>
                    <button onClick={redirectToStudy} className={styles1.btn}
                            style={{backgroundImage: `url(${study})`, minHeight:'20px', marginRight:"10px"}}/>
                    Learn
                </MenuItem>
                <MenuItem>
                    <EditAddModalPack title="Edit pack"
                                      name={titleName}
                                      saveCallback={changePackName}
                                      childrenDiv={<button className={styles.btn}
                                                           style={{backgroundImage: `url(${edit})`,marginRight:"10px"}}/>}
                    />
                    Edit
                </MenuItem>
                <MenuItem>
                    <DeleteModal title="Delete Pack"
                                 name={titleName}
                                 deleteCallback={deletePack}
                                 childrenDiv={<button className={styles.btn}
                                                      style={{backgroundImage: `url(${deleteImg})`,marginRight:"10px"}}/>}
                    />
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}