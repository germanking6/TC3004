import logo from "../assets/IBM_logo.svg";

const logoStyle = {
    width: "100px",
};

export default function HeaderComponent(props) {
    return <header style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "20px"
    }}>
        <img src={logo} style={logoStyle}/>
        <h2 style={{
        }}
        >{props.title}</h2>
        <img src={logo} style={logoStyle}/>
    </header>
};