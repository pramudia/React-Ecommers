import React from 'react'
import {
    Navbar,
    Container,
    FormControl,
    Nav,
    Dropdown,
    Badge,
    Button
} from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartState } from '../../Context/Context'

import { useNavigate } from 'react-router-dom';

import "./Header.css"
import Home from '../Home/Home'

const Header = () => {
    const {
        state: { cart },
        dispatch,
        productDispatch
    } = CartState();
    const navigate = useNavigate();
    const token = window.localStorage.token;

    const removeToken = () => {
        localStorage.removeItem('token');
        navigate('/')
    }


    return (
        <Navbar bg="dark" variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/">Faker Shop</Link>
                </Navbar.Brand>
                <Navbar.Text className='d-flex'>
                    <FormControl
                        style={{ width: 500, marginRight: 250 }}
                        placeholder='Search a product'
                        className="search"
                        onChange={(e) => {
                            productDispatch({
                                type: "FILTER_BY_SEARCH",
                                payload: e.target.value
                            })
                        }

                        }
                    />
                    <Nav>
                        <Dropdown>
                            <Dropdown.Toggle variant="success">
                                <FaShoppingCart color="white" fontSize="25px" marginright="5px" />
                                <Badge bg='none'>{cart.length}</Badge>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ minWidth: 350, marginTop: 5 }}>
                                {cart.length > 0 ? (
                                    <>
                                        {cart.map((prod) => (
                                            <span className="cartItem" key={prod.id}>

                                                <img
                                                    src={prod.image}
                                                    className="cartItemImg"
                                                    alt={prod.name}
                                                />
                                                <div className='cartItemDetail'>
                                                    <span>{prod.name}</span>
                                                    <span>$. {prod.price.split(".")[0]}</span>
                                                </div>
                                                <AiFillDelete
                                                    fontSize="20px"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: prod,
                                                    })}
                                                />
                                            </span>
                                        ))}
                                        <Link to="/cart">
                                            <Button style={{ width: "95%", margin: "0 10px" }}>
                                                Go to cart
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <span style={{ padding: 10 }}>Cart is Empty</span>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Text>

                {token ?

                    <Button variant="outline-light" onClick={removeToken}>Logout</Button>
                    :
                    <Link to="/login">
                        <Button variant="outline-light">Login</Button>
                    </Link>
                }
            </Container>
        </Navbar>
    )
}

export default Header