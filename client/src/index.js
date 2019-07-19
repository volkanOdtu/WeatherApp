import React from "react";
import ReactDOM from "react-dom";
import "./views/css/styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Router>
    <App>
      <Route exact path="/" component={Home} />
      <Route exact path="/current-weather" component={CurrentWeather} />
      <Route exact path="/error" component={ErrorDisplay} />
    </App>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
