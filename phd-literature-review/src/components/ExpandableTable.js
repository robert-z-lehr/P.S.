import React from 'react';
import '../ExpandableTable.css';

const ExpandableTable = ({ terms, selectedTerms, onCheck }) => {
  const handleRadioChange = (event, term) => {
    onCheck(term);
  };

  const sortedTerms = [...terms].sort((a, b) => {
    if (selectedTerms.includes(a) && !selectedTerms.includes(b)) return -1;
    if (!selectedTerms.includes(a) && selectedTerms.includes(b)) return 1;
    return a.term.localeCompare(b.term);
  });

  return (
    <div className="expandable-table-container">
      <table className="expandable-table">
        <thead>
          <tr>
            <th></th>
            <th>T/C/J/S</th>
            <th>Symbol/Notation</th>
            <th>Definition</th>
            <th>When to Use</th>
            <th>When not to Use</th>
          </tr>
        </thead>
        <tbody>
          {sortedTerms.slice(0, 7).map((term, index) => (
            <tr
              key={index}
              className={selectedTerms.includes(term) ? 'highlighted' : ''}
            >
              <td>
                <input
                  type="radio"
                  checked={selectedTerms.includes(term)}
                  onChange={(event) => handleRadioChange(event, term)}
                />
              </td>
              <td>{term.term}</td>
              <td>{term.symbol}</td>
              <td>{term.definition}</td>
              <td>{term.whenToUse}</td>
              <td>{term.whenNotToUse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpandableTable;
