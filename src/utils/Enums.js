const link = import.meta.env.VITE_LINK_BACKEND;

export const URL_ENUMS ={
    Login : link+'/auth/login',
    masterActivity : link+'/master/activity',
    masterTimeEntryOperator : link+'/master/operator',
    masterTimeEntryUnit : link+'/master/unit',
    postTimeEntrySupport : link+'/timeentry/timeentry-support',
    transactionHoul : link+'/transaction/'
}
