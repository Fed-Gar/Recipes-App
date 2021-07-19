export function filter(diet, loaded) {
    const UUID = new RegExp("^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"); 
    const diets = [];
    for(let i = 0; i < loaded.length; i++) {
      if(UUID.test(loaded[i].id)) {
        for(let j = 0; j < loaded[i].types.length; j++) {
          if(loaded[i].types[j].name === diet) diets.push(loaded[i]);
        };
      } else {
          for(let h = 0; h < loaded[i].typeDiet.length; h++) {
            if(loaded[i].typeDiet[h] === diet) diets.push(loaded[i]);
          };
      };
    };
    return diets;
};