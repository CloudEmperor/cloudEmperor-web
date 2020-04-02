import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router  } from 'react-router-dom';
import CreateCRoutes from './routes';
import store from './redux/store';
class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
          <Router>
            <CreateCRoutes />
          </Router>   
      </Provider>  
    )
  }
  
}

export default App;
