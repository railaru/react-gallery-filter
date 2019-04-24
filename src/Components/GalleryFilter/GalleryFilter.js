import React, { Component } from 'react'
import Card from './Card'
import uuid from 'uuid'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export class GalleryFilter extends Component {

  constructor() {
    super()

    this.state = {
      all: true,
      courses: false,
      video: false,
      galleryItems: [
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'course',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'video',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'course',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'video',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'course',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'video',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'course',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'video',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'course',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
        {
          id: uuid(),
          link: 'http://google.com',
          img: `https://source.unsplash.com/random/300x20${uuid()}`,
          type: 'video',
          title: 'Introduction to Machine Learning Problem Framing',
          description: 'This one-hour course introduces the machine learning mindset and helps you identify appropriate situations for machine learning.',
        },
      ],

    }
  }

  componentDidMount() {
    const accordionToggler = document.querySelectorAll('.accordion__top')

    accordionToggler.forEach((toggler) => {
      toggler.onclick = () => {

        const openIcon = toggler.querySelector('.accordion__top__icon-container--open')
        const closeIcon = toggler.querySelector('.accordion__top__icon-container--close')

        openIcon.classList.toggle('accordion__top__icon-container--disabled')
        closeIcon.classList.toggle('accordion__top__icon-container--disabled')


        toggler.classList.toggle('accordion__top--opened')
        toggler.parentNode.classList.toggle('accordion--opened')
        toggler.parentNode.querySelector('.accordion__content').classList.toggle('accordion__content--opened')
      }
    })
  }
  
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    
    this.setState({ all: false });    
  };

  render() {
    return (
      <div className='gallery-filter'>
        <div className='gallery-filter__left'>
          <div className="accordion">
            <div className="accordion__top noselect">
              <div className="accordion__top__text">I am a...</div>
              <div className="accordion__top__icon-container accordion__top__icon-container--open">
                <div className="accordion__top__icon">+</div>
              </div>
              <div className="accordion__top__icon-container accordion__top__icon-container--close accordion__top__icon-container--disabled">
                <div className="accordion__top__icon">–</div>
              </div>
            </div>
            <div className="accordion__content">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.courses}
                    onChange={this.handleChange('courses')}
                    color='default'
                    value="courses"
                  />
                }
                label="Course taker"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.video}
                    onChange={this.handleChange('video')}
                    color='default'
                    value="video"
                  />
                }
                label="Video watcher"
              />
            </div>
          </div>
          <div className="accordion">
            <div className="accordion__top noselect">
              <div className="accordion__top__text">Type of content</div>
              <div className="accordion__top__icon-container accordion__top__icon-container--open">
                <div className="accordion__top__icon">+</div>
              </div>
              <div className="accordion__top__icon-container accordion__top__icon-container--close accordion__top__icon-container--disabled">
                <div className="accordion__top__icon">–</div>
              </div>
            </div>
            <div className="accordion__content">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.courses}
                    onChange={this.handleChange('courses')}
                    color='default'
                    value="courses"
                  />
                }
                label="Courses"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.video}
                    onChange={this.handleChange('video')}
                    color='default'
                    value="video"
                  />
                }
                label="Video"
              />
            </div>
          </div>
        </div>
        <div className='gallery-filter__right'>
          {
            this.state.galleryItems.map(item => {
              if ((this.state.courses && item.type === 'course') || this.state.all) {
                return (
                  <Card
                    key={item.id}
                    link={item.link}
                    img={item.img}
                    type={item.type}
                    title={item.title}
                    description={item.description}
                  />
                )
              }
              if ((this.state.video && item.type === 'video') || this.state.all) {
                return (
                  <Card
                    key={item.id}
                    link={item.link}
                    img={item.img}
                    type={item.type}
                    title={item.title}
                    description={item.description}
                  />
                )
              }
              if ((!this.state.courses && !this.state.video)) {
                return (
                  <Card
                    key={item.id}
                    link={item.link}
                    img={item.img}
                    type={item.type}
                    title={item.title}
                    description={item.description}
                  />
                )
              }

              return null
            }
            )}
        </div>
      </div>
    )
  }
}

export default GalleryFilter