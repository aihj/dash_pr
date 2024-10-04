
// importing components from react-router-dom package

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    
} from "react-router-dom";

// import Home component
import Chart0 from "./Chart0";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

import Dashboard from './Dashboard';
import Dashboard1 from './Dashboard1';
import Dashboard2 from './Dashboard2';

// import About component
function App() {
    return (

        
        <>    
        <div className="App">
                      
          <br/>
            {/* This is the alias of BrowserRouter i.e. Router */}
            <Router>
                <Routes>
                    {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
                    <Route
                        exact
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        exact
                        path="/chart1"
                        element={<Dashboard1 />}
                    />

                    <Route
                        exact
                        path="/chart2"
                        element={<Dashboard2 />}
                    />                    
                </Routes>
            </Router>
        </div>
        </>
        
    );
}

export default App;