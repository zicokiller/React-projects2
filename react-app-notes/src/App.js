import Sidebar from "./Components/Sidebar/Sidebar";
import MainArea from "./Components/MainArea/MainArea";
import ListNotes from "./Components/ListNotes/ListNotes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayNote from "./Components/DisplayNote/DisplayNote";


function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={ListNotes}></Route>
          <Route path="/edit" exact component={MainArea}></Route>
          <Route path="/displayNote/:id" exact component={DisplayNote}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
