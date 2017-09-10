function sortCsvColumns (csv_data) {
  if (!csv_data || csv_data.trim() === ''){
    return '';
  }
  
  var rows = csv_data.split("\n");
  var namesWithIndices = rows[0].split(',')
    .map((name, index) => {return {name: name, index: index};})
    .sort((a, b) => a.name.toLowerCase() !== b.name.toLowerCase() ? a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 : 0);
  
  var result = [];
  result.push(namesWithIndices.map((nameObj) => nameObj.name).join(','));
  
  for(var i = 1; i < rows.length; i++){
    var innerResult = [], innerInput = rows[i].split(',');
    for(var j = 0; j < namesWithIndices.length; j++) {
      innerResult.push(innerInput[namesWithIndices[j].index]);
    }
    result.push(innerResult.join(','));
  }
  
  return result.join('\n');
};


/* let assert = require("chai").assert;
describe('Challenge', function() {
  it('should handle the example', function() {
    assert.equal(sortCsvColumns("Beth,charles,Danielle,Adam,Eric\n17945,10091,10088,3907,10132\n2,12,13,48,11"), "Adam,Beth,charles,Danielle,Eric\n3907,17945,10091,10088,10132\n48,2,12,13,11");
  });
});
*/