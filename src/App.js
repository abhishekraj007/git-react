import React, { Component } from "react";
import UserContainer from "./components/UserProfile/UserContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "supreetsingh247" };
  }
  render() {
    return (
      <div className="App">
        <Header userName={this.state.userName} />
        <main className="app-main">
          <UserContainer userName={this.state.userName} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
