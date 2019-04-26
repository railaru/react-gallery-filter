import React, { Component } from "react";
import Card from "./Card";
import LabelCount from "./LabelCount";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loader from "./Loader";

import gallery_items from "../../gallery_items";

let   amountOfItems          = 9;
const amountOfItemsIncrement = 6;

export class GalleryFilter extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      all: true,
      courses: false,
      video: false,
      galleryItems: gallery_items.slice(0, amountOfItems)
    };
  }

  handleAccordions() {
    const accordionToggler = document.querySelectorAll(".accordion__top");

    accordionToggler.forEach(toggler => {
      toggler.onclick = () => {
        const openIcon = toggler.querySelector(
          ".accordion__top__icon-container--open"
        );
        const closeIcon = toggler.querySelector(
          ".accordion__top__icon-container--close"
        );

        openIcon.classList.toggle("accordion__top__icon-container--disabled");
        closeIcon.classList.toggle("accordion__top__icon-container--disabled");

        toggler.classList.toggle("accordion__top--opened");
        toggler.parentNode.classList.toggle("accordion--opened");
        toggler.parentNode
          .querySelector(".accordion__content")
          .classList.toggle("accordion__content--opened");
      };
    });
  }

  onImagesLoaded(container, event) {
    var images = container.querySelectorAll(".progressive-img--loaded");
    var loaded = images.length;
    for (var i = 0; i < images.length; i++) {
      if (images[i].complete) {
        loaded--;
      } else {
        // eslint-disable-next-line
        images[i].onload = () => {
          loaded--;
          if (loaded === 0) {
            event();
          }
        };
      }
      if (loaded === 0) {
        event();
      }
    }
  }

  handleLazyLoad() {
    this.onImagesLoaded(document.querySelector(".container"), () => {
      this.setState({ isLoading: false });
    });

    window.addEventListener("wheel", () => {
      this.setState({ isLoading: true });

      this.onImagesLoaded(document.querySelector(".container"), () => {
        this.setState({ isLoading: false });
      });

      if (!this.state.isLoading)
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          //reached bottom of the page

          amountOfItems = amountOfItems + amountOfItemsIncrement;
          
          this.setState({
            galleryItems: gallery_items.slice(0, amountOfItems)
          });               
        }
    });
  }

  componentDidMount() {
    this.handleAccordions();
    this.handleLazyLoad();
  }


  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.setState({ all: false });
  };

  render() {
    return (
      <div className="gallery-filter">
        <div className="gallery-filter__left">
          <div className="gallery-filter__left__title font-1 color-8">
            Filters
          </div>
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
            <div className="accordion__content noscrollbar">
              <div className="accordion__content__field">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.courses}
                      onChange={this.handleChange("courses")}
                      color="default"
                      value="courses"
                    />
                  }
                  label="Course taker"
                />
                <LabelCount count={this.state.galleryItems.length} />
              </div>

              <div className="accordion__content__field">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.video}
                      onChange={this.handleChange("video")}
                      color="default"
                      value="video"
                    />
                  }
                  label="Video watcher"
                />
                <LabelCount count={this.state.galleryItems.length} />
              </div>
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
            <div className="accordion__content noscrollbar">
              <div className="accordion__content__field">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.courses}
                      onChange={this.handleChange("courses")}
                      color="default"
                      value="courses"
                    />
                  }
                  label="Courses"
                />
                <LabelCount count={this.state.galleryItems.length} />
              </div>

              <div className="accordion__content__field">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.video}
                      onChange={this.handleChange("video")}
                      color="default"
                      value="video"
                    />
                  }
                  label="Videos"
                />
                <LabelCount count={this.state.galleryItems.length} />
              </div>
            </div>
          </div>
        </div>
        <div className="gallery-filter__right">
          
          <div className='gallery-filter__right__title font-1 color-8'>
            {
              `1 - ${9} of ${this.state.galleryItems.length} resources`                        
            }            
          </div>
          <div className='gallery-filter__right__content'>
          {this.state.galleryItems.map(item => {
            if (
              (this.state.courses && item.type === "course") ||
              this.state.all
            ) {
              return (
                <Card
                  key={item.id}
                  link={item.link}
                  img={item.img}
                  type={item.type}
                  title={item.title}
                  description={item.description}
                  pose={this.state.courses ? "visible" : "hidden"}
                />
              );
            }

            if ((this.state.video && item.type === "video") || this.state.all) {
              return (
                <Card
                  key={item.id}
                  link={item.link}
                  img={item.img}
                  type={item.type}
                  title={item.title}
                  description={item.description}
                  pose={this.state.video ? "visible" : "hidden"}
                />
              );
            }
            if (!this.state.courses && !this.state.video) {
              return (
                <Card
                  key={item.id}
                  link={item.link}
                  img={item.img}
                  type={item.type}
                  title={item.title}
                  description={item.description}
                />
              );
            }

            return null;
          })}
          {this.state.isLoading && <Loader />}  
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryFilter;
