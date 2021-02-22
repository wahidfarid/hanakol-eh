export type RestaurantDeal = {
    itemId: number,
    name: string,
    oldPrice: number,
    price: number,
    description: string
}
type RestaurantData ={
    name: string,
    isDiscounted: boolean,
    isDeal: boolean,
    id: number,
    deals?: RestaurantDeal[],
    discount?: {
        percentage: number,
        text: string
    },
    image: string,
    link: string
}
export default RestaurantData;