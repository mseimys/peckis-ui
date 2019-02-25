import React from 'react';
import CanvasDraw from 'react-canvas-draw';

import { guessService } from './service';

const resetState = {
  error: '',
  guess: 'Click Guess To Know'
};

class App extends React.Component {
  state = { ...resetState }

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  handleGuess = async () => {
    this.setState({ ...resetState });
    const canvas = this.canvas.current;
    const image = canvas.ctx.drawing.canvas.toDataURL('image/png');
    canvas.clear();

    try {
      const guess = await guessService(image);
      this.setState({
        guess,
        error: '',
      });
    } catch (e) {
      this.setState({
        guess: '?',
        error: String(e),
      });
    }
  }

  handleClear = () => {
    this.canvas.current.clear();
  }

  render() {
    const { guess, error } = this.state;
    return (
      <div className="container">
        <h1>Peckis</h1>
        <div className="board">
          <CanvasDraw ref={this.canvas} brushRadius={16} brushColor="#000" />
        </div>
        <div className="action-bar">
          <button onClick={this.handleGuess}>Guess</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="guess-bar">
          My guess: {guess}
        </div>
      </div>
    );
  }
}

export default App;
