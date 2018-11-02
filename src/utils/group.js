/**
 * Group rows.
 *  
 * var rows = [
 *   {g: 'b', id: 22}, 
 *   {g: 'a', id: 11}, 
 *   {g: 'b', id: 21}, 
 *   {id: 52}, 
 *   {id: 50}
 * ]
 * 
 * group by {prop: 'g', names: ['c', 'd']} :
 * 
 * [
 *   {rowIndex: 0, id: 'b', rows: [{g: 'b', id: 22}, {g: 'b', id: 21}]},
 *   {rowIndex: 3, id: 'a', rows: [{g: 'a', id: 11}]},
 *   {rowIndex: 5, id: undefined, rows: [{id: 52}, {id: 50}]},
 *   {rowIndex: 8, id: 'c', rows: []},
 *   {rowIndex: 9, id: 'd', rows: []}
 * ]
 */
export default function (rows, group) {
  const groupKey = group.prop;
  const gi = {}; // {gN: index, ...}
  let rowIndex = -1;
  let index = -1;
  const groupedRows = rows.reduce(function (rv, row) {
    // record the groupName index
    const g = row[groupKey]
    if (!(g in gi)) gi[g] = ++index;

    // generate a empty group item
    const i = gi[g];
    rv[i] = rv[i] || { rowIndex: ++rowIndex, id: row[groupKey], rows: [] };

    // push row item into group.rows
    rv[i].rows.push(row);
    rowIndex++;

    // recaculate all the next group item rowIndex
    for (let j = i + 1; j < rv.length; j++) rv[j].rowIndex++;

    return rv;
  }, []);

  if (group.names)
    group.names
      .filter(g => !(g in gi))
      .forEach(g => groupedRows[groupedRows.length] = {
        rowIndex: ++rowIndex, id: g, rows: []
      });

  return groupedRows;
}