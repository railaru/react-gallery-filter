import React, { Component } from 'react'
import PlaceholderImg from '../../img/placeholderImg.png'

export class ListItem extends Component {
  render() {
    return (
        <a href={this.props.link} className="card card--list-item">        

        <div data-href={this.props.img} className="card__img card__img--list-item progressive replace">
            <img src={PlaceholderImg} className='preview' alt="cardImage" />
        </div>

        <div className="card__content card__content--list-item">
          <div className="card__type">{this.props.type}</div>
          <div className="card__title">
            {this.props.title}
          </div>
          <div className="card__description">
            {this.props.description}
          </div>
        </div>
        <i className="card__openInNewIcon material-icons">open_in_new</i>
      </a>
    )
  }
}

export default ListItem