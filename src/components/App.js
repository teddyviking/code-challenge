import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';

const App = ({ children }) => (
  <div className="App">
    <Header title="Billin code challenge" />
    <article>
      {children}
    </article>
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
