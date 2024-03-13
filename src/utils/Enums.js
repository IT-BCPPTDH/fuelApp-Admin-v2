const link = import.meta.env.VITE_LINK_BACKEND;
const userLink = import.meta.env.VITE_LINK_BE_USER;

export const URL_ENUMS ={
    Login : link+'/auth/login',
    masterActivity : link+'/master/activity',
    masterTimeEntryOperator : link+'/master/operator',
    masterTimeEntryUnit : link+'/master/unit',
    postTimeEntrySupport : link+'/timeentry/timeentry-post',
    transactionHoul : link+'/transaction/',
    patchEditData : link+'/transaction/editTrx/',
    getDownload : link+'/transaction/download/',
    downloadFile : link+'/downloads/',
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
    getAllTimeEntryData: link+'/timeentry/get-all',
    getTimeEntryDetailData: link+'/timeentry/get-detail/'
}

export const URL_USER_API = {
    Auth : `${userLink}/api-user/auth`,
    Logout: `${userLink}/api-user/logout` 
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

export const HTTP_STATUS = {
    OK: "200",
    CREATED: "201",
    NO_CONTENT: "204",
    BAD_REQUEST: "400",
    UNAUTHORIZED: "401",
    FORBIDDEN: "403",
    NOT_FOUND: "404",
    METHOD_NOT_ALLOWED: "405",
    INTERNAL_SERVER_ERROR: "500",
    SERVICE_UNAVAILABLE: "503",
};

export const STATUS_MESSAGE = {
    CRED_NOT_FOUND : "No user credentials found for the provided JDE.",
    USER_LOGGEDIN : "User has logged in.",
    SUCCESS_LOGIN: "Login successfull",
    ERR_AUTH: "Error authenticating user: ",
    INVALID_JDE: "Invalid JDE or Password",
    SUCCESS_LOGOUT: "User logged out successfully",
    FAILED_LOGOUT: "Failed to logout user",
    ERR_LOGOUT: "Error logging out user:",
    SUCCESS_RESET_PASS: "Password reset successful",
    ERR_RESET_PASS: "Error resetting password:",
    SUCCESS_CREATE_USER: "User Created Successfully",
    ERR_CREATE_USER: "Failed to create user",
    FAILED_GET_USER: "Failed to retrieve user",
    FAILED_GET_ALL_USER: "Error getting all users:",
    FAILED_PAGINATED_USER: "Error getting users paginated:",
    SUCCESS_UPDATE_USER : "User updated successfully.",
    ERR_UPDATE_USER: "Error updating user:",
    SUCCESS_DEL_USER: "User deleted from database",
    ERR_DEL_USER: "Deleting user error: ",
    JDE_REQ : "JDE is required.",
    PASS_REQ : "Password is required.",
    INVALID_CHAR: "Invalid characters. Alphanumeric only."
}