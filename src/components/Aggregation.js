import React from 'react';

const Aggregation = ({ onChange }) => {
    return (
        <div>
            <label style={{color: 'green'}}>
                <input type="checkbox" value="min" defaultChecked onChange={onChange}/>
                Min
            </label>
            <label style={{color: 'blue'}}>
                <input type="checkbox" value="avg" defaultChecked onChange={onChange}/>
                Avg
            </label>
            <label style={{color: 'red'}}>
                <input type="checkbox" value="max" defaultChecked onChange={onChange}/>
                Max
            </label>
        </div>
    );
};

export default Aggregation;