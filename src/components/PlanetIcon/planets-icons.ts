const path = '../../assets/planets/';

const images = {
  earth: import(`${path}/earth.svg`),
  jupiter: import(`${path}/jupiter.svg`),
  mars: import(`${path}/mars.svg`),
  mercury: import(`${path}/mercury.svg`),
  neptune: import(`${path}/neptune.svg`),
  pluto: import(`${path}/pluto.svg`),
  saturn: import(`${path}/saturn.svg`),
  sun: import(`${path}/sun.svg`),
  uranus: import(`${path}/uranus.svg`),
  venus: import(`${path}/venus.svg`),
};

export default images;
