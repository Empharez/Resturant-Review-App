import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import {searchNearby} from '../utils/googleApiHelpers';
import Restaurant from '../restaurant';
import { PropTypes } from 'prop-types';

class MapContainer extends Component{
    state = {
        places: [],
        pagination: null
      }

    onReady(mapProps, map) {
        const {google} = this.props;
        const opts = {
          location: map.center,
          radius: '1000',
          types: ['restaurant']
        }
        searchNearby(google, map, opts)
          .then((results, pagination) => {
            console.log(results);
            console.log('callback---', this.props.updateCallback(results.map((place) => {
              
                return new Restaurant(place.name, place.vicinity, place.geometry.location.lat(), place.geometry.location.lng());
            })))
            {/*this.setState({
              places: results,
              pagination
            })*/}
          })}
      
    render(){
        const mapStyles = {
            position: 'absolute',
			      width: '50%',
            height: '50%'
          };
        {/*const markers = this.props.restaurants.map((restaurant, i) => {
            return <Marker position={{lat: restaurant.lat , lng: restaurant.long}} key={i}
            onClick={this.onMarkerClick} ></Marker>
        });*/}

        
        return(
            <div>
                <Map
                    google={this.props.google}
                    zoom={5}
                    style={mapStyles}
                    onReady={this.onReady.bind(this)}
                    visible={true}
                    initialCenter={{ lat: 6.502750, lng: 3.370530}}
                >
                {this.props.restaurants.map((restaurant, i) => {
                  console.log(restaurant);
                    return (<Marker key={i}
                        name={restaurant.name}
                        position={
                          {
                            lat: restaurant.position.latitude,
                            lng: restaurant.position.longitude
                          }
                        }
                        onClick={this.onMarkerClick} 
                      />)
                })}
                
    
                </Map>
            </div>
        )
    }

}

MapContainer.propTypes = {
  updateCallback: PropTypes.func
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAkqMXQhMJwYRSvhQ1_-qS_FpV7-NbZFf8',
    //libraries= ['places']
  })(MapContainer);