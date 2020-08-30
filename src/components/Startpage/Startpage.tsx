import * as React from "react";
import {Switch, BrowserRouter as Router,withRouter,Link,NavLink  } from "react-router-dom";
import "./Startpage.scss";
import AddNewemployee from "../Addnewemployee/Addnewemployee";
import Viewemployeelist from "../Viewemployeelist/Viewemployeelist";
import Route from 'react-router-dom/Route';
import axios from 'axios';
/**
 * @function Startpage
 * @summary Renders the Startpage component
 */

// Function fired when the user click login button



export function Startpage(props) {


 
  const addnewemplouee = () => {
    props.history.push("/addnewemployee");
    };

    const viewemployeelist = () => {
      props.history.push("/viewemployeelist");
      };

return(
  <Router>
    <div>
      <ul>

<li><a href="" onClick={addnewemplouee}>New Employee</a></li>
<li><a href="" onClick={viewemployeelist}>Employee List</a></li>
</ul>
     </div>
</Router>

  );

 

}

export default withRouter(Startpage)