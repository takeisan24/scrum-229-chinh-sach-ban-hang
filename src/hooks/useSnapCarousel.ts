import { useRef, useState } from 'react';

/**
 * Logic carousel bang CSS scroll-snap (vuot duoc tren mobile, khong can thu vien).
 * Track can: overflow-x auto + scroll-snap-type x mandatory; moi slide rong 100%.
 */
export function useSnapCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const track = trackRef.current;
    if (track) setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    track?.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  return { trackRef, active, onScroll, goTo };
}
