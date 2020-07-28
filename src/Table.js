import React from 'react';
import numeral from 'numeral';
import './Table.css';

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(countryInfo => (
                <tr>
                    <td>
                        {countryInfo.country}
                    </td>
                    <td>
                        <strong>{numeral(countryInfo.cases).format('0,0')}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}
export default Table;