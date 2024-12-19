import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PinNavihation = () => {
    const navigate = useNavigate();
    const [sd, setsd] = useState([]);
    const [srd, rsd] = useState([]);
    const [req, sre] = useState([]);
    useEffect(() => {
        const gd = async () => {
            await axios
            .get(`${import.meta.env.VITE_SER}siem`, {
                headers: {
                    siteid: sessionStorage.getItem("site"),
                },
            })
            .then((res) => {
                setsd(res.data.emplyee);
                rsd(res.data.stock);
                sre(res.data.req);
            });
        };
        gd();
    }, []);
    return (
        <>
            <div className="continer-fluid">
                <div className="row text-center mt-5">
                    <div className="col-4">
                        <Button
                            className="w-75"
                            onClick={() =>
                                navigate("/projects/dashboard/attendance", {
                                    state: { att: sd },
                                })
                            }
                        >
                            Attendance
                        </Button>
                    </div>

                    <div className="col-4">
                        <Button
                            className="w-75"
                            onClick={() =>
                                navigate("/projects/dashboard/resuestMaterial", {
                                    state: { met: srd ,req:req},
                                })
                            }
                        >
                            Materials
                        </Button>
                    </div>

                    <div className="col-4">
                        <Button
                            className="w-75"
                            onClick={() => 
                                navigate("/projects/dashboard/salary")
                            }
                        >
                            Salary
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PinNavihation;
