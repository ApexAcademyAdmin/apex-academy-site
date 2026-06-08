import sharp from "sharp";
import fs from "fs";
const dir="_tmp/orig";
const files=fs.readdirSync(dir).filter(f=>/\.(png|jpg|jpeg)$/i.test(f)).sort();
const H=300, gap=6;
const metas=[];
for(const f of files){ const m=await sharp(`${dir}/${f}`).rotate().metadata(); metas.push({f,w:Math.round(H*m.width/m.height)}); }
const W=metas.reduce((s,m)=>s+m.w+gap,gap);
const cells=[]; let x=gap;
for(const m of metas){
  const buf=await sharp(`${dir}/${m.f}`).rotate().resize({height:H-22}).toBuffer();
  cells.push({input:buf,left:x,top:2});
  // center vertical line
  const line=await sharp({create:{width:1,height:H-22,channels:4,background:{r:23,g:252,b:19,alpha:0.7}}}).png().toBuffer();
  cells.push({input:line,left:x+Math.round(m.w/2),top:2});
  const lab=await sharp({text:{text:m.f.replace(/\.(png|jpg|jpeg)/i,''),rgba:true,width:m.w,height:18}}).png().toBuffer().catch(()=>null);
  if(lab) cells.push({input:lab,left:x,top:H-18});
  x+=m.w+gap;
}
await sharp({create:{width:W,height:H,channels:4,background:{r:235,g:235,b:235,alpha:1}}}).composite(cells).png().toFile("_tmp/raws.png");
console.log("W",W,"items",files.length);
