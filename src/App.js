import "./App.css";
import axios from "axios";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,

  ApolloLink,

  createHttpLink,

} from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_org, GET_GEN_3 } from "./gql/query";


const httpLink = new createHttpLink({uri :'https://api.github.com/graphql'})
const pokeapi = new createHttpLink({uri :'https://beta.pokeapi.co/graphql/v1beta'})


const authLink = new ApolloLink((operation, forward) => {
  
  const token = `${process.env.REACT_APP_GIT_ACCESS_TOKEN}`

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});


const client = new ApolloClient({
 link: authLink.concat(httpLink),
 cache: new InMemoryCache()
});


// const client = new ApolloClient({
//   // uri: "https://beta.pokeapi.co/graphql/v1beta",
//   uri: "https://48p1r2roz4.sse.codesandbox.io",

//   cache: new InMemoryCache(),
// });

const inline = () =>
  client

    .query({
      // query: GET_org,
      query: GET_GEN_3,

    })

    .then((result) => console.log(result))
    .catch((e) => console.log(e));

function App() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    // inline();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {
          <>
            {/* <h1> {data?.data?.book.name}</h1>
            <p> {data?.data?.book.url}</p>
            <h1> {data?.data?.company.name}</h1>
            <h1> {data?.data?.company.url}</h1> */}
          </>
        }
        {<div>vsdv</div>}
        hola
        <Query></Query>
      </div>
    </ApolloProvider>
  );
}

export default App;

function Query() {
  const { loading, error, data } = useQuery(GET_org,{
variables : { "login": "The-Road-to-learn-React",
"repositoryName2": "the-road-to-learn-react-chinese",
"withFork": true,}
  });

  console.log(loading);
  console.log(error);
  data && console.log(data.book.repositories.nodes);

  return (
    <>
    <h1> This graph ql data</h1>
         <h1> {data && data.book.name}</h1>
            <p> {data?.book.url}</p>
            <p> and other left projects</p>
            <ul>
              {data?.book.repositories.nodes.map((repo) =>(
                <>
                  <li> <h5>{repo.name} </h5> </li>
                </>
              ))}
            </ul>
            <h1> {data?.company.name}</h1>
            <p> {data?.company.url}</p> 
      <Another_query />
    </>
  );
}

function Another_query() {
  // const { loading, error, data } = useQuery(GET_org);

  // console.log(loading);
  // console.log(error);
  // data && console.log(data);
}
