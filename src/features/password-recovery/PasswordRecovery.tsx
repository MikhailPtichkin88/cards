import React from 'react';
import {useParams} from "react-router-dom";

export const PasswordRecovery = () => {
    const {token} = useParams()
    console.log(token)
    return (
        <div>
            PasswordRecovery
        </div>
    );
};

