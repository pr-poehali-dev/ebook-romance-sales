import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Reader, { ReaderBook } from '@/components/Reader';

const BOOK_PAGES: Record<number, string[]> = {
  1: [
    `— Поздравляю, беременность подтвердилась. Срок пять недель. Будем сохранять или…?\n\nВрач, взрослая женщина с равнодушным видом отворачивает от меня монитор УЗИ-аппарата.\n\nНа мониторе крохотная точка — наш долгожданный малыш.`,
    `— Конечно, доктор! Мы с мужем так хотели, — говорю, ни минуты не раздумывая с ответом.\n\nУ меня столько раз были задержки, столько тестов полетело в мусорный бак с одной полоской. И вот, после всех усилий наконец-то получилось.\n\nЯ не могу сделать вдох, настолько сердце заходится в груди от радости.`,
    `— Одевайтесь и подождите меня. Проверю вашу карту, что-то не так, — вздыхает и хмурится.\n\nЖенщина выходит из кабинета, оставив меня одну. Встаю с неудобного кресла, натягиваю платье и трогаю свой пока ещё плоский живот.\n\nВ груди расцветает гамма тёплых, ни с чем несравнимых эмоций. На глазах блестят слёзы счастья.`,
    `Мы с мужем так долго мечтали стать родителями, что уже отчаялись. Я так точно. А Булат…\n\nОн любит меня и никогда не показывает своего огорчения насчёт моей «бракованности».\n\n— Мия, ты забеременеешь. Не у всех сразу получается. Чувствую, мы даже перегоним Эмилию и Мурада. Иди ко мне, родная, — улыбается мой любимый муж и целует меня.`,
    `Булат красивый, успешный и очень брутальный. Его спортивная фигура, красивые аристократические черты и бездонные льдисто-голубые глаза делают его магнитом для женщин. Многие хотели бы занять моё место.\n\nНо Булат выбрал меня. И не устаёт повторять, что счастлив…\n\nВ отличие от его семьи. Свекровь и свекор меня не любят вдвойне.`,
    `— Вы же у меня не Анна, — бормочет себе под нос врач.\n\n— Нет, меня зовут Мия. А причём тут Анна?\n\n— Так много вас, Шагаевых! Я внесла ваши данные в другую карту. Перепутала вас с девушкой, которая тоже состоит на учёте в нашей клинике, только срок больше, чем у вас.\n\nДоктор что-то ищет в компьютере, зависает на минуту, а я не вспомнила ни одной родственницы в семье Булата с таким именем…`,
    `— Точно, Булат Шагаев, хэх. У него целый гарем, видимо! Столько беременных с одинаковыми данными, никогда такого не было, — усмехнулась доктор, огорошив меня.\n\nЯ сглотнула ком. Неужели, это та самая Анна, с которой меня врач перепутала? Нет, не может быть. Она не Шагаева…\n\nНо какой-то холодок блуждает под рёбрами от такого странного совпадения…`,
  ],
  2: [
    `«Мурад, я беременна…»\n«Мурад, я жду ребёнка…»\n\nПальцы горят, нажимая на сенсор. Набираю текст и снова стираю сообщение в мессенджере.\n\nТакую новость я не могу написать мужу просто, как «Привет» или «Что ты делаешь?».`,
    `Мой муж, Мурад Шагаев, мечта любой женщины, неутомимый и страстный любовник с внешностью греческого бога.\n\nСегодня Мурад наконец-то возвращается из командировки. Я не видела его почти две недели и очень соскучилась.\n\nМы в браке уже три года и я… отчаялась забеременеть. Сегодня я сделала тест на беременность. Он дал слабую надежду: две полоски.`,
    `Сделала ещё один, и едва не сошла с ума от счастья: «Беременность, 2-3».\n\nЯ хочу сообщить любимому лично, у нас дома, в интимной обстановке. Хочу уткнуться в его плечо, поцеловать любимые губы и увидеть, как он рад долгожданной новости.`,
    `Из мыслей меня вырывает появление моей младшей сестры. Вижу, как Ника идёт ко мне через холл спортивного клуба.\n\n— Привет, моя любимая беременяшка! — усаживается рядом со мной и привычно смотрит на часы.\n\nПотягивая из трубочки фруктовый коктейль, замечаю две странные фигуры, которые топчутся около стойки ресепшн и явно скандалят.`,
    `— Кстати, ты должна знать одну из них. Беременная — это твоя бывшая родственница.\n\n— Марина? — удивлённо спрашиваю сестру.\n\nНика кивает. Она была женой брата Мурада — Булата. Но они давно расстались.`,
    `— Привет, любимая жена Мурада Шагаева! Не ожидала тебя здесь увидеть, Эмилия! — кивает мне с улыбкой Марина.\n\nВ её лице нет былых красоты и молодости. Она кажется мне какой-то измученной, даже несчастной.\n\n— Мой любимый ждёт нашего малыша. Он бы никогда не позволил мне напрягаться, — елейно-приторным голоском цедит Марина. И выговаривает слова так, будто мы с ней соперницы…`,
    `Шагаев ответно улыбается, машет рукой, увидев меня в панорамных окнах.\n\n— Эми, любимая, — говорит низким бархатным тембром. Он в два шага оказывается возле меня, рывком схватывает в объятия.\n\n— У тебя грудь налилась, Эми. Ты не беременна? — с надеждой в голосе спрашивает муж.`,
  ],
};

