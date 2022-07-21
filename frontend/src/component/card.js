import { Link } from "react-router-dom";
import useGlobalState from "../globalState";
function Card(props) {
    const [log, setLog] = useGlobalState('login');
    var item = props.object;
    return (
        <div className="card mb-1 cart_card" >
            <div className="row g-0">
                <div className="col-md-3">
                    <div className="image">
                        <img src={"Images/" + item.img_src} className="img-fluid rounded-start" alt="..." />
                    </div>

                </div>
                <div className="col-md-9">
                    <div className="card-body p-0">
                        <div className="details">
                            <div className="brand">

                                <Link to={`/detail/${item._id}/${item.name}`}>
                                    {item.brand}
                                </Link>
                            </div>
                            <div className="title">

                                <Link to={`/detail/${item._id}/${item.name}`}>
                                    {item.name}
                                </Link>
                            </div>
                            <div className="price">

                                ₹{item.price}/-

                            </div>
                            <div className="rating">
                                <span className={"fa fa-star " + (item.rating > 0 ? "checked" : "")}></span>
                                <span className={"fa fa-star " + (item.rating > 1 ? "checked" : "")}></span>
                                <span className={"fa fa-star " + (item.rating > 2 ? "checked" : "")}></span>
                                <span className={"fa fa-star " + (item.rating > 3 ? "checked" : "")}></span>
                                <span className={"fa fa-star " + (item.rating > 4 ? "checked" : "")}></span>
                            </div>
                            <div className="desc">

                                {item.description.slice(0, 100) + "..."}
                            </div>

                            <div className="buycart">
                                <div className="row text-center">
                                    <div className="col-6">
                                        <button className="cart" onClick={() => { props.click(item._id) }} ><i className="fa fa-shopping-cart"></i>&nbsp;Remove from Cart x</button>
                                    </div>
                                    <div className="col-6">
                                        <button className="buy">
                                            {log && <Link className="nav-link text-white p-0" to={`/buy/${item.name}/${item._id}`}>Buy Now</Link>}
                                            {!log && <Link className="nav-link text-white p-0" to={`/login`}>Buy Now</Link>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card;