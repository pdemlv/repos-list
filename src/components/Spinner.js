import React from "react";
import logo from '../img/logo.svg';

export default function Spinner() {
  return (
    <span className="spinner">
      <img src={logo} alt="" className="spinner-img"/>
    </span>
  )
}