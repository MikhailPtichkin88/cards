import React, {useState} from 'react';
import styles from './OwnerSwitcher.module.css';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

export const OwnerSwitcher = () => {

    const [isAllCards, setIsAllCards] = useState("all")

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setIsAllCards(newAlignment);
    };

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Show packs cards</h4>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={isAllCards}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton style={{padding: "5px 40px"}} value="my">My</ToggleButton>
                <ToggleButton style={{padding: "5px 40px"}} value="all">All</ToggleButton>

            </ToggleButtonGroup>
        </div>
    );
};

