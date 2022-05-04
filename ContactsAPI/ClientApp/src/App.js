import React, { Component } from 'react';
import PersonForm from './components/PersonForm';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import './custom.css'
import { Container } from 'reactstrap';
import PersonList from './components/PersonList';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (

      <BrowserRouter>
        <ToastContainer />
        <Container className='py-4'>
          <Routes>
            <Route path="/" element={<PersonList />} />
            <Route path="create-person" element={<PersonForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    );
  }
}
