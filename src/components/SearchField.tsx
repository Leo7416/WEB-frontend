import '../styles/SearchField.css';
import { FC, useState, Dispatch } from 'react';

const SearchField: FC<{ setQuery: Dispatch<string> }> = ({ setQuery }) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (value: string) => {
        setValue(value);
    };

    const handleClick = () => {
        setQuery(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleClick();
        }
    };

    return (
        <>
            <div className="lower">
                <h2>Поиск по адресам</h2>
                <form action="/query" method="get">
                    {/* {% csrf_token %} - This looks like a Django template syntax,
                    ensure it's rendered properly in the Django template */}
                    <label>Название улицы:</label>
                    <input
                        name="query"
                        type="text"
                        placeholder="Введите что-нибудь"
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
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