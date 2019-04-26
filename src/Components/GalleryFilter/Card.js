import React, { Component } from 'react'
import PlaceholderImg from '../../img/placeholderImg.png'

export class Card extends Component {
  render() {
    return (
        <a href={this.props.link} className="card">        

        <div data-href={this.props.img} className="card__img progressive replace">
            <img src={PlaceholderImg} className='preview' alt="cardImage" />
        </div>

        <div className="card__content">
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

export default Card