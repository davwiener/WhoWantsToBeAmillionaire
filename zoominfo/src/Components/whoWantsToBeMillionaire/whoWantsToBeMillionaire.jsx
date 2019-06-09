import React, { Component } from 'react';
import Answers from '../answers/answers';
import './whoWantsToBeMillionaire.css';
import Circle from '../circle/circle';
const jsonAdrr = 'https://opentdb.com/api.php?amount=10&type=multiple';
import zoominfoImg from '../.././assets/Group 4.png';
import backGroungImg from '../.././assets/Group 5.png';
class WhoWantsToBeAMillionaire extends Component {
    
    state = {
        questions: [],
        currentQuesIdx: 0,
        disabledButton: true,
        disableAnswerBottons: false,
        contButtonTxt: 'OK',
        selectedItemIndex: -1,
        OKSelcted: false,
        isConnected: false,
    }
    componentDidMount() {
        this.loadData();
    }
    stringParse(text) {
        return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }
    onAnswerSelect = (index) => this.setState({
            selectedItemIndex: index,
            disabledButton: false
    });

    parseQuestion = (question,index) => {
        let tempArr = question.incorrect_answers.slice();
        const random = Math.floor(Math.random() * (tempArr.length + 1));
        tempArr.splice(random, 0, question.correct_answer);
        tempArr = tempArr.map(ans => this.stringParse(ans));
        return ({
            "currQuestion":this.stringParse(question.question),
            "answersArr":tempArr,
            "rightIdx":random,
            "index":index
        });
    };
    loadData() {
        fetch(jsonAdrr).then((response) => {
            return response.json();
        }).then((response) => {
            this.setState({
                questions: response.results.map(this.parseQuestion),
                isConnected: true,
                disabledButton: true,
            });
        }).catch((rej) => {
            alert("can't connect!\nBecuase:" + rej);
            this.setState({ isConnected: false });
        });
    }
    handelClickEvent = () => {
        if (this.state.contButtonTxt === 'Continue' || this.state.contButtonTxt === 'Try again') {
            let tryAgain = false;
            if(this.state.contButtonTxt === 'Try again')
            {
                tryAgain = true;
            }
            this.setState({
                disableAnswerBottons: false,
                disabledButton : true,
                selectedItemIndex: -1,
                OKSelcted: false,
                contButtonTxt: 'OK',
                currentQuesIdx : (this.state.currentQuesIdx + (tryAgain? 0 : 1))
            });
            if (this.state.questions.length <= (this.state.currentQuesIdx + 1)) {
                this.setState({ currentQuesIdx: 0,
                                questions:[],
                                isConnected:false});
                this.loadData();
            }
        }
        else {
            this.setState({
                disableAnswerBottons: true,
                OKSelcted: true,
            });
            if (this.state.questions.length > this.state.currentQuesIdx + 1) {
                this.setState({ contButtonTxt: 'Continue' })
            }
            else {
                this.setState({ contButtonTxt: 'Try again' })
            }

        }
    }
    getClasses() {
        const classes = ['okButton'];
        if (this.state.disabledButton) {
             classes.push('isHover')
        }
        if (!this.state.disabledButton) {
            classes.push('onOkEnabeld')
        }
        else {
            classes.push('onOkDissabeld')
        }
        return classes.join(' ');
    }

    render() {


        return (
            this.state.questions.length > 0 && this.state.isConnected
            &&
            <div className="container">
                <div className="topContainer">
                    <img src={backGroungImg} className='imgBGRotate' alt='top img'></img>
                    <img src={zoominfoImg} className='zoominfo' alt='zoominfo img'></img>
                </div>
                <div className="middleContainer">
                    <div className='qustionClass'>
                        <h1 className='qNumclass'>Q:{this.state.currentQuesIdx + 1} </h1>
                        <h2 className='qClass'>{this.state.questions[this.state.currentQuesIdx].currQuestion}</h2>
                    </div>
                    <Answers
                        selectedItemIndex={this.state.selectedItemIndex}
                        onAnswerSelect={this.onAnswerSelect}
                        answersArr={this.state.questions[this.state.currentQuesIdx].answersArr} 
                        disabledButton={this.state.disableAnswerBottons}
                        rightIdx={this.state.questions[this.state.currentQuesIdx].rightIdx}
                        OKSelcted={this.state.OKSelcted}
                    >
                    </Answers>
                    <button className={this.getClasses()} disabled={this.state.disabledButton}
                        onClick={this.handelClickEvent}
                    >
                        <h2>{this.state.contButtonTxt}</h2>
                    </button>
                    <div className="circleContainer">
                        {this.state.questions.map(question => (
                            <Circle
                                key={question.index}
                                currentIdx={this.state.currentQuesIdx}
                                index={question.index}>
                            </Circle>
                        ))}
                    </div>
                </div>
                <div className='bottomContainer'>
                    <img className='imgBG' src={backGroungImg} alt='bottom img'></img>
                </div>
            </div>
        );
    }
}
export default WhoWantsToBeAMillionaire;