import Gmpnavbar from "./components/navbar/Navbar";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaSistrix } from "react-icons/fa";
import { FaRegClone } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa";
import Sol_logo from "../assets/images/sol.png";
import Stellarlogo from "../assets/images/stellar.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function PendingTransaction() {
  let [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(
    searchParams.get("txhash") ?? ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [DepositMessage, setDepositMessage] = useState([]);
  const [copied, setCopied] = useState(false);
  const recordsPerpage = 8;
  const lastIndex = currentPage * recordsPerpage;
  const firstIndex = lastIndex - recordsPerpage;
  const records = DepositMessage.slice(firstIndex, lastIndex);
  const npage = Math.ceil(DepositMessage.length / recordsPerpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    let val = searchParams.get("txhash");
    if (val) {
      setSearchData(val);
    //   setCurrentPage(npage);
    }
        return () => {

    }
    }, [npage])

    const api_url = process.env.REACT_APP_HOST_API_URL

  const getData = () => {
    try {
      axios.get(`${api_url}/FullMessage`).then((response) => {
        let data = response.data.data.reverse();
        let mydata = [];

        for (let i = 0; i < data.length; i++) {
          if (data[i].is_claimed === "NO") {
            mydata.push(data[i]);
          }
          setDepositMessage(mydata);
        }
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    getData();
    }, []);

  const copyToClipboard = (id, msg, sign, pk) => {
    setCopied(id);
    let _copyMsg = [[msg.trim()], [sign], [pk]];
    navigator.clipboard.writeText(JSON.stringify(_copyMsg));
    setTimeout(() => {
      setCopied(0);
    }, 500);
    // toast.success("Copied")
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  const handleCopy = (text) => {};
  const filteredData = records.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchData.toLowerCase())
    )
  );
  // console.log("filteredData:", filteredData)

  return (
    <>
      <ToastContainer />

      <Gmpnavbar />
      <div className="row  hearder-div">
        <div className="col header-text">
          <h2> Pending Transaction </h2>
        </div>
        <div className="col searchTransaction">
          <div className="searchTransaction-div">
            <input
              type="text"
              value={searchData}
              placeholder="  Transaction hash/Address"
              onChange={(e) => setSearchData(e.target.value)}
            />
            <span>
              <FaSistrix />
            </span>
          </div>
        </div>
      </div>
      <div className="row table-container ">
        <Table
          className="table-div "
          variant="dark"
          borderless="true"
          responsive
        >
          <thead>
            <tr className="table-heading">
              <th>#</th>
              <th>Asset</th>
              <th>Amount</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Block Transaction</th>
              <th>Transaction Hash</th>
              <th>Status</th>
              <th>IsClaimed</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {/* 
                        {records.filter((e) => {
                            return searchData === '' ? e : e?.transaction_hash.toLowerCase().includes(searchData?.toLowerCase())
                        }) */}

            {filteredData?.map((e, i) => {
              let actualAmount;
              let coinType;
              const dateInIST = new Date(e?.date).toLocaleString();
              let msgInfo = JSON.parse(e.message_info);

              if (e.tochain == "456") {
                if (msgInfo?.method == "Deposit") {
                  actualAmount = e?.amount / 10 ** 9;
                  coinType = "SOL";
                } else {
                  actualAmount = e?.amount / 10 ** 7;
                  coinType = "WXLM";
                }
              } else {
                {
                  if (msgInfo?.method == "Deposit") {
                    actualAmount = e?.amount / 10 ** 7;
                    coinType = "XLM";
                  } else {
                    actualAmount = e?.amount / 10 ** 9;
                    coinType = "WSOL";
                  }
                }
              }

              // const value = e?.tochain == '456'  ? 9 : 9
              // // console.log("e:", )
              // // const value = 9

              // console.log("value:", value)

              // console.log("e?.amount:", e?.amount)
              // const actualAmount = e?.amount / Math.pow(10, value)

              return (
                <tr>
                  <td>{e?.id}</td>
                  <td>{coinType}</td>
                  <td>{actualAmount}</td>
                  <td>
                    <span title={e?.fromaddress}>
                      {" "}
                      <span>
                        {e?.tochain == "456" ? (
                          <img width={16} alt="sol" src={Sol_logo} />
                        ) : (
                          <img width={14} alt="stellar" src={Stellarlogo} />
                        )}{" "}
                      </span>{" "}
                      {e?.fromaddress?.substring(0, 15)}...{" "}
                    </span>
                  </td>
                  <td>
                    <span title={e?.toaddress}>
                      {e?.toaddress?.substring(0, 15)}...
                    </span>
                  </td>
                  <td>{dateInIST}</td>
                  <td>
                    <a
                      className="details-link"
                      onClick={() => navigate(`/transactiondetails/${e?.id}`)}
                    >
                      empty
                    </a>
                  </td>
                  <td>{e?.transaction_hash.substring(0, 15)}...</td>
                  <td>
                    <span>
                      {" "}
                      <Button variant="outline-danger" className="d-flex">
                        {" "}
                        <span className="pe-1">
                          <FaCircleCheck />
                        </span>
                        Pending
                      </Button>{" "}
                    </span>
                  </td>
                  <td>
                    <span>
                      {" "}
                      <Button variant="outline-danger" className="d-flex">
                        {" "}
                        <span className="pe-1">
                          <FaCircleCheck />
                        </span>
                        NO
                      </Button>{" "}
                    </span>
                  </td>
                  <td>
                    <span className="copyIcon" style={{ position: "relative" }}>
                      <FaRegClone
                        onClick={() => {
                          copyToClipboard(
                            e?.id,
                            e?.message_info,
                            e?.validator_sign,
                            e.public_key
                          );
                        }}
                      />
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        marginLeft: "4px",
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: 2,
                        paddingLeft: 2,
                        paddingRight: 2,
                      }}
                    >
                      {copied === e?.id ? "Copied!" : false}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                <FaArrowLeft />
              </a>
            </li>
            {numbers.map((n, i) => {
              return (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""} `}
                  key={i}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              );
            })}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                <FaArrowRight />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default PendingTransaction;
