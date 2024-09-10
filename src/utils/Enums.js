// Configuration file

// URLs from environment variables
const link = import.meta.env.VITE_BACKEND; // Use correct env variable
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
    updateUser: `${userLink}/api-user/update-data`,
    resetPswd: `${userLink}/api-user/reset-password`,
    getAllRoles: `${userLink}/api-user/get-all-roles`,
};

// Export Admin API URLs
export const URL_API = {
    summaryHome: `${linkBe}/api/admin/get-dashboard`,
    tableHome: `${linkBe}/api/admin/get-dashboard-table`,
    stationHome: `${linkBe}/api/admin/get-dashboard-station`,
    stationTable:`${linkBe}/api/admin/get-dashboard-table-station`,
    formDashboard: `${linkBe}/api/admin/get-dashboard-data/`,
    formTable:`${linkBe}/api/admin/get-dashboard-table-data/`,
    summaryReq: `${linkBe}/api/admin/get-request-summary`,
    tableReq:`${linkBe}/api/admin/get-request-table`,
    addData:`${linkBe}/api/admin/add-quota`,
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
