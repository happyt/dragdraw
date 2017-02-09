
export const generateId = () => Math.floor(Math.random()*10000)

// returns a boolean
export const checkPlayerInList = (name, namelist) => {
    for (var i = 0; i < namelist.length; i++)
      if (namelist[i]["name"].toUpperCase() === name.toUpperCase())
        return true;
    return false;
}

// returns the player object
export const getPlayerInList = (name, namelist) => {
    for (var i = 0; i < namelist.length; i++)
        if (namelist[i]["name"].toUpperCase() === name.toUpperCase())
        return namelist[i];
    return null;
}

// converts from Firebase object format to an array
export const objectToPlayers = (fbObject) => {
    const playerList = [];
    if (fbObject.players !== undefined) {        // is there a players list entry
      Object.keys(fbObject.players).forEach(key => {
        fbObject.players[key].id = key
        playerList.push(fbObject.players[key]);
      })
    }
    return playerList;
}

