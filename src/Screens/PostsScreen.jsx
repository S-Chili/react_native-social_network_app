import React, { useState } from "react";
import { PostContext } from "./PostContext";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { EvilIcons, Fontisto } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const PostsScreen = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const { posts, location } = React.useContext(PostContext);

  const reversedPosts = [...posts].reverse();

  const initialRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      

  const handleLocationPress = (post) => {
    setSelectedLocation(post.location);
    setShowMap(true);
  };

  console.log(initialRegion);
  console.log(location);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {reversedPosts.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.contentPostContainer}>
            <Fontisto name="comment" size={18} color="grey" style={styles.icon} />
            <View style={styles.locationContainer}>
              <EvilIcons name="location" size={24} color="grey" style={styles.icon} />
              <TouchableOpacity onPress={() => handleLocationPress(post)} activeOpacity={0.8}>
                <Text style={styles.postTitleRight} numberOfLines={1} ellipsizeMode="tail">
                  {post.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      <Modal visible={showMap} animationType="slide">
        <View style={{ flex: 1 }}>
          {location && (
            <MapView style={styles.map} initialRegion={initialRegion}>
              {selectedLocation && (
                <Marker
                  coordinate={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                  title="Selected Location"
                  description={selectedLocation.place}
                />
              )}
            </MapView>
          )}
          {!location && <Text style={styles.mapPlaceholderText}>Fetching user location...</Text>}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedLocation(null);
              setShowMap(false);
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 43,
  },
  postContainer: {
    marginTop: 32,
  },
  postImage: {
    width: 343,
    height: 240,
  },
  postTitle: {
    textAlign: "left",
    color: "#212121",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    marginTop: 8,
    marginRight: 100,
    marginBottom: 8,
  },
  postTitleRight: {
    textAlign: "right",
    color: "#212121",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    textDecorationLine: "underline",
    maxWidth: 200,
    overflow: "hidden",
  },
  contentPostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 8,
  },
  map: {
    flex: 1,
  },
  mapPlaceholderText: {
    alignSelf: "center",
    marginVertical: 16,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default PostsScreen;