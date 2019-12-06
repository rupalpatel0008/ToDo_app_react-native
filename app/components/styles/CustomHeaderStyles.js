import { StyleSheet } from 'react-native';
import { Colors, scale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15)
  },
  menuIcon: {
    height: verticalScale(30),
    width: scale(30),
    resizeMode: 'contain'
  },
  backIcon: {
    height: verticalScale(20),
    width: scale(20),
    resizeMode: 'contain'
  }
});

export default styles;
