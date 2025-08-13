import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Text, 
  TextInput 
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Onboarding2Screen() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleNextPress = () => {
    console.log('Переход на onb3 с именем:', name);
    router.push('/onb3');
  };

  const handleAnonymPress = () => {
    console.log('Переход на onb3 анонимно');
    router.push('/onb3');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/onb2/onb2-back.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          {/* Заголовок */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Yes, my names is:</Text>
          </View>

          {/* Инпут для имени */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder=""
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>or</Text>
          </View>

          {/* Кнопки */}
          <View style={styles.buttonsContainer}>

          <TouchableOpacity style={styles.anonymButtonContainer} onPress={handleAnonymPress}>
              <Image
                source={require('../assets/onb2/onb2-anonym-btn.png')}
                style={styles.anonymButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={styles.textContainer}>
            <Text style={styles.privacyText}>Privacy policy || Terms of use</Text>
            </View>

            <TouchableOpacity style={styles.nextButtonContainer} onPress={handleNextPress}>
              <Image
                source={require('../assets/onb2/onb2-btn.png')}
                style={styles.nextButtonImage}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: '60%',
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 0,
    height: 60,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderRadius: 35,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'rgba(48, 244, 163, 1)',
    color: 'white',
  },
  buttonsContainer: {
    alignItems: 'center',
    gap: 10,
  },
  nextButtonContainer: {
    padding: 10,
  },
  nextButtonImage: {
    width: 232,
    height: 243,
  },
  anonymButtonContainer: {
    padding: 10,
  },
  anonymButtonImage: {
    width: 367,
    height: 60,
  },

  textContainer: {
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    color: 'rgba(0, 255, 208, 1)',
  },
  privacyText: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'left',
    marginBottom: 10,
  },
});
