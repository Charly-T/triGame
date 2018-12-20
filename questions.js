module.exports = [{
  _id: 1,
  question: '¿En cuántos soportes la suma de las cifras es 18 o más?',
  answerFunction: (racks) => {
    const solution = racks.reduce((prev, rack) => {
      return prev + (rack.reduce((prev, tile) => prev + tile.number, 0) >= 18 ? 1 : 0);
    }, 0);
    return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
  }
}, {
  _id: 3,
  question: '¿En cuántos soportes aparece la misma cifra en colores diferentes? (Por ejemplo, 7 azul y 7 amarillo en un mismo soporte)',
  answerFunction: (racks) => {
    const solution = racks.reduce((prev, rack) => {
      return prev + (rack[0].number === rack[1].number && rack[0].color !== rack[1].color ||
              rack[0].number === rack[2].number && rack[0].color !== rack[2].color ||
              rack[1].number === rack[2].number && rack[1].color !== rack[2].color) ? 1 : 0;
    }, 0);
    return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
  }
}, {
  _id: 7,
  question: '¿En cuántos soportes ves 3 cifras consecutivas?',
  answerFunction: (racks) => {
    const solution = racks.reduce((prev, rack) => {
      const sorted = rack.slice().sort((tileA, tileB) => {
        return tileA.number > tileB.number;
      });
      let consecutives = true;
      for (let i = 1; i < sorted.length && consecutives; i++) {
        if (sorted[i].number - sorted[i - 1].number !== 1) {
          consecutives = false;
        }
      }
      return prev + consecutives ? 1 : 0;
    }, 0);
    return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
  }
}, {
  _id: 10,
  question: '¿Cuantas cifras no ves?',
  answerFunction: (racks) => {
    const numbers = [false, false, false, false, false, false, false];
    for (let i in racks) {
      for (let j in racks[i]) {
        numbers[racks[i][j].number - 1] = true;
      }
    }
    const solution = numbers.reduce((prev, number) => {
      return prev + (!number ? 1 : 0);
    }, 0);
    return `No veo ${solution} cifra${solution === 1 ? '' : 's'}`;
  }
}];