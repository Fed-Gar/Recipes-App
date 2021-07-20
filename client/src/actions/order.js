export function order(data, sort) {
    if(sort === 'menor') {
      data.sort(function(a, b) {
        if(parseInt(a.score) < parseInt(b.score)) return -1;
        if(parseInt(a.score) > parseInt(b.score)) return 1;
        return 0;
      });
    };
    if(sort === 'mayor') {
      data.sort(function(a, b) {
        if(parseInt(a.score) > parseInt(b.score)) return -1;
        if(parseInt(a.score) < parseInt(b.score)) return 1; 
        return 0;
      });
    };
    if(sort === 'aZ') {
      data.sort(function(a, b) {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
    };
    if(sort === 'zA') {
      data.sort(function(a, b) {
        if(a.name > b.name) return -1;
        if(a.name < b.name) return 1; 
        return 0;
      });
    };
    return data;
};