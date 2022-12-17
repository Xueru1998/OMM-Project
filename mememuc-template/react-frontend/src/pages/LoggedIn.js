import React from "react";

class LoggedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: "",
        };
    }
    componentDidMount() {
        fetch("http://localhost:5000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                this.setState({ userData: data.data });
            });
    }
    render() {
        return (
            <div>
                Name<h1>{this.state.userData.fname}fsd</h1>
                Email <h1>{this.state.userData.email}fdsd</h1>
            </div>
        );
    }
}

export default LoggedIn;