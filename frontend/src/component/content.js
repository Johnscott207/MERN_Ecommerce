import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import im from '../Images/592e094027cf4140d984aaf7b48c3b4e.jpg';
import useGlobalState from "../globalState";


function Content() {

    const [productResults, setProductResults] = useState([]);
    useGlobalState('login')
    useEffect(() => {

        fetch("/api/products")
            .then(response => response.json())
            .then(data => {
                setProductResults(data.products);
                console.log(data.products)
            });
    }, []);

    return (
        <div className="container">

            <div className="SearchBar text-center">
                <input type="text" placeholder="Search" />
                <button><i className="fa fa-search"></i></button>
            </div>
            <div className="Products_list">
                {productResults.map((item, i) =>
                    <div className="Product_Card" key={i}>
                        <div className='image'>
                            <img src={"Images/" + item.img_src} alt="" />
                        </div>

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

                                {item.description.slice(0, 200) + "..."}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Content;