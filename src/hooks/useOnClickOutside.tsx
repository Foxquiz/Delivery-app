import { useEffect } from 'react';

const useOnClickOutside = (ref: React.MutableRefObject<HTMLElement>, handler: (e: MouseEvent) => void) => {
    useEffect(() => {
        const listener = (e: MouseEvent): void => {
            if (!ref.current || ref.current.contains(e.target as Node)) {
                return;
            }
            handler(e);
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;