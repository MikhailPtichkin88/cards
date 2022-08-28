import React from 'react';
import styles from './CardsSlider.module.css';
import {Slider} from "@mui/material";

export const CardsSlider = () => {

    const [value, setValue] = React.useState<number[]>([5, 10]);

    const valuetext = (value: number) => {
        return `${value} cards to show`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Number of cards</h4>
            <div className={styles.sliderWrapper}>
                <div className={styles.sliderStartValue}>{value[0]}</div>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    min={1} max={20}
                    style={{width:"200px"}}
                />
                <div className={styles.sliderEndValue}>{value[1]}</div>
            </div>
        </div>
    );
};

