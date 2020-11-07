module.exports = [{
    _id: 1,
    question: '¿En cuántos soportes la suma de las cifras es 18 o más?',
    answerFunction: (racks) => {
      const solution = countRacks(
        racks,
        (rack) => rack.reduce((prev, tile) => prev + tile.number, 0) >= 18
      );
      return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
    }
  }, {
    _id: 2,
    question: '¿En cuántos soportes la suma de las cifras es 12 o más?',
    answerFunction: (racks) => {
      const solution = countRacks(
        racks,
        (rack) => rack.reduce((prev, tile) => prev + tile.number, 0) >= 12
      );
      return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
    }
  }, {
    _id: 3,
    question: '¿En cuántos soportes aparece la misma cifra en colores diferentes? (Por ejemplo, 7 azul y 7 amarillo en un mismo soporte)',
    answerFunction: (racks) => {
      const solution = countRacks(
        racks,
        (rack) => {
          return (rack[0].number === rack[1].number && rack[0].color !== rack[1].color) ||
                 (rack[0].number === rack[2].number && rack[0].color !== rack[2].color) ||
                 (rack[1].number === rack[2].number && rack[1].color !== rack[2].color);
        }
      );
      return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
    }
  }, {
    _id: 4,
    question: '¿En cuántos soportes ves dos colores diferentes?',
    answerFunction: (racks) => {
      const solution = countRacks(
        racks,
        (rack) => {
          return rack[0].color !== rack[1].color ||
                 rack[0].color !== rack[2].color ||
                 rack[1].color !== rack[2].color;
        }
      );
      return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
    }
  }, {
    _id: 5,
    question: '¿En cuántos soportes ves solo cifras pares o solo cifras impares?',
    answerFunction: (racks) => {
      const solution = countRacks(
        racks,
        rack => rack.reduce((prev, tile) => prev + tile.number % 2, 0) % 3 === 0);
      return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
    }
  }, {
    _id: 6,
    question: '¿En cuántos soportes ves al menos dos cifras iguales? (La misma cifra y el mismo color)',
    answerFunction: (racks) => {
      const solution = countRacks(
        racks,
        (rack) => rack[0].number === rack[1].number && rack[0].color === rack[1].color ||
                  rack[0].number === rack[2].number && rack[0].color === rack[2].color ||
                  rack[1].number === rack[2].number && rack[1].color === rack[2].color
      );
      return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
    }
  }, {
    _id: 7,
    question: '¿En cuántos soportes ves 3 cifras consecutivas?',
    answerFunction: (racks) => {
      const solution = countRacks(
        racks,
        (rack) => {
          const sorted = rack.slice().sort((tileA, tileB) => {
            return tileA.number > tileB.number;
          });
          let consecutives = true;
          for (let i = 1; i < sorted.length && consecutives; i++) {
            if (sorted[i].number - sorted[i - 1].number !== 1) {
              consecutives = false;
            }
          }
          return consecutives;
        });
      return `En ${solution} soporte${solution === 1 ? '' : 's'}`;
    }
  }, {
    _id: 8, question: '¿Cuántos colores ves?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const colors = tiles.map(i => i.color);
      const solution = colors.filter((i, id) => colors.indexOf(i) === id).length;
      return `Veo ${solution} color${solution === 1 ? '' : 'es'}`;
    }
  }, {
    _id: 9, question: '¿En cuántos colores ves al menos tres veces?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const count = {};
      tiles
        .map(i => i.color)
        .forEach(i => {
          if (!count[i]) {
            count[i] = 0;
          }
          count[i]++;
        });
      let solution = 0;
      for(const color in count) {
        if (count[color] >= 3) {
          solution ++;
        }
      }
      return `Veo ${solution} color${solution === 1 ? '' : 'es'} al menos tres veces`;
    }
  }, {
    _id: 10,
    question: '¿Cuantas cifras no ves?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const numbers = tiles.map(i => i.number);
      const solution = 7 - numbers.filter((i, id) => numbers.indexOf(i) === id).length;
      return `No veo ${solution} cifra${solution === 1 ? '' : 's'}`;
    }
  }, {
    _id: 11,
    question: '¿Cuántas de las cifras siguientes ves en total? 1 verde, 5 negro o 7 rosa',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const solution = tiles.filter(i => {
        return i.number === 1 ||
               i.number === 5 && i.color === 'BLACK' ||
               i.number === 7 && i.color === 'PINK';
      }).length;
      return `Veo ${solution} de esas cifras`;
    }
  }, {
    _id: 12, question: '¿Ves más treses o más seises rosas?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.number === 3).length;
      const b = tiles.filter(i => i.number === 6 && i.color === 'PINK').length;
      return biggerLiteral(a, b, 'treses', 'seises rosas');
    }
  }, {
    _id: 13, question: '¿Ves más seises verdes o más sietes amarillos?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.number === 6 && i.color === 'GREEN').length;
      const b = tiles.filter(i => i.number === 7 && i.color === 'YELLOW').length;
      return biggerLiteral(a, b, 'seises verdes', 'sietes amarillos');
    }
  }, {
    _id: 14, question: '¿Ves más doses amarillos o más sietes amarillos?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.number === 2).length;
      const b = tiles.filter(i => i.number === 7 && i.color === 'YELLOW').length;
      return biggerLiteral(a, b, 'doses amarillos', 'sietes amarillos');
    }
  }, {
    _id: 15, question: '¿Ves más seises rosas o más seises verdes?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.number === 6 && i.color === 'PINK').length;
      const b = tiles.filter(i => i.number === 6 && i.color === 'GREEN').length;
      return biggerLiteral(a, b, 'seises rosas', 'seises verdes');
    }
  }, {
    _id: 16, question: '¿Ves más sietes azules o más sietes de otro color?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.number === 7 && i.color === 'BLUE').length;
      const b1 = tiles.filter(i => i.number === 7 && i.color === 'PINK').length;
      const b2 = tiles.filter(i => i.number === 7 && i.color === 'YELLOW').length;
      const b = b1 + b2;
      return biggerLiteral(a, b, 'sietes azules', 'sietes de otro color');
    }
  }, {
    _id: 17, question: '¿Ves más cifras marrones o más cifras azules?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.color === 'BROWN').length;
      const b = tiles.filter(i => i.color === 'BLUE').length;
      return biggerLiteral(a, b, 'cifras marrones', 'cifras azules');
    }
  }, {
    _id: 18, question: '¿Ves más cifras rojas o más cifras rosas?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.color === 'RED').length;
      const b = tiles.filter(i => i.color === 'PINK').length;
      return biggerLiteral(a, b, 'cifras rojas', 'cifras rosas');
    }
  }, {
    _id: 19, question: '¿Ves más cifras verdes o más cifras azules?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.color === 'GREEN').length;
      const b = tiles.filter(i => i.color === 'BLUE').length;
      return biggerLiteral(a, b, 'cifras verdes', 'cifras azules');
    }
  }, {
    _id: 20, question: '¿Ves más cifras amarillas o más cifras rosas?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.color === 'YELLOW').length;
      const b = tiles.filter(i => i.color === 'PINK').length;
      return biggerLiteral(a, b, 'cifras amarillas', 'cifras rosas');
    }
  }, {
    _id: 21, question: '¿Ves más cifras negras o más cifras marrones?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.color === 'BLACK').length;
      const b = tiles.filter(i => i.color === 'BROWN').length;
      return biggerLiteral(a, b, 'cifras negras', 'cifras marrones');
    }
  }, {
    _id: 22, question: '¿Ves más cifras negras o más cifras rojas?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.color === 'BLACK').length;
      const b = tiles.filter(i => i.color === 'RED').length;
      return biggerLiteral(a, b, 'cifras negras', 'cifras rojas');
    }
  }, {
    _id: 23, question: '¿Ves más cifras verdes o más cifras amarillas?',
    answerFunction: (racks) => {
      const tiles = plainTiles(racks);
      const a = tiles.filter(i => i.color === 'GREEN').length;
      const b = tiles.filter(i => i.color === 'YELLOW').length;
      return biggerLiteral(a, b, 'cifras verdes', 'cifras amarillas');
    }
  }
];

function countRacks(racks, matchingFn) {
  return racks.filter(matchingFn).length;
}

function plainTiles(racks) {
  return racks.reduce((p, c) => p.concat(c), []);
}

function biggerLiteral(a, b, litA, litB) {
  if (a > b) {
    return `Veo más ${litA} que ${litB}`;
  } else if (a < b) {
    return `Veo más ${litB} que ${litA}`;
  } else {
    return `Veo los mismos ${litA} que ${litB}`;
  }
}