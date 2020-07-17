import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import PhoneIcon from '@material-ui/icons/Phone';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import {Search} from '@material-ui/icons';
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {NavLink, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {showCartDlg, toggleMenu, logout, toggleSlider} from "../../Redux/Actions";
import cartImage from "../../Images/pink_logo(1).png";
import Auth from "../../Auth";
import { categories } from "../../Data";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";


const mapStateToProps = state => {
  return {
    nrOfItemsInCard: state.cartItems.length,
    loggedInUser: state.loggedInUser
  };
};
// const categoryOptions = categories.map(x => {
//   return (
//       <MenuItem key={x.name} value={x.name}>
//         {x.name}
//       </MenuItem>
//   );
// });
class ConnectedHeader extends Component {
  state = {
    searchTerm: "",
    anchorEl: null,
    categoryFilterValue: categories[0].name
  };
  render() {
    let { anchorEl } = this.state;

    return (
      <AppBar className='AppBar'
        position="static"
              style={{backgroundColor: '#FAFAFB'}}
      >
        <Toolbar >
          <div className="left-part">
            <IconButton
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="small" />
            </IconButton>
            <NavLink
                to={"/"}
                exact
                style={{width:'20%', minWidth:90}}
               >
            <img src={cartImage} alt={"Logo"}/>
            </NavLink>
            <TextField
              label="Поиск товара по каталогу"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              onKeyPress={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === 'Enter') {
                  this.props.history.push(
                      "/?category=" +
                      this.state.categoryFilterValue +
                      "&term=" +
                      this.state.searchTerm
                  );
                  ev.preventDefault();
                  this.props.dispatch(toggleSlider());
                }
              }}
                style={{ marginLeft: '1%',
                  width: 500,
                  border:'2px solid #Ff036a',
                  borderRadius:'0px 10px 0px 0px',
                }}
              />
            <Button id='left-part-button'
              variant="outlined"
              color="primary"
              onClick={() => {
                this.props.history.push(
                  "/?category=" +
                    this.state.categoryFilterValue +
                    "&term=" +
                    this.state.searchTerm
                );
                this.props.dispatch(toggleSlider());
              }}
            >
              <Search size="default" style={{color:'#Ff036a'}}/>
            </Button>
            {/*<Select*/}
            {/*    style={{ maxWidth: 200, marginLeft: 20 }}*/}
            {/*    value={this.state.categoryFilterValue}*/}
            {/*    MenuProps={{*/}
            {/*      style: {*/}
            {/*        maxHeight: 500*/}
            {/*      }*/}
            {/*    }}*/}
            {/*    onChange={e => {*/}
            {/*      this.setState({ categoryFilterValue: e.target.value });*/}
            {/*    }}*/}
            {/*>*/}
            {/*  {categoryOptions}*/}
            {/*</Select>*/}
          </div>
          <div className='middle-part'>
            <inform>
              <p className="right-part">
                <PhoneIcon/>
                <a href="tel:+7-950-675-76-07">+7-950-675-76-07;</a>
              </p>
              <p className="right-part" style={{
                color: "grey",
                textDecoration: "none",
              }}>
                <NavLink
                    to={"/map"}
                    exact
                    style={{textDecoration: "none",
                      color:'grey',
                      marginLeft:'1%',
                      marginRight:'3.5%',
                      width:170}} >
                  <RoomOutlinedIcon/> Черняховского 15
                </NavLink>
              </p>
            </inform>
          </div>
          <div className="right-part">
            {!this.props.loggedInUser ? (
              <Button
                variant="outlined"
                style={{marginLeft: '1%', border:'2px solid #Ff036a'}}
                color='default'
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Войти
              </Button>
            ) : (
              <Avatar
                onClick={event => {
                  this.setState({ anchorEl: event.currentTarget });
                }}
                style={{ backgroundColor: "#Ff036a", marginRight: '1%' }}
              >
                <Person />
              </Avatar>
            )}
            <IconButton
              aria-label="Cart"
              onClick={() => {
                this.props.dispatch(showCartDlg(true));
              }}
            >
              <Badge badgeContent={this.props.nrOfItemsInCard} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/order");
                }}
              >
                Оформить заказ
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Auth.signOut(() => {
                    this.props.dispatch(logout());
                    this.props.history.push("/");
                  });
                  this.setState({ anchorEl: null });
                }}
              >
                Выйти
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;
