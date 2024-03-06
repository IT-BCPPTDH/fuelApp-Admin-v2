const link = import.meta.env.VITE_LINK_BACKEND;

export const URL_ENUMS ={
    Login : link+'/auth/login',
    masterActivity : link+'/master/activity',
    masterTimeEntryOperator : link+'/master/operator',
    masterTimeEntryUnit : link+'/master/unit',
    postTimeEntrySupport : link+'/timeentry/timeentry-post',
    transactionHoul : link+'/transaction/',
    patchEditData : link+'/transaction/editTrx/',
    getDownload : link+'/transaction/download/',
    postCreateTransaction: link+'/transaction/insertTrx',
    getEditData : link+'/transaction/getOne/',
    getDeteleData : link+'/transaction/',
    cardDataTotal : link+'/transaction/total/',
    dataMain : link+'/transaction/main/',
    ping : link+'/transaction/ping',
    cardDataHopper: link+'/transaction/hopper/',
    cardDataOverflow : link+'/transaction/overflow/',
    cardDataECF : link+'/transaction/ecf/',
    cardDataMiddleStcok : link+'/transaction/midlestock/',
    cardDataSekurau : link+'/transaction/sekurau/',
    getDataMines : link+'/timeentrymines/',
    getDataFMS : link+'/timeentryfms/',
}

export const dumpingEnum = {
    HOPPER: "MAIN COAL FACILITY ( HOPPER)",
    OVERFLOW: "STOCK PILE / OVERFLOW ( ROM MF)",
    ECF: "STOCK PILE / EARLY COAL FACILITY (ROM ECF)",
    MIDDLE: "MIDLE STOCK PILE",
    SEKURAU: "SEKURAU",
}

export const tabMenuTimeEntryEnum = {
    UNIT_DIGGER: "time-entry-digger-form",
    UNIT_SUPPORT: "time-entry-support-form",
    UNIT_HAULER: "time-entry-hauler-form"
}
