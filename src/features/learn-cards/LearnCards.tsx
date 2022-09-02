import React from 'react';
import {routePath} from "../../common/constants/routePath";
import {Navigate, useNavigate} from "react-router-dom";

export const LearnCards = () => {
    const navigate = useNavigate()
    const onClickHandler = ()=>{
       navigate(routePath.cards.packList)
    }
    return (
        <div>
            <div>Do you wanna learn that? Aww... Just wait</div>
            <button onClick={onClickHandler}>go to packs</button>
        </div>
    );
};

