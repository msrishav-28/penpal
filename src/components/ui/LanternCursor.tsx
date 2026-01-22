import { useEffect, useState, memo } from 'react';

/**
 * LanternCursor - Mouse-tracking spotlight effect
 * Creates a localized glow following the cursor
 * Based on VISUAL_DNA.md "Lantern Cursor" specs
 */
const LanternCursor = memo(() => {
    const [position, setPosition] = useState({ x: '50%', y: '50%' });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update CSS custom properties for the lantern effect
            document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);

            setPosition({
                x: `${e.clientX}px`,
                y: `${e.clientY}px`
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className="lantern-effect"
            style={{
                background: `radial-gradient(600px circle at ${position.x} ${position.y}, rgba(139, 92, 246, 0.08), transparent 40%)`
            }}
            aria-hidden="true"
        />
    );
});

LanternCursor.displayName = 'LanternCursor';

export default LanternCursor;
