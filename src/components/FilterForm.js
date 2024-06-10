import React from 'react';

const FilterForm = ({ filters, setFilters, sales }) => {
    const categories = Array.from(new Set(sales.map(sale => sale['Product Category'])));

    const handleChange = e => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: name === 'startPrice' || name === 'endPrice' ? Number(value) : value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <form className="filter-form" onSubmit={handleSubmit}>
            <label>
                Сортировка по дате
                <select name="sortByDate" value={filters.sortByDate} onChange={handleChange}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                </select>
            </label>
            <label>
                Сортировка по сумме покупки
                <select name="sortByMoney" value={filters.sortByMoney} onChange={handleChange}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                </select>
            </label>
            <label>
                Выберите категорию продуктов
                <select name="category" value={filters.category} onChange={handleChange}>
                    <option value="All">ВсеКатегории</option>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
            </label>
            <label>
                Начало интервала цен
                <input type="number" name="startPrice" value={filters.startPrice} onChange={handleChange} />
            </label>
            <label>
                Конец интервала цен
                <input type="number" name="endPrice" value={filters.endPrice} onChange={handleChange} />
            </label>
            <label>
                Вывести покупателей по ID
                <input type="text" name="customerID" value={filters.customerID} onChange={handleChange} />
            </label>
        </form>
    );
};

export default FilterForm;
