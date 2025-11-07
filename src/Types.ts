type TProduct = {
    name: string,
    description: string,
    price: number,
    img: string,
    stock: number,
    _id: string
}

type TCartEntry = { productId: string, quantity: number }

type TCart = TCartEntry[]

type TUser = {
    username: string,
    email: string,
    loyaltyPoints: number,
    isAdminstartor: number
}

export type { TProduct , TCartEntry , TCart , TUser}