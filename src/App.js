import React, { Component } from 'react';
import 'flexboxgrid2';
import { GithubPicker } from 'react-color';
import styled from 'styled-components';

const Color = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: linear-gradient(${props => props.gardientStart}, ${props => props.gardientEnd});
  height: 100vh;
  width: 100%;
`;

const StyledInput = styled.input`
  border: 0;
  border-bottom: 2px solid white;
  width: 20%;
  font-size: 30px;
  height: 70px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  background: transparent;
  color: white;

  &::placeholder {
    color: white;
  }
`;

const StyledButton = styled.button`
  border: 0;
  font-size: 30px;
  height: 70px;
  padding: 10px;
  margin: 10px;
  background: transparent;
  color: white;
`;

const Info = styled.div`
  display: ${props => (props.hasError ? 'block' : 'none')};
  position: absolute;
  font-size: 30px;
  color: black;
`;

class App extends Component {
  state = {
    gradientStart: '#FF005E',
    gradientEnd: '#00E6FF',
    inputStart: '',
    inputEnd: '',
    hasError: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    const { inputStart, inputEnd } = this.state;
    if (regex.test(inputStart) && regex.test(inputEnd)) {
      this.setState({
        gradientStart: inputStart,
        gradientEnd: inputEnd,
      });
    } else {
      this.setState({
        hasError: true,
      });
    }
  };

  handleOnColorPickerChange = type => ({ hex }) => {
    this.setState({
      [type]: hex,
      hasError: false,
    });
  };

  handleChange = type => ({ target: { value } }) => {
    this.setState({
      hasError: false,
      [type]: value[0] !== '#' ? `#${value}` : value,
    });
  };

  handleOnBLur = type => ({ target: { value } }) => {
    this.setState({
      [type]: value.length === 1 && value[0] === '#' ? '' : value,
    });
  };

  render() {
    const {
      gradientStart, gradientEnd, inputStart, inputEnd, hasError,
    } = this.state;
    return (
      <Color gardientStart={gradientStart} gardientEnd={gradientEnd}>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row center-lg">
              <div className="col-lg-12">
                <StyledInput
                  placeholder="Type your color"
                  ref={(node) => {
                    this.gradientStart = node;
                  }}
                  onChange={this.handleChange('inputStart')}
                  value={inputStart}
                  onBlur={this.handleOnBLur('inputStart')}
                />
                <StyledInput
                  placeholder="Type your color"
                  ref={(node) => {
                    this.gradientEnd = node;
                  }}
                  onChange={this.handleChange('inputEnd')}
                  value={inputEnd}
                  onBlur={this.handleOnBLur('inputEnd')}
                />
                <StyledButton>Go</StyledButton>
              </div>
            </div>
            <div className="row center-lg">
              <div className="col-lg-offet-6 col-lg-3">
                <GithubPicker onChangeComplete={this.handleOnColorPickerChange('inputStart')} />
              </div>
              <div className="col-lg-3">
                <GithubPicker onChangeComplete={this.handleOnColorPickerChange('inputEnd')} />
              </div>
            </div>
            <div className="row center-lg">
              <Info hasError={hasError}>Type valid color</Info>
            </div>
          </div>
        </form>
      </Color>
    );
  }
}

export default App;
