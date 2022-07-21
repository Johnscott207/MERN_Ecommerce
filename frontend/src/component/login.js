import useGlobalState from "../globalState";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Login() {
    let navigate = useNavigate();
    const [log, setLog] = useGlobalState('login');
    const [user, setUser] = useGlobalState('username');
    const [email, setEmail] = useGlobalState('email');
    var login = () => {


        var data = {
            email: document.getElementById("usr_email").value,
            password: document.getElementById("usr_pass").value
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: btoa(JSON.stringify(data)) },
            body: {}
        };
        fetch('/api/user_login', requestOptions)
            .then(response => response.json())
            .then(data => {
                setLog(data.log, () => {
                    alert();
                });
                setUser(data.username);
                setEmail(data.email);
                //alert(JSON.stringify(data));
                if (data.log) {
                    //navigate("/", { replace: true });
                } else {
                    var txt = `${(data.email === false ? "wrong email enter" : "")}, ${(data.pass === false ? "password did'nt match" : "")}`;
                    alert(txt);
                }
            });
    };


    var show = (e) => {

        if (e.target.checked) {
            e.target.parentElement.parentElement.querySelector("#usr_pass").type = "text";
        } else {
            e.target.parentElement.parentElement.querySelector("#usr_pass").type = "password";
        }
    }
    useEffect(() => {
        if (log && user && email) {
            navigate("/", { replace: true });
        }
    }, [log, email, user]);

    if (log && user && email) {
        //navigate("/", { replace: true });
        return "";
    } else {
        return (
            <div className="overlay">
                <center>


                    <form >
                        <Link to="/" >Home</Link>
                        <h1>Login In</h1>
                        <div className="form-group">
                            <label htmlFor="usr_email">Email address</label>
                            <input type="email" className="form-control" id="usr_email" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr_pass">Password</label>
                            <input type="password" className="form-control" id="usr_pass" placeholder="Password" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" onChange={(e) => show(e)} id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                        </div>
                        <button type="button" onClick={login} className="btn btn-primary">Login</button>
                        <br />
                        <Link to="/signin" >Sign in</Link>
                    </form>
                </center>
            </div>
        )
    };
}

export default Login;