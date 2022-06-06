import { gql } from "@apollo/client";


export const GET_org = gql`
  query getGit ($login: String!, $repositoryName2: String!, $withFork: Boolean!) {
    book: organization(login: $login) {
      name
      url
      repository(name: $repositoryName2) {
        viewerHasStarred
        forkCount @include(if: $withFork)
      }
      repositories(first: 3) {
      nodes {
        name
      }
    }
    }
    company: organization(login: "facebook") {
      ...sherdeorg
    }
  }
  fragment sherdeorg on Organization {
    name
    url
    repositories(first: 10) {
      nodes {
        name
      }
    }
    
  }
`;

export const GET_GEN_3 = gql`
  query getGen3 ($limit: Int) {
    pokemon_v2_pokemonspecies (
      order_by: { id: asc }
      limit: $limit
      where: { pokemon_v2_generation: { name: { _eq: "generation-iii" } } }
    ) {
      name

      id
    }
  }
`;

export const GET_SpaceX = gql`
 query SpaceX($limit: Int) {
  company {
    ceo
  }
  roadster {
    apoapsis_au
  }
  users(limit: $limit) {
    name
  }
}
`;