import "./Homepage.css"

function Homepage() {
    return (
        <div className="Home">
            <ul className="Navbar">
                <li className="logo">HOBIGOWES</li>
                <li className="SignIn"><a href=""><strong>Sign In</strong></a></li>
                <li className="SignUp"><a href=""><strong>Sign Up</strong></a></li>
            </ul>

        </div>
    );
}

export default Homepage;