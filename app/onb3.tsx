import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Text,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Onboarding3Screen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleAllowNotifications = () => {
    setNotificationsEnabled(true);
    Alert.alert('Уведомления', 'Уведомления включены!');
    console.log('Уведомления разрешены');
  };

  const handleGetStarted = () => {
    console.log('Онбординг завершен');
    Alert.alert('Добро пожаловать!', 'Онбординг завершен. Переход в приложение...');
    // Здесь можно добавить переход на главный экран приложения
    // router.replace('/main');
  };

  const handleSkip = () => {
    console.log('Пропуск уведомлений');
    Alert.alert('Пропущено', 'Уведомления можно включить позже в настройках');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/onb3/onb3-back.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>


          {/* Кнопка разрешения уведомлений */}
          <View style={styles.notificationContainer}>
            <TouchableOpacity 
              style={styles.allowNotifButtonContainer} 
              onPress={handleAllowNotifications}
            >
              <Image
                source={require('../assets/onb3/allow-notif.png')}
                style={styles.allowNotifButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            
          </View>

          {/* Основная кнопка "Начать" */}
          <View style={styles.mainButtonContainer}>
            <TouchableOpacity 
              style={styles.getStartedButtonContainer} 
              onPress={handleGetStarted}
            >
              <Image
                source={require('../assets/onb3/onb3-btn.png')}
                style={styles.getStartedButtonImage}
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
    paddingHorizontal: 30,
    paddingTop: '70%',
    paddingBottom: '6%',
    gap: 80,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  notificationContainer: {
    alignItems: 'center',
    gap: 20,
  },
  allowNotifButtonContainer: {
    padding: 10,
  },
  allowNotifButtonImage: {
    width: 367,
    height: 60,
  },
  mainButtonContainer: {
    alignItems: 'center',
  },
  getStartedButtonContainer: {
    padding: 10,
  },
  getStartedButtonImage: {
    width: 209,
    height: 207,
  },
  statusContainer: {
    position: 'absolute',
    top: 300,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
