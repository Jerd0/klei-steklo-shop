import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div
        style={{
          boxSizing: "border-box",
          padding: 10,
          borderTop: "1px solid lightgray",
          height: 100,
          backgroundColor: "#f1f1f1",
          justifyContent: "space-around",
          display: "flex"
        }}
      >
        <div>
          <div
            style={{ color: "#504F5A", fontWeight: "bold", marginBottom: 10 }}
          >
            Купить
          </div>
          <NavLink
            to={"/payment"}
            exact
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
            activeStyle={{
              color: "#4282ad",
              textDecoration: "underline"
            }}
          >
            <div className="footerItem">Как оплатить</div>
          </NavLink>
          <NavLink
            to={"/delivery"}
            exact
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
            activeStyle={{
              color: "#4282ad",
              textDecoration: "underline"
            }}
          >

          </NavLink>
        </div>
        <div>
          <div
            style={{ color: "#504F5A", fontWeight: "bold", marginBottom: 10 }}
          >
            О нас
          </div>
          <NavLink
            to={"/info"}
            exact
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
            activeStyle={{
              color: "#4282ad",
              textDecoration: "underline"
            }}
          >
            <div className="footerItem">Информация о компании</div>
          </NavLink>
        </div>
        <div>
          <div
            style={{ color: "#504F5A", fontWeight: "bold", marginBottom: 10 }}
          >
            Социальные сети
          </div>
          <a
            href="https://www.instagram.com/klei_steklo/"
            target="blank"
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
          >
            <div className="footerItem">Instagram</div>
          </a>
            <a
                href='https://vk.com/klei_steklo'
                target='blank'
                style={{
                    textDecoration:'none',
                    color: 'rgb(32,32,34)'
                }}
            >
                <div className='footerItem'>Vk</div>
            </a>
        </div>
      </div>
    );
  }
}

export default Footer;
