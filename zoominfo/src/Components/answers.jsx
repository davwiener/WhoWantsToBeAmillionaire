import React, { Component } from 'react';   
import Answer from './answer';
import '.././index.css';

class Answers extends Component {//to do implement function that only for 4
    state = {
        answers:[],
        childChange : true,
        updateComponots: false,
    }
    componentWillMount(){
       this.setState({answers : [ 
            {id:0 ,answerTitle : this.props.answersArr[0],rightAnswer : this.props.answersArr[0] === this.props.currectAnswer},
            {id:1 ,answerTitle : this.props.answersArr[1],rightAnswer : this.props.answersArr[1] === this.props.currectAnswer},
            {id:2 ,answerTitle : this.props.answersArr[2],rightAnswer : this.props.answersArr[2] === this.props.currectAnswer},
            {id:3 ,answerTitle : this.props.answersArr[3],rightAnswer : this.props.answersArr[3] === this.props.currectAnswer}
        ]});
    }
    render() { 
        return (
            
            <div className="answersButtonContainer">
                {this.state.answers.map(answer => (
                    <Answer key={answer.id} answerTitle={answer.answerTitle} rightAnswer={answer.rightAnswer}
                    ClickButoonEvent = {this.props.ClickButoonEvent}
                    updateComponots = {this.props.updateComponots}
                    disabledButton  = {this.props.disabledButton}
                     >
                    </Answer>
                   ))}
            </div>
          );
    }
}
 
export default Answers;