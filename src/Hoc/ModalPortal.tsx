import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        ref.current = document.getElementById('modal-root');
        setMounted(true);
    }, []);

    return mounted && ref.current
        ? createPortal(children, ref.current)
        : null;
}
