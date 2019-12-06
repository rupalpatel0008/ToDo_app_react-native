import React, { useEffect, useRef } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import AppNavigation from '../navigation/AppNavigation';
import { ApplicationStyles } from '../theme';

const RootContainer = () => {
  const navRef = useRef();
  useEffect(() => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'AuthStack'
    });
    setTimeout(() => {
      navRef.current.dispatch(navigateAction);
    }, 2000);
  }, [navRef]);

  return (
    <View style={[ApplicationStyles.screen.mainContainer]}>
      <StatusBar barStyle="dark-content" />
      <AppNavigation ref={navRef} />
    </View>
  );
};

export default RootContainer;
