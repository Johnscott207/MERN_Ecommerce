import { useEffect, useState } from "react";
import useGlobalState from "../globalState";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import im from '../Images/592e094027cf4140d984aaf7b48c3b4e.jpg';
function ProductDetail() {

    let navigate = useNavigate();
    const [log, setLog] = useGlobalState('login');
    const [email, setEmail] = useGlobalState('email');

    const imgUrl = "../../Images/";
    const { id } = useParams();
    const [product, setResult] = useState({});

    useEffect(() => {

        fetch("/api/product/" + id)
            .then(response => response.json())
            .then(data => {
                setResult(data);
                // console.log(data)
            });
    }, [id]);

    var addtocart = () => {

        if (!log) {
            navigate("/login", { replace: true });
            return 0;
        }
        //alert(email)
        var data = {
            email: email,
            productId: id
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: btoa(JSON.stringify(data)) },
            body: {}
        };
        fetch('/api/add_cart', requestOptions)
            .then(response => response.json())
            .then(data => {
                //setLog(data.log);

                // alert(JSON.stringify(data));
                if (data.log) {
                    alertPopup("Item successfully Add in cart <a href='/cart'><i className='fa fa-shopping-cart'></i> Go to Cart</a>", "close");
                    //navigate("/", { replace: true });
                }
            });

    }

    function alertPopup(message, type) {
        var alertPlaceholder = document.getElementById('alertProductDetails')
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        alertPlaceholder.append(wrapper);
    }
    return (
        <div className="container detail">
            <div id="alertProductDetails" className="alert-fixed rounded text-white bg-warning"></div>
            <div className="row gallery">
                <div className="col-3">
                    <img src={imgUrl + product.img_src} alt="" />
                </div>
                <div className="col-9">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">

                        <div className="carousel-inner">
                            {product.screenshot &&
                                <>

                                    <div className={" " + (product.screenshot[1] ? "carousel-item active" : "d-none")}>
                                        <center>
                                            <img src={imgUrl + product.screenshot[1]} className="d-block " alt="..." />
                                        </center>
                                    </div>

                                    <div className={" " + (product.screenshot[0] ? "carousel-item" : "d-none")}>
                                        <center>
                                            <img src={imgUrl + product.screenshot[0]} className="d-block " alt="..." />
                                        </center>
                                    </div>
                                    <div className={" " + (product.screenshot[2] ? "carousel-item" : "d-none")}>
                                        <center>
                                            <img src={imgUrl + product.screenshot[2]} className="d-block " alt="..." />
                                        </center>
                                    </div>
                                    <div className={" " + (product.screenshot[3] ? "carousel-item" : "d-none")}>
                                        <center>
                                            <img src={imgUrl + product.screenshot[3]} className="d-block " alt="..." />
                                        </center>
                                    </div>

                                    <div className={" " + (product.screenshot[4] ? "carousel-item" : "d-none")}>
                                        <center>
                                            <img src={imgUrl + product.screenshot[4]} className="d-block " alt="..." />
                                        </center>
                                    </div>
                                    <div className={" " + (product.screenshot[5] ? "carousel-item" : "d-none")}>
                                        <center>
                                            <img src={imgUrl + product.screenshot[5]} className="d-block " alt="..." />
                                        </center>
                                    </div>


                                </>

                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-fluid buyr m-0">
                <div className="row text-center m-0">
                    <div className="col ">
                        <button className="buy">
                            {log && <Link to={`/buy/${product.name}/${product._id}`}>Buy Now</Link>}
                            {!log && <Link to={`/login`}>Buy Now</Link>} </button>
                    </div>
                    <div className="col ">
                        <button className="cart" onClick={addtocart}><i className="fa fa-shopping-cart"></i>&nbsp;Add to Cart
                            {/* <Link to="/cart">Add to Cart</Link> */}
                        </button>
                    </div>
                </div>
            </div>
            <div className="row info p-3 px-5">
                <div className="col-3">
                    <div className="name">
                        Name: <label htmlFor="">{product.name}</label>
                    </div>
                    <div className="price">
                        Price: <label htmlFor="">₹{product.price}/-</label>
                    </div>
                    <div className="brand">
                        Brand: <label htmlFor="">{product.brand}</label>
                    </div>
                    <div className="rating">
                        <span className={"fa fa-star " + (product.rating > 0 ? "checked" : "")}></span>
                        <span className={"fa fa-star " + (product.rating > 1 ? "checked" : "")}></span>
                        <span className={"fa fa-star " + (product.rating > 2 ? "checked" : "")}></span>
                        <span className={"fa fa-star " + (product.rating > 3 ? "checked" : "")}></span>
                        <span className={"fa fa-star " + (product.rating > 4 ? "checked" : "")}></span>
                    </div>
                    <div className="stock">

                    </div>
                </div>
                <div className="col-9">
                    <ul>
                        {Array.isArray(product.list) && product.list.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                    <p>
                        {product.description}
                    </p>
                    <ul className="d-none">
                        <li>Button closure.</li>
                        <li>Do Not Bleach.</li>
                        <li>Washing: Hand wash water temperature below 40¡æ/Do not bleach/Drip flat drying in the shade/Normal dry Cleaning.</li>
                        <li>Stylish Patchwork Dress Shirts:Leopard/Lightweight/Breathable/Stretchable fabric ensures more flexibility when moving.</li>
                        <li>Suitable for a Variety of Occasions:Casual/Urban Style/Halloween /Christmas/Perfect Gift for families, friends or boyfriend.</li>
                        <li>US Size: Slim Fit/Please note that body builds vary by person, therefore, detailed size information should be reviewed.</li>
                        <li>Color Disclaimer : Due to monitor settings, monitor pixel definitions, we cannot guarantee that the color you see on your screen as an exact color of the product.</li>
                        <li>We strive to make our colors as accurate as possible. However, colors are approximations of actual colors</li>
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default ProductDetail;