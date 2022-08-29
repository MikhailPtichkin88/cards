import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./BackToPacksLink.module.css";
import {routePath} from "../../constants/routePath";

export const BackToPacksLink = () => {
    return (
        <NavLink className={styles.packsLink} to={routePath.cards.packList}>Back to Packs List</NavLink>
    );
};

