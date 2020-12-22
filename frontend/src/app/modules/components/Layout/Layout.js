import * as React from "react";
import {Header, Footer} from '../index';

const Layout = (props) => {

    const render = () => {
        return (
            <main>
                <Header></Header>
                {props.children}
                <Footer></Footer>
            </main>
        )
    }

    return render()
}

export default Layout;