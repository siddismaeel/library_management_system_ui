
import './App.css';
import AddBook from './components/AddBook';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Books from './components/Books';
import Alert from './components/Alert';
import SideNavbar from './components/SideNavbar';
import Members from './components/Members';
import Issues from './components/Issues';
import AddMember from './components/AddMember';
import IssueBook from './components/IssueBook';
import Home from './components/Home';
function App() {

  return (
    <Container fluid className='p-0 w-100 px-0 w-100'>
      <Provider store={store}>
        <Router>
          <SideNavbar>
            <Alert />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/get-books" element={<Books />} />
              <Route path="/members" element={<Members />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/add-member/:id" element={<AddMember />} />
              <Route path="/add-book/:id" element={<AddBook />} />
              <Route path="/issue-book/:id" element={<IssueBook />} />
            </Routes>
          </SideNavbar>
        </Router>
      </Provider>
    </Container>
  );
}

export default App;
