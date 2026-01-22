import { memo } from 'react';

/**
 * NoiseOverlay - Film grain texture overlay
 * Removes digital sterility and adds tactile feel to the UI
 * Based on THE_ETHEREAL_ARCHIVE_BLUEPRINT.md specs
 */
const NoiseOverlay = memo(() => {
    return (
        <div
            className="noise-overlay"
            aria-hidden="true"
        />
    );
});

NoiseOverlay.displayName = 'NoiseOverlay';

export default NoiseOverlay;
