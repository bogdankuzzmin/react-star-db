import React, {Component} from 'react';

import ErrorIndicator from "../error-indicator";
import Loader from "../loader";

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
      loading: true,
      error: false,
    };

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    componentDidMount() {
      this.update();
    }

    update() {
      this.setState({
        loading: true,
        error: false,
      });

      this.props.getData()
        .then((data) => {
          this.setState({
            data,
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false,
          });
        });
    }

    render() {
      const {data, loading, error} = this.state;

      if (loading) {
        return <Loader />
      }

      if (error) {
        return <ErrorIndicator />
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
