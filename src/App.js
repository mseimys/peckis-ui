import React from "react";
import CanvasDraw from "react-canvas-draw";

import { guessService } from "./service";

const resetState = {
  error: "",
  guess: "Click Guess To Know",
  isLoading: false
};

class App extends React.Component {
  state = {
    ...resetState
  };

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  handleGuess = async () => {
    this.setState({
      ...resetState,
      isLoading: true
    });
    const canvas = this.canvas.current;
    const image = canvas.ctx.drawing.canvas.toDataURL("image/png");
    canvas.clear();

    try {
      const guess = await guessService(image);
      this.setState({
        guess,
        error: "",
        isLoading: false
      });
    } catch (e) {
      this.setState({
        guess: "?",
        error: String(e),
        isLoading: false
      });
    }
  };

  handleClear = () => {
    this.canvas.current.clear();
  };

  render() {
    const { guess, error, isLoading } = this.state;
    return (
      <div className="container">
        {isLoading && <div className="overlay" />}
        <h1>Peckis</h1>
        <h4>Draw any digit and click guess</h4>
        <div className="board">
          <CanvasDraw ref={this.canvas} brushRadius={16} brushColor="#000" />
        </div>
        <div className="action-bar">
          <button onClick={this.handleGuess}>Guess</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="guess-bar">
          {isLoading ? (
            <span>Guessing...</span>
          ) : (
            <span>My guess: {guess}</span>
          )}
        </div>
      </div>
    );
  }
}

export default App;
