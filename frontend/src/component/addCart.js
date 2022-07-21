import Card from "./card";
import useGlobalState from "../globalState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
function AddCart() {
    let navigate = useNavigate();
    const [email, setEmail] = useGlobalState('email');
    const [list, setList] = useState([]);
    const [count, setCount] = useState(false);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        var url = new URL(window.location.host + "/api/cart_product");
        //url.searchParams.append('x', 42);
        url.searchParams.append('id', btoa(email));
        //console.log(email + " " + count);
        if (email && count) {
            if (count) { setCount(false) };

            fetch("http://" + url.href)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        data.forEach((e, i) => {
                            fetch("/api/product/" + e.productId)
                                .then(response => response.json())
                                .then(data => {
                                    setList(list => [...list, data]);
                                    // alert(JSON.stringify(data));
                                    // console.log(data)
                                });
                            if (data.length === i + 1) {
                                setLoad(false);
                            }
                        })
                    } else {

                        setLoad(false);

                    }
                    // console.log(data)
                });
        }

        setCount(true);
    }, [email, count]);

    var clickme = (id) => {
        var data = {
            email: email,
            productId: id
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: btoa(JSON.stringify(data)) },
            body: {}
        };
        fetch('/api/remove_cart', requestOptions)
            .then(response => response.json())
            .then(data => {
                //setLog(data.log);

                //alert(JSON.stringify(data));
                if (data.log) {
                    alertPopup("Item successfully remove from cart.", "close");
                    setList([]);
                    var url = new URL(window.location.host + "/api/cart_product");
                    url.searchParams.append('id', btoa(email))
                    fetch("http://" + url.href)
                        .then(response => response.json())
                        .then(data => {
                            if (data.length > 0) {
                                data.forEach(e => {
                                    fetch("/api/product/" + e.productId)
                                        .then(response => response.json())
                                        .then(data => {
                                            setList(list => [...list, data]);
                                            // alert(JSON.stringify(data));
                                            // console.log(data)
                                        });
                                })
                            }
                            // console.log(data)
                        });
                    //navigate("/cart", { replace: true });
                }
            });

    }

    var listItems = list.map((e, i) => <Card key={i} object={e} click={clickme} />);


    function alertPopup(message, type) {
        var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        alertPlaceholder.append(wrapper);
    }

    return (
        <div className="container-fluid add_cart">
            <div id="liveAlertPlaceholder" className="alert-fixed rounded text-white bg-success"></div>
            <div className="container">
                {load &&
                    <center>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <br />
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>&nbsp;
                        <div className="spinner-grow text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </center>
                }


                {listItems}
                {listItems.length === 0 && !load &&
                    <center>
                        <br /><br /><br /><br />
                        <h1> Cart is Empty</h1>
                        <button className="btn btn-success"><Link to="/" className="nav-link text-white">Go to Purchase</Link></button>
                    </center>
                }
            </div>

        </div>
    )
}

export default AddCart;