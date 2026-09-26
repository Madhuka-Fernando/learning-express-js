import {generateSecret, generateURI, verify} from "otplib"

// Store user secrets temporarily in memory
const userData: { [index: string]: any } = {}

// Generates a new 2FA secret and its corresponding authenticator URI
const getAuthURL = (userId: string) => {
    const secret = generateSecret({length: 20})
    console.log(secret)
    userData[userId] = secret

    const authURI = generateURI({issuer: "MM", label: "SK", secret})
    console.log(authURI)

    return authURI

}

// Validates the provided 6-digit code against the user's stored secret
const verifyToken = (code: string, userId: string) => {
    return verify({
        token: code,
        secret: userData[userId],
    })
}

export default {
    getAuthURL,
    verifyToken,
}