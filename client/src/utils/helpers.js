export const getUserName = (name) => {
    if (!name) return
    const temp = name.split(" ")
    return temp[1] ? `${temp[0].substr(0, 1)}${temp[1].substr(0, 1)}` : temp[0].substr(0, 1)
}

export const storeDataLS = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export const getDataLS = (key) => JSON.parse(localStorage.getItem(key)) || []

export const parseToken = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]))
    } catch (err) {
        return null
    }
}

const stringToColor = (string) => {
    if (!string) return 
    let hash = 0
    let i
    let color = '#'

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.substr(-2)
    }
    return color
}

export const randomColorAvatar = (name) => {
    if (!name) return
    
    let children
    if (!name.split(' ')[1]) {
        children = name.split(' ')[0][0]
    } else {
        children = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }

    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 38,
            height: 38,
            fontSize: "14px"
        },
        children: children,
    }
}