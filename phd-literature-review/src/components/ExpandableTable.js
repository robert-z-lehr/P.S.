import React, { useState } from 'react';

const data = [
  { id: 1, name: 'Item 1', description: 'Description of Item 1' },
  { id: 2, name: 'Item 2', description: 'Description of Item 2' },
  { id: 3, name: 'Item 3', description: 'Description of Item 3' },
];

function ExpandableTable() {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (id) => {
    const isRowCurrentlyExpanded = expandedRows.includes(id);
    const newExpandedRows = isRowCurrentlyExpanded
      ? expandedRows.filter(rowId => rowId !== id)
      : [...expandedRows, id];
    setExpandedRows(newExpandedRows);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <React.Fragment key={item.id}>
            <tr onClick={() => handleRowClick(item.id)}>
              <td>{item.name}</td>
              <td>{expandedRows.includes(item.id) ? item.description : 'Click to expand'}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default ExpandableTable;
