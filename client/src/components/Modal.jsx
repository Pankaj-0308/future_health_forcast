import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(5px)'
                    }}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    style={{
                        position: 'relative',
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        zIndex: 1001
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#64748b'
                        }}
                    >
                        <X size={24} />
                    </button>
                    {children}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;
