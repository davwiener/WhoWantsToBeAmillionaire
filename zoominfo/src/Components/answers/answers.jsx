import React, { Component } from 'react';

import './answers.css';
import Answer from '../answer/answer';

class Answers extends Component {
    render() {
        return (
            <div className="answersButtonContainer">
                {this.props.answersArr.map((answer, index) => (
                    <Answer key={index}
                        answerTitle={answer}
                        disabledButton={this.props.disabledButton}
                        onSelect={this.props.onAnswerSelect}
                        isSelected={index === this.props.selectedItemIndex}
                        OKSelcted={this.props.OKSelcted}
                        rightAns={this.props.selectedItemIndex === this.props.rightIdx}
                        index={index}
                    />
                ))}
            </div>
        );
    }
}

export default Answers;