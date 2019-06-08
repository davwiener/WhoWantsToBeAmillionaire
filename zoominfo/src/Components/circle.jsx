import React, { Component } from 'react';  
import '.././index.css';
class Circle extends Component {
    state = { 
     
     }
     getBadgesClasses  (fill) 
    {
        return ("circleBackGround" + fill);
     }
    render() { 
        let fill =this.props.currentIdx >= this.props.index ? "Fill" : ""
        console.log( fill);
        //console.log(this.state.fill);
        return ( 
            <div id="circle" className={this.getBadgesClasses(fill)}>
           
            </div>
         );
    }
}
 
export default Circle;