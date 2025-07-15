import { EmojiPicker } from 'frimousse';

export default function EmojiButtonPicker({ onChange }: { onChange?: (emoji: string) => void }) {
  function handlePickEmoji(emoji: string) {
    onChange?.(emoji);
  }

  return (
    <div className="h-screen">
      <EmojiPicker.Root className=" flex flex-col !h-screen min-h-screen w-full bg-white" locale="es" lang="es">
        <EmojiPicker.Search
          className="rounded-2xl !bg-clip-padding !backdrop-filter !backdrop-blur-sm !bg-opacity-40 !bg-slate-300 p-3 "
          placeholder="Buscar"
        />
        <EmojiPicker.Viewport className="relative flex-1 outline-hidden overflow-hidden">
          <EmojiPicker.List
            className="select-none pb-1.5 overflow-hidden"
            lang="es"
            components={{
              CategoryHeader: ({ category, ...props }) => (
                <div className="bg-white p-2 font-medium text-neutral-600 " {...props}>
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
                  className="flex size-10 items-center justify-center rounded-md text-3xl data-[active]:bg-neutral-100 "
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
  );
}
