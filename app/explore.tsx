import React from 'react';
import { 
  View, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Text,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import animationData from '../assets/explore/Image Playground Animation.json';

const { width, height } = Dimensions.get('screen');

export default function ExploreScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleAlmanahPress = () => {
    router.push('./almanah');
  };

  const handleHowWorksPress = () => {
    router.push('./our-mission');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../assets/explore/explore-back (2).png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>

          {/* Секция Learn more about orbs */}
          <View style={styles.learnMoreSection}>
            
            {/* Кнопка Almanah */}
            <TouchableOpacity 
              style={styles.almanahButtonContainer}
              onPress={handleAlmanahPress}
            >
              <Image
                source={require('../assets/explore/almanah-btn.png')}
                style={styles.almanahButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Lottie анимация */}
          <View style={styles.lottieSection}>
            <LottieView
              source={animationData}
              style={styles.lottieAnimation}
              autoPlay
              loop
              resizeMode="contain"
            />
          </View>

          {/* Нижние кнопки */}
          <View style={styles.bottomButtonsSection}>
            
            {/* Кнопка How it works? */}
            <TouchableOpacity 
              style={styles.howWorksButtonContainer}
              onPress={handleHowWorksPress}
            >
              <Image
                source={require('../assets/explore/how-work-btn.png')}
                style={styles.howWorksButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Кнопка Back */}
            <TouchableOpacity 
              style={styles.backButtonContainer}
              onPress={handleBackPress}
            >
              <Image
                source={require('../assets/explore/explore-back-btn.png')}
                style={styles.backButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

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
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  
  // Секция Learn more
  learnMoreSection: {
    paddingTop: '35%',
    marginBottom: 0,
  },
  almanahButtonContainer: {
    alignSelf: 'center',
  },
  almanahButtonImage: {
    width: 367,
    height: 80,
  },

  // Секция Orbion
  orbionSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },

  // Lottie анимация
  lottieSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    maxWidth: 200,
    maxHeight: 200,
    minWidth: 200,
    minHeight: 200,
    flex: 0,
  },

  // Нижние кнопки
  bottomButtonsSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  howWorksButtonContainer: {
    marginBottom: 15,
  },
  howWorksButtonImage: {
    width: 367,
    height: 60,
  },
  backButtonContainer: {
    marginBottom: 20,
  },
  backButtonImage: {
    width: 367,
    height: 60,
  },
});
