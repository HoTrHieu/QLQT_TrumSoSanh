import * as React from "react";
import {Slider, Layout, Banner, SpecialOffer, Product} from './../../components';
const Home = (props) => {

    const render = () => {
        return (
            <Layout>
                <Slider></Slider>
                <div className="container">
                    <Banner></Banner>
                    <div className="mb-5">
                        <div className="row">
                            <SpecialOffer></SpecialOffer>
                            <Product></Product>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    return render()
}

export default Home;