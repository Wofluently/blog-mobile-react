import React, { Component } from "react";

export default WrappedComponent => {
  class HocLoading extends Component {
    constructor(props) {
      super(props);
      this.state = {
        percent: 0,
        showPercent: true,
        interval: 0
      };
      this.stopLoading = this.stopLoading.bind(this);
    }

    componentWillMount() {
      var interval = setInterval(() => {
        if (this.state.percent < 80) {
          this.setState((prevState, props) => ({
            percent: prevState.percent + 10
          }));
        }
      }, 100);
      this.setState({
        interval: interval
      });
    }

    stopLoading() {
      clearInterval(this.state.interval);
      this.setState({
        percent: 100
      });
      setTimeout(() => {
        this.setState({
          showPercent: false
        });
      }, 500);
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          stopLoading={this.stopLoading}
          {...this.props}
        />
      );
    }
  }

  return HocLoading;
};
