
import faker from "faker";
import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducer";

const Cart = createContext();
faker.seed(99);


const Context = ({ children }) => {

    // const getPostApi = () => {
    //     fetch(' http://localhost:3004/products')
    //         .then(response => response.json())
    //         .then(json =>
    //             this.setState({
    //                 post: json
    //             })
    //         )
    // }



    const product = [...Array(25)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.random.image(),
        inStock: faker.random.arrayElement([0, 3, 5, 7, 9]),
        fastDelivery: faker.datatype.boolean(),
        rattings: faker.random.arrayElement([1, 2, 3, 4, 5])
    }));


    const [state, dispatch] = useReducer(cartReducer, {
        product: product,
        cart: []
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    });


    return (
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cart.Provider>
    )
};

export default Context;

export const CartState = () => {
    return useContext(Cart);
}