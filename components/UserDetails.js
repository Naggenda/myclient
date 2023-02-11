import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetails = () => {
    const { userId } = useParams();
    const [userdata, userdatachange] = useState({})

    useEffect(() => {
        fetch("http://localhost:8000/user/" + userId).then((res) => {
            return res.json();
        }).then((resp) => {
            userdatachange(resp)
        }).catch((err) => {
            userdatachange(err.message)
        })
    }, []);


    return (
        <div className="card">
            <div className="card-title">
                <h2>Account Details</h2>
            </div>
            {userdata &&
                <div>
                    <h5>Holder's Name : {userdata.name} ({userdata.id})</h5>
                    <h3>Contact Details: </h3>
                    <p>Email: {userdata.email}</p>
                    <p>Tel number: {userdata.phone}</p>
                    <h3>Transactions:</h3>
                    <p>Savings: {userdata.amountSaved}</p>
                    <p>Loan: {userdata.amountBorrowed}</p>
                    <Link to="/" className="btn btn-danger">Back Listing</Link>
                </div>
            }
        </div>
    )
}

export default UserDetails;