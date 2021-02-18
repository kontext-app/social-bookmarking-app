import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';

export function useComponentVisible<T>(
  initialIsVisible: boolean
): {
  ref: React.Ref<T>;
  isComponentVisible: boolean;
  setIsComponentVisible: Dispatch<SetStateAction<boolean>>;
} {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !(ref as any).current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
