import { fileURLToPath } from 'url'
import { dirname } from 'path'

import bcrypt from 'bcrypt'

import { faker } from "@faker-js/faker"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)


export default __dirname 


export const generateProduct = () => {

    return {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.productAdjective(),
        available: faker.datatype.boolean(0.5)
    }
}