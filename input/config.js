const fs = require("fs");
const width = 420;
const height = 420;
const dir = __dirname;
const rarity = [
  { key: "", val: "original" },
  { key: "_r", val: "rare" },
  { key: "_sr", val: "super rare" },
];

const addRarity = (_str) => {
  let itemRarity;
  rarity.forEach((r) => {
    if (_str.includes(r.key)) {
      itemRarity = r.val;
    }
  });
  return itemRarity;
};

const cleanName = (_str) => {
  let name = _str.slice(0, -4);
  rarity.forEach((r) => {
    name = name.replace(r.key, "");
  });
  return name;
};

const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        name: cleanName(i),
        fileName: i,
        rarity: addRarity(i),
      };
    });
};

const layers = [
  {
    id: 1,
    name: "background",
    location: `${dir}/background/`,
    elements: getElements(`${dir}/background/`),
    position: { x: 0, y: 0 },
    size: { width: width, height: height },
  },
  {
    id: 2,
    name: "Layer1",
    location: `${dir}/Layer1/`,
    elements: getElements(`${dir}/Layer1/`),
    position: { x: 0, y: 0 },
    size: { width: width, height: height },
  },
  {
    id: 3,
    name: "Layer2",
    location: `${dir}/Layer2/`,
    elements: getElements(`${dir}/Layer2/`),
    position: { x: 0, y: 0 },
    size: { width: width, height: height },
  },
  {
    id: 4,
    name: "Layer3",
    location: `${dir}/Layer3/`,
    elements: getElements(`${dir}/Layer3/`),
    position: { x: 0, y: 0 },
    size: { width: width, height: height },
  },
  {
    id: 5,
    name: "Layer4",
    location: `${dir}/Layer4/`,
    elements: getElements(`${dir}/Layer4/`),
    position: { x: 0, y: 0 },
    size: { width: width, height: height },
  },
  {
    id: 6,
    name: "Layer5",
    location: `${dir}/Layer5/`,
    elements: getElements(`${dir}/Layer5/`),
    position: { x: 0, y: 0 },
    size: { width: width, height: height },
  },
  {
    id: 7,
    name: "Layer6",
    location: `${dir}/Layer6/`,
    elements: getElements(`${dir}/Layer6/`),
    position: { x: 0, y: 0 },
    size: { width: width, height: height },
  },
];

module.exports = { layers, width, height };
