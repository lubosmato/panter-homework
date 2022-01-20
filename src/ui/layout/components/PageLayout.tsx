import {FunctionComponent} from "react"
import Navigation from "./Navigation"

const PageLayout: FunctionComponent = ({children}) =>
  <div className="container">
    <header>
      <Navigation />
    </header>
    <main>
      { children }
    </main>
  </div>

export default PageLayout
