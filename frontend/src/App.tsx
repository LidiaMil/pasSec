import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreatePassword, Login, PasswordList, Profile, Register } from "./pages";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Profile} />
              <Route exact path="/register" component={Register} />
              <ProtectedRoute exact path="/create" component={CreatePassword} />
              <ProtectedRoute exact path="/list" component={PasswordList} />
              <ProtectedRoute exact path="/save" component={Profile} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
