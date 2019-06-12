/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import MapView from "react-native-maps";

const { height, width } = Dimensions.get("window");

export default class App extends Component {
  state = {
    places: [
      {
        id: 1,
        title: "Casa do café",
        description: " Café quentinho",
        latitude: -27.200671,
        longitude: -49.63627
      },
      {
        id: 2,
        title: "Rocketseat",
        description: "Cursos e empreendedorismo",
        latitude: -27.210671,
        longitude: -49.63627
      },
      {
        id: 3,
        title: "Casa do Jośe",
        description: "José esta em casa",
        latitude: -27.210671,
        longitude: -49.62627
      }
    ]
  };
  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  };
  render() {
    const { latitude, longitude } = this.state.places[0];
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.mapView = map)}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231
          }}
          style={styles.mapView}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showsPointsOfInterest={false}
          showBuildings={false}
        >
          {this.state.places.map(place => (
            <MapView.Marker
              ref={mark => (place.mark = mark)}
              title={place.title}
              description={place.description}
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude
              }}
              onMapReady={this._mapReady}
            />
          ))}
        </MapView>
        <ScrollView
          style={styles.placeContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={e => {
            const scrolled = e.nativeEvent.contentOffset.x;
            const place =
              scrolled > 0 ? scrolled / Dimensions.get("window").width : 0;

            const { latitude, longitude, mark } = this.state.places[
              Math.round(place)
            ];
            this.mapView.animateCamera(
              {
                center: {
                  latitude,
                  longitude
                  //latitudeDelta: 0.0142,
                  //longitudeDelta: 0.0231
                }
              },
              1000
            );

            setTimeout(() => {
              mark.showCallout();
            }, 1000);
          }}
        >
          {this.state.places.map(place => (
            <View key={place.id} style={styles.place}>
              <Text>{place.title}</Text>
              <Text>{place.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  mapView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  placeContainer: {
    width: "100%",
    maxHeight: 200
  },
  place: {
    borderRadius: 3,
    width: width - 40,
    maxHeight: 200,
    backgroundColor: "#ccc",
    marginHorizontal: 20,
    marginBottom: 10
  }
});
