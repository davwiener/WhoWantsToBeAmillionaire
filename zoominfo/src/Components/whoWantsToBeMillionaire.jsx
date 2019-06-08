import React, { Component } from 'react';
import Answers from './answers';
import '.././index.css';
import Circle from './circle';
const jsonAdrr = 'https://opentdb.com/api.php?amount=10&type=multiple';
class WhoWantsToBeAMillionaire extends Component {
    state = { 
        questions : [],
        currentIdx : 0,
        currQuestion: "",
        answersArr : [],
        currect_answer :"",
        key : 0,
        disabledButton : true,
        ClickButoonEvent: null,
        ContButtonTxt : 'OK',
        CircelsBar : Array.apply(null, {length: 10}).map(Number.call, Number)
     }
   
     ClickButoonEventFun()
     {
        if(this.state.questions.length > this.state.currentIdx + 1)
        {
            this.setState({ContButtonTxt: 'Continue'})
        }
        else{
            this.setState({ContButtonTxt: 'Try again'})
        }
         //console.log("back to event");
         this.setState({disabledButton : !this.state.disabledButton});
         //console.log(this.state.ContButtonTxt);
         
         //console.log(this.state.ContButtonTxt);
     }
     setVals()
     {  console.log(this.state.CircelsBar)    ;
        const currQ = this.state.questions[this.state.currentIdx];
        this.setState({currQuestion : 'Q' + (this.state.currentIdx + 1 )+ ' ' + currQ.question});
        //this.setState({currentIdx : this.state.currentIdx + 1});
        //this.setState({answersArr : (currQ.incorrect_answers)});
        let tempArr = currQ.incorrect_answers;
        const random = Math.floor(Math.random() * (tempArr.length + 1));
        tempArr.splice(random, 0, currQ.correct_answer);
        this.setState({currectAnswer : currQ.correct_answer,
        answersArr : tempArr,
        key : (33+this.state.currentIdx),
        ClickButoonEvent : () => this.ClickButoonEventFun(),
        ContButtonTxt : 'OK',
        disabledButton : true
        });
        console.log(this.state.ContButtonTxt);
        //this.ClickButoonEventFun();
    //}
     }
     handelClickEvent =()=>{
        this.state.currentIdx ++; 
        if(this.state.questions.length <= this.state.currentIdx)
        {
            this.setState({currentIdx:0});
            this.loadData();
        }
        else{
            this.setVals();
        }
     }
     loadData()
     {
        fetch(jsonAdrr).then((response)=>
        {
            return response.json();
        }).then ((response)=>{
          
            this.setState({questions : response.results,
            CircelsBar : Array.apply(null, {length: response.results.length}).map(Number.call, Number)});
            this.setVals();
        });
     }
     componentWillMount(){
       this.loadData();
     }
    render() { 
       // console.log(this.state.currentIdx);
        return ( 
            <div className="container">
                <h1>{this.state.currQuestion}</h1>
                <Answers key={this.state.key} 
                         answersArr={this.state.answersArr} currectAnswer={this.state.currectAnswer}
                         ClickButoonEvent = {this.state.ClickButoonEvent}
                         disabledButton  = {(!this.state.disabledButton)}
                 >
                </Answers>
                <button disabled = {this.state.disabledButton}
                 onClick={this.handelClickEvent}
                >{this.state.ContButtonTxt}</button>
                <div  className="circleContainer"> 
                    {this.state.CircelsBar.map(index => (
                        <Circle
                            key = {(index + this.state.currentIdx)} 
                            currentIdx = {this.state.currentIdx}
                            index = {index}>
                        </Circle>
                    ))}
                </div>
            </div>
         );
    }
}
 
export default WhoWantsToBeAMillionaire;