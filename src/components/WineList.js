import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '.';
import * as WinesService from '../services/Wines';

export class WineList extends Component {
  onSelectWine = (e, wineId) => {
    e.preventDefault();
    this.props.onSelectWine(wineId);
  };

  render() {
    if (this.props.region === null) {
      return null;
    }
    return (
      <div className="col s12 m6 l4 offset-m3 offset-l4">
        <h2 className="center-align">Wines</h2>
        <div className="collection">
          {this.props.wines.map(wine => (
            <a
              key={wine.id}
              href="#!"
              onClick={e => this.onSelectWine(e, wine.id)}
              className={['collection-item', wine.id === this.props.wine.id ? 'active' : ''].join(
                ' '
              )}>
              {wine.name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export class WineListPage extends Component {
  state = {
    loading: false,
    wines: [],
  };

  componentDidMount() {
    const region = this.props.match.params.regionId;
    this.setState({ loading: true }, () => {
      WinesService.fetchWinesFrom(region).then(wines => {
        this.setState({
          loading: false,
          wines,
        });
      });
    });
  }

  onSelectWine = id => {
    const region = this.props.match.params.regionId;
    this.props.history.push({
      pathname: `/regions/${region}/wines/${id}`,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return <WineList onSelectWine={this.onSelectWine} wines={this.state.wines} wine={{}} />;
  }
}
