import {Route} from 'react-router-dom';
import {PasswordRecovery} from '../../features/auth/password-recovery/PasswordRecovery';
import React from 'react';

export const routePath = {
    profile: {
        main: '/profile',
    },
    auth: {
        login: '/login',
        passRecovery: '/password-recovery',
        signUp: '/signup',
        newPass: '/set-new-password/:token',
    },
    error: {
        notFound: '*'
    },
    cards: {
        packList: '/pack-list',
        card: '/cards/:id'
    },
    tests: {
        test: '/test'
    }
}