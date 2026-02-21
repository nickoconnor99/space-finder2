import { JsonError } from "./Validator"
import { randomUUID } from "crypto"

export function createRandomId() {
    return randomUUID()
}


export function parseJSON(arg: string) {
    try {
        return JSON.parse(arg)
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        throw new JsonError(message)
    }

}