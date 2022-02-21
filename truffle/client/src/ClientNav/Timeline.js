import React from "react";

const Timeline = () => {

    return (
        <div className="timeline">
        <h1>Timeline</h1>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            
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
                </table>
            </div>
        </div>
    );

}
export default Timeline;

