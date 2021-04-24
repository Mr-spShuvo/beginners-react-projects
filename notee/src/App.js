import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

import TextEditor from './components/TextEditor';

const App = () => {
  const noteId = nanoid();
  return (
    <Router>
      <div className="App">
        <h1 className="logo">🔏 notée</h1>
        <Switch>
          <Route exact path="/">
            <Redirect to={`/notes/${noteId}`} />
          </Route>
          <Route path="/notes/:noteId">
            <TextEditor />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
