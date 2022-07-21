import useGlobalState from "../globalState";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignIn() {
    let navigate = useNavigate();
    const [log, setLog] = useGlobalState('login');
    var sign = () => {
        var data = {
            name: document.getElementById("usr_name").value,
            email: document.getElementById("usr_email").value,
            password: document.getElementById("usr_pass").value
        };

        if (data.name == "" || data.email == "" || data.password == "") {
            alert("All Feild are Required");
            return;
        }
        if (data.password.length < 6) {
            alert("password must greater than or equal to 6");
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: btoa(JSON.stringify(data)) },
            body: {}
        };
        fetch('/api/user_signin', requestOptions)
            .then(response => response.json())
            .then(data => {
                //setLog(data.log);
                //alert(JSON.stringify(data));
                if (data.log) {
                    navigate("/login", { replace: true });
                }
                else {
                    alert("email already exists");
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
    if (log) {
        navigate("/", { replace: true });
        return "";
    } else {
        return (
            <div className="overlay">
                <center>


                    <form >
                        <Link to="/" >Home</Link>
                        <h1>Sign In</h1>
                        <div className="form-group">
                            <label htmlFor="usr_name">Username</label>
                            <input type="text" className="form-control" id="usr_name" aria-describedby="nameHelp" placeholder="Enter Username" />
                            <small id="nameHelp" className="form-text text-muted">We'll never share your details</small>
                        </div>
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
                        <button type="button" onClick={sign} className="btn btn-primary">Submit</button>
                        <br />
                        <Link to="/login" >Login</Link>
                    </form>
                </center>
            </div>
        )
    };
}

export default SignIn;