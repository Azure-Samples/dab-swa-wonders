import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wonder } from '../interfaces/wonders.interface';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
const get_wonders = gql`
  query {
    wonders {
      items {
        id
        name
        type
        latitude
        longitude
        country
        location
        wikipedia_link
        picture_link
        build_in_year
      }
      endCursor
      hasNextPage
    }
  }
`;

const get_wonder = gql`
  query wonder_by_pk($id: ID!) {
    wonders_by_pk( id: $id) {
      id
      name
      type
      latitude
      longitude
      country
      location
      wikipedia_link
      picture_link
      build_in_year
    }
  }
`;

const post_createWonder = gql`
  mutation ($item: CreateWonderInput!) {
    createwonders(item: $item) {
      id
      name
      type
      latitude
      longitude
      country
      location
      wikipedia_link
      picture_link
      build_in_year
    }
  }
`;

const post_updateWonder = gql`
  mutation updatewonders(
    $id: ID!,
    $_partitionKeyValue: String!
    $item: UpdateWonderInput!
  ) {
    updatewonders(id: $id,_partitionKeyValue: $_partitionKeyValue, item: $item) {
      id
      name
      type
      latitude
      longitude
      country
      location
      wikipedia_link
      picture_link
      build_in_year
    }
  }
`;

const post_deleteWonder = gql`
  mutation deletewonders($_partitionKeyValue: String!, $id: ID!) {
    deletewonders(_partitionKeyValue: $_partitionKeyValue, id: $id) {
      id
      name
      type
      latitude
      longitude
      country
      location
      wikipedia_link
      picture_link
      build_in_year
    }
  }
`;

const get_suggestedWonders = gql`
  query($filter: WonderFilterInput!)  {
    wonders(filter: $filter) {
      items {
        id
        name
        type
        latitude
        longitude
        country
        location
        wikipedia_link
        picture_link
        build_in_year
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class WondersService {
  private baseUrl: string = '';
  private limit: number = 6;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getWonders(): Observable<any> {
    return this.apollo.watchQuery<any>({ query: get_wonders }).valueChanges;
  }

  getWonderById(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: get_wonder,
      variables: { id: id },
    }).valueChanges;
  }

  getSuggestions(term: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: get_suggestedWonders,
      variables: { filter: { name: { contains: term } } },
    }).valueChanges;
  }

  addWonder(wonder: Wonder): Observable<any> {
    return this.apollo.mutate({
      mutation: post_createWonder,
      variables: {
        item: {
          id: wonder.id,
          name: wonder.name,
          latitude: wonder.latitude,
          longitude: wonder.longitude,
          country: wonder.country,
          location: wonder.location,
          wikipedia_link : wonder.wikipedia_link,
          picture_link : wonder.picture_link,
          build_in_year : wonder.build_in_year
        },
      },
    });
  }

  updateWonder(wonder: Wonder): Observable<any> {
    return this.apollo.mutate({
      mutation: post_updateWonder,
      variables: {
        _partitionKeyValue: wonder.country,
        id: wonder.id,
        item: {
          id: wonder.id,
          name: wonder.name,
          latitude: wonder.latitude,
          longitude: wonder.longitude,
          country: wonder.country,
          location: wonder.location,
          wikipedia_link : wonder.wikipedia_link,
          picture_link : wonder.picture_link,
          build_in_year : wonder.build_in_year
      }
    },
    });
  }

  deleteWonder(wonder: Wonder): Observable<any> {
    return this.apollo.mutate({
      mutation: post_deleteWonder,
      variables: {
        _partitionKeyValue: wonder.country,
        id: wonder.id,
      },
    });
  }
}
