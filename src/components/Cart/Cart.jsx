import { CartState } from "../../Context/Context";
import { ListGroup, Button, Col, Row, FormControl, Image } from "react-bootstrap"
import { useEffect, useState } from "react";
import Rating from "../Rating/Rating";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import "./Cart.css";


const Cart = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState();
    const navigate = useNavigate();
    const token = window.localStorage.token;

    const Blogin = () => {
        alert("anda harus login terlebih dahulu")
        navigate('/login')
    }
    const Slogin = () => {
        alert("Selamat anda berhasil Chekout")
        navigate('/cart')
    }
    const [total, setTotal] = useState();
    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
    }, [cart])
    return (
        <div className="home">
            <div className="productContent">
                <ListGroup>
                    {
                        cart.map((prod) => (
                            <ListGroup.Item key={prod.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={prod.image} alt={prod.name} fluid rounded />
                                    </Col>
                                    <Col md={2}>
                                        <span>{prod.name}</span>
                                    </Col>
                                    <Col md={2}>
                                        <span>$ {prod.price}</span>
                                    </Col>
                                    <Col md={2}>
                                        Rating <Rating rating={prod.rattings} />
                                    </Col>

                                    <Col md={2}>
                                        <FormControl
                                            as="select"
                                            value={prod.qty}
                                            onChange={(e) =>
                                                dispatch({
                                                    type: "CHANGE_CART_QTY",
                                                    payload: {
                                                        id: prod.id,
                                                        qty: e.target.value,
                                                    }
                                                })}
                                        >

                                            {[...Array(prod.inStock).keys()].map((x) => (
                                                <option key={x + 1}>{x + 1}</option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: prod,
                                                })}>
                                            <AiFillDelete fontSize="20px"></AiFillDelete>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
            <div className="filters summary">
                <span className="title">
                    Subtotal ({cart.length}) items
                </span>
                <span style={{ fontWeight: 700, fontSize: 20 }}>
                    Total: $ {total} ({cart.length}) items
                </span>
                {
                    token ?
                        <Button type="button" disabled={cart.length === 0} onClick={Slogin}>
                            Procced to checkout
                        </Button>
                        :
                        <Button type="button" disabled={cart.length === 0} onClick={Blogin}>
                            Procced to checkout
                        </Button>
                }
            </div>
        </div>
    )
}

export default Cart