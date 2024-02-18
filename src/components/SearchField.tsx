import { FC, useState } from 'react';

interface Props {
  setQuery: (query: string) => void;
}

const SearchField: FC<Props> = ({ setQuery }) => {
  const [value, setValue] = useState<string>('');

  const handleClick = () => {
    setQuery(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Предотвращаем стандартное поведение формы
      handleClick();
    }
  };

  return (
    <>
      <div className="lower">
        <h2>Поиск по адресам</h2>
        <form action="/query" method="get">
          <label>Название улицы:</label>
          <input
            name="query"
            type="text"
            placeholder="Введите что-нибудь"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={handleClick}>
            Найти
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchField;
