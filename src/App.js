import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import FilterForm from './components/FilterForm';
import Graph from './components/Graph';
import Aggregation from './components/Aggregation';

import sales from './data';

const App = () => {
    const [filteredSales, setFilteredSales] = useState(sales);
    const [aggregations, setAggregations] = useState(['min', 'max', 'avg']);
    const [filters, setFilters] = useState({
        sortByDate: 'none',
        sortByMoney: 'none',
        category: 'All',
        startPrice: '',
        endPrice: '',
        customerID: ''
    });

    useEffect(() => {
        let result = [...sales]; // Create a shallow copy of the sales data

        // Apply customer ID filter
        if (filters.customerID) {
            result = result.filter(sale => sale['Customer ID'].includes(filters.customerID));
        }

        // Apply price range filter
        if (filters.startPrice !== '' && filters.endPrice !== '') {
            const startPrice = Number(filters.startPrice);
            const endPrice = Number(filters.endPrice);
            result = result.filter(sale => {
                const totalAmount = Number(sale['Total Amount']);
                return totalAmount >= startPrice && totalAmount <= endPrice;
            });
        }

        // Apply category filter
        if (filters.category !== 'All') {
            result = result.filter(sale => sale['Product Category'] === filters.category);
        }

        // Apply date sorting
        if (filters.sortByDate !== 'none') {
            result.sort((a, b) => {
                const dateA = new Date(a.Date);
                const dateB = new Date(b.Date);
                return filters.sortByDate === 'ascending' ? dateA - dateB : dateB - dateA;
            });
        }

        // Apply money sorting
        if (filters.sortByMoney !== 'none') {
            result.sort((a, b) => {
                const amountA = Number(a['Total Amount']);
                const amountB = Number(b['Total Amount']);
                return filters.sortByMoney === 'ascending' ? amountA - amountB : amountB - amountA;
            });
        }

        setFilteredSales(result);
    }, [filters]);

    const handleAggregationChange = (e) => {
        const { value, checked } = e.target;
        setAggregations(prev =>
            checked ? [...prev, value] : prev.filter(agg => agg !== value)
        );
    };

    return (
        <div className="app">
            <FilterForm filters={filters} setFilters={setFilters} sales={sales} />
            <Aggregation onChange={handleAggregationChange} />
            <Graph sales={filteredSales} aggregations={aggregations} />
            <Table sales={filteredSales} />
        </div>
    );
};

export default App;
