const link = import.meta.env.VITE_LINK_BACKEND;

export const URL_ENUMS ={
    Login : link+'/auth/login',
    masterActivity : link+'/master/activity',
    masterTimeEntryOperator : link+'/master/operator',
    masterTimeEntryUnit : link+'/master/unit',
    postTimeEntrySupport : link+'/timeentry/timeentry-support',
    transactionHoul : link+'/transaction/',
    postCreateTransaction: link+'/transaction/insertTrx',
    getEditData : link+'/transaction/getOne/',
    getDeteleData : link+'/transaction/',
    cardDataTotal : link+'/transaction/total/',
    cardDataHopper: link+'/transaction/hopper',
    cardDataOverflow : link+'/transaction/overflow',
    cardDataECF : link+'/transaction/ecf',
    cardDataMiddleStcok : link+'/transaction/midlestock',
    cardDataSekurau : link+'/transaction/sekurau'
}
