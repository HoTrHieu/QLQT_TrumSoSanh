import * as React from "react";
import {Link} from 'react-router-dom';

const Slider = (props) => {

    const render = () => {
        return (
          <div className="mb-5">
            <div className="bg-img-hero" style={{backgroundImage: 'url(./assets/img/1920X422/img1.jpg)'}}>
              <div id="carouselControls" className="container min-height-420 overflow-hidden carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row min-height-420 py-7 py-md-0">
                      <div className="offset-xl-3 col-xl-4 col-6 mt-md-8">
                        <h1 className="font-size-64 text-lh-57 font-weight-light">
                          THE NEW <span className="d-block font-size-55">STANDARD</span>
                        </h1>
                        <h6 className="font-size-15 font-weight-bold mb-3" >UNDER FAVORABLE SMARTWATCHES
                        </h6>
                        <div className="mb-4">
                          <span className="font-size-13">FROM</span>
                          <div className="font-size-50 font-weight-bold text-lh-45">
                            <sup className="">$</sup>749<sup className="">99</sup>
                          </div>
                        </div>
                        <Link to="#" className="btn btn-primary transition-3d-hover rounded-lg font-weight-normal py-2 px-md-7 px-3 font-size-15">
                          Start Buying
                        </Link>
                      </div>
                      <div className="col-xl-5 col-6 d-flex align-items-center">
                        <img alt="Description" src="./assets/img/416X420/img3.png" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="row min-height-420 py-7 py-md-0">
                      <div className="offset-xl-3 col-xl-4 col-6 mt-md-8">
                        <h1 className="font-size-64 text-lh-57 font-weight-light">
                          HIẾU<span className="d-block font-size-55">ĐẸP TRAI</span>
                        </h1>
                        <h6 className="font-size-15 font-weight-bold mb-3" >UNDER FAVORABLE SMARTWATCHES
                        </h6>
                        <div className="mb-4">
                          <span className="font-size-13">FROM</span>
                          <div className="font-size-50 font-weight-bold text-lh-45">
                            <sup className="">$</sup>749<sup className="">99</sup>
                          </div>
                        </div>
                        <Link to="#" className="btn btn-primary transition-3d-hover rounded-lg font-weight-normal py-2 px-md-7 px-3 font-size-15">
                          Start Buying
                        </Link>
                      </div>
                      <div className="col-xl-5 col-6 d-flex align-items-center">
                        <img alt="Description" src="./assets/img/416X420/img3.png" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        )
    }

    return render()
}

export default Slider;