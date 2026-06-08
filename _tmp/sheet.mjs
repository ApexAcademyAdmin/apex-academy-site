import sharp from "sharp";
import fs from "fs";
const dir="public/alumni/players";
const files=fs.readdirSync(dir).filter(f=>/\.jpg$/i.test(f)).sort();
const CW=170,CH=200,COLS=4,PAD=6,W=COLS*CW,rows=Math.ceil(files.length/COLS),H=rows*CH,cells=[];
for(let i=0;i<files.length;i++){
  const x=(i%COLS)*CW,y=Math.floor(i/COLS)*CH;
  const name=files[i].replace(/\.jpg/,'');
  const isSeeley = name==="seeley-conner";
  const buf=await sharp(fs.readFileSync(`${dir}/${files[i]}`)).resize(CW-PAD*2,CH-30,{fit:"cover",position:"top"}).toBuffer();
  cells.push({input:buf,left:x+PAD,top:y+PAD});
  const lab=await sharp({text:{text:(isSeeley?"** ":"")+name,rgba:true,width:CW-10,height:20}}).png().toBuffer().catch(()=>null);
  if(lab) cells.push({input:lab,left:x+6,top:y+CH-22});
}
await sharp({create:{width:W,height:H,channels:4,background:{r:18,g:18,b:18,alpha:1}}}).composite(cells).png().toFile("_tmp/all.png");
console.log("ok",files.length);
