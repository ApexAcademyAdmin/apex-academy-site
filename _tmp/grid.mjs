import sharp from "sharp";
import fs from "fs";
const dir="_tmp/orig";
const files=fs.readdirSync(dir).filter(f=>/\.(png|jpg|jpeg)$/i.test(f)).sort();
const CW=250,CH=300,COLS=5,PAD=6,rows=Math.ceil(files.length/COLS),W=COLS*CW,H=rows*CH,cells=[];
for(let i=0;i<files.length;i++){
  const x=(i%COLS)*CW,y=Math.floor(i/COLS)*CH;
  const buf=await sharp(`${dir}/${files[i]}`).rotate().resize(CW-PAD*2,CH-26,{fit:"contain",background:"#dddddd"}).toBuffer();
  cells.push({input:buf,left:x+PAD,top:y+2});
  const line=await sharp({create:{width:1,height:CH-26,channels:4,background:{r:255,g:0,b:0,alpha:0.5}}}).png().toBuffer();
  cells.push({input:line,left:x+Math.round(CW/2),top:y+2});
  const lab=await sharp({text:{text:files[i].replace(/\.(png|jpg|jpeg)/i,''),rgba:true,width:CW-10,height:20}}).png().toBuffer().catch(()=>null);
  if(lab) cells.push({input:lab,left:x+6,top:y+CH-22});
}
await sharp({create:{width:W,height:H,channels:4,background:{r:245,g:245,b:245,alpha:1}}}).composite(cells).png().toFile("_tmp/grid.png");
console.log("ok");
