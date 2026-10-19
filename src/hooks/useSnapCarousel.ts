import { useRef, useState } from 'react';

/**
 * Logic carousel bằng CSS scroll-snap (vuốt được trên mobile, không cần thư viện).
 * Track cần: overflow-x auto + scroll-snap-type x mandatory; mỗi slide rộng 100%.
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
