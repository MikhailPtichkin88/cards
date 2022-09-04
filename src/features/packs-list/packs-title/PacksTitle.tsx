import React, {useState} from 'react';
import styles from './PacksTitle.module.css';
import Button from '@mui/material/Button/Button';
import common from '../../../common/style/style.module.css'
import {AddEditPackModal} from "../pack-modals/add-edit-pack-modal/AddEditPackModal";
import {ShowModalType} from "../table/table-row/CustomTableRow";

type PacksTitlePropsType = {
    title: string
    btnName: string
    isMy?: boolean
    callback: (name:string) => void
}

export const PacksTitle = ({isMy = true,callback, ...props}: PacksTitlePropsType) => {

    const [openModal, setOpenModal] = useState<ShowModalType>("close")
    const handleOpen = () => setOpenModal("add");
    const handleClose = () => setOpenModal("close");

    return (
        <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{props.title}</h2>
            {isMy &&
                <Button variant="contained"
                        onClick={handleOpen}
                        className={common.btnStyle}
                        sx={{maxWidth: '200px', mt: '0 !important'}}
                >
                    {props.btnName}
                </Button>
            }
            {
                openModal &&  <AddEditPackModal open={openModal}
                                                handleClose={handleClose}
                                                title="Add new pack"
                                                packName="New Pack"
                                                saveCallback={callback}/>
            }
        </div>
    );
};

