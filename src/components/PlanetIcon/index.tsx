import React, { useEffect, useState, useRef } from 'react';

import images from './planets-icons';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
  dimension?: number;
}

const Planet: React.FC<IconProps> = ({
  icon,
  dimension,
  ...rest
}): JSX.Element | null => {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);

  useEffect((): void => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        const { default: namedImport } = await images[icon];
        ImportedIconRef.current = namedImport;
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [icon]);

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef;
    const dimensions = { width: dimension, height: dimension };
    return <ImportedIcon {...rest} {...dimensions} />;
  }

  return null;
};

export default Planet;
