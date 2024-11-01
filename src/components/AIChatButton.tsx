import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { ChatBot } from './ChatBot';
import { themes, faithThemes } from '../config/config';

interface AIChatButtonProps {
  religion: 'christian' | 'hindu' | 'islamic';
}

export function AIChatButton({ religion }: AIChatButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getIconColor = () => {
    return faithThemes[religion].primary;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r ${getIconColor()} shadow-lg`}
          aria-label="Open AI Assistant Chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed bottom-0 right-0 w-full sm:w-[400px] max-w-[100vw] z-50 m-0 sm:m-4"
              >
                <div className={`${themes.dark.background} rounded-t-xl sm:rounded-xl shadow-2xl overflow-hidden`}>
                  <div className={`p-3 border-b border-gray-800 flex items-center justify-between bg-gradient-to-r ${getIconColor()}`}>
                    <Dialog.Title className="text-lg font-semibold text-white">
                      AI Assistant
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button 
                        className="p-1.5 hover:bg-white/10 rounded-full text-white"
                        aria-label="Close dialog"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Description className="sr-only">
                    Chat with our AI assistant about {religion} faith and practices
                  </Dialog.Description>
                  <div className="p-2">
                    <ChatBot religion={religion} />
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}