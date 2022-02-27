import React from "react"
import ReactDOM from "react-dom"
import "@picocss/pico"
import App from "./App"
import NavBar from "./components/Nav"
import "./styles/styles.css"

ReactDOM.render(
  <React.StrictMode>
    <div className="container"> 
      <NavBar/>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
)
