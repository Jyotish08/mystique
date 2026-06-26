import React from 'react';

// Direct imports from strict asset directory
import ArrowPath from '@/assets/icons/arrow-path.svg';
import ArrowTrendingUp from '@/assets/icons/arrow-trending-up.svg';
import ChartPie from '@/assets/icons/chart-pie.svg';
import ChevronDown from '@/assets/icons/chevron-down.svg';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import ChevronUp from '@/assets/icons/chevron-up.svg';
import ChevronUpSolid from '@/assets/icons/chevron-up-solid.svg';
import Cog8Tooth from '@/assets/icons/cog-8-tooth.svg';
import Cube16Solid from '@/assets/icons/cube-16-solid.svg';
import LinkIcon from '@/assets/icons/link.svg';
import LinkSolid from '@/assets/icons/link-solid.svg';
import Search from '@/assets/icons/search.svg';
import XMark from '@/assets/icons/x-mark.svg';

const icons = {
  'arrow-path': ArrowPath,
  'arrow-trending-up': ArrowTrendingUp,
  'chart-pie': ChartPie,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-up-solid': ChevronUpSolid,
  'cog-6-tooth': Cog8Tooth,
  'cog-8-tooth': Cog8Tooth,
  'cube': Cube16Solid,
  'cube-16-solid': Cube16Solid,
  'link': LinkIcon,
  'link-solid': LinkSolid,
  'magnifying-glass': Search,
  'search': Search,
  'x-mark': XMark,
};

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: keyof typeof icons;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const src = icons[name];
  
  if (!src) {
    console.warn(`Icon ${name} not found in provided assets.`);
    return null;
  }

  return <img src={src} alt="" {...props} />;
};

export default Icon;
