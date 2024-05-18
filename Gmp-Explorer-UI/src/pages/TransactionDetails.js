import Gmpnavbar from "./components/navbar/Navbar";
import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const api_url = process.env.REACT_APP_HOST_API_URL

function TransactionDetails(props) {

    const [transactiondetail, setTransactionDetail] = useState({})
    let state = useParams();
    let transactionid = state.id

    console.log("id--->", transactionid)


    const getDataById = () => {
        try {


            axios.get(`${api_url}/Message/${transactionid}`).then((response) => {
                let data = response.data.data[0]
                setTransactionDetail(data)
            })
        } catch (error) {
        console.log("error:", error)

        }
    }
    useEffect(() => {
        getDataById();
    }, []);


    return (
        <>
            <Gmpnavbar />
            <div><h4 className="TD-text"> TransactionDetails </h4></div>
            <div className="TransactionDetails-container">
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4">Transaction Hash:</div>
                    <div className="col-12 col-lg-8 col-md-8 col-sm-8 details">{transactiondetail?.transaction_hash}</div>
                </div>
                <div className="row">
                    <div className=" col-4">Status:</div>
                    <div className=" col-8 details">{transactiondetail?.status === 'success' ? <Button variant="outline-success" className="d-flex" > <span className="pe-1"><FaCircleCheck /></span>Success</Button> : <Button variant="outline-danger" className="d-flex">Pending</Button>}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4">Block:</div>
                    <div className="col-12 col-lg-8 col-md-8  col-sm-8 details">12345</div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4" >Timestramp:</div>
                    <div className="col-12 col-lg-8 col-md-8 col-sm-8 details">{transactiondetail?.date}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4">From:</div>
                    <div className="col-12 col-lg-8 col-md-8 col-sm-8 details">{transactiondetail?.fromaddress}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4">To:</div>
                    <div className="col-12 col-lg-8 col-md-8 col-sm-8 details">{transactiondetail?.toaddress}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4">Value:</div>
                    <div className="col-lg-8 col-md-8  col-sm-8 details">{transactiondetail?.amount}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4">Transaction Fee:</div>
                    <div className="col-12 col-lg-8 col-md-8 col-sm-8 details">kjsdhfteyrwueori</div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-sm-4">Gas Price:</div>
                    <div className="col-12  col-lg-8 col-md-8 col-sm-8 details">kjsdhfteyrwueori</div>
                </div>
            </div>
        </>

    );
}
export default TransactionDetails;
