import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
    const { userId } = useParams();
    // const [userdata, userdatachange] = useState({})
    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [amountSaved, amountSavedchange] = useState("");
    const [amountBorrowed, amountBorrowedchange] = useState("0");
    const [validation, valchange] = useState(false);

    const navigate= useNavigate();
    const handlesubmit= (e) => {
        e.preventDefault();
        const userdata = {id, name, email, phone, amountSaved, amountBorrowed}
        fetch("http://localhost:8000/user/"+userId, {
            method: "PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(userdata)
        }).then((res)=>{
            alert('saved succesfully');
            navigate("/");
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    useEffect(() => {
        fetch("http://localhost:8000/user/" + userId).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            namechange(resp.name);
            emailchange(resp.email);
            phonechange(resp.phone);
            amountSavedchange(resp.amountSaved);
            amountBorrowedchange(resp.amountBorrowed);

        }).catch((err) => {
            console.log(err.message)
        })
    }, []);
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card">
                            <div className="card-title">
                                <h2>Edit User Data</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled={true} className="form-control" ></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input value={name} onMouseDown={e => valchange(true)} onChange={e => namechange(e.target.value)} className="form-control" required />
                                            {name == 0 && validation && <span className="text-danger">name must have a value</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={e => emailchange(e.target.value)} className="form-control" required></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control" required></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Amount Saved</label>
                                            <input value={amountSaved} onChange={e => amountSavedchange(e.target.value)} className="form-control" ></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Amount Borrowed</label>
                                            <input value={amountBorrowed} onChange={e => amountBorrowedchange(e.target.value)} className="form-control" ></input>
                                        </div>
                                        <button className="btn btn-success" type="submit">Add</button>
                                        <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserEdit;