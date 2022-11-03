import { Footer } from "./Footer"
import Navigation from "./Navigation"

export const Layout = (props) => {
    return (
        <>
            <Navigation/>
            {props.children}
            <Footer/>
        </>
    )
}