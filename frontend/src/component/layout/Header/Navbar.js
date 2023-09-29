import React, { useState } from "react";
import logo from "../../../images/logo2.png";
import { MdAccountCircle, MdAddShoppingCart, MdSearch, MdMenu, MdClose } from "react-icons/md";
import "./mix.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"
const Navbar = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const history = useHistory();
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products");
        }
    };
    return (
        <nav className={`custom-navbar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <div className="custom-logo">
                <a href="/">
                    <img src={logo} alt="Logo" className="custom-logo-img" />
                </a>
            </div>
            <div className={`custom-menu-toggle`} onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
            </div>
            <ul className={`custom-nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
                <li className="custom-nav-item">
                    <NavLink exact to="/" activeClassName="active-link">
                        <AiOutlineHome />
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink to="/products" activeClassName="active-link">
                        Best Deals
                    </NavLink>
                </li>

            </ul>


            <div className="custom-search-bar">
                <form onSubmit={searchSubmitHandler} className="search-form">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Search a Product ..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <button type="submit">
                        <MdSearch className="custom-search-icon" />
                    </button>
                </form>
            </div>


            <div className={`custom-icons ${isMobileMenuOpen ? "mobile-open" : ""}`}>
                {user ? (
                    <span className="custom-username">{user.name}</span>

                ) : (
                    <a href="/login" className="custom-nav-item">
                        <MdAccountCircle />
                    </a>
                )}
                <a href="/cart" className="custom-nav-item">
                    <MdAddShoppingCart />
                    {cartItems.length > 0 && ( // Check if there are items in the cart
                        <span className="cart-counter">{cartItems.length}</span>
                    )}

                </a>
            </div>
        </nav>
    );
};

export default Navbar;
