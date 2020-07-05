import React, { Component} from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import { Switch, Route } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import Order from "./Components/Order/Order";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import Maps from './Components/Maps/Maps.jsx'
import AwesomeSlider from 'react-awesome-slider';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fall-animation/fall-animation.scss'
import MAIN1 from './Asserts/MAIN1.jpg'
import MAIN2 from './Asserts/MAIN2.jpg'
import MAIN3 from './Asserts/MAIN3.jpg'
class App extends Component {
  render() {
    return (

      <div className="app">
        <Header />
          <AwesomeSlider
              animation="fallAnimation"
              cssModule={[CoreStyles, AnimationStyles]}
              style={{maxWidth:'100%', marginBottom:'5%', marginTop:'1%'}}
          >
              <div><img
                  style={{maxWidth:'100%', maxHeight:'100%' }}
                  src={MAIN1} alt={'Клеим стёлка'}/></div>
              <div> <img style={{maxWidth:'100%', maxHeight:'100%'}} alt={'Клеим стёлка'} src={MAIN2} /></div>
              <div> <img style={{maxWidth:'100%', maxHeight:'100%'}}  alt={'Клеим стёлка'} src={MAIN3} /></div>
          </AwesomeSlider>
        <div className="app-body">
          <Menu />
          <div className="content">
            <CartDialog />
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/details/:id" component={Details} />
              <Route path="/login" component={Login} />
              <Route path='/map' component={Maps}/>
              <ProtectedRoute path="/order" component={Order} />
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Cтраница ещё не сделана</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

export default App;
