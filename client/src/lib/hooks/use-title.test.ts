import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTitle } from './use-title';

describe('useTitle', () => {
    it('should update document title', () => {
        renderHook(() => useTitle('Home'));
        expect(document.title).toBe('Home - Avito Clone');
    });

    it('should update document title when title changes', () => {
        const { rerender } = renderHook(({ title }) => useTitle(title), {
            initialProps: { title: 'Initial' },
        });

        expect(document.title).toBe('Initial - Avito Clone');

        rerender({ title: 'Updated' });
        expect(document.title).toBe('Updated - Avito Clone');
    });
});
