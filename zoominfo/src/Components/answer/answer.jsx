import React, { Component } from 'react';
import './answer.css';
import right from '../.././assets/Group.png';
import wrong from '../.././assets/Group 3.png';

class Answer extends Component {
    handelClickEvent = () => this.props.onSelect(this.props.index);

    getClasses(isButton) {
        let type = isButton ? "b" : "h";
        const classes = isButton ? ['divAnswerButtonConainer'] : [];
        if (isButton && this.props.OKSelcted) {
            classes.push('isHover');
        }
        if (this.props.OKSelcted && this.props.isSelected && this.props.rightAns) {
            classes.push(type + "RightColor");
        }
        else if (this.props.OKSelcted && this.props.isSelected && (!this.props.rightAns)) {
            classes.push(type + "WrongColor");
        }
        else if (this.props.isSelected) {
            classes.push(type + "Selected");
        }
        else {
            classes.push(type + 'Regular');
        }
        return classes.join(' ');
    }
    render() {
        return (
            <div className={`divContainer`} >
                <button className={this.getClasses(true)}
                    disabled={this.props.disabledButton}
                    onClick={this.handelClickEvent}
                >
                    <div className='answerButtonContainer'>
                        <div className={'indicator-wrap'}>
                        {
                            this.props.OKSelcted && this.props.isSelected
                            &&
                            <img src={(this.props.rightAns)? right : wrong} 
                                className={`indicator`}
                                alt="wright or wrong img" 
                            />
                        }
                        </div>
                        <h1 className={this.getClasses(false)} >{this.props.answerTitle}</h1>
                    </div>
                </button>
            </div>
        );
    }
}

export default Answer;