import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAcc } from "../redux/features/customerSlice";
const Login = () => {
    var [check, setCheck] = useState(false);
    const [accs, setAccs] = useState([]);
    const [login, setLogin] = useState({ email: "", pass: "" })
    const [newAcc, setNewAcc] = useState({ idAccount: null, ownerName: "", ownerEmail: "", password: "", accountRole: "USER" })
    const navigate = useNavigate()
    const dispatch= useDispatch();
    useEffect(() => {
        fetch('http://localhost:8080/accs')
            .then(response => response.json())
            .then(data => setAccs(data))
            .catch(err => console.log(err));
    }, []);
    console.log(accs)
    function validateEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }

    function handleRegister() {
        if (validateEmail(newAcc.ownerEmail)) {
            if (accs.find(obj => obj.ownerEmail === newAcc.ownerEmail)) {
                alert("Tài khoản đã tồn tại.")
            } else {
                fetch('http://localhost:8080/newAcc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newAcc)
                })
                    .then(response => response.json())
                    .then(data => {
                        // Xử lý phản hồi từ server
                        if(data){
                           alert("Đăng kí thành công.")
                            setCheck(!check); 
                        }else{
                            alert("Đăng kí không thành công.")
                        }
                    })
                    .catch(err => console.log(err))
            }
        } else {
            alert("Email không hợp lệ.")
        }
    }


    // if(accs.find(obj => obj.ownerEmail === login.email)){
    //     alert("Email đã tồn tại.")
    // }
    function handleLogin() {
        if (validateEmail(login.email)) {
            const foundAcc = accs.find(obj => obj.ownerEmail == login.email && obj.password == login.pass);
            if (foundAcc) {
                sessionStorage.setItem('acc', foundAcc);
                dispatch(setAcc(foundAcc));
                navigate(`/${foundAcc.accountRole}`)
            } else {
                alert("Tài khoản không tồn tại.")
                setLogin({ email: "", pass: "" })
            }
        } else {
            alert("Email không hợp lệ.")
            setLogin({ email: "", pass: "" })
        }
    }

    return (
        <div className={`wrapper ${check ? 'active' : ''}`}>

            <div className="form-box login">
                <h2>Login</h2>
                <form action="#">
                    <div className="input-box">
                        <span className="icon">
                            <i className='bx bx-envelope' ></i>
                        </span>
                        <input id="email" type="email" value={login.email} onChange={(e) => { setLogin({ ...login, email: e.target.value }) }} required />
                        <label for="">Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <i className='bx bx-lock'></i>
                        </span>
                        <input id="password" type="password" value={login.pass} onChange={(e) => { setLogin({ ...login, pass: e.target.value }) }} required />
                        <label for="">Password</label>
                    </div>
                    <div className="remember-forgot">
                        <label for=""><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="button" className="btn" onClick={() => { handleLogin() }}>Login</button>
                    <div className="login-register">
                        <p>Don't have an account?
                            <a href="#" className={`register-link`} onClick={() => { setCheck(!check) }}>Regester</a>
                        </p>
                    </div>
                </form>
            </div>
            <div className="form-box register">
                <h2>Registration</h2>
                <form action="#">
                    <div className="input-box">
                        <span className="icon">
                            <i className='bx bx-user'></i>
                        </span>
                        <input id="new_username" type="text" required value={newAcc.ownerName} onChange={(e) => { setNewAcc({ ...newAcc, ownerName: e.target.value }) }} />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <i className='bx bx-envelope' ></i>
                        </span>
                        <input id="new_email" type="email" required value={newAcc.ownerEmail} onChange={(e) => { setNewAcc({ ...newAcc, ownerEmail: e.target.value }) }} />
                        <label for="">Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <i className='bx bx-lock'></i>
                        </span>
                        <input id="new_password" type="password" required value={newAcc.password} onChange={(e) => { setNewAcc({ ...newAcc, password: e.target.value }) }} />
                        <label for="">Password</label>
                    </div>
                    <div className="agree">
                        <label for=""><input type="checkbox" />I agree to the terms & conditions</label>
                    </div>

                    <button type="button" className="btn" onClick={() => { handleRegister() }}>Register</button>
                    <div className="login-register">
                        <p>Already have an account?
                            <a href="#" className="login-link" onClick={() => { setCheck(!check) }}>Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login