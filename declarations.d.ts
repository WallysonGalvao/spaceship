import React from 'react';
import { SvgProps } from 'react-native-svg';

declare module '*.svg' {
  const content: React.FC<
    SvgProps & {
      fillSecondary?: string;
    }
  >;
  export default content;
}
