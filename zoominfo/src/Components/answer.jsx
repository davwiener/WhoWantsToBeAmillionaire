import React, { Component } from 'react';
import '.././index.css';
import right from '.././assets/Group.png';
import wrong from '.././assets/Group 3.png';
class Answer extends Component {
    state = { 
        answerTitle : this.props.answerTitle,
        rightAnswer : this.props.rightAnswer,
        rightVisibilty : false,
        wrongVisibility : false,
        disableButton : false
     };
     handelClickEvent = ()=>{
         //console.log(this.props);
        this.props.ClickButoonEvent();
        if(this.state.rightAnswer)
        {
            this.setState({rightVisibilty : true});
        }
        else
        {
            this.setState({wrongVisibility : true});
        }
        //console.log("click");
     }
     mouserHover = (isHover) =>
     {
        
     }
     getBadgesClasses  () 
     {
        let classes = "answerButtonConsadtainer";
        if(this.state.rightVisibilty)
        {
            classes += ' ' + "RightBorderColor";
        }
        else if(this.state.wrongVisibility){
            classes += ' ' + "WrongBorderColor";
        }
        return classes;
     }
    render() { 
       // console.log('answerTitle:');
       // console.log(this.state.answerTitle);
        return ( 
            <div className={this.getBadgesClasses()}>
                <button  
                 disabled = {this.props.disabledButton}
                 onClick={this.handelClickEvent}
                 onMouseEnter={this.mouserHover(true)}
                 onMouseLeave={this.mouserHover(false)}
                >
                    <img style={{visibility: this.state.rightVisibilty ? 'visible' : 'hidden' }} src={right}></img>
                    <img style={{visibility: this.state.wrongVisibility ? 'visible' : 'hidden' }} src={wrong}></img>
                    <h1>{this.props.answerTitle}</h1>
                </button>
            </div>
         );
    }
}
 
export default Answer;