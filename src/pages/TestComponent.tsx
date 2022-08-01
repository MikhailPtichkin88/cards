import React from 'react';
import {Checkbox} from "../components/Checkbox/Checkbox";
import {Button} from "../components/Button/Button";
import {InputText} from "../components/InputText/inputText";

export const TestComponent = () => {
    return (
        <div>
            <Checkbox/>
            <Button >
                ADD
            </Button>
            <InputText/>
        </div>
    );
};

