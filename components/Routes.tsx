// Renders the view based on the route
import * as React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

/* use react lazy to lazy load the routes. the bundle associated with the route will be loaded only when it is needed 
   this helps to reduce the bundle download time on initial load 
 */

const Startpage = React.lazy(() =>
  import(/* webpackChunkName: "bundle.startpage" */ "./Startpage/Startpage")
);

const Addnewemployee = React.lazy(() =>
  import(/* webpackChunkName: "bundle.addnewemployee" */ "./Addnewemployee/Addnewemployee")
);

const Viewemployeelist = React.lazy(() =>
  import(/* webpackChunkName: "bundle.viewemployeelist" */ "./Viewemployeelist/Viewemployeelist")
);

/**
 * @class Routes
 * @summary Renders the view based on the route that has been selected
 */
class Routes extends React.Component {
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <Router>
        <Switch>
        <Route exact path ="/" component={this.startpage} />
          <Route path ="/addnewemployee" component={this.addnewemployee} />
          <Route path ="/viewemployeelist" component={this.viewemployeelist} />
        </Switch>
      </Router>
    );
  }

  /**
   * @method
   * @private
   * @summary Renders the page not found page
   */
  

  

  private startpage() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Startpage />
      </React.Suspense>
    );
  }

  private addnewemployee() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Addnewemployee />
      </React.Suspense>
    );
  }
  private viewemployeelist() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Viewemployeelist />
      </React.Suspense>
    );
  }
}

export default Routes;
