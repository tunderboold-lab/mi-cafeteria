'use client';
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";


const CATEGORIAS = [
  "☕ Bebidas y Café","🧁 Polvos y Bases","🍓 Frutas y Frescos","🍫 Chocolates y Dulces",
  "🌶️ Botanas y Snacks","🍦 Helados y Nieves","🧀 Lácteos y Proteínas","🥣 Panadería e Ingredientes",
  "🧂 Aderezos y Salsas","🛍️ Desechables y Empaque","🧹 Limpieza e Higiene","🍬 Complementos y Toppings",
  "📎 Papelería y Mantenimiento"
];

const UNIDADES = ["kg","g","L","mL","pzas","cajas","bolsas","paquetes","rollos","litros"];
const MOTIVOS_MERMA = ["Caducidad","Accidente / Derrame","Error de preparación","Robo / Pérdida","Mala calidad","Otro"];
const TABS = [{id:"inventario",label:"Inventario",icon:"📦"},{id:"pedidos",label:"Pedidos",icon:"🛒"},{id:"mermas",label:"Mermas",icon:"📉"},{id:"historial",label:"Historial",icon:"📋"},{id:"reportes",label:"Reportes",icon:"📊"}];


const PRODUCTOS_INICIALES = [
  // Bebidas y Café
  {id:1,nombre:"Café Soluble",barcode:"078742375540",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"☕"},
  {id:2,nombre:"Leche Entera",barcode:"750053300418",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:3,nombre:"Leche de Avena",barcode:"750053300526",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:4,nombre:"Leche de Almendra",barcode:"750053300420",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:5,nombre:"Leche de Coco",barcode:"750053300459",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥥"},
  {id:6,nombre:"Leche Deslactosada",barcode:"750053300419",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:7,nombre:"Leche Evaporada",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:8,nombre:"Leche en Polvo",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:9,nombre:"Lechera",barcode:"750647510472",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍯"},
  {id:10,nombre:"Lyncott",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:11,nombre:"Sustituto de Crema",barcode:"750053300275",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:12,nombre:"Crema de Baileys",barcode:"750166861921",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍸"},
  {id:13,nombre:"Baileys Licor",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍸"},
  {id:14,nombre:"Coca Cola",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:15,nombre:"Pepsi",barcode:"750103131309",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:16,nombre:"7up",barcode:"7501022014554",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:17,nombre:"Sprite",barcode:"750105530480",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:18,nombre:"Mirinda",barcode:"750102201566",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:19,nombre:"Squirt",barcode:"750107112009",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:20,nombre:"Peñafiel",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:21,nombre:"Manzanita",barcode:"750102201546",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:22,nombre:"Iceee Cereza",barcode:"018804055133",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧊"},
  {id:23,nombre:"Iceee Mora Azul",barcode:"018804057182",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧊"},
  {id:24,nombre:"Yakult",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧴"},
  {id:25,nombre:"Nesquik Vainilla",barcode:"750105929638",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:26,nombre:"Leche de Fresa",barcode:"750105536263",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:27,nombre:"Roma",barcode:"750102600460",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"☕"},
  // Polvos y Bases
  {id:28,nombre:"P. Cappuccino",barcode:"750304411587",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"☕"},
  {id:29,nombre:"P. Matcha",barcode:"8466700002438",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍵"},
  {id:30,nombre:"P. Taro",barcode:"750304411588",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🟣"},
  {id:31,nombre:"P. Horchata",barcode:"750303816115",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:32,nombre:"P. Mazapán",barcode:"750304439903",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:33,nombre:"P. Mora Azul",barcode:"750303881817",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🫐"},
  {id:34,nombre:"P. Pistache",barcode:"707586718076",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🟢"},
  {id:35,nombre:"P. Red Velvet",barcode:"707586718977",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"❤️"},
  {id:36,nombre:"P. Cajeta",barcode:"750303816118",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍯"},
  {id:37,nombre:"P. Caramelo",barcode:"750304411568",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍮"},
  {id:38,nombre:"P. Chocolate Blanco",barcode:"750304411592",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🤍"},
  {id:39,nombre:"P. Cookies",barcode:"750304411591",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍪"},
  {id:40,nombre:"P. Crème Brulée",barcode:"750305176206",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍮"},
  {id:41,nombre:"P. Coco",barcode:"750303816111",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥥"},
  {id:42,nombre:"P. Xocolatl",barcode:"750304935853",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:43,nombre:"P. Chocomenta",barcode:"",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍃"},
  {id:44,nombre:"P. Chai Vainilla",barcode:"",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🫖"},
  {id:45,nombre:"Polvo Flan",barcode:"750304050645",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍮"},
  {id:46,nombre:"Harina de Trigo",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌾"},
  {id:47,nombre:"Harina de Arroz",barcode:"055104001026",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌾"},
  {id:48,nombre:"Harina Hotcakes",barcode:"750106921381",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥞"},
  {id:49,nombre:"Levadura Tradipan",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍞"},
  {id:50,nombre:"Azúcar",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:51,nombre:"Azúcar Glass",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:52,nombre:"Mantequilla",barcode:"750101361007",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧈"},
  {id:53,nombre:"Galleta Lotus",barcode:"541012671601",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍪"},
  {id:54,nombre:"Lotus Untable",barcode:"541012612689",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍪"},
  {id:55,nombre:"Mermelada de Fresa",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:56,nombre:"Cajeta Coronado",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍯"},
  {id:57,nombre:"Maple",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍁"},
  {id:58,nombre:"Huevo",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥚"},
  {id:59,nombre:"TadiPan",barcode:"017929111014",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍞"},
  // Frutas y Frescos
  {id:60,nombre:"Fresa (caja)",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍓",esVariable:true},
  {id:61,nombre:"Frambuesa",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍓",esVariable:true},
  {id:62,nombre:"Mora",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🫐",esVariable:true},
  {id:63,nombre:"Zarzamora",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🫐",esVariable:true},
  {id:64,nombre:"Arándanos",barcode:"681131077637",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🫐",esVariable:true},
  {id:65,nombre:"Kiwi",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥝",esVariable:true},
  {id:66,nombre:"Mango",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥭",esVariable:true},
  {id:67,nombre:"Sandía",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍉",esVariable:true},
  {id:68,nombre:"Piña",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍍",esVariable:true},
  {id:69,nombre:"Uvas",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍇",esVariable:true},
  {id:70,nombre:"Limón",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍋",esVariable:true},
  {id:71,nombre:"Plátano",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍌",esVariable:true},
  {id:72,nombre:"Pepino",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥒",esVariable:true},
  {id:73,nombre:"Lechuga",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥬",esVariable:true},
  {id:74,nombre:"Champiñones",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍄",esVariable:true},
  {id:75,nombre:"Cerezas",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍒",esVariable:true},
  {id:76,nombre:"Coco",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Anaquel",caducidad:"",emoji:"🥥"},
  {id:77,nombre:"Danonino",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🧁"},
  {id:78,nombre:"Yogurt Griego",barcode:"750104009147",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥛"},
  // Chocolates y Dulces
  {id:79,nombre:"Ferrero Roché",barcode:"789802439533",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:80,nombre:"Kinder Bueno",barcode:"789742191824",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:81,nombre:"Kinder Chocolate",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:82,nombre:"Kinder Delice",barcode:"800050026710",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:83,nombre:"Kit Kat",barcode:"750105862991",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:84,nombre:"M&M's",barcode:"750227191764",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:85,nombre:"Nutella",barcode:"062020030306",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:86,nombre:"Hershey's Tableta",barcode:"750102459908",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:87,nombre:"Hershey's Líquido",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:88,nombre:"Carlos V",barcode:"750105863809",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:89,nombre:"Rafaello",barcode:"800050004133",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:90,nombre:"Mazapán",barcode:"724869100076",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:91,nombre:"Bubulubu",barcode:"757528023416",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:92,nombre:"Chocoretas",barcode:"757528023393",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:93,nombre:"Kranky",barcode:"757528023409",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:94,nombre:"Bombones Biachi",barcode:"724869003278",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:95,nombre:"Miguelito",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:96,nombre:"Skwinkles",barcode:"725181510109",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:97,nombre:"Huevo Kinder",barcode:"800050014600",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥚"},
  {id:98,nombre:"Conejo Turín Mini",barcode:"750227191303",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:99,nombre:"Sicao Amargo",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  // Botanas y Snacks
  {id:100,nombre:"Takis Azules",barcode:"750081002245",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:101,nombre:"Doritos",barcode:"750101116773",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌽"},
  {id:102,nombre:"Flamin Hot",barcode:"750047802471",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🔥"},
  {id:103,nombre:"Sabritas Crujientes",barcode:"750101114324",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥔"},
  {id:104,nombre:"Pretzels",barcode:"750032628614",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥨"},
  {id:105,nombre:"Papas Gajo",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍟"},
  {id:106,nombre:"Papas a la Francesa",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍟"},
  {id:107,nombre:"Aros de Cebolla",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧅"},
  {id:108,nombre:"Palillo Mini Hot",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:109,nombre:"Alitas",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍗"},
  {id:110,nombre:"Boneless",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍗"},
  {id:111,nombre:"Dedos de Queso",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🧀"},
  {id:112,nombre:"Jalapeños Rellenos",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🌶️"},
  // Helados y Nieves
  {id:113,nombre:"Helado de Fresa",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍦"},
  {id:114,nombre:"Helado de Chocolate",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍦"},
  {id:115,nombre:"Helado de Vainilla",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍦"},
  {id:116,nombre:"Helado de Galleta",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"L",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍦"},
  {id:117,nombre:"Mágnum",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍦"},
  {id:118,nombre:"Pingüinos Mini",barcode:"750301854492",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🐧"},
  {id:119,nombre:"Paletas Ferrero",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍭"},
  {id:120,nombre:"Paletas Rafaello",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍭"},
  {id:121,nombre:"Paletas Kit Kat",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍭"},
  // Lácteos y Proteínas
  {id:122,nombre:"Queso Manchego",barcode:"",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🧀"},
  {id:123,nombre:"Mozzarella Rayado",barcode:"078742084770",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🧀"},
  {id:124,nombre:"Mozzarella en Cubo",barcode:"",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🧀"},
  {id:125,nombre:"Queso Parmesano",barcode:"",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🧀"},
  {id:126,nombre:"Queso Líquido Amarillo",barcode:"750053302562",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🧀"},
  {id:127,nombre:"Philadelphia",barcode:"",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🧀"},
  {id:128,nombre:"Crema Alpura",barcode:"",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥛"},
  {id:129,nombre:"Crema Ilsa",barcode:"",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥛"},
  {id:130,nombre:"Tocino",barcode:"750053300437",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥓"},
  {id:131,nombre:"Salchicha",barcode:"750132570369",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🌭"},
  {id:132,nombre:"Jamón Serrano",barcode:"736436704150",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🥩"},
  {id:133,nombre:"Pechuga de Pavo",barcode:"",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍗"},
  {id:134,nombre:"Pepperoni",barcode:"",categoria:"🧀 Lácteos y Proteínas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍕"},
  // Aderezos y Salsas
  {id:135,nombre:"Chamoy",barcode:"738545020206",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:136,nombre:"Tajín",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧂"},
  {id:137,nombre:"Valentina",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:138,nombre:"Ranch",barcode:"750053300372",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥗"},
  {id:139,nombre:"BBQ",barcode:"7501006587159",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍖"},
  {id:140,nombre:"Buffalo",barcode:"041500897431",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:141,nombre:"Chipotle",barcode:"636817702655",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:142,nombre:"Sriracha",barcode:"885093104142",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:143,nombre:"Catsup",barcode:"605388002327",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍅"},
  {id:144,nombre:"Salsa Prego",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍝"},
  {id:145,nombre:"Lemon Pepper",barcode:"750302734101",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍋"},
  {id:146,nombre:"Sazonador Fajitas",barcode:"750053300523",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧂"},
  {id:147,nombre:"Jugo Sazonador",barcode:"750200627992",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧂"},
  {id:148,nombre:"Sal",barcode:"034587020069",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧂"},
  {id:149,nombre:"Aderezo Fantasma",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"👻"},
  {id:150,nombre:"Aderezo Tamarindo",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧂"},
  // Desechables
  {id:151,nombre:"Vaso Ch 12oz",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:152,nombre:"Vaso M 16oz",barcode:"752216086056",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:153,nombre:"Vaso G 24oz",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:154,nombre:"Vaso 2oz (prueba)",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:155,nombre:"Vaso 4Ch helado",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍦"},
  {id:156,nombre:"Tapa Ch (helado)",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍦"},
  {id:157,nombre:"Tapa 2oz (vaso)",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:158,nombre:"Tapa Plana Vaso Ch",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:159,nombre:"Popote Delgado",barcode:"750302175032",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:160,nombre:"Popote Boba",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧋"},
  {id:161,nombre:"Bolsa Camisa Chica",barcode:"750220880400",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🛍️"},
  {id:162,nombre:"Bolsa Camisa Grande",barcode:"750220880402",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🛍️"},
  {id:163,nombre:"Bolsa Celofán",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🛍️"},
  {id:164,nombre:"Plato Cartón",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍽️"},
  {id:165,nombre:"Charola 8x8",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"📦"},
  {id:166,nombre:"Charola Hamburguesera",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"📦"},
  {id:167,nombre:"Servilletas",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧻"},
  {id:168,nombre:"Aluminio",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"rollos",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"✨"},
  {id:169,nombre:"Cucharas Negras",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥄"},
  {id:170,nombre:"Tenedor Negro",barcode:"750302967301",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍴"},
  {id:171,nombre:"Cuchillo Negro",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍴"},
  {id:172,nombre:"Portavasos",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:173,nombre:"Portabanderillas",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍢"},
  {id:174,nombre:"Palillos Banderillas",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍢"},
  {id:175,nombre:"Rafia",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"rollos",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🎀"},
  {id:176,nombre:"Papel Cuadriculado",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"📄"},
  {id:177,nombre:"Manga de Vasos Ch",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  // Limpieza
  {id:178,nombre:"Bactericida",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧴"},
  {id:179,nombre:"Cloro Gel",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧴"},
  {id:180,nombre:"Gel Antibacterial",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧴"},
  {id:181,nombre:"Guantes de Nitrilo",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"cajas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧤"},
  {id:182,nombre:"Toallitas Desinfectantes",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧻"},
  {id:183,nombre:"Jabón para Baño",barcode:"750300785964",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧼"},
  {id:184,nombre:"Papel de Baño",barcode:"750179161038",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧻"},
  {id:185,nombre:"Bolsa Basura 60x90",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🗑️"},
  {id:186,nombre:"Bolsa Basura 90x120",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🗑️"},
  // Complementos y Toppings
  {id:187,nombre:"Almendra",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌰"},
  {id:188,nombre:"Avellana",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌰"},
  {id:189,nombre:"Nuez Granillo",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"kg",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌰"},
  {id:190,nombre:"Granillo Turín",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"✨"},
  {id:191,nombre:"Granillo Gansito",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"✨"},
  {id:192,nombre:"Gota Blanca",barcode:"750300125059",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"⚪"},
  {id:193,nombre:"Gota Café",barcode:"523402250724",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🟤"},
  {id:194,nombre:"Color de Gel",barcode:"850052868352",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🎨"},
  {id:195,nombre:"Aros de Manzana",barcode:"744218100106",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍎"},
  {id:196,nombre:"Trozos de Piña",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍍"},
  {id:197,nombre:"Duraznos en Mitades",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍑"},
  {id:198,nombre:"Duraznos en Cubo",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍑"},
  {id:199,nombre:"Aceite Maravilla",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🫙"},
  {id:200,nombre:"Crema de Cacahuate",barcode:"037600256889",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥜"},
  {id:201,nombre:"Crema de Coco Calahua",barcode:"750300657511",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥥"},
  {id:202,nombre:"Aceite Maravilla",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🫙"},
  {id:203,nombre:"Canela",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍂"},
  {id:204,nombre:"Garrafón de Agua",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"💧"},
  {id:205,nombre:"Jugo Cran-Fresa",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:206,nombre:"Rompope",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥛"},
  {id:207,nombre:"Piñón Licor",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍸"},
  {id:208,nombre:"Vainilla Varsa Galón",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍶"},
  {id:209,nombre:"Nesquik Fresa",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:210,nombre:"Roma en Polvo",barcode:"",categoria:"☕ Bebidas y Café",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"☕"},
  {id:211,nombre:"P. Arroz C/L",barcode:"",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌾"},
  {id:212,nombre:"Jarabe Pulparindo",barcode:"",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:213,nombre:"Jarabe Pica Fresa",barcode:"",categoria:"🧁 Polvos y Bases",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:214,nombre:"Chocotorro",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:215,nombre:"Chocoroles Mini",barcode:"7503018544908",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:216,nombre:"Chongos Zamoranos",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍮"},
  {id:217,nombre:"Gansito Mini",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍰"},
  {id:218,nombre:"Pelón Pelón Rico",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:219,nombre:"Mordisco",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:220,nombre:"Mordisco Oreo",barcode:"",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:221,nombre:"Ositos Enchilados",barcode:"744218100267",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🐻"},
  {id:222,nombre:"Pica Fresas",barcode:"759686651012",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:223,nombre:"Bombón Chocolate",barcode:"052551666242",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:224,nombre:"Carlos V Stick",barcode:"7501058623348",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
  {id:225,nombre:"Caja de Oreo",barcode:"17622210833768",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍪"},
  {id:226,nombre:"Frutimich Sandía",barcode:"750301721420",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍉"},
  {id:227,nombre:"C. Chicle Azul",barcode:"781159000294",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:228,nombre:"C. Chicle Rosa",barcode:"614143031922",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:229,nombre:"C. Malvavisco",barcode:"659525583545",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:230,nombre:"C. Algodón Azul",barcode:"700083813213",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:231,nombre:"C. Grosella",barcode:"614143305610",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:232,nombre:"Banderillas de Tamarindo",barcode:"7503004347032",categoria:"🍫 Chocolates y Dulces",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:233,nombre:"Froot Loops",barcode:"750100806638",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌀"},
  {id:234,nombre:"Ramen",barcode:"041789002960",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍜"},
  {id:235,nombre:"4 Quesos",barcode:"096619224098",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧀"},
  {id:236,nombre:"Sabritas Naturales",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥔"},
  {id:237,nombre:"Doritos Nacho",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌽"},
  {id:238,nombre:"Carneishon",barcode:"",categoria:"🌶️ Botanas y Snacks",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥩"},
  {id:239,nombre:"J. Original",barcode:"674012718385",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧴"},
  {id:240,nombre:"J. Piña Colada",barcode:"7503038161222",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍍"},
  {id:241,nombre:"J. Avellana",barcode:"658738694093",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌰"},
  {id:242,nombre:"J. Cereza",barcode:"674012718019",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍒"},
  {id:243,nombre:"J. Frambuesa",barcode:"674012718057",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:244,nombre:"J. Fresa",barcode:"740120718064",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:245,nombre:"J. Frutos Rojos",barcode:"674012718088",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍓"},
  {id:246,nombre:"J. Hot Jalapeño",barcode:"674012718361",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:247,nombre:"J. Kiwi",barcode:"674012718095",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥝"},
  {id:248,nombre:"J. Lichi",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍡"},
  {id:249,nombre:"J. Mango",barcode:"674012718101",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥭"},
  {id:250,nombre:"J. Manzana",barcode:"674012718118",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍎"},
  {id:251,nombre:"J. Menta",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍃"},
  {id:252,nombre:"J. Natural",barcode:"674012718132",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧴"},
  {id:253,nombre:"J. Neon Limonada",barcode:"674012718873",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍋"},
  {id:254,nombre:"J. Tamarindo",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍬"},
  {id:255,nombre:"J. Uva",barcode:"674012718811",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍇"},
  {id:256,nombre:"J. Maracuyá",barcode:"658738694628",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍊"},
  {id:257,nombre:"J. Mora Azul",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🫐"},
  {id:258,nombre:"J. Frutos Chipotle",barcode:"674012718682",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:259,nombre:"J. Doritos",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌽"},
  {id:260,nombre:"J. Takis",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:261,nombre:"J. Chetos",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧡"},
  {id:262,nombre:"J. Flamin Hot",barcode:"814012718316",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🔥"},
  {id:263,nombre:"J. Sabritas",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥔"},
  {id:264,nombre:"Aderezo Chipotle",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:265,nombre:"Aderezo Chetos Flamin Hot",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🔥"},
  {id:266,nombre:"Aderezo Doritos Nachos",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌽"},
  {id:267,nombre:"Aderezo Sabritas Habanero",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:268,nombre:"Aderezo Takis Fuego",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🔥"},
  {id:269,nombre:"Mango Habanero",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥭"},
  {id:270,nombre:"Polvo Chipotle",barcode:"",categoria:"🧂 Aderezos y Salsas",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🌶️"},
  {id:271,nombre:"Tapa Plana (M, G)",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:272,nombre:"Tapa Domo (M, G)",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:273,nombre:"Tapa Orificio Grande (M, G)",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:274,nombre:"Tapa de Boquilla (M, G)",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:275,nombre:"Tapa Domo Vaso Ch",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🥤"},
  {id:276,nombre:"Empaque Banderillas Coreanas",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"📦"},
  {id:277,nombre:"Empaque Marquesitas",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"📦"},
  {id:278,nombre:"Bolsa de 1 kg",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🛍️"},
  {id:279,nombre:"Bolsa de 1/2 kg",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🛍️"},
  {id:280,nombre:"Tenedor de Colores",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍴"},
  {id:281,nombre:"Playo",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"rollos",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"📦"},
  {id:282,nombre:"Charola de Banderillas",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍢"},
  {id:283,nombre:"Bolsa Basura Baño",barcode:"",categoria:"🛍️ Desechables y Empaque",cantidad:0,unidad:"paquetes",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🗑️"},
  {id:284,nombre:"Pinol",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🧹"},
  {id:285,nombre:"Hielo",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"bolsas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🧊"},
  {id:286,nombre:"Gas",barcode:"",categoria:"🧹 Limpieza e Higiene",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🔥"},
  {id:287,nombre:"Etiquetas Apertura",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"rollos",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🏷️"},
  {id:288,nombre:"Etiquetas Abierto",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"rollos",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🏷️"},
  {id:289,nombre:"Etiquetas Anaqueles",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🏷️"},
  {id:290,nombre:"Plumas Negras",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🖊️"},
  {id:291,nombre:"Plumones Permanentes",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"✏️"},
  {id:292,nombre:"Teflón / Cinta Teflón",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🔧"},
  {id:293,nombre:"Cinta de Aislar",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🔧"},
  {id:294,nombre:"Pilas 3A",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🔋"},
  {id:295,nombre:"Atrapa Moscas",barcode:"",categoria:"📎 Papelería y Mantenimiento",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🪰"},
  {id:296,nombre:"Galletas Marías",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍪"},
  {id:297,nombre:"Mermelada de Zarzamora",barcode:"",categoria:"🥣 Panadería e Ingredientes",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🫐"},
  {id:298,nombre:"Nieves de Limón",barcode:"",categoria:"🍦 Helados y Nieves",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Congelador",caducidad:"",emoji:"🍋"},
  {id:299,nombre:"Plátano Macho",barcode:"",categoria:"🍓 Frutas y Frescos",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"Refrigerador",caducidad:"",emoji:"🍌",esVariable:true},
  {id:300,nombre:"Ketaifi",barcode:"",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍝"},
  {id:301,nombre:"Cruch",barcode:"750105922391",categoria:"🍬 Complementos y Toppings",cantidad:0,unidad:"pzas",minimo:0,maximo:0,optimo:0,proveedor:"",costo:0,ubicacion:"",caducidad:"",emoji:"🍫"},
];

// DB <-> App converters
function productoToDb(p) {
  return {
    id: p.id, nombre: p.nombre, barcode: p.barcode||"", categoria: p.categoria,
    cantidad: p.cantidad, unidad: p.unidad, minimo: p.minimo, maximo: p.maximo||0,
    optimo: p.optimo||0, cant_comprar: p.cantComprar||0, proveedor: p.proveedor||"",
    costo: p.costo||0, ubicacion: p.ubicacion||"", caducidad: p.caducidad||"",
    emoji: p.emoji||"📦", es_variable: p.esVariable||false
  };
}
function dbToProducto(r) {
  return {
    id: r.id, nombre: r.nombre, barcode: r.barcode||"", categoria: r.categoria,
    cantidad: r.cantidad, unidad: r.unidad, minimo: r.minimo, maximo: r.maximo||0,
    optimo: r.optimo||0, cantComprar: r.cant_comprar||0, proveedor: r.proveedor||"",
    costo: r.costo||0, ubicacion: r.ubicacion||"", caducidad: r.caducidad||"",
    emoji: r.emoji||"📦", esVariable: r.es_variable||false
  };
}
function movimientoToDb(m) {
  return {id:m.id,producto_id:m.productoId,nombre:m.nombre,unidad:m.unidad,tipo:m.tipo,cantidad:m.cantidad,antes:m.antes,despues:m.despues,fecha:m.fecha};
}
function dbToMovimiento(r) {
  return {id:r.id,productoId:r.producto_id,nombre:r.nombre,unidad:r.unidad,tipo:r.tipo,cantidad:r.cantidad,antes:r.antes,despues:r.despues,fecha:r.fecha};
}
function mermaToDb(m) {
  return {id:m.id,producto_id:m.productoId,nombre:m.nombre,unidad:m.unidad,cantidad:m.cantidad,motivo:m.motivo,notas:m.notas||"",costo_estimado:m.costoEstimado||0,antes:m.antes,despues:m.despues,fecha:m.fecha};
}
function dbToMerma(r) {
  return {id:r.id,productoId:r.producto_id,nombre:r.nombre,unidad:r.unidad,cantidad:r.cantidad,motivo:r.motivo,notas:r.notas||"",costoEstimado:r.costo_estimado||0,antes:r.antes,despues:r.despues,fecha:r.fecha};
}
function dbToProveedor(r) {
  return {id:r.id,nombre:r.nombre,contacto:r.contacto||"",telefono:r.telefono||"",diasEntrega:r.dias_entrega||""};
}


const statusInfo = p => {
  if (p.cantidad === 0) return { color:"#ef4444", bg:"#ef444415", label:"Agotado", icon:"🚫" };
  if (p.cantidad <= p.minimo) return { color:"#f59e0b", bg:"#f59e0b15", label:"Stock bajo", icon:"⚠️" };
  if (p.cantidad <= p.optimo) return { color:"#60a5fa", bg:"#60a5fa15", label:"Óptimo bajo", icon:"📊" };
  return { color:"#22c55e", bg:"#22c55e15", label:"OK", icon:"✅" };
};

const fmt = iso => new Date(iso).toLocaleString("es-MX",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});
const diasParaCaducar = fecha => fecha ? Math.ceil((new Date(fecha) - new Date()) / 86400000) : null;

const FORM_VACIO = { nombre:"", barcode:"", categoria:"☕ Bebidas y Café", cantidad:"", unidad:"pzas", minimo:"", maximo:"", optimo:"", proveedor:"", costo:"", ubicacion:"", caducidad:"", emoji:"📦", esVariable:false };

export default function App() {
  const [tab, setTab] = useState("inventario");
  const [productos, setProductos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [mermas, setMermas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [modoFinSemana, setModoFinSemana] = useState(false);
  const [modal, setModal] = useState(null);
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCat, setFiltroCat] = useState("Todas");
  const [guardando, setGuardando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [scanActivo, setScanActivo] = useState(false);
  const [formP, setFormP] = useState(FORM_VACIO);
  const [formM, setFormM] = useState({ productoId:"", cantidad:"", motivo:"Caducidad", notas:"" });
  const [formProv, setFormProv] = useState({ nombre:"", contacto:"", telefono:"", diasEntrega:"" });
  const [ajusteItem, setAjusteItem] = useState(null);
  const [ajusteDelta, setAjusteDelta] = useState("");
  const videoRef = useRef(null);

  useEffect(() => { cargar(); }, []);

  // Alertas caducidad al cargar
  useEffect(() => {
    if (!productos.length) return;
    const proximos = productos.filter(p => { const d = diasParaCaducar(p.caducidad); return d !== null && d <= 7 && d >= 0; });
    if (proximos.length) alert(`⚠️ ${proximos.length} producto(s) caducan en 7 días o menos:\n${proximos.map(p=>`• ${p.nombre} (${diasParaCaducar(p.caducidad)} días)`).join("\n")}`);
  }, [productos.length]);

  async function cargar() {
    try {
      const [rP, rH, rM, rPv, rConf] = await Promise.all([
        supabase.from("inventario").select("*").order("id"),
        supabase.from("historial").select("*").order("fecha", {ascending: false}).limit(500),
        supabase.from("mermas").select("*").order("fecha", {ascending: false}).limit(300),
        supabase.from("proveedores").select("*").order("id"),
        supabase.from("configuracion").select("*"),
      ]);
      const prods = rP.data && rP.data.length > 0 ? rP.data.map(dbToProducto) : null;
      if (!prods) {
        // First time: insert all initial products
        const inserts = PRODUCTOS_INICIALES.map(productoToDb);
        await supabase.from("inventario").insert(inserts);
        setProductos(PRODUCTOS_INICIALES);
      } else {
        setProductos(prods);
      }
      setHistorial(rH.data ? rH.data.map(dbToMovimiento) : []);
      setMermas(rM.data ? rM.data.map(dbToMerma) : []);
      setProveedores(rPv.data ? rPv.data.map(dbToProveedor) : []);
      const modoConf = rConf.data?.find(c => c.clave === "modo");
      setModoFinSemana(modoConf?.valor === "finsemana");
    } catch(e) { console.error(e); setProductos(PRODUCTOS_INICIALES); }
  }

  async function guardar(p,h,m,pv) {
    // Supabase writes happen inline in each function - this is just a state sync helper
    setGuardando(true);
    setTimeout(()=>setGuardando(false),500);
  }

  async function toggleModo() {
    const nuevo = !modoFinSemana;
    setModoFinSemana(nuevo);
    await supabase.from("configuracion").upsert({clave:"modo", valor: nuevo ? "finsemana" : "semana"});
  }

  async function ajustarRapido(id, delta) {
    const prod = productos.find(p=>p.id===id); if (!prod) return;
    const nuevaCant = Math.max(0, prod.cantidad + delta);
    const nuevaLista = productos.map(p=>p.id===id?{...p,cantidad:nuevaCant}:p);
    const mov = {id:Date.now(),productoId:id,nombre:prod.nombre,unidad:prod.unidad,tipo:delta>0?"entrada":"consumo",cantidad:Math.abs(delta),antes:prod.cantidad,despues:nuevaCant,fecha:new Date().toISOString()};
    const nuevoH = [mov,...historial].slice(0,500);
    setProductos(nuevaLista); setHistorial(nuevoH);
    guardar();
    await Promise.all([
      supabase.from("inventario").update({cantidad:nuevaCant}).eq("id",id),
      supabase.from("historial").insert(movimientoToDb(mov)),
    ]);
  }

  async function ajusteManual() {
    if (!ajusteItem || ajusteDelta==="") return;
    const prod = productos.find(p=>p.id===ajusteItem.id);
    const nuevaCant = Math.max(0,+ajusteDelta);
    const nuevaLista = productos.map(p=>p.id===ajusteItem.id?{...p,cantidad:nuevaCant}:p);
    const mov = {id:Date.now(),productoId:ajusteItem.id,nombre:prod.nombre,unidad:prod.unidad,tipo:"ajuste",cantidad:Math.abs(nuevaCant-prod.cantidad),antes:prod.cantidad,despues:nuevaCant,fecha:new Date().toISOString()};
    const nuevoH = [mov,...historial].slice(0,500);
    setProductos(nuevaLista); setHistorial(nuevoH);
    guardar();
    await Promise.all([
      supabase.from("inventario").update({cantidad:nuevaCant}).eq("id",ajusteItem.id),
      supabase.from("historial").insert(movimientoToDb(mov)),
    ]);
    setModal(null); setAjusteItem(null); setAjusteDelta("");
  }

  async function guardarProducto() {
    if (!formP.nombre || formP.cantidad==="" || formP.minimo==="") return;
    const cantComprar = formP.optimo && formP.maximo ? Math.max(0, +formP.optimo - +formP.cantidad) : 0;
    const nuevo = {...formP, cantidad:+formP.cantidad, minimo:+formP.minimo, maximo:+formP.maximo||0, optimo:+formP.optimo||0, costo:+formP.costo||0, cantComprar};
    guardar();
    if (editando) {
      const nueva = productos.map(p=>p.id===editando?{...p,...nuevo}:p);
      setProductos(nueva);
      await supabase.from("inventario").update(productoToDb({...nuevo, id:editando})).eq("id",editando);
    } else {
      const id = Date.now();
      const prod = {id,...nuevo};
      setProductos(p=>[...p, prod]);
      await supabase.from("inventario").insert(productoToDb(prod));
    }
    setModal(null);
  }

  async function eliminarProducto(id) {
    setProductos(p=>p.filter(x=>x.id!==id));
    guardar();
    await supabase.from("inventario").delete().eq("id",id);
  }

  async function registrarMerma() {
    if (!formM.productoId || !formM.cantidad) return;
    const prod = productos.find(p=>p.id===+formM.productoId); if (!prod) return;
    const nuevaCant = Math.max(0, prod.cantidad - +formM.cantidad);
    const nuevaLista = productos.map(p=>p.id===prod.id?{...p,cantidad:nuevaCant}:p);
    const merma = {id:Date.now(),productoId:prod.id,nombre:prod.nombre,unidad:prod.unidad,cantidad:+formM.cantidad,motivo:formM.motivo,notas:formM.notas,costoEstimado:(prod.costo||0)*+formM.cantidad,antes:prod.cantidad,despues:nuevaCant,fecha:new Date().toISOString()};
    const mov = {id:Date.now()+1,productoId:prod.id,nombre:prod.nombre,unidad:prod.unidad,tipo:"merma",cantidad:+formM.cantidad,antes:prod.cantidad,despues:nuevaCant,fecha:new Date().toISOString()};
    setProductos(nuevaLista);
    setMermas(m=>[merma,...m].slice(0,300));
    setHistorial(h=>[mov,...h].slice(0,500));
    guardar();
    await Promise.all([
      supabase.from("inventario").update({cantidad:nuevaCant}).eq("id",prod.id),
      supabase.from("mermas").insert(mermaToDb(merma)),
      supabase.from("historial").insert(movimientoToDb(mov)),
    ]);
    setFormM({productoId:"",cantidad:"",motivo:"Caducidad",notas:""}); setModal(null);
  }

  async function guardarProveedor() {
    if (!formProv.nombre) return;
    const prov = {id:Date.now(),...formProv};
    setProveedores(p=>[...p,prov]);
    guardar();
    await supabase.from("proveedores").insert({id:prov.id,nombre:prov.nombre,contacto:prov.contacto||"",telefono:prov.telefono||"",dias_entrega:prov.diasEntrega||""});
    setFormProv({nombre:"",contacto:"",telefono:"",diasEntrega:""}); setModal(null);
  }

  async function escanearBarcode() {
    setScanActivo(true); setModal("scanner");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
    } catch(e) { alert("No se pudo acceder a la cámara. Verifica los permisos."); setScanActivo(false); setModal(null); }
  }

  function cerrarScanner() {
    if (videoRef.current?.srcObject) { videoRef.current.srcObject.getTracks().forEach(t=>t.stop()); }
    setScanActivo(false); setModal(null);
  }

  function generarExport() {
    const fecha = new Date().toLocaleDateString("es-MX",{day:"2-digit",month:"long",year:"numeric"});
    let txt = `====== INVENTARIO CAFETERÍA ======\nFecha: ${fecha}\nModo: ${modoFinSemana?"Fin de semana":"Entre semana"}\n\n`;
    txt += `--- PRODUCTOS (${productos.length}) ---\n`;
    productos.forEach(p=>{
      const s=statusInfo(p);
      txt+=`• ${p.emoji} ${p.nombre} | ${p.cantidad}/${p.optimo||"?"} ${p.unidad} | Mín:${p.minimo} Máx:${p.maximo} | Comprar:${p.cantComprar||0} | ${p.categoria} | ${p.proveedor||"Sin proveedor"} | ${p.ubicacion||"Sin ubicación"} | Costo:$${p.costo||0} | ${s.label}${p.caducidad?" | Cad:"+p.caducidad:""}\n`;
    });
    txt+=`\n--- PEDIDOS URGENTES ---\n`;
    productos.filter(p=>p.cantidad<=p.minimo).forEach(p=>{txt+=`• ${p.nombre} | Comprar: ${p.cantComprar||"?"} ${p.unidad} | Proveedor: ${p.proveedor||"Sin asignar"}\n`;});
    txt+=`\n--- MERMAS (${mermas.length}) ---\n`;
    mermas.slice(0,100).forEach(m=>{txt+=`${fmt(m.fecha)} | ${m.nombre} | ${m.cantidad} ${m.unidad} | ${m.motivo} | $${m.costoEstimado?.toFixed(2)||0}\n`;});
    txt+=`\n--- HISTORIAL (${historial.length}) ---\n`;
    historial.slice(0,100).forEach(h=>{txt+=`${fmt(h.fecha)} | ${h.tipo.toUpperCase()} | ${h.nombre} | ${h.antes}→${h.despues} ${h.unidad}\n`;});
    txt+=`\n====== FIN DEL REPORTE ======`;
    return txt;
  }

  function copiarExport() { navigator.clipboard.writeText(generarExport()).then(()=>{setCopiado(true);setTimeout(()=>setCopiado(false),2500);}); }

  const filtrados = productos.filter(p=>{
    const b=p.nombre.toLowerCase().includes(busqueda.toLowerCase())||(p.proveedor||"").toLowerCase().includes(busqueda.toLowerCase())||(p.barcode||"").includes(busqueda);
    const c=filtroCat==="Todas"||p.categoria===filtroCat;
    return b&&c;
  });

  const bajoStock = productos.filter(p=>p.cantidad<=p.minimo).length;
  const totalMermasMes = mermas.filter(m=>new Date(m.fecha).getMonth()===new Date().getMonth()).reduce((a,m)=>a+(m.costoEstimado||0),0);
  const proxCaducar = productos.filter(p=>{const d=diasParaCaducar(p.caducidad);return d!==null&&d<=7&&d>=0;}).length;
  const gastoEstimado = productos.filter(p=>p.cantidad<=p.minimo).reduce((a,p)=>a+(p.cantComprar||0)*(p.costo||0),0);

  const C={bg:"#0f1117",card:"#1a1d27",border:"#2a2d3a",accent:"#6ee7b7",text:"#e8eaf0",muted:"#8b90a0",warn:"#f59e0b",danger:"#ef4444",success:"#22c55e",info:"#60a5fa"};
  const inp={width:"100%",background:"#12151e",border:`1px solid ${C.border}`,borderRadius:"10px",padding:"10px 13px",color:C.text,fontFamily:"inherit",fontSize:"14px",outline:"none",boxSizing:"border-box"};
  const lbl={fontSize:"11px",color:C.muted,textTransform:"uppercase",letterSpacing:"1.2px",display:"block",marginBottom:"5px",fontWeight:"600"};
  const btnP={background:"linear-gradient(135deg,#6ee7b7,#3b82f6)",border:"none",color:"#0f1117",padding:"10px 18px",borderRadius:"10px",cursor:"pointer",fontFamily:"inherit",fontWeight:"700",fontSize:"13px"};
  const btnG={background:C.card,border:`1px solid ${C.border}`,color:C.muted,padding:"9px 14px",borderRadius:"10px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"};

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#2a2d3a;border-radius:4px}select option{background:#1a1d27}.rh:hover{background:#1f2235!important}.ti{transition:all 0.15s}`}</style>

      {/* TOP BAR */}
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"56px",gap:"8px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <div style={{background:"linear-gradient(135deg,#6ee7b7,#3b82f6)",borderRadius:"10px",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",flexShrink:0}}>☕</div>
            <div>
              <div style={{fontWeight:"700",fontSize:"14px"}}>Mi Cafetería</div>
              <div style={{fontSize:"10px",color:C.muted,letterSpacing:"1px",textTransform:"uppercase"}}>Inventario</div>
            </div>
          </div>
          <div style={{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"}}>
            {guardando&&<span style={{fontSize:"10px",color:C.accent,opacity:0.8}}>● Guardando</span>}
            <button onClick={toggleModo} style={{...btnG,fontSize:"11px",padding:"6px 10px",color:modoFinSemana?"#f59e0b":C.muted,borderColor:modoFinSemana?"#f59e0b50":C.border}}>
              {modoFinSemana?"🌅 Fin semana":"📅 Semana"}
            </button>
            <button onClick={()=>setModal("exportar")} style={{...btnG,fontSize:"11px",padding:"6px 10px",color:C.accent,borderColor:"#6ee7b730"}}>📤</button>
            <button onClick={()=>{setEditando(null);setFormP(FORM_VACIO);setModal("producto");}} style={{...btnP,padding:"7px 12px",fontSize:"13px"}}>＋</button>
          </div>
        </div>
        {/* TABS */}
        <div style={{display:"flex",gap:"0",borderTop:`1px solid ${C.border}`,overflowX:"auto"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",borderBottom:tab===t.id?`2px solid ${C.accent}`:"2px solid transparent",color:tab===t.id?C.accent:C.muted,padding:"9px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:tab===t.id?"600":"400",fontSize:"12px",display:"flex",alignItems:"center",gap:"5px",marginBottom:"-1px",whiteSpace:"nowrap"}}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{display:"flex",gap:"8px",padding:"12px 16px",overflowX:"auto"}}>
        {[
          {label:"Productos",value:productos.length,icon:"📦",color:C.accent},
          {label:"Stock bajo",value:bajoStock,icon:"⚠️",color:C.warn},
          {label:"Por caducar",value:proxCaducar,icon:"📅",color:"#a78bfa"},
          {label:"Mermas mes",value:`$${totalMermasMes.toFixed(0)}`,icon:"📉",color:C.danger},
          {label:"Gasto pedido",value:`$${gastoEstimado.toFixed(0)}`,icon:"🛒",color:C.info},
        ].map((s,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"10px 14px",flexShrink:0,minWidth:"100px"}}>
            <div style={{fontSize:"16px"}}>{s.icon}</div>
            <div style={{fontSize:"17px",fontWeight:"700",color:s.color,fontFamily:"'DM Mono',monospace"}}>{s.value}</div>
            <div style={{fontSize:"9px",color:C.muted,textTransform:"uppercase",letterSpacing:"1px",marginTop:"1px"}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ===== INVENTARIO ===== */}
      {tab==="inventario"&&(
        <div style={{padding:"0 16px 24px"}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"}}>
            <div style={{flex:"1",minWidth:"180px",position:"relative"}}>
              <input placeholder="🔍 Buscar nombre, proveedor o código..." value={busqueda} onChange={e=>setBusqueda(e.target.value)} style={{...inp,paddingRight:"40px"}}/>
              <button onClick={escanearBarcode} style={{position:"absolute",right:"8px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"18px"}} title="Escanear código">📷</button>
            </div>
            <select value={filtroCat} onChange={e=>setFiltroCat(e.target.value)} style={{...inp,width:"auto",cursor:"pointer"}}>
              <option>Todas</option>
              {CATEGORIAS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>

          {bajoStock>0&&(
            <div style={{background:"#f59e0b10",border:"1px solid #f59e0b30",borderRadius:"10px",padding:"9px 14px",marginBottom:"10px",fontSize:"12px",color:C.warn}}>
              ⚠️ <strong>{bajoStock} producto(s)</strong> con stock bajo — revisa la pestaña <strong>Pedidos</strong>
            </div>
          )}
          {proxCaducar>0&&(
            <div style={{background:"#a78bfa10",border:"1px solid #a78bfa30",borderRadius:"10px",padding:"9px 14px",marginBottom:"10px",fontSize:"12px",color:"#a78bfa"}}>
              📅 <strong>{proxCaducar} producto(s)</strong> caducan en los próximos 7 días
            </div>
          )}

          {filtrados.length===0?(
            <div style={{textAlign:"center",color:C.muted,padding:"50px 0"}}>
              <div style={{fontSize:"36px",marginBottom:"10px"}}>📭</div>
              No hay productos
            </div>
          ):(
            <div style={{display:"grid",gap:"7px"}}>
              {filtrados.map(p=>{
                const s=statusInfo(p);
                const dias=diasParaCaducar(p.caducidad);
                const cad=dias!==null&&dias<=7;
                return(
                  <div key={p.id} className="rh ti" style={{background:C.card,border:`1px solid ${cad?"#a78bfa40":p.cantidad<=p.minimo?s.color+"30":C.border}`,borderRadius:"11px",padding:"10px 14px",display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
                    <div style={{width:"36px",height:"36px",background:s.bg,borderRadius:"9px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"19px",flexShrink:0}}>{p.emoji||"📦"}</div>
                    <div style={{flex:"1",minWidth:"120px"}}>
                      <div style={{fontWeight:"600",fontSize:"13px"}}>{p.nombre}{p.esVariable&&<span style={{fontSize:"9px",background:"#f59e0b20",color:C.warn,borderRadius:"4px",padding:"1px 5px",marginLeft:"5px"}}>VARIABLE</span>}</div>
                      <div style={{fontSize:"10px",color:C.muted,marginTop:"2px"}}>
                        {p.categoria.split(" ").slice(1).join(" ")}
                        {p.ubicacion&&<span style={{color:"#60a5fa"}}> · 📍{p.ubicacion}</span>}
                        {p.costo>0&&<span style={{color:C.accent}}> · ${p.costo}/{p.unidad}</span>}
                        {cad&&<span style={{color:"#a78bfa"}}> · ⚠️ Cad en {dias}d</span>}
                      </div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:"9px",color:C.muted,textTransform:"uppercase",marginBottom:"3px"}}>Cantidad</div>
                      <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
                        <button className="ti" onClick={()=>ajustarRapido(p.id,-1)} style={{background:"#ef444420",border:"none",color:C.danger,width:"24px",height:"24px",borderRadius:"6px",cursor:"pointer",fontSize:"14px"}}>−</button>
                        <button onClick={()=>{setAjusteItem(p);setAjusteDelta(p.cantidad);setModal("ajuste");}} style={{background:s.bg,border:`1px solid ${s.color}40`,borderRadius:"7px",padding:"2px 8px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontWeight:"600",color:s.color,fontSize:"13px",minWidth:"64px",textAlign:"center"}}>
                          {p.cantidad} {p.unidad}
                        </button>
                        <button className="ti" onClick={()=>ajustarRapido(p.id,1)} style={{background:"#22c55e20",border:"none",color:C.success,width:"24px",height:"24px",borderRadius:"6px",cursor:"pointer",fontSize:"14px"}}>+</button>
                      </div>
                    </div>
                    <div style={{textAlign:"center",fontSize:"10px",color:C.muted}}>
                      <div>Ópt: <span style={{color:C.info,fontFamily:"'DM Mono',monospace"}}>{p.optimo||"—"}</span></div>
                      <div>Comprar: <span style={{color:C.accent,fontFamily:"'DM Mono',monospace",fontWeight:"600"}}>{p.cantComprar||0}</span></div>
                    </div>
                    <div style={{background:s.bg,border:`1px solid ${s.color}40`,borderRadius:"6px",padding:"3px 8px",fontSize:"10px",color:s.color,fontWeight:"600",minWidth:"70px",textAlign:"center"}}>{s.icon} {s.label}</div>
                    <div style={{display:"flex",gap:"4px"}}>
                      <button className="ti" onClick={()=>{setFormM({productoId:p.id,cantidad:"",motivo:"Caducidad",notas:""});setModal("merma");}} style={{background:"#a78bfa20",border:"none",color:"#a78bfa",padding:"5px 8px",borderRadius:"7px",cursor:"pointer",fontSize:"12px"}}>📉</button>
                      <button className="ti" onClick={()=>{setEditando(p.id);setFormP({...p,cantidad:String(p.cantidad),minimo:String(p.minimo),maximo:String(p.maximo||""),optimo:String(p.optimo||""),costo:String(p.costo||"")});setModal("producto");}} style={{background:"#3b82f620",border:"none",color:C.info,padding:"5px 8px",borderRadius:"7px",cursor:"pointer",fontSize:"12px"}}>✏️</button>
                      <button className="ti" onClick={()=>eliminarProducto(p.id)} style={{background:"#ef444420",border:"none",color:C.danger,padding:"5px 8px",borderRadius:"7px",cursor:"pointer",fontSize:"12px"}}>🗑️</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===== PEDIDOS ===== */}
      {tab==="pedidos"&&(
        <div style={{padding:"0 16px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
            <div>
              <div style={{fontWeight:"700",fontSize:"15px"}}>Lista de Pedidos</div>
              <div style={{fontSize:"11px",color:C.muted,marginTop:"2px"}}>Modo: <span style={{color:modoFinSemana?C.warn:C.info}}>{modoFinSemana?"🌅 Fin de semana":"📅 Entre semana"}</span></div>
            </div>
            <button onClick={()=>{setFormProv({nombre:"",contacto:"",telefono:"",diasEntrega:""});setModal("proveedor");}} style={{...btnG,fontSize:"12px",padding:"7px 12px"}}>+ Proveedor</button>
          </div>

          {/* Gasto estimado */}
          <div style={{background:"linear-gradient(135deg,#60a5fa15,#6ee7b715)",border:`1px solid ${C.info}30`,borderRadius:"12px",padding:"14px 16px",marginBottom:"14px"}}>
            <div style={{fontSize:"11px",color:C.muted,marginBottom:"4px",textTransform:"uppercase",letterSpacing:"1px"}}>Gasto estimado del pedido</div>
            <div style={{fontSize:"26px",fontWeight:"700",color:C.info,fontFamily:"'DM Mono',monospace"}}>${gastoEstimado.toFixed(2)}</div>
          </div>

          {/* Pedidos por proveedor */}
          {CATEGORIAS.map(cat=>{
            const items=productos.filter(p=>p.categoria===cat&&p.cantidad<=p.minimo);
            if(!items.length)return null;
            return(
              <div key={cat} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"14px",marginBottom:"10px"}}>
                <div style={{fontWeight:"700",fontSize:"13px",marginBottom:"10px",color:C.accent}}>{cat}</div>
                {items.map(p=>(
                  <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
                    <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
                      <span style={{fontSize:"16px"}}>{p.emoji}</span>
                      <div>
                        <div style={{fontSize:"13px",fontWeight:"500"}}>{p.nombre}</div>
                        <div style={{fontSize:"10px",color:C.muted}}>{p.proveedor||"Sin proveedor asignado"}{p.ubicacion&&` · 📍${p.ubicacion}`}</div>
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:"13px",fontWeight:"700",color:C.accent,fontFamily:"'DM Mono',monospace"}}>Pedir: {p.cantComprar||"?"} {p.unidad}</div>
                      {p.costo>0&&<div style={{fontSize:"10px",color:C.muted}}>${((p.cantComprar||0)*p.costo).toFixed(2)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {productos.filter(p=>p.cantidad<=p.minimo).length===0&&(
            <div style={{textAlign:"center",color:C.muted,padding:"50px 0"}}>
              <div style={{fontSize:"36px",marginBottom:"10px"}}>✅</div>
              Todo el inventario está en niveles óptimos
            </div>
          )}

          {/* Proveedores */}
          {proveedores.length>0&&(
            <div style={{marginTop:"16px"}}>
              <div style={{fontWeight:"700",fontSize:"14px",marginBottom:"10px"}}>📋 Mis Proveedores</div>
              {proveedores.map(pv=>(
                <div key={pv.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"12px 14px",marginBottom:"8px"}}>
                  <div style={{fontWeight:"600",fontSize:"13px"}}>{pv.nombre}</div>
                  <div style={{fontSize:"11px",color:C.muted,marginTop:"3px"}}>
                    {pv.contacto&&<span>👤 {pv.contacto} · </span>}
                    {pv.telefono&&<span>📞 {pv.telefono} · </span>}
                    {pv.diasEntrega&&<span>🚚 Entrega en {pv.diasEntrega} días</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== MERMAS ===== */}
      {tab==="mermas"&&(
        <div style={{padding:"0 16px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
            <div>
              <div style={{fontWeight:"700",fontSize:"15px"}}>Registro de Mermas</div>
              <div style={{fontSize:"11px",color:C.muted,marginTop:"2px"}}>Caducidad, derrames y pérdidas</div>
            </div>
            <button onClick={()=>{setFormM({productoId:"",cantidad:"",motivo:"Caducidad",notas:""});setModal("merma");}} style={{...btnP,fontSize:"12px",padding:"8px 14px"}}>+ Merma</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"8px",marginBottom:"14px"}}>
            {[
              {label:"Total mermas",value:mermas.length,color:"#a78bfa"},
              {label:"Costo este mes",value:`$${totalMermasMes.toFixed(2)}`,color:C.danger},
              {label:"Motivo frecuente",value:mermas.length?Object.entries(mermas.reduce((a,m)=>{a[m.motivo]=(a[m.motivo]||0)+1;return a;},{})).sort((a,b)=>b[1]-a[1])[0][0].split("/")[0].trim():"—",color:C.warn},
            ].map((s,i)=>(
              <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"12px 14px"}}>
                <div style={{fontSize:"10px",color:C.muted,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"5px"}}>{s.label}</div>
                <div style={{fontSize:"18px",fontWeight:"700",color:s.color,fontFamily:"'DM Mono',monospace"}}>{s.value}</div>
              </div>
            ))}
          </div>
          {mermas.length===0?(
            <div style={{textAlign:"center",color:C.muted,padding:"50px 0"}}>
              <div style={{fontSize:"36px",marginBottom:"10px"}}>✨</div>Sin mermas registradas
            </div>
          ):(
            <div style={{display:"grid",gap:"7px"}}>
              {mermas.map(m=>(
                <div key={m.id} style={{background:C.card,border:"1px solid #a78bfa25",borderRadius:"11px",padding:"10px 14px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
                  <div style={{background:"#a78bfa18",borderRadius:"8px",width:"34px",height:"34px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",flexShrink:0}}>📉</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"4px"}}>
                      <span style={{fontWeight:"600",fontSize:"13px"}}>{m.nombre}</span>
                      <span style={{fontSize:"12px",color:C.danger,fontFamily:"'DM Mono',monospace"}}>−${m.costoEstimado?.toFixed(2)||"0.00"}</span>
                    </div>
                    <div style={{fontSize:"11px",color:C.muted,marginTop:"3px"}}>
                      <span style={{background:"#f59e0b18",color:C.warn,borderRadius:"4px",padding:"1px 6px",fontSize:"10px",marginRight:"6px"}}>{m.motivo}</span>
                      {m.cantidad} {m.unidad} · {m.antes}→{m.despues}
                    </div>
                    {m.notas&&<div style={{fontSize:"10px",color:C.muted,marginTop:"3px",fontStyle:"italic"}}>"{m.notas}"</div>}
                    <div style={{fontSize:"10px",color:C.muted,marginTop:"3px",opacity:0.7}}>{fmt(m.fecha)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== HISTORIAL ===== */}
      {tab==="historial"&&(
        <div style={{padding:"0 16px 24px"}}>
          <div style={{fontWeight:"700",fontSize:"15px",marginBottom:"4px"}}>Historial de Movimientos</div>
          <div style={{fontSize:"11px",color:C.muted,marginBottom:"14px"}}>Entradas, consumos, mermas y ajustes</div>
          {historial.length===0?(
            <div style={{textAlign:"center",color:C.muted,padding:"50px 0"}}>
              <div style={{fontSize:"36px",marginBottom:"10px"}}>📭</div>Sin movimientos aún
            </div>
          ):(
            <div style={{display:"grid",gap:"6px"}}>
              {historial.map(h=>{
                const t={entrada:{icon:"📥",color:C.success,bg:"#22c55e15",label:"Entrada"},consumo:{icon:"📤",color:C.info,bg:"#3b82f615",label:"Consumo"},merma:{icon:"📉",color:"#a78bfa",bg:"#a78bfa15",label:"Merma"},ajuste:{icon:"🔧",color:C.warn,bg:"#f59e0b15",label:"Ajuste"}}[h.tipo]||{icon:"📋",color:C.muted,bg:"#ffffff10",label:h.tipo};
                return(
                  <div key={h.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"9px",padding:"9px 13px",display:"flex",gap:"9px",alignItems:"center"}}>
                    <div style={{background:t.bg,borderRadius:"6px",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",flexShrink:0}}>{t.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"12px",fontWeight:"600"}}>{h.nombre} <span style={{color:t.color,fontSize:"10px",fontWeight:"400"}}>· {t.label}</span></div>
                      <div style={{fontSize:"10px",color:C.muted,fontFamily:"'DM Mono',monospace"}}>{h.antes}→{h.despues} {h.unidad}</div>
                    </div>
                    <div style={{fontSize:"9px",color:C.muted,textAlign:"right"}}>{fmt(h.fecha)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===== REPORTES ===== */}
      {tab==="reportes"&&(
        <div style={{padding:"0 16px 24px"}}>
          <div style={{fontWeight:"700",fontSize:"15px",marginBottom:"14px"}}>Reportes y Análisis</div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"14px",marginBottom:"12px"}}>
            <div style={{fontWeight:"700",fontSize:"13px",marginBottom:"10px"}}>📅 Próximos a caducar</div>
            {productos.filter(p=>{const d=diasParaCaducar(p.caducidad);return d!==null&&d<=14;}).length===0
              ?<div style={{fontSize:"12px",color:C.muted}}>✅ Sin productos próximos a caducar</div>
              :productos.filter(p=>{const d=diasParaCaducar(p.caducidad);return d!==null&&d<=14;}).sort((a,b)=>diasParaCaducar(a.caducidad)-diasParaCaducar(b.caducidad)).map(p=>{
                const d=diasParaCaducar(p.caducidad);
                return(
                  <div key={p.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
                    <span style={{fontSize:"12px"}}>{p.emoji} {p.nombre}</span>
                    <span style={{fontSize:"12px",fontWeight:"700",color:d<=3?C.danger:d<=7?C.warn:"#a78bfa"}}>{d===0?"¡Hoy!":d<0?"Vencido":d+" días"}</span>
                  </div>
                );
              })
            }
          </div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"14px",marginBottom:"12px"}}>
            <div style={{fontWeight:"700",fontSize:"13px",marginBottom:"10px"}}>📉 Mermas por motivo (mes actual)</div>
            {MOTIVOS_MERMA.map(motivo=>{
              const items=mermas.filter(m=>m.motivo===motivo&&new Date(m.fecha).getMonth()===new Date().getMonth());
              if(!items.length)return null;
              const costo=items.reduce((a,m)=>a+(m.costoEstimado||0),0);
              return(
                <div key={motivo} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{fontSize:"12px"}}>{motivo}</span>
                  <div style={{textAlign:"right"}}>
                    <span style={{fontSize:"11px",color:"#a78bfa",fontFamily:"'DM Mono',monospace"}}>{items.length}x · </span>
                    <span style={{fontSize:"11px",color:C.danger,fontFamily:"'DM Mono',monospace"}}>${costo.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
            {mermas.filter(m=>new Date(m.fecha).getMonth()===new Date().getMonth()).length===0&&<div style={{fontSize:"12px",color:C.muted}}>Sin mermas este mes</div>}
          </div>

          <div style={{background:"linear-gradient(135deg,#6ee7b710,#3b82f610)",border:`1px solid ${C.accent}30`,borderRadius:"12px",padding:"16px",textAlign:"center"}}>
            <div style={{fontSize:"26px",marginBottom:"6px"}}>📤</div>
            <div style={{fontWeight:"700",fontSize:"13px",marginBottom:"5px"}}>Exportar para análisis con Claude</div>
            <div style={{fontSize:"11px",color:C.muted,marginBottom:"12px"}}>Copia tu reporte y pídeme gráficas, tendencias y recomendaciones</div>
            <button onClick={()=>setModal("exportar")} style={{...btnP}}>Generar reporte completo</button>
          </div>
        </div>
      )}

      {/* ===== MODALES ===== */}
      {modal&&(
        <div onClick={()=>modal!=="scanner"&&setModal(null)} style={{position:"fixed",inset:0,background:"#00000095",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"16px",padding:"20px",width:"100%",maxWidth:"420px",maxHeight:"90vh",overflowY:"auto"}}>

            {/* Producto */}
            {modal==="producto"&&<>
              <div style={{fontWeight:"700",fontSize:"16px",marginBottom:"16px",color:C.accent}}>{editando?"✏️ Editar producto":"➕ Nuevo producto"}</div>
              <div style={{display:"grid",gap:"12px"}}>
                <div style={{display:"grid",gridTemplateColumns:"56px 1fr",gap:"8px"}}>
                  <div><label style={lbl}>Emoji</label><input value={formP.emoji} onChange={e=>setFormP(f=>({...f,emoji:e.target.value}))} style={{...inp,textAlign:"center",fontSize:"20px"}} maxLength={2}/></div>
                  <div><label style={lbl}>Nombre *</label><input placeholder="Ej. Café molido" value={formP.nombre} onChange={e=>setFormP(f=>({...f,nombre:e.target.value}))} style={inp}/></div>
                </div>
                <div><label style={lbl}>Código de barras</label><input placeholder="Ej. 7501022014554" value={formP.barcode} onChange={e=>setFormP(f=>({...f,barcode:e.target.value}))} style={inp}/></div>
                <div><label style={lbl}>Categoría</label><select value={formP.categoria} onChange={e=>setFormP(f=>({...f,categoria:e.target.value}))} style={{...inp,cursor:"pointer"}}>{CATEGORIAS.map(c=><option key={c}>{c}</option>)}</select></div>
                <div><label style={lbl}>Proveedor</label><input placeholder="Ej. Distribuidora Norte" value={formP.proveedor} onChange={e=>setFormP(f=>({...f,proveedor:e.target.value}))} style={inp}/></div>
                <div><label style={lbl}>Ubicación en anaquel</label><input placeholder="Ej. Anaquel A - Estante 2" value={formP.ubicacion} onChange={e=>setFormP(f=>({...f,ubicacion:e.target.value}))} style={inp}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                  <div><label style={lbl}>Cantidad actual *</label><input type="number" min="0" placeholder="0" value={formP.cantidad} onChange={e=>setFormP(f=>({...f,cantidad:e.target.value}))} style={inp}/></div>
                  <div><label style={lbl}>Unidad</label><select value={formP.unidad} onChange={e=>setFormP(f=>({...f,unidad:e.target.value}))} style={{...inp,cursor:"pointer"}}>{UNIDADES.map(u=><option key={u}>{u}</option>)}</select></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
                  <div><label style={lbl}>Mínimo *</label><input type="number" min="0" placeholder="0" value={formP.minimo} onChange={e=>setFormP(f=>({...f,minimo:e.target.value}))} style={inp}/></div>
                  <div><label style={lbl}>Óptimo</label><input type="number" min="0" placeholder="0" value={formP.optimo} onChange={e=>setFormP(f=>({...f,optimo:e.target.value}))} style={inp}/></div>
                  <div><label style={lbl}>Máximo</label><input type="number" min="0" placeholder="0" value={formP.maximo} onChange={e=>setFormP(f=>({...f,maximo:e.target.value}))} style={inp}/></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                  <div><label style={lbl}>Costo por unidad ($)</label><input type="number" min="0" placeholder="0.00" value={formP.costo} onChange={e=>setFormP(f=>({...f,costo:e.target.value}))} style={inp}/></div>
                  <div><label style={lbl}>Fecha de caducidad</label><input type="date" value={formP.caducidad} onChange={e=>setFormP(f=>({...f,caducidad:e.target.value}))} style={inp}/></div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <input type="checkbox" id="esVar" checked={formP.esVariable||false} onChange={e=>setFormP(f=>({...f,esVariable:e.target.checked}))} style={{width:"16px",height:"16px",accentColor:C.accent}}/>
                  <label htmlFor="esVar" style={{fontSize:"12px",color:C.muted,cursor:"pointer"}}>Producto variable (fruta, temporada) — mínimos ajustables</label>
                </div>
              </div>
              <div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
                <button onClick={()=>setModal(null)} style={{...btnG,flex:1}}>Cancelar</button>
                <button onClick={guardarProducto} style={{...btnP,flex:2}}>{editando?"Guardar cambios":"Agregar producto"}</button>
              </div>
            </>}

            {/* Merma */}
            {modal==="merma"&&<>
              <div style={{fontWeight:"700",fontSize:"16px",marginBottom:"16px",color:"#a78bfa"}}>📉 Registrar Merma</div>
              <div style={{display:"grid",gap:"12px"}}>
                <div><label style={lbl}>Producto *</label>
                  <select value={formM.productoId} onChange={e=>setFormM(f=>({...f,productoId:e.target.value}))} style={{...inp,cursor:"pointer"}}>
                    <option value="">Selecciona...</option>
                    {productos.map(p=><option key={p.id} value={p.id}>{p.emoji} {p.nombre} ({p.cantidad} {p.unidad})</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
                  <div><label style={lbl}>Cantidad perdida *</label><input type="number" min="0" placeholder="0" value={formM.cantidad} onChange={e=>setFormM(f=>({...f,cantidad:e.target.value}))} style={inp}/></div>
                  <div><label style={lbl}>Motivo</label><select value={formM.motivo} onChange={e=>setFormM(f=>({...f,motivo:e.target.value}))} style={{...inp,cursor:"pointer"}}>{MOTIVOS_MERMA.map(m=><option key={m}>{m}</option>)}</select></div>
                </div>
                <div><label style={lbl}>Notas</label><input placeholder="Ej. Se cayó la jarra..." value={formM.notas} onChange={e=>setFormM(f=>({...f,notas:e.target.value}))} style={inp}/></div>
                {formM.productoId&&formM.cantidad&&(
                  <div style={{background:"#ef444415",border:"1px solid #ef444430",borderRadius:"8px",padding:"9px 12px",fontSize:"11px",color:C.danger}}>
                    ⚠️ Se reducirán <strong>{formM.cantidad} {productos.find(p=>p.id===+formM.productoId)?.unidad}</strong> del inventario
                    {productos.find(p=>p.id===+formM.productoId)?.costo>0&&<span> · Costo: <strong>${(+formM.cantidad*(productos.find(p=>p.id===+formM.productoId)?.costo||0)).toFixed(2)}</strong></span>}
                  </div>
                )}
              </div>
              <div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
                <button onClick={()=>setModal(null)} style={{...btnG,flex:1}}>Cancelar</button>
                <button onClick={registrarMerma} style={{...btnP,flex:2,background:"linear-gradient(135deg,#a78bfa,#ec4899)"}}>Registrar</button>
              </div>
            </>}

            {/* Ajuste */}
            {modal==="ajuste"&&ajusteItem&&<>
              <div style={{fontWeight:"700",fontSize:"16px",marginBottom:"6px",color:C.warn}}>🔧 Ajuste manual</div>
              <div style={{fontSize:"11px",color:C.muted,marginBottom:"16px"}}>{ajusteItem.nombre} — cantidad exacta actual</div>
              <input type="number" min="0" value={ajusteDelta} onChange={e=>setAjusteDelta(e.target.value)} style={{...inp,fontSize:"24px",textAlign:"center",fontFamily:"'DM Mono',monospace"}} autoFocus/>
              <div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
                <button onClick={()=>setModal(null)} style={{...btnG,flex:1}}>Cancelar</button>
                <button onClick={ajusteManual} style={{...btnP,flex:2}}>Aplicar</button>
              </div>
            </>}

            {/* Proveedor */}
            {modal==="proveedor"&&<>
              <div style={{fontWeight:"700",fontSize:"16px",marginBottom:"16px",color:C.info}}>📋 Nuevo Proveedor</div>
              <div style={{display:"grid",gap:"12px"}}>
                <div><label style={lbl}>Nombre del proveedor *</label><input placeholder="Ej. Café Origen MX" value={formProv.nombre} onChange={e=>setFormProv(f=>({...f,nombre:e.target.value}))} style={inp}/></div>
                <div><label style={lbl}>Contacto</label><input placeholder="Ej. Juan García" value={formProv.contacto} onChange={e=>setFormProv(f=>({...f,contacto:e.target.value}))} style={inp}/></div>
                <div><label style={lbl}>Teléfono / WhatsApp</label><input placeholder="Ej. 555-123-4567" value={formProv.telefono} onChange={e=>setFormProv(f=>({...f,telefono:e.target.value}))} style={inp}/></div>
                <div><label style={lbl}>Días de entrega</label><input type="number" min="0" placeholder="Ej. 2" value={formProv.diasEntrega} onChange={e=>setFormProv(f=>({...f,diasEntrega:e.target.value}))} style={inp}/></div>
              </div>
              <div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
                <button onClick={()=>setModal(null)} style={{...btnG,flex:1}}>Cancelar</button>
                <button onClick={guardarProveedor} style={{...btnP,flex:2}}>Guardar proveedor</button>
              </div>
            </>}

            {/* Exportar */}
            {modal==="exportar"&&<>
              <div style={{fontWeight:"700",fontSize:"16px",marginBottom:"6px",color:C.accent}}>📤 Exportar para Claude</div>
              <div style={{fontSize:"11px",color:C.muted,marginBottom:"14px"}}>Copia y pega en el chat para pedir análisis, gráficas y recomendaciones</div>
              <textarea readOnly value={generarExport()} style={{...inp,height:"200px",fontFamily:"'DM Mono',monospace",fontSize:"9px",resize:"none",color:C.muted}}/>
              <div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
                <button onClick={()=>setModal(null)} style={{...btnG,flex:1}}>Cerrar</button>
                <button onClick={copiarExport} style={{...btnP,flex:2,background:copiado?"linear-gradient(135deg,#22c55e,#16a34a)":undefined,transition:"background 0.3s"}}>
                  {copiado?"✅ ¡Copiado!":"📋 Copiar todo"}
                </button>
              </div>
            </>}

            {/* Scanner */}
            {modal==="scanner"&&<>
              <div style={{fontWeight:"700",fontSize:"16px",marginBottom:"8px",color:C.accent}}>📷 Escanear código de barras</div>
              <div style={{fontSize:"11px",color:C.muted,marginBottom:"12px"}}>Apunta la cámara al código de barras del producto</div>
              <div style={{borderRadius:"10px",overflow:"hidden",background:"#000",marginBottom:"12px",position:"relative"}}>
                <video ref={videoRef} style={{width:"100%",display:"block"}} playsInline muted/>
                <div style={{position:"absolute",inset:0,border:"2px solid #6ee7b760",borderRadius:"10px",pointerEvents:"none"}}/>
              </div>
              <div style={{fontSize:"11px",color:C.muted,textAlign:"center",marginBottom:"12px"}}>
                💡 Ingresa el código manualmente al editar el producto si la cámara no funciona
              </div>
              <button onClick={cerrarScanner} style={{...btnG,width:"100%"}}>Cerrar cámara</button>
            </>}

          </div>
        </div>
      )}
    </div>
  );
}