import sharp from "sharp";
import fs from "fs";
const dir="_tmp/orig", outdir="_tmp/out";
fs.mkdirSync(outdir,{recursive:true});
// {cx, top, size} as fractions: cx of width (face center), top of height (crop top), size of height (square side)
const BOX = {
  "born-ian":          {cx:0.50, top:0.04, size:0.86},
  "clark-kevin":       {cx:0.50, top:0.04, size:0.84},
  "cummings-kyle":     {cx:0.50, top:0.03, size:0.95},
  "figueroa-christian":{cx:0.50, top:0.12, size:0.66},
  "flaherty-cameron":  {cx:0.50, top:0.05, size:0.88},
  "lewis-matthew":     {cx:0.50, top:0.05, size:0.52},
  "mcmahon-brandon":   {cx:0.50, top:0.05, size:0.88},
  "oliveira-christian":{cx:0.50, top:0.06, size:0.56},
  "osullivan-aidan":   {cx:0.50, top:0.03, size:0.98},
  "sack-brendan":      {cx:0.50, top:0.00, size:0.62},
  "salerno-max":       {cx:0.50, top:0.05, size:0.88},
  "seeley-conner":     {cx:0.50, top:0.00, size:1.00},
  "sullivan-seth":     {cx:0.50, top:0.05, size:0.88},
};
const files=fs.readdirSync(dir).filter(f=>/\.(png|jpg|jpeg)$/i.test(f)).sort();
for(const f of files){
  const slug=f.replace(/\.(png|jpg|jpeg)$/i,'');
  const b=BOX[slug]||{cx:0.5,top:0.04,size:0.9};
  const img=sharp(`${dir}/${f}`).rotate();
  const m=await img.metadata();
  let side=Math.round(b.size*m.height);
  side=Math.min(side, m.width, m.height);
  let left=Math.round(b.cx*m.width - side/2);
  let top=Math.round(b.top*m.height);
  left=Math.max(0, Math.min(left, m.width-side));
  top=Math.max(0, Math.min(top, m.height-side));
  await sharp(`${dir}/${f}`).rotate().extract({left,top,width:side,height:side}).resize(440,440,{fit:"cover"}).jpeg({quality:88}).toFile(`${outdir}/${slug}.jpg`);
}
// montage
const outs=fs.readdirSync(outdir).filter(f=>/\.jpg/).sort();
const CW=170,CH=190,COLS=5,PAD=5,rows=Math.ceil(outs.length/COLS),W=COLS*CW,H=rows*CH,cells=[];
for(let i=0;i<outs.length;i++){
  const x=(i%COLS)*CW,y=Math.floor(i/COLS)*CH;
  const buf=await sharp(`${outdir}/${outs[i]}`).resize(CW-PAD*2,CH-26,{fit:"cover"}).toBuffer();
  cells.push({input:buf,left:x+PAD,top:y+PAD});
  const isRef=outs[i].includes("seeley");
  const lab=await sharp({text:{text:(isRef?"REF ":"")+outs[i].replace(/\.jpg/,''),rgba:true,width:CW-8,height:18}}).png().toBuffer().catch(()=>null);
  if(lab) cells.push({input:lab,left:x+6,top:y+CH-20});
}
await sharp({create:{width:W,height:H,channels:4,background:{r:18,g:18,b:18,alpha:1}}}).composite(cells).png().toFile("_tmp/result.png");
console.log("ok");
