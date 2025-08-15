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
    console.log('How it works pressed');
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

  // Нижние кнопки
  bottomButtonsSection: {
    alignItems: 'center',
    paddingBottom: 40,
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