const COVER_MIL = 'https://cdn.poehali.dev/projects/3d80046f-2d76-4ad3-85e1-f53054f91634/bucket/45c95ac8-1f34-42c4-9303-d0bbe098af3d.jpg';
const COVER_VDREBEZGI = 'https://cdn.poehali.dev/projects/3d80046f-2d76-4ad3-85e1-f53054f91634/bucket/0275b127-477c-46db-8c22-d1347973fa87.jpg';
const COVER_2 = 'https://cdn.poehali.dev/projects/3d80046f-2d76-4ad3-85e1-f53054f91634/files/77b30b79-d4c0-428a-85f5-9202008b4c74.jpg';
const COVER_3 = 'https://cdn.poehali.dev/projects/3d80046f-2d76-4ad3-85e1-f53054f91634/files/7ae97e2f-ca61-442f-a5de-7eb211c50389.jpg';

const NAV = ['Главная', 'Каталог', 'О магазине', 'Авторы', 'Рецензии', 'Блог', 'Контакты'];

const BOOKS = [
  { id: 1, title: 'Измена. Вернуть семью', author: 'Мил Рэй', price: 320, old: 0, rating: 4.9, tag: 'Бестселлер', cover: COVER_MIL, desc: 'Поздравляю, беременность подтвердилась. Срок пять недель. Будем сохранять или…? Мия думала, что этот день станет самым счастливым в её жизни. Но случайная оговорка врача разрушит всё.' },
  { id: 2, title: 'Измена. Семья вдребезги', author: 'Мил Рэй, Милана Ми', price: 370, old: 0, rating: 4.9, tag: 'Новинка', cover: COVER_VDREBEZGI, desc: 'Такую новость я не могу написать мужу просто, как «Привет» или «Что ты делаешь?». Эмилия наконец забеременела и хочет сообщить об этом мужу лично. Но прошлое их семьи готовит совсем другой сюрприз.' },
  { id: 3, title: 'После дождя', author: 'Елена Зорина', price: 279, old: 399, rating: 4.8, tag: 'Хит недели', cover: COVER_3, desc: 'После развода она уехала в маленький город у моря. Она хотела тишины. Но тишина оказалась населена.' },
  { id: 4, title: 'Чужая измена', author: 'Алина Веснина', price: 319, old: 0, rating: 4.6, tag: 'Топ', cover: COVER_2, desc: 'Она узнала об измене мужа от его любовницы. Та пришла сама. И это был только первый сюрприз.' },
  { id: 5, title: 'Развод по любви', author: 'Софья Лебедева', price: 259, old: 349, rating: 4.9, tag: 'Выбор читателей', cover: COVER_3, desc: 'Они договорились расстаться мирно. Поставить точку. Но точка превратилась в многоточие.' },
  { id: 6, title: 'Тень предательства', author: 'Марина Орлова', price: 369, old: 0, rating: 4.8, tag: 'Премьера', cover: COVER_MIL, desc: 'Предательство пришло не от мужа — от лучшей подруги. И это было больнее всего.' },
];

