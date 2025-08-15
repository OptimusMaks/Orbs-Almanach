import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ScrollView,
  Text,
  Animated,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('screen');

// Типы для шариков
interface BallData {
  id: string;
  color: string;
  hexColor: string;
  isPopped: boolean;
  timeRemaining: number; // в секундах (24 часа = 86400 секунд)
  advice: string;
  poppedAt?: Date;
}

interface AdviceItem {
  id: string;
  title: string;
  description: string;
  ballColor: string;
}

interface CurrentAdvice {
  text: string;
  visible: boolean;
}

export default function MainScreen() {
  const router = useRouter();

  // Данные шариков
  const [balls, setBalls] = useState<BallData[]>([
    {
      id: '1',
      color: 'purple',
      hexColor: '#AC03A9',
      isPopped: false,
      timeRemaining: 86400, // 24 часа в секундах
      advice: 'Call Someone You Miss\nEven a short message can make your evening warmer (and theirs too).'
    },
    {
      id: '2',
      color: 'green',
      hexColor: '#00D4AA',
      isPopped: false,
      timeRemaining: 86400,
      advice: 'Take 10 minutes for meditation\nFind a quiet place and just breathe.'
    },
    {
      id: '3',
      color: 'blue',
      hexColor: '#3B82F6',
      isPopped: false,
      timeRemaining: 86400,
      advice: 'Take a walk outside without your phone\nPay attention to the details around you.'
    },
    {
      id: '4',
      color: 'yellow',
      hexColor: '#EAB308',
      isPopped: false,
      timeRemaining: 86400,
      advice: 'Write down three things you\'re grateful for today\nIt\'s amazing how this simple practice can shift your mood.'
    },
    {
      id: '5',
      color: 'rose',
      hexColor: '#F43F5E',
      isPopped: false,
      timeRemaining: 86400,
      advice: 'Cook something new or improve your favorite dish\nEnjoy the process, not just the result.'
    }
  ]);

  // Список всех советов
  const [adviceList, setAdviceList] = useState<AdviceItem[]>([]);

  // Анимационные значения для каждого шарика
  const ballAnimations = useRef(
    balls.reduce((acc, ball) => {
      acc[ball.id] = new Animated.Value(1);
      return acc;
    }, {} as Record<string, Animated.Value>)
  ).current;

  // Таймер для обновления времени
  useEffect(() => {
    const interval = setInterval(() => {
      setBalls(prevBalls => 
        prevBalls.map(ball => {
          if (ball.isPopped && ball.timeRemaining > 0) {
            const newTimeRemaining = ball.timeRemaining - 1;
            if (newTimeRemaining <= 0) {
              // Время истекло - шарик можно снова лопнуть
              return { ...ball, isPopped: false, timeRemaining: 86400 };
            }
            return { ...ball, timeRemaining: newTimeRemaining };
          }
          return ball;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Функция для форматирования времени
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleBallPress = (ballId: string) => {
    const ball = balls.find(b => b.id === ballId);
    if (!ball || ball.isPopped) return;

    // Анимация лопания
    Animated.sequence([
      Animated.timing(ballAnimations[ballId], {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(ballAnimations[ballId], {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(ballAnimations[ballId], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Добавить новый совет в начало списка
    const [title, description] = ball.advice.split('\n');
    const newAdvice: AdviceItem = {
      id: `advice_${Date.now()}_${ballId}`,
      title: title || '',
      description: description || '',
      ballColor: ball.hexColor
    };
    
    setAdviceList(prevList => [newAdvice, ...prevList]);

    // Обновление состояния шарика
    setBalls(prevBalls => 
      prevBalls.map(ball => 
        ball.id === ballId && !ball.isPopped
          ? { ...ball, isPopped: true, poppedAt: new Date() }
          : ball
      )
    );
  };

  // Обработчики кнопок
  const handleAnonymPress = () => {
    console.log('Анонимный режим');
  };

  const handleExplorePress = () => {
    router.push('./explore');
  };

  const handleSettingsPress = () => {
    console.log('Настройки');
  };

  const getBallGradient = (color: string, isPopped: boolean) => {
    if (isPopped) {
      return {
        backgroundColor: '#8B8B8B',
        shadowColor: '#000',
      };
    }
    
    switch (color) {
      case 'purple':
        return {
          backgroundColor: '#AC03A9',
          shadowColor: '#AC03A9',
        };
      case 'green':
        return {
          backgroundColor: '#00D4AA',
          shadowColor: '#00D4AA',
        };
      case 'blue':
        return {
          backgroundColor: '#3B82F6',
          shadowColor: '#3B82F6',
        };
      case 'yellow':
        return {
          backgroundColor: '#EAB308',
          shadowColor: '#EAB308',
        };
      case 'rose':
        return {
          backgroundColor: '#F43F5E',
          shadowColor: '#F43F5E',
        };
      default:
        return {
          backgroundColor: '#8B8B8B',
          shadowColor: '#000',
        };
    }
  };

  const renderBall = (ball: BallData) => {
    const ballStyle = getBallGradient(ball.color, ball.isPopped);
    
    return (
      <View key={ball.id} style={styles.ballContainer}>
        <Animated.View 
          style={[
            styles.ballTouchableContainer,
            {
              transform: [{ scale: ballAnimations[ball.id] }]
            }
          ]}
        >
          <TouchableOpacity 
            style={[
              styles.ballTouchable,
              ballStyle
            ]}
            onPress={() => handleBallPress(ball.id)}
            disabled={ball.isPopped}
            activeOpacity={0.8}
          >
            {ball.isPopped && (
              <View style={styles.poppedContent}>
                <Text style={styles.timerMultiplier}>x5</Text>
                <Text style={styles.timerText}>
                  {formatTime(ball.timeRemaining)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../assets/main1/main1-back.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          
          {/* Верхняя часть с кнопками */}
          <View style={styles.topSection}>
            
            {/* Кнопка анонимного режима */}
            <View style={styles.topLeftContainer}>
              <TouchableOpacity 
                style={styles.anonymButtonContainer}
                onPress={handleAnonymPress}
              >
                <Image
                  source={require('../assets/main1/main1-anonym.png')}
                  style={styles.anonymButtonImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Кнопка уведомлений (справа вверху) */}
            <View style={styles.topRightContainer}>
              <TouchableOpacity style={styles.notificationButton}>
                <View style={styles.notificationIcon} />
              </TouchableOpacity>
            </View>
          </View>

          

          {/* Кнопки Explore и Settings */}
          <View style={styles.buttonsSection}>

{/* Средняя часть - Rituals karma */}
<View style={styles.middleSection}>
            <Text style={styles.ritualsText}>Rituals karma: 5</Text>
          </View>

          {/* Горизонтальный скролл советов */}
          {adviceList.length > 0 && (
            <View style={styles.adviceScrollSection}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.adviceScrollContainer}
                style={styles.adviceScrollView}
              >
                {adviceList.map((advice, index) => (
                  <View key={advice.id} style={[
                    styles.adviceCard,
                    index === 0 && styles.adviceCardFirst
                  ]}>
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={() => setAdviceList(prev => prev.filter(item => item.id !== advice.id))}
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                    <Text style={styles.adviceTitle}>
                      {advice.title}
                    </Text>
                    <Text style={styles.adviceDescription}>
                      {advice.description}
                    </Text>
                    <View style={styles.heartIcon}>
                      <Text style={styles.heartText}>♥</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

            <TouchableOpacity 
              style={styles.exploreButtonContainer}
              onPress={handleExplorePress}
            >
              <Image
                source={require('../assets/main1/main1-explor-btn.png')}
                style={styles.exploreButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsButtonContainer}
              onPress={handleSettingsPress}
            >
              <Image
                source={require('../assets/main1/main1-settings-btn.png')}
                style={styles.settingsButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Нижняя часть с шариками */}
          <View style={styles.ballsSection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.ballsScrollContainer}
              style={styles.ballsScrollView}
            >
              {balls.map(renderBall)}
            </ScrollView>
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
    paddingHorizontal: 20,
  },
  
  // Верхняя секция
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 10,
    marginLeft: 0,
  },
  topLeftContainer: {
    alignItems: 'flex-start',
  },
  topRightContainer: {
    alignItems: 'flex-end',
  },
  anonymButtonContainer: {
    padding: 10,
  },
  anonymButtonImage: {
    width: 177,
    height: 60,
  },
  notificationButton: {
    display: 'none',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00D4AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 3,
  },

  // Средняя секция
  middleSection: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  ritualsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D4AA',
  },

  // Секция скролла советов
  adviceScrollSection: {
    height: 120,
    marginVertical: 15,
  },
  adviceScrollView: {
    flex: 1,
  },
  adviceScrollContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  adviceCard: {
    backgroundColor: 'rgba(180, 236, 255, 0.9)',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 8,
    width: 280,
    minHeight: 100,
    justifyContent: 'center',
  },
  adviceCardFirst: {
    marginLeft: 0,
  },
  adviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E40AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  adviceDescription: {
    fontSize: 16,
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 64, 175, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#1E40AF',
    fontWeight: 'bold',
    lineHeight: 18,
  },
  heartIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00D4AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartText: {
    fontSize: 16,
    color: '#fff',
  },

  // Секция кнопок
  buttonsSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 30,
  },
  exploreButtonContainer: {
    padding: 10,
  },
  exploreButtonImage: {
    width: 367,
    height: 60,
  },
  settingsButtonContainer: {
    padding: 10,
  },
  settingsButtonImage: {
    width: 367,
    height: 60,
  },

  // Секция шариков
  ballsSection: {
    height: 220,
    paddingBottom: 40,
  },
  ballsScrollView: {
    flex: 1,
  },
  ballsScrollContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  ballContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  ballTouchableContainer: {
    borderRadius: 60,
  },
  ballTouchable: {
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowOffset: {
      width: 0,
      height: -11,
    },
    shadowOpacity: 1,
    shadowRadius: 41,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poppedContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerMultiplier: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  timerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
