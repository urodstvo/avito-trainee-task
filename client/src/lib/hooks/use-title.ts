import { useEffect } from 'react';

export const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title + ' - Avito Clone';
    }, [title]);
};
