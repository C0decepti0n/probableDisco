import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        avatarImages: [],
        currentImage: ''
    };
    this.stateChanger = this.stateChanger.bind(this);
  }



  componentDidMount() {}

stateChanger(stateName, dataToInsert){
    this.setState({
        [stateName]: dataToInsert
    })
}

  render() {
    return <div>placeholder</div>;
  }
}

export default App;
