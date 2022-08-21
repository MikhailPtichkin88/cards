import React from 'react';
import {Checkbox} from "../common/components/checkbox/Checkbox";
import {Button} from "../common/components/button/Button";
import {InputText} from "../common/components/input-text/inputText";

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

