import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import type { PropsWithChildren } from "react";
import { Easing } from "react-native-reanimated";

type Props = PropsWithChildren<{
  className?: string;
}>;

const SkeletonLoadingComponent: React.FC<Props> = ({ className, children }) => {
  const opacityAnimated = useRef(new Animated.Value(0.3)).current;

  const opacityInterpolated = opacityAnimated.interpolate({
    inputRange: [0.3, 1],
    outputRange: [1, 0.3],
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnimated, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opacityAnimated, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();
  }, [opacityAnimated]);

  return (
    <Animated.View
      className={`bg-black/20 ${className || ""}`}
      style={{
        opacity: opacityInterpolated,
      }}
    >
      {children}
    </Animated.View>
  );
};
export default SkeletonLoadingComponent;
