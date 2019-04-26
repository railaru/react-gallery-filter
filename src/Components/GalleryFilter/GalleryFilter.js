import gallery_items from "../../gallery_items";

import React, { Component } from "react";
import Card from "./Card";
import ListItem from "./ListItem";
import LabelCount from "./LabelCount";
import Loader from "./Loader";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridIcon from '@material-ui/icons/GridOnSharp'
import ListIcon from '@material-ui/icons/ListSharp'



let amountOfItems = 9;
const amountOfItemsIncrement = 6;


export class GalleryFilter extends Component {
  constructor() {
    super();

    this.state = {
      viewAsList: 0,
      backToTopActive: false,
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

  toggleBackToTop() {

    window.onscroll = () => {

      if (window.pageYOffset > 500) {

        this.setState({ backToTopActive: true });
      } else {

        this.setState({ backToTopActive: false });
      }
    }
  }

  scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        }
        else clearInterval(scrollInterval);
      }, 15);
      console.log('scrollToTop called')
  }

  componentDidMount() {
    this.handleAccordions();
    this.handleLazyLoad();
    this.toggleBackToTop()
  }

  handleTabChange = (event, viewAsList) => {
    this.setState({ viewAsList });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.setState({ all: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="gallery-filter">
          <div className="gallery-filter__left">

          <React.Fragment>
              <Tabs
                className='content-type-tabs'
                value={this.state.viewAsList}
                onChange={this.handleTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tooltip title="View as grid" placement="top">
                  <Tab icon={<GridIcon />} />
                </Tooltip>     
                <Tooltip title="View as list" placement="top">
                  <Tab icon={<ListIcon />} />
                </Tooltip>         
              </Tabs>
            </React.Fragment>   


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
            {
              !this.state.viewAsList ?
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
                </div>
              :
              <div className='gallery-filter__right__content--list'>
              {this.state.galleryItems.map(item => {
                    if (
                      (this.state.courses && item.type === "course") ||
                      this.state.all
                    ) {
                      return (
                        <ListItem
                          key={item.id}
                          link={item.link}
                          img={item.img}
                          type={item.type}
                          title={item.title}
                          description={item.description}
                        />
                      );
                    }

                    if ((this.state.video && item.type === "video") || this.state.all) {
                      return (
                        <ListItem
                          key={item.id}
                          link={item.link}
                          img={item.img}
                          type={item.type}
                          title={item.title}
                          description={item.description}
                        />
                      );
                    }
                    if (!this.state.courses && !this.state.video) {
                      return (
                        <ListItem
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
              </div>
            }   
            {this.state.isLoading && <Loader />}         
          </div>
        </div>

        
        {this.state.backToTopActive &&
          <Fade in={this.state.backToTopActive} className='cursor-pointer'>
            <Tooltip title="Back to top" placement="left">
              <div className='
                back-to-top-toggler 
                bg-5 
                noselect 
                centered-parent 
                elevation-1' 
                onClick={() => { this.scrollToTop(500) }}              
                >
                <i className="material-icons centered-child color-3">
                  expand_less
                </i>
              </div>
            </Tooltip>
          </Fade>
        }
      </React.Fragment>
    );
  }
}

export default GalleryFilter;
