import React from 'react';

const AlfEachEmployeeList = ({empName, empDesignation, empSalaryPerShift, empPhNo, totalpay}) => {
    return (
        <>
            <td>{empName}</td>
            <td>{empDesignation}</td>
            <td>{empSalaryPerShift}</td>
            <td>{totalpay}</td>
            <td>{empPhNo}</td>
        </>
    );
};

export default AlfEachEmployeeList;


// import React from 'react'

// const AlfEachEmployeeList = ({empId, empName, empDesignation, empSalaryPerShift, empPhNo}) => {
//   return (
//     <>
//                                 <td>{empId}</td>
//                                 <td>{empName}</td>
//                                 <td>{empDesignation}</td>
//                                 <td>{empSalaryPerShift}</td>
//                                 <td>{empPhNo}</td>
//     </>
//   )
// }

// export default AlfEachEmployeeList
