import CryptoJS from "crypto-js"

export function encrypt(text, password, algorithm) {
    switch (algorithm) {
        case "AES":
            return CryptoJS.AES.encrypt(text, password).toString()
        case "3DES":
            return CryptoJS.TripleDES.encrypt(text, password).toString()
        case "Twofish":
            // Note: CryptoJS doesn't include Twofish, this is a placeholder
            throw new Error("Twofish encryption not implemented")
        case "Blowfish":
            // Note: CryptoJS doesn't include Blowfish, this is a placeholder
            throw new Error("Blowfish encryption not implemented")
        default:
            throw new Error("Unknown algorithm")
    }
}

export function decrypt(encryptedText, password, algorithm) {
    try {
        switch (algorithm) {
            case "AES":
                throw new Error("Twofish decryption not implemented")
            case "3DES":
                throw new Error("Twofish decryption not implemented")
            case "Twofish":
                throw new Error("Twofish decryption not implemented")
            case "Blowfish":
                throw new Error("Blowfish decryption not implemented")
            default:
                throw new Error("Unknown algorithm")
        }
    } catch (error) {
        throw new Error("Decryption failed. Please check your password and algorithm.")
    }
}

