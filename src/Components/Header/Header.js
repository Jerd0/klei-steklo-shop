import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search';
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {NavLink, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { showCartDlg, toggleMenu, logout } from "../../Redux/Actions";
import cartImage from "../../Images/logo2.png";
import Auth from "../../Auth";
import { categories } from "../../Data";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

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
      <AppBar
        position="static"
        style={{ backgroundColor: "#FAFAFB", padding: '1%', minWidth:"820", width:'100%', marginRight:'15%'}}
      >
        <Toolbar >
          <div className="left-part">
            <IconButton
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="large" />
            </IconButton>
            <NavLink
                to={"/"}
                exact
               >
            <img src={cartImage} alt={"Logo"} style={{ marginLeft: '30%', width:'60%' }}/>
            </NavLink>
            <TextField
              label="Поиск товара по каталогу"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              style={{ marginLeft: '1%', width: 500 }}
            />

            <Button
              style={{ marginLeft: '1%', marginRight: '1%', color:'gray', borderColor:'#ababab'}}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.props.history.push(
                  "/?category=" +
                    this.state.categoryFilterValue +
                    "&term=" +
                    this.state.searchTerm
                );
              }}
            >
              <SearchIcon size="default" />
            </Button>
          </div>
          <div className="right-part">

            {!this.props.loggedInUser ? (
              <Button
                variant="outlined"
                style={{marginLeft: '1%'}}
                color="primary"
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
                style={{ backgroundColor: "#ababab", marginRight: '1%' }}
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
              <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
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
        <div className="right-part" style={{
          color: "grey",
          textDecoration: "none"
        }}>
          Наш телефон:
          <a style={{
            color:'grey',
            textDecoration: "none",
            marginLeft:'1%',
            marginRight:'3.5%'
          }} href="tel:+7-950-675-76-07">+7-950-675-76-07;</a>
        </div>
        <div className="right-part" style={{
          color: "grey",
          textDecoration: "none",
        }}>
          <NavLink
              to={"/map"}
              exact
              style={{textDecoration: "none",
              color:'grey',
                marginRight:'3.5%'}} >
          Наш адрес: Черняховского 15
          </NavLink>
        </div>
      </AppBar>
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;
