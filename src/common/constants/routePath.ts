export const routePath={
    profile:{
        main:"/profile",
    },
    auth:{
        login:"/login",
        passRecovery:"/password-recovery",
        signUp:"/signup",
        newPass:"/set-new-password/:token",
    },
    error:{
        notFound:"*"
    },
    cards: {
        packList: "/pack-list",
        newPack: "/new-pack",
        card: '/cards/:id',
        learnCards: '/learn-cards'
    },
    tests:{
        test:"/test"
    }
}