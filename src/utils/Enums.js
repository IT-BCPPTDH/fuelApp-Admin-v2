const link = import.meta.env.VITE_LINK_BACKEND;

export const URL_ENUMS ={
    Login : link+'/auth/login',
    masterTimeEntry : link+'/master/timeentry',
    masterTimeEntryOperator : link+'/master/timeentry/operator',
    masterTimeEntryUnit : link+'/master/timeentry/unit',
    postTimeEntrySupport : link+'/timeentry/timeentry-support',
    transactionHoul : link+'/transaction/',
    postCreateTransaction: link+'/transaction/insertTrx'
}
