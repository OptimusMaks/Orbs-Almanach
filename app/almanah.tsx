import React from 'react';
import { 
  View, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('screen');

export default function AlmanahScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../assets/orbs-almanah/explore-back.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          
          {/* Основной контент */}
          <View style={styles.mainContentContainer}>
            <Image
              source={require('../assets/orbs-almanah/explore-img.png')}
              style={styles.mainContentImage}
              resizeMode="cover"
            />
          </View>

          {/* Кнопка назад */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Image
                source={require('../assets/orbs-almanah/explore-back-btn.png')}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  mainContentContainer: {
    width: width,
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContentImage: {
    width: '110%',
    height: '110%',
    marginLeft: '-20%',
  },
  backButtonContainer: {
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  backButtonImage: {
    width: 367,
    height: 60,
  },
});
