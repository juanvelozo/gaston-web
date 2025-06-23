import { useState } from 'react';
import { EmojiPicker } from 'frimousse';

export default function EmojiButtonPicker({ onChange }: { onChange?: (emoji: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('😉');

  function handlePickEmoji(emoji: string) {
    setSelectedEmoji(emoji);
    setOpen(false);
    onChange?.(emoji);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          fontSize: '24px',
          padding: '6px 12px',
          borderRadius: '6px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
      >
        {selectedEmoji}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            zIndex: 999,
            marginTop: '8px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            width: '260px',
            height: '300px',
            overflow: 'hidden',
          }}
        >
          <EmojiPicker.Root
            onEmojiSelect={(emoji) => {
              handlePickEmoji(emoji.emoji);
            }}
          >
            <EmojiPicker.Search
              style={{
                margin: '8px',
                padding: '6px',
                fontSize: '14px',
                width: 'calc(100% - 16px)',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <EmojiPicker.Viewport
              style={{
                height: '240px',
                overflowY: 'auto',
                padding: '4px',
              }}
            >
              {/* <EmojiPicker.Loading style={{ textAlign: 'center', color: '#888' }}>
                Cargando…
              </EmojiPicker.Loading> */}
              {/* <EmojiPicker.Empty style={{ textAlign: 'center', color: '#888' }}> */}
              {/* Sin resultados
              </EmojiPicker.Empty> */}
              <EmojiPicker.List
                components={{
                  Row: ({ children, ...props }) => (
                    <div style={{ display: 'flex', gap: '4px', padding: '4px' }} {...props}>
                      {children}
                    </div>
                  ),
                  Emoji: ({ emoji, ...props }) => (
                    <button
                      style={{
                        fontSize: '20px',
                        padding: '4px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                      {...props}
                    >
                      {emoji.emoji}
                    </button>
                  ),
                }}
              />
            </EmojiPicker.Viewport>
          </EmojiPicker.Root>
        </div>
      )}
    </div>
  );
}
