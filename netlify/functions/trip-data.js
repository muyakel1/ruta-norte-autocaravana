const { getStore } = require('@netlify/blobs');
const DEFAULT_STATE = { budget: { fuel:330, tolls:70, sleep:260, cab:105, food:520, restaurants:220, extras:180 }, checklist: [
{id:'c1',text:'Gas y bombonas revisadas',done:false},{id:'c2',text:'Agua limpia llena',done:false},{id:'c3',text:'Grises vaciadas',done:false},{id:'c4',text:'Negras vaciadas',done:false},{id:'c5',text:'Cable eléctrico guardado',done:false},{id:'c6',text:'Calzos recogidos',done:false},{id:'c7',text:'Ventanas/claraboyas cerradas',done:false},{id:'c8',text:'Nevera bloqueada',done:false},{id:'c9',text:'Bicis bien sujetas',done:false},{id:'c10',text:'Ruta del día abierta/guardada',done:false},{id:'c11',text:'Área/camping siguiente guardado',done:false}], updatedAt:null };
const headers = { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store' };
exports.handler = async (event) => {
  const store = getStore('ruta-norte');
  if (event.httpMethod === 'GET') {
    const existing = await store.get('shared-state', { type: 'json' });
    return { statusCode: 200, headers, body: JSON.stringify(existing || DEFAULT_STATE) };
  }
  if (event.httpMethod === 'POST') {
    const expectedPin = process.env.EDIT_PIN;
    if (!expectedPin) return { statusCode: 500, headers, body: JSON.stringify({ error:'Falta variable EDIT_PIN en Netlify' }) };
    let body;
    try { body = JSON.parse(event.body || '{}'); } catch { return { statusCode:400, headers, body:JSON.stringify({error:'JSON inválido'}) }; }
    if (String(body.pin || '') !== String(expectedPin)) return { statusCode: 401, headers, body: JSON.stringify({ error:'PIN incorrecto' }) };
    const clean = body.state || DEFAULT_STATE;
    clean.updatedAt = new Date().toISOString();
    await store.setJSON('shared-state', clean);
    return { statusCode: 200, headers, body: JSON.stringify(clean) };
  }
  return { statusCode: 405, headers, body: JSON.stringify({ error:'Método no permitido' }) };
};
