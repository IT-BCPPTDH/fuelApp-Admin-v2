// Configuration file

// VITE_BACKEND_URL=http://10.27.240.110:9053
// VITE_LINK_BACKEND_WS=http://10.27.240.110/websocket
// VITE_LINK_BE_USER=http://10.27.240.110:9050
// VITE_BELINK_MASTER_URL=http://10.27.240.110:9051



// URLs from environment variables
const link = import.meta.env.VITE_BACKEND; 
const userLink = import.meta.env.VITE_BE_USER;
const linkSocket = import.meta.env.VITE_SOCKET_USER;
const linkBe = import.meta.env.VITE_API_BASE_URL; 
const linkMasterData = import.meta.env.VITE_MASTER_DATA; 
// Export URL Enums
export const URL_ENUMS = {
    linkWebSocket: linkSocket,
    /**
     * General
     */
    Login: `${link}/auth/login`,
    // Add other general URLs as needed
};

// Export User API URLs
export const URL_USER_API = {
    Auth: `${userLink}/api-user/auth`,
    Logout: `${userLink}/api-user/logout`,
    getallUser: `${userLink}/api-user/get-all`,
    updateUser: `${userLink}/api-user/update-fuel-employee`,
    resetPswd: `${userLink}/api-user/reset-password`,
    getAllRoles: `${userLink}/api-user/get-all-roles`,
    getUserFuels: `${userLink}/api-user/get-user-fuel`,
    createUser: `${userLink}/api-user/add-user-role`,
    delUser :`${userLink}/api-user/delete/`
};

// Export Admin API URLs
export const URL_API = {
    summaryHome: `${linkBe}/api/admin/get-dashboard`,
    getUnitPrev: `${linkBe}/api/operator/get-data/`,
    tableHome: `${linkBe}/api/admin/get-dashboard-table`,
    stationHome: `${linkBe}/api/admin/get-dashboard-station`,
    stationTable:`${linkBe}/api/admin/get-dashboard-table-station`,
    formDashboard: `${linkBe}/api/admin/get-dashboard-data/`,
    formTable:`${linkBe}/api/admin/get-dashboard-table-data/`,
    summaryReq: `${linkBe}/api/admin/get-request-summary/`,
    tableReq:`${linkBe}/api/admin/get-request-table`,
    addData:`${linkBe}/api/admin/add-quota`,
    addTransaction:`${linkBe}/api/operator/post-data`,
    updateTransaction: `${linkBe}/api/admin/update-data`,
    delformData:`${linkBe}/api/admin/delete-data/`,
    unitDatas : `${linkBe}/api/operator/get-data/`,
    insetQuota:`${linkBe}/api/quota-usage/bulk-insert`,
    getQuota : `${linkBe}/api/quota-usage/get-data`,
    updateQuota : `${linkBe}/api/quota-usage/update-data`,
    getActiveQuota : `${linkBe}/api/quota-usage/get-active/`,
    reportsLkf: `${linkBe}/api/admin/download-lkf`,
    reportsDaily: `${linkBe}/api/admin/daily-consumtion`,
    exportHome: `${linkBe}/api/admin/download-station`,
    exportLkf: `${linkBe}/api/admin/download-lkf-excel`,
    exportLkfElipse: `${linkBe}/api/admin/download-lkf-elipse`,
    generateReport: linkBe + "/api/downloads/",
    generateTemplate: linkBe + "/api/upload/template/",
    getDataPrint :`${linkBe}/api/admin/get-print-lkf/`,
    uploadData :`${linkBe}/api/admin/upload`,
    editModel : `${linkBe}/api/quota-usage/edit-model`,
    statusBus :`${linkBe}/api/quota-usage/get-status-bus/`,
    statusLv : `${linkBe}/api/quota-usage/get-status-lv/`,
    statusHlv : `${linkBe}/api/quota-usage/get-status-hlv/`,
    generateImg: linkBe + "/api/img/",
};

export const URL_MASTER_DATA = {
    getAllStation: `${linkMasterData}/master/station`,
    insertStation: `${linkMasterData}/master/station/insert`,
    updateStation: `${linkMasterData}/master/station/edit`,
    delStation:`${linkMasterData}/master/station/delete/`,
    detailStation: `${linkMasterData}/master/station/detail`,
    getAllBanlaws:`${linkMasterData}/master/unit-banlaws`,
    getDetailBanlaws: `${linkMasterData}/master/unit-banlaws/detail/`,
    insertBanlaws:`${linkMasterData}/master/unit-banlaws/insert`,
    updateBanlaws:`${linkMasterData}/master/unit-banlaws/edit`,
    delBanlaws:`${linkMasterData}/master/unit-banlaws/delete/`,
    getMDSonding:`${linkMasterData}/master/sonding-master`,
    delMDSonding: `${linkMasterData}/master/sonding-master/delete/`,
    insertMDSonding:`${linkMasterData}/master/sonding-master/insert`,
    updateMDSonding:`${linkMasterData}/master/sonding-master/edit`,
    getMDElipse:`${linkMasterData}/master/master-elipses`,
    delMDElipse: `${linkMasterData}/master/master-elipses/delete/`,
    insertMDElipse:`${linkMasterData}/master/master-elipses/insert`,
    updateMDElipse:`${linkMasterData}/master/master-elipses/edit`,
    getMDEquip:`${linkMasterData}/master/unit/get-equip`,
    delMDEquip: `${linkMasterData}/master/unit/delete/`,
    insertEquip:`${linkMasterData}/master/unit/insert`,
    updateEquip:`${linkMasterData}/master/unit/edit`
};

// HTTP Status Codes
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

// Status Messages
export const STATUS_MESSAGE = {
    CRED_NOT_FOUND: "No user credentials found for the provided JDE.",
    USER_LOGGEDIN: "User has logged in.",
    SUCCESS_LOGIN: "Login successful",
    ERR_AUTH: "Error authenticating user: ",
    INVALID_JDE: "Invalid JDE or Password",
    SUCCESS_LOGOUT: "User logged out successfully",
    FAILED_LOGOUT: "Failed to logout user",
    ERR_LOGOUT: "Error logging out user:",
    SUCCESS_RESET_PASS: "Password reset successful",
    ERR_RESET_PASS: "Error resetting password:",
    SUCCESS_CREATE_USER: "User created successfully",
    ERR_CREATE_USER: "Failed to create user",
    FAILED_GET_USER: "Failed to retrieve user",
    FAILED_GET_ALL_USER: "Error getting all users:",
    FAILED_PAGINATED_USER: "Error getting users paginated:",
    SUCCESS_UPDATE_USER: "User updated successfully.",
    ERR_UPDATE_USER: "Error updating user:",
    SUCCESS_DEL_USER: "User deleted from database",
    ERR_DEL_USER: "Error deleting user:",
    JDE_REQ: "JDE is required.",
    PASS_REQ: "Password is required.",
    INVALID_CHAR: "Invalid characters. Alphanumeric only."
};
