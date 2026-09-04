export interface Ecorregion {
  id: number;
  nombre: string;
  paises: string;
  resumen: string;
  bioma: string;
}

export const ecorregiones: Ecorregion[] = [
  {
    id: 1,
    nombre: 'Amazonia',
    paises: 'Brasil, Perú, Colombia, Venezuela, Ecuador, Bolivia',
    resumen: 'El bosque tropical más grande del mundo. Alberga el 10% de todas las especies conocidas del planeta y regula el clima de toda América del Sur.',
    bioma: 'Bosque tropical húmedo',
  },
  {
    id: 2,
    nombre: 'Cerrado',
    paises: 'Brasil, Bolivia, Paraguay',
    resumen: 'La sabana tropical más biodiversa del mundo. Considerado un hotspot de biodiversidad, con más de 10.000 especies de plantas, muchas endémicas.',
    bioma: 'Sabana tropical',
  },
  {
    id: 3,
    nombre: 'Pantanal',
    paises: 'Brasil, Bolivia, Paraguay',
    resumen: 'El humedal tropical más grande del planeta. Refugio del yaguareté, el caimán yacaré y cientos de especies de aves acuáticas.',
   
    bioma: 'Humedal tropical',
  },
  {
    id: 4,
    nombre: 'Mata Atlántica',
    paises: 'Brasil, Argentina, Paraguay',
    resumen: 'Uno de los biomas más amenazados del planeta. Queda menos del 12% de su cobertura original, pero aún alberga una enorme diversidad de especies endémicas.',
    
    bioma: 'Bosque tropical húmedo',
  },
  {
    id: 5,
    nombre: 'Gran Chaco',
    paises: 'Argentina, Paraguay, Bolivia, Brasil',
    resumen: 'El segundo bosque más extenso de América del Sur. Clima extremo, entre los 45°C del verano y las heladas del invierno. Alta diversidad de reptiles y mamíferos.',
    
    bioma: 'Bosque seco subtropical',
  },
  {
    id: 6,
    nombre: 'Patagonia',
    paises: 'Argentina, Chile',
    resumen: 'Extensas estepas frías y ventosas al sur del continente. Hogar del puma, el guanaco, el ñandú y diversas aves marinas en sus costas.',
    
    bioma: 'Estepa patagónica',
  },
  {
    id: 7,
    nombre: 'Puna',
    paises: 'Argentina, Bolivia, Perú, Chile',
    resumen: 'Altiplano andino a más de 3.500 msnm. Ecosistema de pastizales de altura habitado por vicuñas, flamencos y cóndores.',
    
    bioma: 'Pastizal de altura',
  },
  {
    id: 8,
    nombre: 'Yungas',
    paises: 'Argentina, Bolivia, Perú',
    resumen: 'Selva de montaña en la vertiente oriental de los Andes. Gran biodiversidad en un rango altitudinal muy amplio, con niebla permanente y alta pluviosidad.',
    
    bioma: 'Bosque nublado',
  },
  {
    id: 9,
    nombre: 'Espinal',
    paises: 'Argentina',
    resumen: 'Bosque abierto de algarrobos, chañares y espinillos que rodea la pampa. Paisaje muy modificado por la agricultura, con importantes remanentes en Entre Ríos.',
    
    bioma: 'Bosque seco templado',
  },
  {
    id: 10,
    nombre: 'Pampa',
    paises: 'Argentina, Uruguay, Brasil',
    resumen: 'Llanura de pastizales templados, uno de los ecosistemas más fértiles y más transformados del planeta. Crítico para la conservación de aves migratorias.',
   
    bioma: 'Pastizal templado',
  },
  {
    id: 11,
    nombre: 'Valdivia (Bosque Templado Lluvioso)',
    paises: 'Chile, Argentina',
    resumen: 'Uno de los cinco bosques templados lluviosos del mundo. Alerce, coihue y copihue son sus especies emblema. Alta endemicidad de flora y fauna.',
   
    bioma: 'Bosque templado húmedo',
  },
  {
    id: 12,
    nombre: 'Caatinga',
    paises: 'Brasil',
    resumen: 'Bioma exclusivamente brasileño de vegetación xerófila adaptada a la semiaridez. Hogar del armadillo gigante y una flora muy particular de cactáceas.',
   
    bioma: 'Bosque seco tropical',
  },
  {
    id: 13,
    nombre: 'Orinoquía',
    paises: 'Venezuela, Colombia',
    resumen: 'Llanuras inundables y sabanas tropicales atravesadas por el río Orinoco. Hábitat del capibara, el chigüiro y el delfín de río.',
   
    bioma: 'Sabana inundable',
  },
  {
    id: 14,
    nombre: 'Andes Tropicales',
    paises: 'Venezuela, Colombia, Ecuador, Perú, Bolivia',
    resumen: 'El hotspot de biodiversidad más rico del planeta. Altísima concentración de especies endémicas por la variación altitudinal y el aislamiento de los valles.',
  
    bioma: 'Montaña tropical',
  },
  {
    id: 15,
    nombre: 'Mesoamérica',
    paises: 'México, Guatemala, Belice, Honduras, El Salvador, Nicaragua, Costa Rica, Panamá',
    resumen: 'Corredor biológico entre Norteamérica y Sudamérica. Enorme diversidad de ecosistemas en una superficie relativamente pequeña, con selvas, manglares y arrecifes.',
  
    bioma: 'Bosque tropical / Corredor biológico',
  },
];
