import React from "react";
import { LightningBolt } from "../assets/lightning.svg";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.inputFieldRef = React.createRef();
  }
  handleButtonClick = event => {
    this.props.actions.setLocationTextInput({
      locationData: this.inputFieldRef.current.value
    });
  };

  render() {
    return (
      <div>
        <div className="header">
          <h2>Weather Forcast</h2>
          <img src={LightningBolt} />
        </div>
        <div className="instructions">
          <p>
            Enter a US zipcode below to get the current weather conditions for
            that area.{" "}
          </p>
        </div>
        <div className="zipcodeInput">
          <form method="POST" action="/search-location">
            <input
              type="text"
              placeholder="Enter zipcode"
              name="zipcode"
              ref={this.inputFieldRef}
            />
            <button>ENTER</button>
          </form>
        </div>
        <button onClick={this.handleButtonClick} />
      </div>
    );
  }
}
