/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

export interface TrackProgressProps {
  max: number;
  progress: number;
}
export default function TrackProgress({progress, max}: TrackProgressProps) {
  const [progressPercent, setProgressPercent] = useState(0);
  useEffect(() => {
    setProgressPercent(Math.floor((progress / max) * 100));
  }, [progress, max]);
  return (
    <View
      className="bg-indigo-800 rounded-md"
      style={{
        height: 6,
        width: progressPercent.toString() + '%',
      }}
    />
  );
}
