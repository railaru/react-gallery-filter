import React, { Component } from 'react'

export class LabelCount extends Component {
  render(props) {
    return (
        <div className='accordion__content__field__count'>
            {this.props.count}
        </div>
    )
  }
}

export default LabelCount
