import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import RewardItem from '../components/RewardItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../theme/typography';
import { strings } from '../i18n/strings';

const CollectedRewardsScreen = () => {
  // Get collected rewards from Redux store
  const collected = useSelector((state: RootState) => state.rewards.collected);
  // Get device safe area insets (status bar, notch, etc.)
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {collected.length === 0 ? (
        // Show message when no rewards collected
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{strings.noRewards}</Text>
        </View>
      ) : (
        // Render list of collected rewards
        <FlatList
          data={collected}
          renderItem={({ item }) => <RewardItem item={item} isCollected />}
          keyExtractor={item => item.id}
          removeClippedSubviews
        />
      )}
    </View>
  );
};

export default CollectedRewardsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: Typography.h3 },
});
