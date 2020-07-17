import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from '@material-ui/icons/Phone';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import {Search} from '@material-ui/icons';
import Badge from "@material-ui/core/Badge";
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
import Input from "@material-ui/core/Input";


const mapStateToProps = state => {
  return {
    nrOfItemsInCard: state.cartItems.length,
    loggedInUser: state.loggedInUser
  };
};
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
              style={{backgroundColor: '#FAFAFB', width:'100%'}}
      >
        <Toolbar >
          <div className="left-part">
            <IconButton
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="small" style={{color:'#Ff036a'}}/>
            </IconButton>
            <NavLink
                to={"/"}
                exact
                style={{width:'20%', minWidth:90}}
               >
            <img src={cartImage} alt={"Logo"}/>
            </NavLink>
            <Input id='left-part-input'
                   disableUnderline={true}
              placeholder="Поиск товара по каталогу"
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
              <Search size="default" style={{color:'#fff'}}/>
            </Button>
          </div>
          <div className='middle-part'>
            <inform>
              <p>
                <a href="tel:+7-950-675-76-07"><PhoneIcon/> +7 (950) 675-76-07;</a>
              </p>
              <p style={{
                color: "grey",
                textDecoration: "none",
              }}>
                <NavLink
                    to={"/map"}
                    exact
                    style={{textDecoration: "none",
                      color:'grey',
                      marginLeft:'1%',
                      marginRight:'1%',
                      width:200}} >
                  <RoomOutlinedIcon />ул. Черняховского 15
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
