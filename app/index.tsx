import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  const handleButtonPress = () => {
    console.log('Переход на вторую страницу онбординга');
    router.push('/onb2');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/onb1/onb1-back.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
            <Image
              source={require('../assets/onb1/onb1-btn.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: '40%',
  },
  buttonContainer: {
    padding: 10,
  },
  buttonImage: {
    width: 232,
    height: 243,
  },
});
