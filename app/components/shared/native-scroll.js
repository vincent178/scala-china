import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class NativeScroll extends Component {

  //componentDidMount() {
  //  debugger;
  //  this.addEventListener('scroll', this.onScroll.bind(this), false);
  //}
  //
  //componentWillUnmount() {
  //  debugger;
  //  this.removeEventListener('scroll', this.onScroll.bind(this), false);
  //}

  getScrollXY() {
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
      //Netscape compliant
      scrOfY = window.pageYOffset;
      scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
      //DOM compliant
      scrOfY = document.body.scrollTop;
      scrOfX = document.body.scrollLeft;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
      //IE6 standards compliant mode
      scrOfY = document.documentElement.scrollTop;
      scrOfX = document.documentElement.scrollLeft;
    }
    return [ scrOfX, scrOfY ];
  }

  getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  onScroll() {

    console.log("OnScroll");
    if (this.getScrollXY()[1] >=  this.getDocHeight() - window.innerHeight - 100) {
      console.log("[NativeScroll] this.props.dispatch(this.props.scrollFunc())");
      this.props.dispatch(this.props.scrollFunc());
    }
  }

  handleTouchMove(e) {
    this.onScroll(e);
  }

  render() {
    return (
      <div onTouchMove={this.handleTouchMove.bind(this)} onScroll={this.onScroll.bind(this)}>
        {this.props.children}
      </div>
    );
  }
}

NativeScroll.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

