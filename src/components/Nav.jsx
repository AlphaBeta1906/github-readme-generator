import ThemeSwitch from "./ThemeSwitch";

function NavBar(){
    return (
        <nav className="container">
            <ul>
                <li style={{paddingRight: "20px"}}><strong>Brand</strong></li>
            </ul>
            <ul>
                <li>    
                    <ThemeSwitch/>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar