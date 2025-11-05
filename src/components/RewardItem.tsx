import React, { memo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Reward } from '../types/Reward';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CollectButton from './CollectButton';

interface Props {
  item: Reward;
  onCollect?: () => void; // Callback when "Collect" button is pressed
  isCollected?: boolean; // Whether the reward is already collected
}

const RewardItem = ({ item, onCollect, isCollected }: Props) => {
  const { width } = useWindowDimensions(); // get screen width for carousel sizing
  const [activeSlide, setActiveSlide] = useState(0); // current carousel slide
  const { name, needed_points, pictures } = item;
  const carouselRef = useRef(null);

  // Render each carousel image
  const renderCarouselItem = ({ item }: { item: { image: string } }) => (
    <Image source={{ uri: item.image }} style={styles.carouselImage} />
  );
  return (
    <View style={styles.card}>
      {pictures && pictures.length > 0 ? (
        <View>
          <Carousel
            ref={carouselRef}
            data={pictures}
            renderItem={renderCarouselItem}
            sliderWidth={width - 24}
            itemWidth={width - 24}
            inactiveSlideScale={1} // prevent shrinking of inactive slides
            inactiveSlideOpacity={1} // keep full opacity for inactive slides
            onSnapToItem={index => setActiveSlide(index)} // update active dot
            loop={false} // no infinite looping
          />
          {/* Show pagination dots below carousel */}
          <Pagination
            dotsLength={pictures.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.activeDot}
            inactiveDotStyle={styles.inactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </View>
      ) : (
        // Placeholder if no images
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.points}>{needed_points} pts</Text>
      </View>

      {!isCollected ? (
        // Show collect button if reward not yet collected
        <CollectButton
          onPress={onCollect}
          label={'Collect'}
          textStyle={styles.buttonText}
        />
      ) : (
        // Show "Collected" badge if already collected
        <View style={styles.collectedBadge}>
          <Text style={styles.collectedBadgeText}>Collected</Text>
        </View>
      )}
    </View>
  );
};

export default memo(RewardItem); // memoize for performance, avoids unnecessary re-renders

const styles = StyleSheet.create({
  carouselImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(175, 171, 171, 0.43)',
    paddingVertical: 5,
    paddingHorizontal: 2,
    margin: 0,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.placeholder,
  },
  card: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.cardBackground,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  collectedCard: {
    opacity: 0.6,
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  placeholder: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: Colors.placeholder,
    fontSize: Typography.body,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: Typography.h3,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  points: {
    fontSize: Typography.body,
    fontWeight: '500',
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    margin: 12,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.cardBackground,
    fontSize: Typography.body,
    fontWeight: '600',
  },
  collectedBadge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    backgroundColor: Colors.border,
  },
  collectedBadgeText: {
    color: Colors.textSecondary,
    fontSize: Typography.body,
    fontWeight: '600',
  },
});
