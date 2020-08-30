import * as React from "react";
import {useState,useCallback} from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import './Addnewemployee.scss';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 
/**
 * @function Addnewemployee
 * @summary Renders the Addnewemployee component
 */



export function Addnewemployee(props) {


  

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

 
  const Addemployee=()=>{

    var date = new Date(selectedDate),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  var dd =  [date.getFullYear(), mnth, day].join("/");
  
axios('https://localhost:12347/api/values/', {
  method: "POST",
  withCredentials: true,
  data: {
    Firstname: fname,
    LastName: lname,
    Gender: gender,
    Age: age,
    Joineddate: dd
  }
}).then(response => {
  props.history.push("/viewemployeelist");
})
  }  

  
 

  const viewemployeelist = () => {
    props.history.push("/viewemployeelist");
    };

    const [selectedDate,setSelectedDate] = useState(null)

   
    
    
  return (
    <React.Fragment>
    <div>
      <h1>Please enter the details for the New Employee</h1><br></br>
     
      <label>First Name  </label>
      &nbsp;&nbsp;&nbsp;: <input
                type="text"
                
                value={fname}
                onChange={handleChangefname}
              /><br></br>
      <label>Last Name  </label>
      &nbsp;&nbsp;&nbsp;: <input
                type="text"
                
                value={lname}
                onChange={handleChangelname}
              /><br></br>
              <div onChange={handleChangegender}>
      <label>Gender</label> 
      
      
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="radio" value="MALE" name="gender"/> Male
        <input type="radio" value="FEMALE" name="gender"/> Female
      </div>

    <label>Age  </label>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input
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
      /><br></br><br></br>
      <input type="submit" onClick={Addemployee}  value="submit"/>&nbsp;&nbsp;&nbsp;<input type="submit" onClick={viewemployeelist} value="View Employee List"/>
      
    </div>
    </React.Fragment>
  );
}

export default withRouter(Addnewemployee)
