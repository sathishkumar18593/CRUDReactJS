import * as React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import {useState,useEffect,useCallback} from "react";
import "./Viewemployeelist.scss";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next'; 
import paginationFactory from 'react-bootstrap-table2-paginator'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/**
 * @function Viewemployeelist
 * @summary Renders the Viewemployeelist component
 */

export function Viewemployeelist(props)  { 

  const [employeedetail, setemployeedetail] = useState(false);
  const [updateemployee, setupdateemployee] = useState(false);
  

  const [emp,setEmployee] = useState([]);
  const [viewresult,setviewresult] = useState([]);
  const [updateresult,setupdateresult] = useState([]);

  const [empid, setempid] = useState(null);

  const [fname, setfname] = useState("");

  const handleChangefname = useCallback((event) => {
    setfname(event.target.value);
  }, []);

  const [lname, setlname] = useState("");

  const handleChangelname = useCallback((event) => {
    setlname(event.target.value);
  }, []);
  const [age, setage] = useState("");

  const handleChangeage = useCallback((event) => {
    setage(event.target.value);
  }, []);

  const [gender, setgender] = useState("");
  const handleChangegender = useCallback((event) => {
    setgender(event.target.value);
   
  }, []);

  const [selectedDate,setSelectedDate] = useState(null)

  const assignemployee = (data) => {
    setfname(data.firstname);
    setlname(data.lastName);
    setgender(data.gender);
    setage(data.age);
    var d = new Date(data.joineddate);
    setSelectedDate(d);

  };

  //const 

 const getemployee=()=> axios('https://localhost:12347/api/values', {
    method: "GET",
    withCredentials: true,
  }).then(response => {
    setEmployee(response.data)    
  }).catch(error => {
    console.log(error);
  });

  useEffect(()=>{
    getemployee();
  },[]);


  //Back to Home
  const backtohome = () => {
    props.history.push("/");
    };

    const addnewemplyee = () => {
      props.history.push("/addnewemployee");
      };


      //close
      const close = () => {
        setemployeedetail(false)
        setupdateemployee(false)
        };


//Edit

      const Editemployee = (cell) => {
        setemployeedetail(false)
        axios('https://localhost:12347/api/values/'+cell+'', {
    method: "GET",
    withCredentials: true,
  }).then(response => {
    console.log(response.data)
    setempid(cell)
    setupdateemployee(true)
    setupdateresult(response.data)
    assignemployee(response.data)
  }).catch(error => {
    console.log(error);
  });
        };




//update

const updateemployeesubmit = () => {
  setupdateemployee(false)
  setupdateemployee(false)
  var date = new Date(selectedDate),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  var dd =  [date.getFullYear(), mnth, day].join("/");
  axios('https://localhost:12347/api/values/', {
    method: "PUT",
    withCredentials: true,
    data: {
      id : empid,
      Firstname: fname,
      LastName: lname,
      Gender: gender,
      Age: age,
      Joineddate: dd
    }
}).then(response => {
console.log(response.data)
getemployee();
}).catch(error => {
console.log(error);
});
  };

//View

        const Viewemployee = (cell) => {
          setupdateemployee(false)
         axios('https://localhost:12347/api/values/'+cell+'', {
    method: "GET",
    withCredentials: true,
  }).then(response => {
    console.log(response.data)
    setemployeedetail(true)
    setviewresult(response.data)
  }).catch(error => {
    console.log(error);
  });
};

  //Delete
          const Deleteemployee = (cell) => {
            if(confirm('You are about to delete the employee'))
            {
              axios('https://localhost:12347/api/values/'+cell+'', {
    method: "DELETE",
    withCredentials: true,
  }).then(response => {
    console.log(response.data)
    getemployee();
  }).catch(error => {
    console.log(error);
  });
              return true;
            }
            else
            {
              return false;
            }
            };

  const state = { 
           
          columns: [
          { 
            dataField: 'firstname', 
            text: 'FirstName',
           sort:true
          }, {
            dataField: 'lastName',
            text: 'Lastname', 
            sort: true 
          },
          { 
           dataField: 'gender',
           text: 'Gender',
            sort: true  
           }, 
          {  
                  dataField: 'age',  
                  text: 'Age',  
                  sort: true  
          },  
                {  
                  dataField: 'joineddate',  
                  text: 'Joineddate',  
                  sort: true  
                },
                {  
                  dataField:'id',  
                  text: 'Actions', 
                  formatter: (cell, row) => <div><a href="#" onClick={()=>Viewemployee(cell)}>View</a> | <a href="#" onClick={()=>Editemployee(cell)}>Edit</a> | <a href="#" onClick={()=>Deleteemployee(cell)}>Delete</a></div>
                }
              ]  
        };

  const options = {  
                      page: 0,   
                      sizePerPageList: [ {  
                        text: '5', value: 5  
                      }, {  
                        text: '10', value: 10  
                      }, {  
                        text: 'All', value: emp.length  
                      } ], 
                      sizePerPage: 5,  
                      pageStartIndex: 0,   
                      paginationSize: 3,   
                      prePage: 'Prev',   
                      nextPage: 'Next',  
                      firstPage: 'First',
                      lastPage: 'Last',  
                      paginationPosition: 'top'    
                    }; 

                   
       return (  
        <React.Fragment>
                  <div className="container">  
                  <div className="row hdr">    
                  <div className="col-sm-12 btn btn-info"> 
                  Employee List   
                   </div>    
                    </div>   
                  <div  style={{ marginTop: 20 }}>  
                  <BootstrapTable 
                  striped
                  hover
                  keyField='id'
                  data={emp}   
                  columns={state.columns}
                  pagination={ paginationFactory(options) }
                  ></BootstrapTable>  
                </div> 

                 <button onClick={addnewemplyee}>Add New Employee</button> <button onClick={backtohome}>Back to Home</button>

                 {employeedetail ? (
              <div>
                <h1>Employee details</h1><br></br>
                <div>{viewresult.firstname} {viewresult.lastName} ({viewresult.gender},aged: {viewresult.age}) have been part of the Company since {viewresult.joineddate})</div><br></br>

                <button onClick={close}>Close</button>
                </div>
                ) : null}
 {updateemployee ? (
              <div>
                <div>
      <h1>Update the Employee details</h1>
     
      <label>First Name : </label>
      <input
                type="text"
                
                value={fname}
                onChange={handleChangefname}
              /><br></br>
      <label>Last Name : </label>
      <input
                type="text"
                
                value={lname}
                onChange={handleChangelname}
              /><br></br>
              <div onChange={handleChangegender}>
      <label>Gender:</label>
      {gender=="MALE" ? (<div><input type="radio" checked value="MALE" name="gender"/> Male</div>) : <div><input type="radio" value="MALE" name="gender"/> Male</div>}
      {gender=="FEMALE" ? (<div><input type="radio" checked value="FEMALE" name="gender"/> Female</div> ): <div> <input type="radio" value="FEMALE" name="gender"/> Female</div>}
      </div>

    <label>Age  </label>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<input
                type="text"
                
                value={age}
                onChange={handleChangeage}
              /><br></br>

      <label>Joined Date : </label>
      <DatePicker
        selected={selectedDate}
        onChange= {date => setSelectedDate(date)}
        dateFromat='YYYY-MM-dd'
        placeholder='YYYY-MM-dd'
      /><br></br>
      <input type="submit" onClick={updateemployeesubmit}  value="Submit"/><br></br>
      
    </div>
                </div>
                ) : null}

                </div>
             </React.Fragment>  
          );
  }
export default withRouter(Viewemployeelist)
