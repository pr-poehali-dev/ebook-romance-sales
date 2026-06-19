import { useState, useMemo, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export interface ReaderBook {
  title: string;
  author: string;
  pages: string[];
}

const Reader = ({ book, onClose }: { book: ReaderBook; onClose: () => void }) => {
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [sepia, setSepia] = useState(true);

  const total = book.pages.length;
  const progress = useMemo(() => Math.round(((page + 1) / total) * 100), [page, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setPage((p) => Math.min(p + 1, total - 1));
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(p - 1, 0));
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl animate-float-up" style={{ animationDuration: '0.4s' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 h-16 border-b border-border shrink-0">
        <div className="min-w-0">
          <div className="font-display text-xl font-bold truncate">{book.title}</div>
          <div className="text-xs text-muted-foreground truncate">{book.author}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSepia((s) => !s)} title="Тема">
            <Icon name={sepia ? 'Moon' : 'Sun'} size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setFontSize((f) => Math.max(16, f - 2))} title="Меньше">
            <Icon name="Minus" size={20} />
          </Button>
          <span className="text-sm tabular-nums w-8 text-center text-muted-foreground">{fontSize}</span>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setFontSize((f) => Math.min(30, f + 2))} title="Больше">
            <Icon name="Plus" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose} title="Закрыть">
            <Icon name="X" size={22} />
          </Button>
        </div>
      </div>

      {/* Page */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`max-w-2xl mx-auto my-8 sm:my-12 px-7 sm:px-12 py-10 rounded-2xl min-h-[60vh] transition-colors ${
            sepia ? 'bg-[#f4ecd8] text-[#3a3026]' : 'bg-card text-foreground border border-border'
          }`}
        >
          <p className="font-display leading-relaxed whitespace-pre-line" style={{ fontSize }}>
            {book.pages[page]}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-border px-5 sm:px-8 py-4">
        <div className="h-1 rounded-full bg-muted overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Button variant="outline" className="rounded-full" disabled={page === 0} onClick={() => setPage((p) => Math.max(p - 1, 0))}>
            <Icon name="ChevronLeft" size={18} className="mr-1" /> Назад
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums">
            Страница {page + 1} из {total} · {progress}%
          </span>
          <Button className="rounded-full bg-primary hover:bg-primary/90" disabled={page === total - 1} onClick={() => setPage((p) => Math.min(p + 1, total - 1))}>
            Далее <Icon name="ChevronRight" size={18} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reader;
