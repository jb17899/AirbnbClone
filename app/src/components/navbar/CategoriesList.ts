'use client'

import {
  TbBeach,
  TbMountain,
  TbPool,
  TbBuildingSkyscraper,
  TbCampfire,
  TbGolf,
  TbWorld,
  TbSnowflake,
  TbBed,
  TbTent,
  TbHistory,
  TbLeaf,
  TbPyramid,
  TbLayoutDashboard,
  TbHome,
} from 'react-icons/tb';
import {
  GiWindmill,
  GiCaveEntrance,
  GiTreehouse,
  GiDominoMask,
  GiModernCity,
  GiIsland,
  GiBoatFishing,
} from 'react-icons/gi';
import { MdOutlineVilla, MdOutlineCabin } from 'react-icons/md';
import { IconType } from 'react-icons';

export interface categoryType{
  label:string,
  icon:IconType,
  description:string
};
const categories = [
  { label: 'Beach', icon: TbBeach, description: 'Close to the beach' },
  { label: 'Windmills', icon: GiWindmill, description: 'Has Windmills' },
  { label: 'Modern', icon: MdOutlineVilla, description: 'Modern villa' },
  { label: 'Mountains', icon: TbMountain, description: 'Mountain views' },
  { label: 'Pools', icon: TbPool, description: 'Stunning pools' },
  { label: 'Urban', icon: TbBuildingSkyscraper, description: 'City skylines' },
  { label: 'Treehouses', icon: GiTreehouse, description: 'Stay in a treehouse' },
  { label: 'Cabins', icon: MdOutlineCabin, description: 'Rustic cabins' },
  { label: 'Camping', icon: TbCampfire, description: 'Camping experiences' },
  { label: 'Golfing', icon: TbGolf, description: 'Golf resorts' },
  { label: 'Iconic', icon: TbWorld, description: 'Iconic city stays' },
  { label: 'Skiing', icon: TbSnowflake, description: 'Ski resorts' },
  { label: 'Historical', icon: TbHistory, description: 'Historic houses' },
  { label: 'Lake', icon: GiBoatFishing, description: 'Eco-friendly stays' },
  { label: 'Caves', icon: GiCaveEntrance, description: 'Unique cave homes' },
  { label: 'Desert', icon: TbPyramid, description: 'Desert stays' },
  { label: 'Islands', icon: GiIsland, description: 'Island' },
];
export default categories;
