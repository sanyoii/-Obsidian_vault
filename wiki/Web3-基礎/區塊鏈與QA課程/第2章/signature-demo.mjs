// Public deterministic TEST fixtures only. These keys must never hold assets.
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
export const message = 'course-v1|chain=lab-A|id=42|from=Alice|to=Bob|amount=7';
function testKey(byte) {
  return crypto.createPrivateKey({key:Buffer.concat([Buffer.from('302e020100300506032b657004220420','hex'),Buffer.alloc(32,byte)]),format:'der',type:'pkcs8'});
}
export function fixtures() {
  const alice=testKey(1), eve=testKey(2);
  const alicePublic=crypto.createPublicKey(alice), evePublic=crypto.createPublicKey(eve);
  const sign=(m,k)=>crypto.sign(null,Buffer.from(m,'utf8'),k);
  const signature=sign(message,alice);
  const verify=(m,s,k)=>crypto.verify(null,Buffer.from(m,'utf8'),k,s);
  const rows=[['C1',message,alicePublic],['C2',message.replace('amount=7','amount=70'),alicePublic],['C3',message.replace('to=Bob','to=Eve'),alicePublic],['C4',message,evePublic],['C5',message.replace('lab-A','lab-B'),alicePublic],['C6',message.replace('id=42','id=43'),alicePublic],['C7',message,alicePublic]].map(([id,input,key])=>({id,input,result:verify(input,signature,key)}));
  const eveSignature=sign(message,eve);
  rows.push({id:'C8',input:message,signature:eveSignature.toString('hex'),result:verify(message,eveSignature,evePublic),authorized:false});
  const partial='amount=7', partialSignature=sign(partial,alice);
  return {algorithm:'Ed25519',encoding:'UTF-8',node:process.version,openssl:process.versions.openssl,message,alicePublic:alicePublic.export({format:'der',type:'spki'}).toString('hex'),evePublic:evePublic.export({format:'der',type:'spki'}).toString('hex'),signature:signature.toString('hex'),rows,partial:{signed:partial,result:verify(partial,partialSignature,alicePublic),recipientCovered:false}};
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(fixtures(),null,2));
