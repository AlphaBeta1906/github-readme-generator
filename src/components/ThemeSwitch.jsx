import { useState } from "react"
import u from "umbrellajs"

function ThemeSwitch(){
    const [theme,setTheme] = useState(localStorage.getItem("theme") === null ? "light" : localStorage.getItem("theme"))
    u("html").attr("data-theme",theme)
    function switchTheme(){
        setTheme(theme == "dark"?"light":"dark")
        u("html").attr("data-theme",theme)
        localStorage.setItem("theme",theme == "light"?"dark":"light")
    }
    return (
        <div className="theme" style={{height:"1rem",width:"1rem",textAlign: "center",cursor: "pointer"}} onClick={switchTheme}>
                {
                    theme == "dark"?
                        (
                            <i className="fas fa-sun"></i>
                        ):
                        (
                            <i className="fas fa-moon"></i>
                        )
                }
        </div>
    )
}

export default ThemeSwitch