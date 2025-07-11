import { useState } from 'react';
import { EmojiPicker } from 'frimousse';
import IconButton from '../iconButton/iconButton.component';

export default function EmojiButtonPicker({ onChange }: { onChange?: (emoji: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('😉');

  function handlePickEmoji(emoji: string) {
    setSelectedEmoji(emoji);
    setOpen(false);
    onChange?.(emoji);
  }

  return (
    <>
      <IconButton icon={selectedEmoji} onClick={() => setOpen(true)} className="text-4xl p-3" />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4   max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic dentro del modal
          >
            <EmojiPicker.Root className="isolate flex h-[368px] w-fit flex-col bg-white dark:bg-neutral-900">
              <EmojiPicker.Search
                className="z-10 mx-2 mt-2 appearance-none rounded-md bg-neutral-100 px-2.5 py-2 text-sm dark:bg-neutral-800"
                placeholder="Buscar"
              />
              <EmojiPicker.Viewport className="relative flex-1 outline-hidden">
                {/* <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
                  Loading…
                </EmojiPicker.Loading> */}
                {/* <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm dark:text-neutral-500">
                  No emoji found.
                </EmojiPicker.Empty> */}
                <EmojiPicker.List
                  className="select-none pb-1.5"
                  lang="es"
                  components={{
                    CategoryHeader: ({ category, ...props }) => (
                      <div
                        className="bg-white px-3 pt-3 pb-1.5 font-medium text-neutral-600 text-xs dark:bg-neutral-900 dark:text-neutral-400"
                        {...props}
                      >
                        {category.label}
                      </div>
                    ),
                    Row: ({ children, ...props }) => (
                      <div className="scroll-my-1.5 px-1.5" {...props}>
                        {children}
                      </div>
                    ),
                    Emoji: ({ emoji, ...props }) => (
                      <button
                        className="flex size-10 items-center justify-center rounded-md text-2xl data-[active]:bg-neutral-100 dark:data-[active]:bg-neutral-800"
                        {...props}
                        onClick={() => handlePickEmoji(emoji.emoji)}
                      >
                        {emoji.emoji}
                      </button>
                    ),
                  }}
                />
              </EmojiPicker.Viewport>
            </EmojiPicker.Root>
          </div>
        </div>
      )}
    </>
  );
}
