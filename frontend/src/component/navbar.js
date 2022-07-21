import { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useGlobalState from "../globalState";

function Navbar() {
    const [log, setLog] = useGlobalState('login');
    const [user, setUser] = useGlobalState('username');
    const [email, setEmail] = useGlobalState('email');
    const [count, setCount] = useState(true);
    useEffect(() => {
        var data = {};
        if (!count) {

            fetch("/api/user_logged", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
                .then(response => response.json())
                .then(data => {
                    setLog(data.log);
                    setUser(data.username);
                    setEmail(data.email);
                    // console.log(data)
                });

            //console.log(log, '');
        } else {
            setCount(false);
        }


    }, [count]);
    useEffect(() => {
        if (log) {
            //console.log(log, 'f');
        }

    }, [log])

    var logout = () => {
        var data = {
            email: 'prana9654736312@gmail.com'
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: btoa(JSON.stringify(data)) },
            body: {}
        };
        fetch('/api/user_logout', requestOptions)
            .then(response => response.json())
            .then(data => {
                setLog(data.log);
                setUser(data.username);
                setEmail(data.email);
                //alert(JSON.stringify(data));
            });
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Rajput Traders</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>

                        </li>

                        <li className="nav-item">
                            {/* <NavLink activeClassName="active" to="#" className="nav-link" ></NavLink> */}
                            <a className="nav-link" href="#">Orders</a>
                        </li>
                        <li className="nav-item">
                            {
                                log && <NavLink to="/cart" className="nav-link" ><i className="fa fa-shopping-cart"></i>&nbsp;Go to Cart</NavLink>
                            }

                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                    </ul>
                </div>
                {
                    log &&
                    <span>
                        <span>{user}:{email}</span>
                        <a href="#"> <span onClick={logout}>Logout</span></a>
                    </span>

                }
                {
                    !log &&
                    <span>
                        <Link to="/login" >Login</Link>&nbsp;&nbsp;&nbsp;
                        <Link to="/signin" >Sign in</Link>
                    </span>
                }


            </div>
        </nav>
    );
}

export default Navbar;