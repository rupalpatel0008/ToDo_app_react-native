import PropTypes from 'prop-types';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icons } from '../theme';
import styles from './styles/CustomHeaderStyles';

const CustomHeader = ({ onPress, backEnabled }) => (
  <SafeAreaView style={styles.headerContainer} forceInset={{ bottom: 'never' }}>
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      {backEnabled ? (
        <Image source={Icons.back} style={styles.backIcon} />
      ) : (
        <Image source={Icons.menu} style={styles.menuIcon} />
      )}
    </TouchableOpacity>
  </SafeAreaView>
);

CustomHeader.propTypes = {
  onPress: PropTypes.func,
  backEnabled: PropTypes.bool
};

export default CustomHeader;
