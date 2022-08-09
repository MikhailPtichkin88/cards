import style from './page404.module.css';
import {NavLink} from 'react-router-dom';

export const Page404 = () => {
    return (
        <div className={style.mainbox}>
            <div className={style.err}>4</div>
            <div className={style.far}>
                <i className="far fa-question-circle fa-spin"/>
            </div>
            <div className={style.err2}>4</div>
            <div className={style.msg}>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in
                the
                first place?
                <p>Let's go <NavLink to={'/'}>home</NavLink> and try from there.</p>
            </div>
        </div>
    )
};
