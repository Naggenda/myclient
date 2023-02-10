import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserListing = () => {
    const [userdata, userdatachange] = useState(null);
    const navigate = useNavigate();

    const loadDetail = (id) => {
        navigate("/user/details/" + id)
    }
    const editDetail = (id) => {
        navigate("/user/edit/" + id)
    }
    const removeDetail = (id) => {
        if (window.confirm("Do you want to delete user")) {
            fetch("http://localhost:8000/user/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('operation succesfully');
                window.location.reload();
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }


    useEffect(() => {
        let username=sessionStorage.getItem('username');
        if(username==='' || username===null){
            navigate('/login')
        }
        fetch("http://localhost:8000/user").then((res) => {
            return res.json();
        }).then((resp) => {
            userdatachange(resp)
        }).catch((err) => {
            userdatachange(err.message)
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>User Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="user/create" className="btn btn-success">Add New</Link>
                        <form className="search">
                            <input type="text" name="" id="" placeholder="search..."/>
                            <button className="btn btn-success">Search</button>
                        </form>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-light text-black">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Amount Saved</td>
                                <td>Amount Borrowed</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userdata &&
                                userdata.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.amountSaved}</td>
                                            <td>{item.amountBorrowed}</td>
                                            <td>
                                                <a className="btn btn-success" onClick={() => { editDetail(item.id) }}>Edit</a>
                                                <a className="btn btn-danger" onClick={() => { removeDetail(item.id) }}>Delete</a>
                                                <a className="btn btn-primary" onClick={() => { loadDetail(item.id) }}>View</a>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserListing;