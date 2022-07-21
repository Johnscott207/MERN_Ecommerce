import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalState from "../globalState";
import { useNavigate } from "react-router-dom";

function BuyNow() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [log, setLog] = useGlobalState('login');
    const [user, setUser] = useGlobalState('username');
    const [product, setResult] = useState({});


    useEffect(() => {

        if (log) {
            fetch("/api/product/" + id)
                .then(response => response.json())
                .then(data => {
                    setResult(data);
                    // console.log(data)
                });
        }
    }, [log, id]);



    return (
        <div className="container-fluid bg-light">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            <div className="page-content container">
                <div className="page-header text-blue-d2">
                    <h1 className="page-title text-secondary-d1">
                        Invoice
                        <small className="page-info">
                            <i className="fa fa-angle-double-right text-80"></i>
                            ID: {product._id}
                        </small>
                    </h1>

                    <div className="page-tools">
                        <div className="text-center text-150">
                            <i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
                            <span className="text-default-d3">Rajput Traders</span>
                        </div>
                    </div>
                </div>

                <div className="container px-0">
                    <div className="row mt-4">
                        <div className="col-12 col-lg-12">
                            <div className="row">
                                <div className="col-12">

                                </div>
                            </div>
                            {/* <!-- .row --> */}

                            <hr className="row brc-default-l1 mx-n1 mb-4" />

                            <div className="row">
                                <div className="col-sm-6">
                                    <div>
                                        <span className="text-sm text-grey-m2 align-middle">To:</span>
                                        <span className="text-600 text-110 text-blue align-middle">{user}</span>
                                    </div>
                                    <div className="text-grey-m2">
                                        <div className="my-1">
                                            Street, City
                                        </div>
                                        <div className="my-1">
                                            State, Country
                                        </div>
                                        <div className="my-1"><i className="fa fa-phone fa-flip-horizontal text-secondary"></i> <b className="text-600">111-111-111</b></div>
                                    </div>
                                </div>
                                {/* <!-- /.col --> */}

                                <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                    <hr className="d-sm-none" />
                                    <div className="text-grey-m2">
                                        <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                            Invoice
                                        </div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">ID:</span> #{product._id}</div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Issue Date:</span> {new Date().toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' })}</div>

                                        <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Status:</span> <span className="badge badge-warning badge-pill px-25">Unpaid</span></div>
                                    </div>
                                </div>
                                {/* <!-- /.col --> */}
                            </div>

                            <div className="mt-4">
                                <div className="row text-600 text-white bgc-default-tp1 py-25">
                                    <div className="d-none d-sm-block col-1">#</div>
                                    <div className="col-9 col-sm-5">Description</div>
                                    <div className="d-none d-sm-block col-4 col-sm-2">Qty</div>
                                    <div className="d-none d-sm-block col-sm-2">Unit Price</div>
                                    <div className="col-2">Amount</div>
                                </div>

                                <div className="text-95 text-secondary-d3">
                                    <div className="row mb-2 mb-sm-0 py-25">
                                        <div className="d-none d-sm-block col-1">1</div>
                                        <div className="col-9 col-sm-5">{product.name}</div>
                                        <div className="d-none d-sm-block col-2">1</div>
                                        <div className="d-none d-sm-block col-2 text-95">₹{product.price}</div>
                                        <div className="col-2 text-secondary-d2">₹{product.price}</div>
                                    </div>

                                    {/* <div className="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                                        <div className="d-none d-sm-block col-1">2</div>
                                        <div className="col-9 col-sm-5">Web hosting</div>
                                        <div className="d-none d-sm-block col-2">1</div>
                                        <div className="d-none d-sm-block col-2 text-95">$15</div>
                                        <div className="col-2 text-secondary-d2">$15</div>
                                    </div>

                                    <div className="row mb-2 mb-sm-0 py-25">
                                        <div className="d-none d-sm-block col-1">3</div>
                                        <div className="col-9 col-sm-5">Software development</div>
                                        <div className="d-none d-sm-block col-2">--</div>
                                        <div className="d-none d-sm-block col-2 text-95">$1,000</div>
                                        <div className="col-2 text-secondary-d2">$1,000</div>
                                    </div>

                                    <div className="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                                        <div className="d-none d-sm-block col-1">4</div>
                                        <div className="col-9 col-sm-5">Consulting</div>
                                        <div className="d-none d-sm-block col-2">1 Year</div>
                                        <div className="d-none d-sm-block col-2 text-95">$500</div>
                                        <div className="col-2 text-secondary-d2">$500</div>
                                    </div> */}
                                </div>

                                <div className="row border-b-2 brc-default-l2"></div>

                                {/* <!-- or use a table instead --> */}
                                {/* <!--
                                <div className="table-responsive">
                                    <table className="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                                        <thead className="bg-none bgc-default-tp1">
                                            <tr className="text-white">
                                                <th className="opacity-2">#</th>
                                                <th>Description</th>
                                                <th>Qty</th>
                                                <th>Unit Price</th>
                                                <th width="140">Amount</th>
                                            </tr>
                                        </thead>

                                        <tbody className="text-95 text-secondary-d3">
                                            <tr></tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Domain registration</td>
                                                <td>2</td>
                                                <td className="text-95">$10</td>
                                                <td className="text-secondary-d2">$20</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
            --> */}

                                <div className="row mt-3">
                                    <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                                        Extra note such as company or payment information...
                                    </div>

                                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                                        <div className="row my-2">
                                            <div className="col-7 text-right">
                                                SubTotal
                                            </div>
                                            <div className="col-5">
                                                <span className="text-120 text-secondary-d1">$₹{product.price}</span>
                                            </div>
                                        </div>

                                        <div className="row my-2">
                                            <div className="col-7 text-right">
                                                Tax (10%)
                                            </div>
                                            <div className="col-5">
                                                <span className="text-110 text-secondary-d1">$₹{Number(product.price) / 10}</span>
                                            </div>
                                        </div>

                                        <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                            <div className="col-7 text-right">
                                                Total Amount
                                            </div>
                                            <div className="col-5">
                                                <span className="text-150 text-success-d3 opacity-2">₹{product.price + Number(product.price) / 10}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div>
                                    <span className="text-secondary-d1 text-105">Thank you for your business</span>
                                    <br />
                                    <a href="#" className="btn btn-info btn-bold px-4 float-end mt-3 mt-lg-0">Pay Now</a>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyNow;