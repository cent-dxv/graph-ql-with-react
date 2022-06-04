import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Get_country = `query 
Countries {
countries {  name
  code} 
}`;
const GET_org = `
query ($login: String!,  $repositoryName2: String! ,$withFork: Boolean!) 
{
  book:organization(login:$login) {
    name
    url
      repository(name: $repositoryName2) {
        viewerHasStarred
        forkCount @include(if: $withFork)
     
    }
  }
  company: organization(login: "facebook") {
   ...sherdeorg 
  }

}
fragment sherdeorg on Organization {
  name 
  url
}
`;
const axiosGithub = axios.create({
  baseUrl: "https://api.github.com/graphql",
  header: {
    Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});
const axiosCountries = axios.create({
  baseURL: "https://countries.trevorblades.com",
  method: "GET",
});

const basic = async () => {
  console.log("request sent");
  const data = await fetch(
    "https://countries.trevorblades.com/?query={countries{name  code}}",
    {
      method: "GET",
    }
  ).catch((e) => console.log(e));
  const response = await data.json();
  console.log(response);
};

const ax = async () => {
  axios({
    url: "https://countries.trevorblades.com",
    method: "POST",
    data: {
      query: Get_country,
    },
  })
    .then((result) => {
      console.log(result.data);
    })
    .catch((e) => console.log(e));
};
const fx = async () => {
  fetch("https://countries.trevorblades.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: Get_country,
    }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
};
const variable = {
  login: "The-Road-to-learn-React",
  repositoryName2: "the-road-to-learn-react-chinese",
  withFork: true,
};
const gitfx = async () => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_org,
      variables: variable,
    }),
  }).catch((e) => console.log(e));
  const data = response.json();
  // console.log( data)
  return data;
};

function App() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    // basic();
    // ax()

    async function callAsync() {
      var data = await gitfx();

      setdata(data);
    }
    callAsync();
  }, []);

  return (
    <div className="App">
      {
      (
        <>
          <h1> {data?.data?.book.name}</h1>
          <p> {data?.data?.book.url}</p>
          <h1> {data?.data?.company.name}</h1>
          <h1> {data?.data?.company.url}</h1>

        </>
      )
        
  
        }
      {<div>vsdv</div>}
      hola
    </div>
  );
}

export default App;
