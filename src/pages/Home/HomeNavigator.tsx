import React from 'react';
import AppStackCommon from '../../routes/AppStackCommon';
import Home from './Home';

export default function HomeNavigator() {
  return <AppStackCommon main={Home} />;
}
