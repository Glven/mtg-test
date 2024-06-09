import React from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routesArr} from "./utils/navigation/routes";
class App extends React.Component {
  render () {
    return (
        <>
          <BrowserRouter>
              <Header/>
              <Routes>
                  {routesArr.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} />
                  )}
              </Routes>
          </BrowserRouter>
        </>
    )
  }
}

export default App;
