import React, { Component } from 'react';
import './circle.css';
class Circle extends Component {
    getBadgesClasses(fill) {
        const classes = ['circle'];
        classes.push(('circleBackGround' + fill));
        return classes.join(' ');
    }
    render() {
        let fill = this.props.currentIdx >= this.props.index ? "Fill" :"";  
        return (
            <div className={this.getBadgesClasses(fill)} />
        );
    }
}

export default Circle;