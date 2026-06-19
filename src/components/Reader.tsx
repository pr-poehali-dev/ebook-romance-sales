import { useState, useMemo, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export interface ReaderBook {
  title: string;
  author: string;
  price: number;
  pages: string[];
  freePages: number;
}

const FREE_LABEL = 'Бесплатная глава';

const Paywall = ({ book, onBuy, onClose }: { book: ReaderBook; onBuy: () => void; onClose: () => void }) => (
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
    style={{ background: 'linear-gradient(to bottom, transparent 0%, hsl(340 30% 6% / 0.92) 30%, hsl(340 30% 6%) 60%)' }}>
    <div className="max-w-md">
      <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 grid place-items-center mx-auto mb-6">
        <Icon name="Lock" size={28} className="text-primary" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Бесплатная глава закончилась</p>
      <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4 leading-tight">
        Хотите узнать, что будет дальше?
      </h2>
      <p className="text-muted-foreground mb-8 text-base">
        Купите книгу <span className="text-foreground font-semibold">«{book.title}»</span> и читайте без ограничений на любом устройстве.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          size="lg"
          className="rounded-full bg-primary hover:bg-primary/90 h-14 px-8 text-base font-semibold glow"
          onClick={onBuy}
        >
          <Icon name="ShoppingBag" size={18} className="mr-2" />
          Купить за {book.price} ₽
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full h-14 px-8 text-base border-border"
          onClick={onClose}
        >
          Закрыть
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-6">
        Мгновенный доступ · Без подписки · Навсегда ваша
      </p>
    </div>
  </div>
);

const Reader = ({
  book,
  purchased,
  onClose,
  onBuy,
}: {
  book: ReaderBook;
  purchased: boolean;
  onClose: () => void;
  onBuy: () => void;
}) => {
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [sepia, setSepia] = useState(true);

  const total = purchased ? book.pages.length : book.freePages;
  const isLocked = !purchased && page >= book.freePages;
  const progress = useMemo(() => Math.round(((page + 1) / book.pages.length) * 100), [page, book.pages.length]);

  const goNext = () => {
    const next = page + 1;
    if (!purchased && next >= book.freePages) { setPage(next); return; }
    setPage((p) => Math.min(p + 1, book.pages.length - 1));
  };
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, purchased]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl animate-float-up" style={{ animationDuration: '0.4s' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 h-16 border-b border-border shrink-0">
        <div className="min-w-0 flex items-center gap-3">
          <div>
            <div className="font-display text-xl font-bold truncate">{book.title}</div>
            <div className="text-xs text-muted-foreground truncate">{book.author}</div>
          </div>
          {!purchased && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold border border-accent/30">
              <Icon name="Eye" size={12} /> {FREE_LABEL}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!purchased && (
            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 hidden sm:flex" onClick={onBuy}>
              <Icon name="ShoppingBag" size={16} className="mr-1.5" /> {book.price} ₽
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSepia((s) => !s)}>
            <Icon name={sepia ? 'Moon' : 'Sun'} size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setFontSize((f) => Math.max(16, f - 2))}>
            <Icon name="Minus" size={20} />
          </Button>
          <span className="text-sm tabular-nums w-8 text-center text-muted-foreground">{fontSize}</span>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setFontSize((f) => Math.min(30, f + 2))}>
            <Icon name="Plus" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
            <Icon name="X" size={22} />
          </Button>
        </div>
      </div>

      {/* Page area */}
      <div className="flex-1 overflow-y-auto relative">
        <div
          className={`max-w-2xl mx-auto my-8 sm:my-12 px-7 sm:px-12 py-10 rounded-2xl min-h-[60vh] transition-colors ${
            sepia ? 'bg-[#f4ecd8] text-[#3a3026]' : 'bg-card text-foreground border border-border'
          }`}
        >
          {/* Page number badge */}
          <div className={`text-xs font-semibold uppercase tracking-widest mb-6 ${sepia ? 'text-[#8b7355]' : 'text-muted-foreground'}`}>
            {!purchased && page < book.freePages ? FREE_LABEL + ' · ' : ''}Страница {page + 1}
          </div>

          <p className="font-display leading-relaxed whitespace-pre-line" style={{ fontSize }}>
            {book.pages[page]}
          </p>

          {/* Blurred last free page */}
          {!purchased && page === book.freePages - 1 && (
            <div className="mt-8 relative">
              <p className="font-display leading-relaxed blur-sm select-none pointer-events-none opacity-60" style={{ fontSize }}>
                Утро было серым. Она стояла у окна и смотрела на улицу, где всё шло своим чередом — люди, машины, голуби на карнизе. Жизнь не останавливалась. И это было почти оскорбительно.
              </p>
            </div>
          )}
        </div>

        {/* Paywall overlay */}
        {isLocked && (
          <Paywall book={book} onBuy={onBuy} onClose={onClose} />
        )}
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-border px-5 sm:px-8 py-4">
        <div className="h-1 rounded-full bg-muted overflow-hidden mb-4 max-w-2xl mx-auto">
          {!purchased && (
            <div className="h-full relative">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${Math.round((page / (book.pages.length - 1)) * 100)}%` }}
              />
              <div
                className="absolute top-0 h-full border-r-2 border-dashed border-accent/60"
                style={{ left: `${Math.round(((book.freePages - 1) / (book.pages.length - 1)) * 100)}%` }}
                title="Конец бесплатной главы"
              />
            </div>
          )}
          {purchased && (
            <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${progress}%` }} />
          )}
        </div>
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Button variant="outline" className="rounded-full" disabled={page === 0} onClick={goPrev}>
            <Icon name="ChevronLeft" size={18} className="mr-1" /> Назад
          </Button>
          <span className="text-sm text-muted-foreground tabular-nums text-center">
            {!purchased
              ? `${page + 1} / ${book.pages.length} стр. · бесплатно до ${book.freePages}`
              : `Страница ${page + 1} из ${book.pages.length} · ${progress}%`}
          </span>
          <Button
            className="rounded-full bg-primary hover:bg-primary/90"
            disabled={purchased && page === book.pages.length - 1}
            onClick={goNext}
          >
            Далее <Icon name="ChevronRight" size={18} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reader;
