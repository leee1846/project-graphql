import "./App.css";
import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Roles from "./components/roles";
import Teams from "./components/teams";
import People from "./components/people";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  const [menu, setMenu] = useState("Teams");

  let mainComp = {
    Roles: <Roles />,
    Teams: <Teams />,
    People: <People />,
  };

  function NavMenus() {
    return ["Roles", "Teams", "People"].map((_menu, key) => {
      return (
        <li
          key={key}
          className={menu === _menu ? "on" : ""}
          onClick={() => {
            setMenu(_menu);
          }}
        >
          {_menu}
        </li>
      );
    });
  }

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <header className='App-header'>
          <h1>Company Management</h1>
          <nav>
            <ul>{NavMenus()}</ul>
          </nav>
        </header>
        <main>{mainComp[menu]}</main>
      </div>
    </ApolloProvider>
  );
}

export default App;
