
// importing components from react-router-dom package

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    
} from "react-router-dom";

// import Home component
import styled from "styled-components";
import Dashboard from './Dashboard';
import Dashboard1 from './Dashboard1';
import Dashboard2 from './Dashboard2';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart } from "@fortawesome/free-solid-svg-icons";


// import About component

const Header = styled.div`
body {
  margin:0;
  font-family: 'Source Sans Pro';
}


a{
  text-decoration: none;
  color: white;
}

.navbar{
  display: flex;
  color: white;
  
  align-items: center;
  background-color: #263343;
  padding: 20px 30px;
}

.navbar__logo{
  font-size: 22px;
  color: white;
  padding-left: 20px;  

}


.navbar__menu{
  font-size: 16px;
  display: flex;

  
  list-style: none;
  padding: 4px 20px 0 50px;


}

.navbar__menu li{
  padding: 12px 8px;
}

.navbar__menu li:hover{
  background-color: #90d2d8;
  border-radius: 4px;
}


.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}


@media screen and (max-width: 768px) {
  .navbar{
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 24px;
  }

  .navbar__menu{
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .navbar__menu li{
    width: 100%;
  }

}`;
function App() {
    return (

        <>    
        
        <Header>
            
        <nav class="navbar">
        <div class="navbar__logo">
        <FontAwesomeIcon icon={faBarChart} />
        
        <a href="/">&nbsp;DataLab. Reporting Dashboard</a>
        </div>

        <ul class="navbar__menu">
        <li><a href="/">I. 서비스</a></li>
        <li><a href="/chart1">II. 승인취소</a></li>
        <li><a href="/chart2">III. 등록지원</a></li>
        
        </ul>
        </nav>


        </Header>
        
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