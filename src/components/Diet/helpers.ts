export const calulateTotalMacros = (list, macro) =>
  list?.reduce((acc, curr) => {
    curr.data.forEach((obj) => {
      if (curr.active) {
        const macroValue = macro === 'fat' ? 9 : 4;
        if (macro === 'energy') {
          acc +=
            obj.count_unit === 'piece'
              ? parseFloat(obj[macro]) * parseFloat(obj.qi)
              : (parseFloat(obj[macro]) * parseFloat(obj.qi)) / obj.by;
          return parseFloat(acc);
        }
        acc +=
          ((parseFloat(obj[macro]) * parseFloat(obj.qi)) / obj.by) * macroValue;
      }
    });
    return parseFloat(acc);
  }, 0);

export const calculateBoxMacros = (boxData, macro) => {
  const macroValue = macro === 'fat' ? 9 : 4;
  if (macro === 'energy') {
    return boxData.reduce(
      (sum, li) =>
        li.count_unit === 'piece'
          ? sum + parseFloat(li[macro]) * parseFloat(li.qi)
          : sum +
            (parseFloat(li[macro]) * parseFloat(li.qi)) / parseFloat(li.by),
      0
    );
  }
  return (
    boxData.reduce(
      (sum, li) =>
        sum + (parseFloat(li[macro]) * parseFloat(li.qi)) / parseFloat(li.by),
      0
    ) * macroValue
  );
};
