import axios from "axios";


export const login = (form) => {
    return axios.request({
        url: "/auth/login",
        method: "post",
        data: form,
    })
}

export const logout = () => {
    return axios.request({
        url: "/auth/logout",
        method: "post",
    })
}

export const getAllFleet = () => {
    return axios.request({
        url: "/api/fleets/get-all-fleets",
        method: "get"
    })
}

export const getAllDriverInfo = () => {
    return axios.request({
        url: "/api/driver/get-all-driver-info",
        method: "get",
    })
}

export const getAllStops = () => {
    return axios.request({
        url: "/api/line/get-all-stops",
        method: "get",
    })
}

export const getAllLineInfo = () => {
    return axios.request({
        url: "/api/line/get-all-line-info",
        method: "get",
    })
}

export const getLineByFleetId = (param) => {
    return axios.request(
        {
            url: "/api/line/get-line-by-fleet-id?" + param,
            method: "get",
        }
    )
}

export const getStopsByLineId = (param) => {
    return axios.request(
        {
            url: "/api/line/get-stops-by-line-id?" + param,
            method: "get",
        }
    )
}

export const getAllFleetDetailedInfo = () => {
    return axios.request(
        {
            url: "/api/fleet/get-all-fleet-detailed-info",
            method: "get",
        }
    )
}

export const getAllViolationTypes = () => {
    return axios.request(
        {
            url: "/api/violation/types",
            method: "get",
        }
    )
}

export const getAllBus = () => {
    return axios.request(
        {
            url: "/api/bus/get-all-bus",
            method: "get"
        }
    )
}

export const getLineCaptainByDriverId = (param) => {
    return axios.request({
        url: "/api/driver/get-line-captain-by-driver-id?" + param,
        method: "get",
    })
}

export const getFleetCaptainByDriverId = (param) => {
    return axios.request(({
        url: "/api/driver/get-fleet-captain-by-driver-id?" + param,
        method: "get",
    }))
}

export const getUserInfoByCookie = () => {
    return axios.request(
        {
            url: '/api/user/info',
            method: "get",
        }
    )
}

export const violationByTimeRangeDriverId = (param) => {
    return axios.request({
        url: "/api/violation/violation-by-time-range-driver-id?" + param,
        method: "get",
    })
}

export const violationStatByTimeRangeAndFleetId = (param) => {
    return axios.request({
        url: "/api/violation/violation-stat-by-time-range-and-fleet-id?" + param,
        method: "get",
    })
}

export const getDriverCaptainByLineId = (param) => {
    return axios.request({
        url: "/api/line/get-line-captain-by-line-id?" + param,
        method: "get",
    })
}

export const getFleetMembers = (param) => {
    return axios.request({
        url: "/api/fleet/get-fleet-members?" + param,
        method: "get",
    })
}

export const addDriver = (param) => {
    return axios.request({
        url: "/api/drivers/add-drivers",
        method: "post",
        data: param,
    })
}

export const addStop = (param) => {
    return axios.request({
        url: "/api/line/add-stop",
        method: "post",
        data: param,
    })
}
// special parameter (json)
export const addLine = (param) => {
    return axios.request({
        url: "/api/line/add-new-line",
        method: "post",
        data: param,
        header: {
            'Content-Type': 'application/json'
        }
    })
}

export const addOneBus = (param) => {
    return axios.request({
        url: "/api/bus/add-one-bus",
        method: "post",
        data: param,
    })
}

export const modifyDriverInfo = (param) => {
    return axios.request({
        url: "/api/driver/modify-driver-info",
        method: "post",
        data: param,
    })
}

export const addViolationRecord = (param) => {
    return axios.request({
        url: "/api/violation/add-violation",
        data: param,
        method: "post"
    })
}

export const setFleetCaptain = (param) => {
    return axios.request({
        url: "/api/line/set-fleet-captain",
        data: param,
        method: "post"
    })
}

export const setLineCaptain = (param) => {
    return axios.request({
        url: "/api/line/set-line-captain",
        data: param,
        method: "post"
    })
}

export const updateUserPassword = (param) => {
    return axios.request(
        {
            url: "/api/usr/update-user-password",
            method: 'post',
            data: param
        })
}

export const checkIfLogin = () => {
    return axios.request(
        {
            url: "/api/user/check-if-login",
            method: "get",
        }
    )
}