const h=require('http'),fs=require('fs'),p=require('path');
h.createServer((q,s)=>{
const u=q.url.split('?')[0]||'/';
const f=p.join('.',u==='/'?'/citizen-portal.html':u);
fs.readFile(f,(e,d)=>{
if(e){s.writeHead(404);s.end('Not Found')}
else{s.writeHead(200,{'Content-Type':p.extname(f)==='.json'?'application/json':'text/html'});s.end(d)}
}) }).listen(3000,()=>console.log('http://localhost:3000'));