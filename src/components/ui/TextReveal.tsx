import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * TextReveal - Staggered word-by-word text animation
 * Words slide up and fade in with quintic easing
 * Based on THE_ETHEREAL_ARCHIVE_BLUEPRINT.md specs
 */
const TextReveal: FC<TextRevealProps> = ({
    children,
    className = '',
    delay = 0,
    as: Component = 'h1'
}) => {
    // Convert children to string and split into words
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: 0.05,
            },
        },
    };

    const wordVariants = {
        hidden: {
            y: '100%',
            opacity: 0
        },
        visible: {
            y: '0%',
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1], // Quintic out
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Component className="flex flex-wrap gap-x-2">
                {words.map((word, index) => (
                    <span key={index} className="overflow-hidden inline-block">
                        <motion.span
                            className="inline-block"
                            variants={wordVariants}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </Component>
        </motion.div>
    );
};

export default TextReveal;
