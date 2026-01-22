import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Heart } from 'lucide-react';

/**
 * Footer - Ethereal Archive floating glass footer
 * Features dark glass styling, violet accents, and premium typography
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { to: '/', label: 'Home' },
      { to: '/my-books', label: 'My Books' },
      { to: '/browse', label: 'Browse' },
      { to: '/community', label: 'Community' },
    ],
    support: [
      { href: '#', label: 'Help Center' },
      { href: '#', label: 'Contact Us' },
      { href: '#', label: 'FAQs' },
      { href: '#', label: 'Privacy Policy' },
    ],
  };

  return (
    <footer className="glass-dark border-t border-glass-border mt-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent-violet/5 blur-[80px] rounded-full" />

      <div className="max-w-[1200px] mx-auto py-12 px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-violet" />
              <span className="text-[24px] font-display font-semibold text-gradient-holographic leading-none">
                PenPal
              </span>
            </div>
            <p className="text-[14px] text-text-secondary leading-relaxed">
              The Ethereal Archive. Where stories come alive and readers unite in their passion for the written word.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <motion.a
                href="#"
                className="p-2 rounded-element bg-white/[0.03] border border-glass-border text-text-secondary hover:text-text-primary hover:border-accent-violet/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 rounded-element bg-white/[0.03] border border-glass-border text-text-secondary hover:text-text-primary hover:border-accent-violet/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h3 className="text-[14px] font-display font-semibold text-text-primary tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[14px] text-text-secondary hover:text-accent-violet transition-all duration-300 inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h3 className="text-[14px] font-display font-semibold text-text-primary tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[14px] text-text-secondary hover:text-accent-violet transition-all duration-300 inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h3 className="text-[14px] font-display font-semibold text-text-primary tracking-wider uppercase mb-4">
              Join the Archive
            </h3>
            <p className="text-[14px] text-text-secondary mb-4 leading-relaxed">
              Connect with passionate readers and share your literary journey.
            </p>
            <motion.button
              className="btn-holographic px-5 py-2.5 rounded-element text-[14px] font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Community
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-text-tertiary">
            © {currentYear} PenPal. The Ethereal Archive.
          </p>
          <p className="text-[13px] text-text-tertiary flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent-fuchsia" /> for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
