 const saveToStorage = (item, value )  => {
    window.localStorage.setItem(`${item}`, JSON.stringify(value))
}

const getFromStorage = (item) => {
    const resItem = window.localStorage.getItem(item) || null;
    if (resItem === null) {
      return false;
    }
    const parsedItem = JSON.parse(resItem) ;
    return parsedItem;
  }

const resetStorage = (item) => {
    window.localStorage.removeItem(`${item}`)
}