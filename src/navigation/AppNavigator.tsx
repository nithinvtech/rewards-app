import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RewardsListScreen from '../screens/RewardsListScreen';
import CollectedRewardsScreen from '../screens/CollectedRewardsScreen';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { strings } from '../i18n/strings';
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.label,
        }}
      >
        <Tab.Screen
          name={'Rewards'}
          component={RewardsListScreen}
          options={{
            title: strings.rewards,
            tabBarIcon: () => <Text style={styles.icon}>🎁</Text>,
          }}
        />
        <Tab.Screen
          name="Collected"
          component={CollectedRewardsScreen}
          options={{
            title: strings.collected, // localized string for tab title
            tabBarIcon: () => <Text style={styles.icon}>🏆</Text>,
            // Using a static emoji as icon to avoid adding image assets or external libraries.
            // Keeps the bundle light and avoids extra load.
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    borderTopWidth: 0,
    backgroundColor: Colors.cardBackground,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    elevation: 6,
    paddingBottom: 6,
  },
  label: {
    fontSize: Typography.small,
    fontWeight: '500',
    marginBottom: 2,
  },
  icon: {
    fontSize: 22,
  },
});
