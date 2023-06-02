import { Form, Button } from "react-bootstrap";
import { CartState } from "../../Context/Context";
import Rating from "../Rating/Rating";

const Filters = () => {
    const { productState: { byStock, byFastDelivery, sort, byRating },
        productDispatch } = CartState();

    console.log(byStock, byFastDelivery, sort, byRating);
    return (
        <div className="filters">
            <span className="title">Filter Product</span>
            <span>
                <Form.Check
                    inline
                    label="Ascending"
                    name="group1"
                    typo="radio"
                    id={`inline-1`}
                    onChange={() =>
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "lowToHight",
                        })
                    }
                    checked={sort === "lowToHight" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Descending"
                    name="group1"
                    typo="radio"
                    id={`inline-2`}
                    onChange={() =>
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "hightToHight",
                        })
                    }
                    checked={sort === "hightToHight" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Include Out Of Stock"
                    name="group1"
                    typo="radio"
                    id={`inline-3`}
                    onChange={() =>
                        productDispatch({
                            type: "FILTER_BY_STOCK",
                        })
                    }
                    checked={byStock}

                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Fast Delivery Only"
                    name="group1"
                    typo="radio"
                    id={`inline-4`}
                    onChange={() =>
                        productDispatch({
                            type: "FILTER_BY_DELIVERY",
                        })
                    }
                    checked={byFastDelivery}
                />
            </span>
            <span>
                <label style={{ paddingRight: 10 }}>Rating: </label>
                <Rating rating={byRating} onClick={(i) =>
                    productDispatch({
                        type: "FILTER_BY_RATING",
                        payload: i + 1
                    })
                } style={{ cursor: "pointer" }} />
            </span>
            <Button
                variant="light"
                onClick={() =>
                    productDispatch({
                        type: "CLEAR_FILTERS",
                    })
                }
            >Clear Filters</Button>
        </div>
    )
}

export default Filters