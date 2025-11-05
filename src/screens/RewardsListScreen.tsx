import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRewards } from '../api/rewardsApi';
import { collectReward } from '../store/rewardsSlice';
import { RootState } from '../store';
import RewardItem from '../components/RewardItem';
import { Reward } from '../types/Reward';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../theme/typography';
import { strings } from '../i18n/strings';

const RewardsListScreen = () => {
  const dispatch = useDispatch();
  const collected = useSelector((state: RootState) => state.rewards.collected);
  const insets = useSafeAreaInsets();

  const [data, setData] = useState<Reward[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(page.toString());

  // Fetch rewards from API with pagination
  const loadRewards = useCallback(async () => {
    if (loading || !nextPage) return; // avoid multiple calls or if no more pages
    setLoading(true);
    try {
      const res = await fetchRewards(page);
      setNextPage(res?.next); // will be null if no more pages
     
      // Filter rewards to include only those that have at least one picture.
      const newRewards = res?.results?.filter(
        (item: any) => item?.pictures && item?.pictures?.length > 0,
      );
     
      // Append new rewards to existing list
      setData(prev => [...prev, ...newRewards]);
      setPage(prev => prev + 1);
      setError(false);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    loadRewards();
  }, []);

  // Render each reward item
  const renderItem = ({ item }: { item: Reward }) => {
    const isCollected = collected?.some(r => r?.id === item?.id); // check if reward already collected
    return (
      <RewardItem
        item={item}
        isCollected={isCollected}
        onCollect={() => dispatch(collectReward(item))} // dispatch Redux action
      />
    );
  };

  if (error)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{strings.error}</Text>
      </View>
    );

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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={loadRewards}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

export default RewardsListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: Typography.h3 },
});
