import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Timeline = () => {
    let history = useHistory();
    const handleButton = async (e) => {
        history.push("/apply/card");
    }

    return (
        <div>
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transaction No.</th>
                            <th>Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {Array.from(transactions).map((e, index) => (
              <tr>
                <td>{e.transactionHash}</td>
                <td>{e.event}</td>
                <td>{e.ipfsHash}</td>
              </tr>
            ))} */}
                    </tbody>
                </Table>
            </div>
        </div>
    );

}
export default Timeline;

