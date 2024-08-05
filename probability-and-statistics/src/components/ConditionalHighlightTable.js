import React from 'react';

const data = [
  { id: 1, name: 'Item 1', value: 10 },
  { id: 2, name: 'Item 2', value: 20 },
  { id: 3, name: 'Item 3', value: 30 },
];

function ConditionalHighlightTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} style={{ backgroundColor: item.value > 15 ? 'lightcoral' : 'lightgreen' }}>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ConditionalHighlightTable;
