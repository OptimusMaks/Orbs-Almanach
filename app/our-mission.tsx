import React from 'react';
import { 
  View, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ScrollView,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('screen');

export default function OurMissionScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Фоновое изображение */}
        <ImageBackground
          source={require('../assets/our-mission/Our mission.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
          imageStyle={styles.backgroundImageStyle}
        >
          {/* Контент изображение поверх фона */}
          <View style={styles.contentContainer}>
            <Image
              source={require('../assets/our-mission/our-mission-content.png')}
              style={styles.contentImage}
              resizeMode="stretch"
            />
          </View>
          
          {/* Кнопка назад */}
          <View style={styles.backButtonSection}>
            <TouchableOpacity 
              style={styles.backButtonContainer}
              onPress={handleBackPress}
            >
              <Image
                source={require('../assets/our-mission/back-btn.png')}
                style={styles.backButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    maxHeight: 3191,
  },
  scrollView: {
    maxHeight: 3191,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    width: width,
    height: 3191,
    padding: 0,
    margin: 0,
  },
  backgroundImageStyle: {
    width: width,
    height: 3191,
  },
  contentContainer: {
    width: width * 2,
    height: 2804,
    padding: 0,
    margin: 0,
  },
  contentImage: {
    width: width * 1.8,
    height: 2804,
    marginLeft: -width / 2.2,
    marginRight: -width / 1.8,
    marginTop: 100,
  },
  backButtonSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 387,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    alignSelf: 'center',
  },
  backButtonImage: {
    width: 367,
    height: 60,
  },
});