const REVIEWS = [
  { name: 'Ольга К.', text: 'Не могла оторваться всю ночь. Эмоции зашкаливают — будто прожила чужую жизнь.', book: 'Разбитое отражение' },
  { name: 'Дарья М.', text: 'Реалистично до мурашек. Каждая героиня — это про кого-то из нас.', book: 'После дождя' },
  { name: 'Ирина С.', text: 'Рекомендации магазина в точку! Нашла любимого автора за один вечер.', book: 'Сквозь стекло' },
];

const Index = () => {
  const [cart, setCart] = useState<number[]>([]);
  const addToCart = (id: number) => setCart((c) => (c.includes(id) ? c : [...c, id]));
  const [purchased, setPurchased] = useState<number[]>([]);
  const [reading, setReading] = useState<{ book: ReaderBook; id: number } | null>(null);

  const openReader = (book: typeof BOOKS[number]) => {
    const pages = BOOK_PAGES[book.id] ?? [`Текст этой книги скоро появится в читалке.\n\nСледите за обновлениями!`];
    setReading({ id: book.id, book: { title: book.title, author: book.author, price: book.price, pages, freePages: 2 } });
  };

  const handleBuy = (id: number) => {
    setPurchased((p) => (p.includes(id) ? p : [...p, id]));
    addToCart(id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <a href="#" className="font-display text-3xl font-bold tracking-tight">
            Из<span className="text-gradient">лом</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Search" size={20} />
            </Button>
            <Button className="rounded-full bg-primary hover:bg-primary/90 relative">
              <Icon name="ShoppingBag" size={18} />
              <span className="ml-2 hidden sm:inline">Корзина</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full grid place-items-center font-bold">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-shimmer" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px]" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div className="animate-float-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 text-sm text-primary mb-6">
              <Icon name="Flame" size={16} /> Истории, которые жгут изнутри
            </span>
            <h1 className="font-display text-6xl lg:text-8xl font-bold leading-[0.95] mb-6">
              Романы про <span className="text-gradient italic">измены</span> и разводы
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Тысячи электронных книг о любви, предательстве и новом начале. Умные рекомендации подберут историю именно для вас.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-base h-14 px-8 glow">
                Открыть каталог <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8 border-border">
                Как это работает
              </Button>
            </div>
            <div className="flex gap-8 mt-12">
              {[['12 000+', 'книг'], ['340 000', 'читателей'], ['4.9', 'рейтинг']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-gradient">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[480px] animate-float-up" style={{ animationDelay: '0.3s' }}>
            <img src={COVER_MIL} alt="Романы про измены" className="absolute right-10 top-0 w-64 rounded-2xl shadow-2xl rotate-3 hover-lift" />
            <img src={COVER_2} alt="Романы про разводы" className="absolute left-0 top-20 w-56 rounded-2xl shadow-2xl -rotate-6 hover-lift" />
            <img src={COVER_3} alt="Драматические романы" className="absolute right-0 bottom-0 w-52 rounded-2xl shadow-2xl rotate-6 hover-lift" />
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="container py-16">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Sparkles" size={24} className="text-accent" />
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Подобрано для вас</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-2">Умные рекомендации</h2>
          <p className="text-muted-foreground max-w-xl mb-8">
            Система анализирует вашу историю покупок и интересы, чтобы предложить именно те истории, которые зацепят.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {BOOKS.slice(0, 3).map((b) => (
              <BookCard key={b.id} book={b} onAdd={addToCart} inCart={cart.includes(b.id)} onRead={openReader} purchased={purchased.includes(b.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Каталог</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mt-2">Популярные истории</h2>
          </div>
          <Button variant="ghost" className="hidden sm:flex rounded-full">
            Все книги <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOKS.map((b) => (
            <BookCard key={b.id} book={b} onAdd={addToCart} inCart={cart.includes(b.id)} onRead={openReader} purchased={purchased.includes(b.id)} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Рецензии</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-2">Что говорят читатели</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-7 hover-lift">
              <div className="flex gap-1 mb-4 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="fill-current" />
                ))}
              </div>
              <p className="font-display text-xl italic leading-snug mb-6">«{r.text}»</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 grid place-items-center font-bold text-primary">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">о книге «{r.book}»</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-accent p-12 lg:p-20 text-center glow">
          <div className="absolute inset-0 grain opacity-30" />
          <div className="relative">
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">
              Найдите свою историю
            </h2>
            <p className="text-white/85 max-w-xl mx-auto mb-8 text-lg">
              Получите персональную подборку и читайте на любом устройстве уже сегодня.
            </p>
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 h-14 px-10 text-base font-semibold">
              Начать читать
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-10">
        <div className="container py-14 grid md:grid-cols-4 gap-10">
          <div>
            <div className="font-display text-2xl font-bold mb-3">Из<span className="text-gradient">лом</span></div>
            <p className="text-sm text-muted-foreground">Магазин электронных книг о любви, изменах и новых начинаниях.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Разделы</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.slice(0, 4).map((n) => <li key={n}><a href="#" className="hover:text-foreground">{n}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ещё</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.slice(4).map((n) => <li key={n}><a href="#" className="hover:text-foreground">{n}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Связь</h4>
            <div className="flex gap-3">
              {['Send', 'Instagram', 'Mail'].map((ic) => (
                <a key={ic} href="#" className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-primary hover:border-primary transition-colors">
                  <Icon name={ic} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          © 2026 Излом. Все права защищены.
        </div>
      </footer>

      {reading && (
        <Reader
          book={reading.book}
          purchased={purchased.includes(reading.id)}
          onClose={() => setReading(null)}
          onBuy={() => handleBuy(reading.id)}
        />
      )}
    </div>
  );
};

function BookCard({ book, onAdd, inCart, onRead, purchased }: { book: typeof BOOKS[number]; onAdd: (id: number) => void; inCart: boolean; onRead: (book: typeof BOOKS[number]) => void; purchased: boolean }) {
  return (
    <div className="group rounded-2xl border border-border bg-card overflow-hidden hover-lift">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-semibold">
          {book.tag}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-semibold">
          <Icon name="Star" size={12} className="text-accent fill-current" /> {book.rating}
        </span>
      </div>
      <div className="p-5">
        <div className="text-xs text-muted-foreground mb-1">{book.author}</div>
        <h3 className="font-display text-2xl font-semibold leading-tight mb-2">{book.title}</h3>
        {'desc' in book && book.desc && (
          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">{book.desc}</p>
        )}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">{book.price} ₽</span>
            {book.old > 0 && <span className="text-sm text-muted-foreground line-through">{book.old} ₽</span>}
          </div>
          <Button
            size="sm"
            onClick={() => onAdd(book.id)}
            className={`rounded-full ${inCart ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'}`}
          >
            <Icon name={inCart ? 'Check' : 'Plus'} size={16} />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRead(book)}
          className={`w-full rounded-full ${purchased ? 'border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground' : 'border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground'}`}
        >
          <Icon name="BookOpen" size={16} className="mr-2" />
          {purchased ? 'Читать полностью' : 'Читать отрывок'}
        </Button>
      </div>
    </div>
  );
}

export default Index;