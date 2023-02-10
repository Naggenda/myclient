import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, usernameupdate] = useState("");
    const [name, nameupdate] = useState("");
    const [password, passwordupdate] = useState("");

    const usenavigate = useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    })

    const proceedLogin = (e) => {
        e.preventDefault();
        if(validate()){
            // console.log('proceed')
            fetch("http://localhost:8000/user/"+name).then((res)=>{
                return res.json();
            }).then((resp)=>{
               // console.log(resp);
                if(Object.keys(resp).length===0){
                    alert('please enter valid user name')
                }
                else{
                    if(resp.password === password){
                        alert('success')
                        sessionStorage.setItem("username", username)
                        usenavigate('/')
                    }
                    else{
                        alert('incorrect username/ password');
                    }
                }
            }).catch((err)=>{
                alert('login fail'+err.msg)
            })
        }
    }

    const validate = () => {
        let result=true;
        if(username ==='' || username===null){
            result=false;
            alert('pleaser enter username')
        }
        if(password ==='' || password ===null){
            result=false;
            alert('pleaser enter password!')
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={proceedLogin}>
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label >User Name <span className="text-danger">*</span></label>
                                <input value={username} onChange={e=>usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label >Password <span className="err-msg">*</span></label>
                                <input type='password' value={password} onChange={e=>passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <Link className="btn btn-success">New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;