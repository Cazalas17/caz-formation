import { useState, useEffect } from "react";

const G = {
  bg:"#0a0a0a",bg2:"#0f0f0f",bg3:"#141414",bg4:"#1a1a1a",
  border:"#222",gold:"#c9a84c",goldL:"#e8c97a",goldD:"#8a6c28",goldGlow:"rgba(201,168,76,.1)",
  white:"#f0ebe0",gray:"#666",gray2:"#333",
  red:"#c94c4c",green:"#4caf7a",blue:"#4c8ecf",purple:"#9b6fc7",orange:"#d4854a",cyan:"#4cccaf",
};

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{background:${G.bg};color:${G.white};font-family:'Montserrat',sans-serif;font-size:13px}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:${G.bg}}::-webkit-scrollbar-thumb{background:${G.goldD}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes slideR{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
    .fu{animation:fadeUp .45s ease both}
    input,textarea,select,button{font-family:'Montserrat',sans-serif}
    input::placeholder,textarea::placeholder{color:${G.gray2}}
    select option{background:${G.bg2}}
  `}</style>
);

// ── Icons ────────────────────────────────────────────────────────
const IC = {
  home:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  users:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  calendar:"M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18",
  chart:"M18 20V10 M12 20V4 M6 20v-6",
  euro:"M12 2a10 10 0 100 20A10 10 0 0012 2z M14.5 8H10a3 3 0 000 6h4 M8 12h8",
  credit:"M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z M1 10h22",
  bell:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  hand:"M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  layers:"M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  check:"M20 6L9 17l-5-5",
  x:"M18 6L6 18 M6 6l12 12",
  plus:"M12 5v14 M5 12h14",
  edit:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:"M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6z",
  search:"M11 17a6 6 0 100-12 6 6 0 000 12z M21 21l-4.35-4.35",
  map:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4z",
  file:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",
  download:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  send:"M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  lock:"M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M12 17a1 1 0 100-2 1 1 0 000 2z M8 11V7a4 4 0 018 0v4",
  logout:"M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  arrowL:"M19 12H5 M12 19l-7-7 7-7",
  arrowR:"M5 12h14 M12 5l7 7-7 7",
  pen:"M12 20h9 M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
  printer:"M6 9V2h12v7 M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  phone:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  tag:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  percent:"M19 5L5 19 M6.5 4a2.5 2.5 0 100 5 2.5 2.5 0 000-5z M17.5 15a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  upload:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
};
const Icon = ({n,size=14,color="currentColor",style:s={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={s}>
    {(IC[n]||"").split(" M").map((d,i)=><path key={i} d={i===0?d:"M"+d}/>)}
  </svg>
);

// ── Pipeline stages ──────────────────────────────────────────────
const STAGES = [
  {id:"prospect", label:"Prospect",             color:"#4c8ecf", num:1, desc:"Nouveau contact, pas encore qualifié",         icon:"🔵"},
  {id:"en_cours", label:"Inscription en cours", color:"#d4854a", num:2, desc:"Dossier en cours, devis envoyé, CPF en route", icon:"🟡"},
  {id:"confirme", label:"Candidat confirmé",    color:"#c9a84c", num:3, desc:"Devis signé, dossier complet, payé",           icon:"🟢"},
  {id:"inscrit",  label:"Inscrit",              color:"#4caf7a", num:4, desc:"Affecté à une promo, formation démarrée",      icon:"✅"},
  {id:"rejected", label:"Refusé",               color:"#c94c4c", num:0, desc:"Dossier refusé ou abandonné",                 icon:"❌"},
];
const STAGE_LEGACY = {"new":"prospect","contacted":"prospect","docs_ok":"en_cours","devis_sent":"en_cours","signed":"confirme","enrolled":"inscrit","rejected":"rejected"};
const normStage = id => STAGE_LEGACY[id] || id;
const stg = Object.fromEntries(STAGES.map(s=>[s.id,s]));

// ── Storage ──────────────────────────────────────────────────────

// ─ SUPABASE ─────────────────────────────────────────────────────
const SB_URL="https://oofiywzkayldbjoofqzb.supabase.co";
const SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZml5d3prYXlsZGJqb29mcXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNTA0MjMsImV4cCI6MjA5NDcyNjQyM30.yRDSrnvjmAwqZ8tbE7tRzpmexTchaKSsDPOmgQU2OFY";
const SBH={"apikey":SB_KEY,"Authorization":"Bearer "+SB_KEY,"Content-Type":"application/json"};
async function sbReq(path,opts={}) {
  try {
    const r=await fetch(SB_URL+path,{...opts,headers:{...SBH,...(opts.headers||{})}});
    if(!r.ok) return null;
    const t=await r.text();
    return t ? JSON.parse(t) : null;
  } catch(e) { console.error('SB error',e); return null; }
}
async function sbAll(t) { return (await sbReq('/rest/v1/'+t+'?select=*')) || []; }
async function sbUpsert(t,d) { return await sbReq('/rest/v1/'+t,{method:'POST',headers:{'Prefer':'resolution=merge-duplicates'},body:JSON.stringify(d)}); }
async function sbDel(t,id) { return await sbReq('/rest/v1/'+t+'?id=eq.'+id,{method:'DELETE'}); }
async function sbKVGet(k) { const d=await sbReq('/rest/v1/site_content?key=eq.'+k+'&select=value'); return d&&d[0]?d[0].value:null; }
async function sbKVSet(k,v) { return await sbReq('/rest/v1/site_content',{method:'POST',headers:{'Prefer':'resolution=merge-duplicates'},body:JSON.stringify({key:k,value:v})}); }
function L2DB(l) { return {id:l.id,sess_id:l.sessId,prenom:l.prenom,nom:l.nom,email:l.email,phone:l.phone||'',cpf:l.cpf||'',message:l.message||'',stage:l.stage||'prospect',notes:l.notes||'',source:l.source||'',docs:l.docs||{},docs_meta:l.docsMeta||{},devis:l.devis||null,payments:l.payments||[],history:l.history||[],promo_sess_id:l.promoSessId||null,promo_label:l.promoLabel||null}; }
function DB2L(d) { return {id:d.id,sessId:d.sess_id,prenom:d.prenom,nom:d.nom,email:d.email,phone:d.phone||'',cpf:d.cpf||'',message:d.message||'',stage:d.stage||'prospect',notes:d.notes||'',source:d.source||'',docs:d.docs||{},docsMeta:d.docs_meta||{},devis:d.devis||null,payments:d.payments||[],history:d.history||[],promoSessId:d.promo_sess_id||null,promoLabel:d.promo_label||null,createdAt:d.created_at}; }
function S2DB(s) { return {id:s.id,type:s.type||'cqp',label:s.label,lieu:s.lieu,date_debut:s.dateDebut||null,date_fin:s.dateFin||null,places:s.places||16,prix:s.prix||4000,status:s.status||'available',docs:s.docs||[]}; }
function DB2S(d) { return {id:d.id,type:d.type||'cqp',label:d.label,lieu:d.lieu,dateDebut:d.date_debut||'',dateFin:d.date_fin||'',places:d.places||16,prix:d.prix||4000,status:d.status||'available',docs:d.docs||[]}; }

const store = {
  async get(k) {
    if(k==="caz_leads"){const d=await sbAll("leads");if(d.length)return d.map(DB2L);}
    if(k==="caz_sessions"){const d=await sbAll("sessions");if(d.length)return d.map(DB2S);}
    if(k==="caz_partners"){return await sbAll("partners");}
    if(k.startsWith("caz_")){return await sbKVGet(k);}
    try{const r=localStorage.getItem(k);if(r)return JSON.parse(r);}catch{} return null;
  },
  async set(k,v) {
    if(k==="caz_leads"){for(const l of v)await sbUpsert("leads",L2DB(l));return;}
    if(k==="caz_sessions"){for(const s of v)await sbUpsert("sessions",S2DB(s));return;}
    if(k==="caz_partners"){for(const p of v)await sbUpsert("partners",p);return;}
    if(k.startsWith("caz_")){await sbKVSet(k,v);return;}
    try{localStorage.setItem(k,JSON.stringify(v));}catch{}
  },
};


// ── Demo data ────────────────────────────────────────────────────
const SESS0 = [
  {id:"s1",type:"cqp",label:"CQP Instructeur Fitness",lieu:"Niort",dateDebut:"2025-10-04",dateFin:"2026-04-12",places:16,prix:4000,status:"available",description:"CPF · Format weekend",docs:[{id:"cv",label:"CV",req:true},{id:"cni",label:"CNI",req:true},{id:"psc",label:"PSC1",req:true},{id:"cm",label:"Cert. médical",req:true}]},
  {id:"s2",type:"cqp",label:"CQP Instructeur Fitness",lieu:"Limoges",dateDebut:"2025-10-11",dateFin:"2026-04-26",places:16,prix:4000,status:"available",description:"CPF · Format weekend",docs:[{id:"cv",label:"CV",req:true},{id:"cni",label:"CNI",req:true},{id:"psc",label:"PSC1",req:true},{id:"cm",label:"Cert. médical",req:true}]},
  {id:"s3",type:"cqp",label:"CQP Instructeur Fitness",lieu:"Orléans",dateDebut:"2025-11-08",dateFin:"2026-05-17",places:16,prix:4000,status:"available",description:"CPF · Format weekend",docs:[{id:"cv",label:"CV",req:true},{id:"cni",label:"CNI",req:true},{id:"psc",label:"PSC1",req:true},{id:"cm",label:"Cert. médical",req:true}]},
  {id:"s4",type:"pilates",label:"Pilates Matwork 1 & 2",lieu:"La Rochelle",dateDebut:"2025-09-15",dateFin:"2025-09-20",places:12,prix:890,status:"available",description:"RS6755 · Format intensif",docs:[{id:"cm",label:"Cert. médical",req:true},{id:"cv",label:"CV",req:true},{id:"diplome",label:"Diplôme coach",req:true},{id:"carte_pro",label:"Carte pro",req:true}]},
];
const LEADS0 = [
  {id:"l1",sessId:"s1",prenom:"Sophie",nom:"Martin",email:"sophie@email.fr",phone:"06 12 34 56 78",cpf:"1234567890123",message:"",stage:"prospect",notes:"",createdAt:"2025-06-09T10:00:00Z",docs:{cv:"cv_sophie.pdf"},devis:null,payments:[],history:[{date:"2025-06-09T10:00:00Z",action:"Candidature reçue",by:"Formulaire"}],promoSessId:null,promoLabel:null,source:"Site web"},
  {id:"l2",sessId:"s1",prenom:"Antoine",nom:"Moreau",email:"antoine@gmail.com",phone:"06 99 88 77 66",cpf:"9876543210987",message:"",stage:"inscrit",notes:"Coach Basic Fit – très motivé",createdAt:"2025-05-20T09:00:00Z",docs:{cv:"cv_antoine.pdf",cni:"cni_antoine.pdf",psc:"psc1_antoine.pdf",cm:"cm_antoine.pdf"},devis:{id:"d1",numero:"CAZ-2025-0001",montant:4000,remise:200,montantNet:3800,financement:"CPF",status:"signed",sentAt:"2025-05-22T00:00:00Z",signedAt:"2025-05-25T00:00:00Z",notes:"Remise partenaire"},payments:[{id:"p1",montant:1140,date:"2025-05-25",type:"acompte",status:"encaissé"},{id:"p2",montant:2660,date:"2025-10-04",type:"solde",status:"prévu"}],history:[{date:"2025-05-20T09:00:00Z",action:"Candidature reçue",by:"Formulaire"},{date:"2025-05-22T00:00:00Z",action:"Devis CAZ-2025-0001 créé",by:"Admin"},{date:"2025-05-25T00:00:00Z",action:"Devis signé – inscrit promo Niort",by:"Admin"}],promoSessId:"s1",promoLabel:"CQP IF – Niort oct. 2025",source:"Basic Fit"},
  {id:"l3",sessId:"s2",prenom:"Thomas",nom:"Girard",email:"thomas@email.com",phone:"06 33 44 55 66",cpf:"5544332211009",message:"Question CPF",stage:"en_cours",notes:"Appel 28/05",createdAt:"2025-05-28T14:00:00Z",docs:{cv:"cv_thomas.pdf",cni:"cni_thomas.pdf",psc:"psc1_thomas.pdf",cm:"cm_thomas.pdf"},devis:{id:"d2",numero:"CAZ-2025-0002",montant:4000,remise:0,montantNet:4000,financement:"CPF",status:"sent",sentAt:"2025-05-30T00:00:00Z",signedAt:null,notes:""},payments:[],history:[{date:"2025-05-28T14:00:00Z",action:"Candidature reçue",by:"Formulaire"},{date:"2025-05-30T00:00:00Z",action:"Devis CAZ-2025-0002 envoyé",by:"Admin"}],promoSessId:null,promoLabel:null,source:"Site web"},
  {id:"l4",sessId:"s4",prenom:"Clara",nom:"Petit",email:"clara@email.fr",phone:"06 77 66 55 44",cpf:"",message:"",stage:"confirme",notes:"",createdAt:"2025-05-15T00:00:00Z",docs:{cm:"cm_clara.pdf",cv:"cv_clara.pdf",diplome:"diplome_clara.pdf",carte_pro:"cartepro_clara.pdf"},devis:{id:"d3",numero:"CAZ-2025-0003",montant:890,remise:0,montantNet:890,financement:"Autofinancement",status:"signed",sentAt:"2025-05-16T00:00:00Z",signedAt:"2025-05-18T00:00:00Z",notes:""},payments:[{id:"p3",montant:890,date:"2025-05-18",type:"solde",status:"encaissé"}],history:[{date:"2025-05-15T00:00:00Z",action:"Candidature reçue",by:"Formulaire"},{date:"2025-05-18T00:00:00Z",action:"Devis signé – payé",by:"Admin"}],promoSessId:"s4",promoLabel:"Pilates – La Rochelle",source:"Recommandation"},
  {id:"l5",sessId:"s3",prenom:"Léa",nom:"Bernard",email:"lea@gmail.com",phone:"06 11 22 33 44",cpf:"1122334455667",message:"",stage:"en_cours",notes:"",createdAt:"2025-06-01T00:00:00Z",docs:{cv:"cv_lea.pdf",cni:"cni_lea.pdf",psc:"psc1_lea.pdf",cm:"cm_lea.pdf"},devis:null,payments:[],history:[{date:"2025-06-01T00:00:00Z",action:"Candidature reçue",by:"Formulaire"},{date:"2025-06-02T00:00:00Z",action:"Dossier validé complet",by:"Admin"}],promoSessId:null,promoLabel:null,source:"Site web"},
  {id:"l6",sessId:"s1",prenom:"Marc",nom:"Dupont",email:"marc@yahoo.fr",phone:"06 55 44 33 22",cpf:"",message:"",stage:"prospect",notes:"",createdAt:"2025-06-05T00:00:00Z",docs:{cv:"cv_marc.pdf"},devis:null,payments:[],history:[{date:"2025-06-05T00:00:00Z",action:"Candidature reçue",by:"Formulaire"},{date:"2025-06-06T00:00:00Z",action:"Contacté – attente CNI",by:"Admin"}],promoSessId:null,promoLabel:null,source:"Meta Ads"},
];
const PARTNERS0 = [
  {id:"p1",name:"Basic Fit",type:"Partenaire HT",contact:"David Renard",email:"d.renard@basicfit.com",clubs:"Albi, Castres, Barcarès",notes:"Remise -200€/stagiaire"},
  {id:"p2",name:"Trans-Faire Formation",type:"Partenaire pédagogique",contact:"Aurélie Martin",email:"a.martin@transfaire.fr",clubs:"National",notes:"Jury + logistique examens"},
];

// ── Utils ────────────────────────────────────────────────────────
const fmtD = (d,s) => d?new Date(d).toLocaleDateString("fr-FR",s?{day:"2-digit",month:"short"}:{day:"2-digit",month:"long",year:"numeric"}):"—";
const fmtM = n => (n||0).toLocaleString("fr-FR")+" €";
const uid = () => Math.random().toString(36).slice(2,9);

// ── Shared UI ─────────────────────────────────────────────────────
const GL = ({w=50,style={}}) => <div style={{width:w,height:1,background:`linear-gradient(90deg,${G.gold},transparent)`,...style}}/>;

const Btn = ({children,v="gold",onClick,disabled,full,size="md",style:sx={},...p}) => {
  const SZ={sm:{padding:"6px 13px",fontSize:9},md:{padding:"10px 20px",fontSize:10},lg:{padding:"13px 28px",fontSize:11}};
  const V={
    gold:{background:`linear-gradient(135deg,${G.goldD},${G.gold})`,color:G.bg,border:"none"},
    outline:{background:"transparent",border:`1px solid ${G.gold}`,color:G.gold},
    ghost:{background:"transparent",border:`1px solid ${G.border}`,color:G.gray},
    danger:{background:"rgba(201,76,76,.08)",border:`1px solid ${G.red}`,color:G.red},
    green:{background:"rgba(76,175,122,.08)",border:`1px solid ${G.green}`,color:G.green},
    blue:{background:"rgba(76,142,207,.08)",border:`1px solid ${G.blue}`,color:G.blue},
    orange:{background:"rgba(212,133,74,.08)",border:`1px solid ${G.orange}`,color:G.orange},
    purple:{background:"rgba(155,111,199,.08)",border:`1px solid ${G.purple}`,color:G.purple},
  };
  return <button {...p} disabled={disabled} onClick={onClick}
    style={{...SZ[size],...(V[v]||V.ghost),letterSpacing:".14em",textTransform:"uppercase",fontWeight:600,
      cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,transition:"all .18s",
      display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,
      width:full?"100%":"auto",...sx}}
    onMouseEnter={e=>{if(!disabled)e.currentTarget.style.filter="brightness(1.18)"}}
    onMouseLeave={e=>{e.currentTarget.style.filter="none"}}
  >{children}</button>;
};

const Inp = p => <input {...p} style={{width:"100%",background:G.bg4,border:`1px solid ${G.border}`,
  color:G.white,padding:"10px 12px",fontSize:12,outline:"none",transition:"border-color .18s",...p.style}}
  onFocus={e=>e.target.style.borderColor=G.gold} onBlur={e=>e.target.style.borderColor=G.border}/>;

const Sel = ({children,...p}) => <select {...p} style={{width:"100%",background:G.bg4,
  border:`1px solid ${G.border}`,color:G.white,padding:"10px 12px",fontSize:12,outline:"none",...p.style}}>
  {children}</select>;

const TA = p => <textarea {...p} style={{width:"100%",background:G.bg4,border:`1px solid ${G.border}`,
  color:G.white,padding:"10px 12px",fontSize:12,outline:"none",resize:"vertical",
  transition:"border-color .18s",...p.style}}
  onFocus={e=>e.target.style.borderColor=G.gold} onBlur={e=>e.target.style.borderColor=G.border}/>;

const Fld = ({label,children,style={}}) => <div style={{marginBottom:14,...style}}>
  {label&&<label style={{display:"block",fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:G.gray,marginBottom:6}}>{label}</label>}
  {children}
</div>;

const StagePill = ({id,small}) => {
  const s=stg[normStage(id)]||STAGES[0];
  return <span style={{fontSize:small?9:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",
    padding:small?"2px 8px":"3px 10px",borderRadius:20,background:s.color+"18",color:s.color,
    border:`1px solid ${s.color}28`,display:"inline-flex",alignItems:"center",whiteSpace:"nowrap"}}>{s.label}</span>;
};

const Modal = ({children,onClose,width=580}) => (
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",display:"flex",
    alignItems:"flex-start",justifyContent:"center",zIndex:1000,padding:"40px 16px",
    overflowY:"auto"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{background:G.bg2,border:`1px solid ${G.border}`,padding:26,
      width:"100%",maxWidth:width,animation:"fadeUp .3s ease both"}}>{children}</div>
  </div>
);
const MH = ({title,sub,onClose}) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
    <div>
      <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300,color:G.white}}>{title}</h3>
      {sub&&<p style={{fontSize:10,color:G.gray,marginTop:2}}>{sub}</p>}
    </div>
    {onClose&&<button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:G.gray,padding:3}}><Icon n="x" size={17} color={G.gray}/></button>}
  </div>
);

const Spin = ({size=14,color=G.bg}) => (
  <span style={{display:"inline-block",width:size,height:size,border:`2px solid ${color}`,
    borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite",flexShrink:0}}/>
);

// Breadcrumb nav
const Crumb = ({items,onNav}) => (
  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:20,flexWrap:"wrap"}}>
    {items.map((item,i)=>(
      <span key={i} style={{display:"flex",alignItems:"center",gap:6}}>
        {i>0&&<Icon n="arrowR" size={11} color={G.gray}/>}
        {i<items.length-1?(
          <button onClick={()=>onNav(item.nav)} style={{background:"none",border:"none",
            color:G.gold,fontSize:11,cursor:"pointer",letterSpacing:".05em",
            textDecoration:"none",padding:0}}
            onMouseEnter={e=>e.currentTarget.style.textDecoration="underline"}
            onMouseLeave={e=>e.currentTarget.style.textDecoration="none"}>
            {item.label}
          </button>
        ):(
          <span style={{fontSize:11,color:G.gray}}>{item.label}</span>
        )}
      </span>
    ))}
  </div>
);

// ── Auth ─────────────────────────────────────────────────────────
function Login({onLogin}) {
  const [pwd,setPwd]=useState(""); const [err,setErr]=useState(false);
  const go=()=>{if(pwd==="caz2025")onLogin();else setErr(true);};
  return (
    <div style={{minHeight:"100vh",background:G.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <Fonts/>
      <div style={{width:"100%",maxWidth:300,textAlign:"center",animation:"fadeUp .6s ease"}}>
        <div style={{width:46,height:46,border:`1px solid ${G.gold}`,borderRadius:"50%",
          display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>
          <Icon n="lock" size={18} color={G.gold}/>
        </div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:G.white,marginBottom:4}}>CAZ CRM</div>
        <p style={{fontSize:9,letterSpacing:".28em",textTransform:"uppercase",color:G.gold,marginBottom:28}}>Formation</p>
        <Inp type="password" placeholder="Mot de passe" value={pwd}
          onChange={e=>{setPwd(e.target.value);setErr(false)}}
          onKeyDown={e=>e.key==="Enter"&&go()} style={{marginBottom:8,textAlign:"center"}}/>
        {err&&<p style={{color:G.red,fontSize:11,marginBottom:8}}>Incorrect</p>}
        <Btn v="gold" full onClick={go} style={{marginTop:8}}>Connexion</Btn>
        <p style={{color:G.gray2,fontSize:10,marginTop:14}}>caz2025</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════
export default function Admin({ onExit }) {
  const [auth,setAuth]=useState(false);
  const [tab,setTab]=useState("pipeline");
  // nav stack: [{page, params}]
  const [navStack,setNavStack]=useState([]);
  const [leads,setLeads]=useState(null);
  const [sessions,setSessions]=useState(null);
  const [partners,setPartners]=useState(null);

  useEffect(()=>{
    Promise.all([store.get("caz_leads"),store.get("caz_sessions"),store.get("caz_partners")]).then(([l,s,p])=>{
      setLeads(l||LEADS0); setSessions(s||SESS0); setPartners(p||PARTNERS0);
    });
  },[]);

  const saveL=async l=>{setLeads(l);await store.set("caz_leads",l);};
  const saveS=async s=>{setSessions(s);await store.set("caz_sessions",s);};
  const saveP=async p=>{setPartners(p);await store.set("caz_partners",p);};
  const updLead=async(id,patch)=>{const u=leads.map(l=>l.id===id?{...l,...patch}:l);await saveL(u);return u;};

  // Navigation helpers
  const push=(page,params={})=>setNavStack(s=>[...s,{page,params}]);
  const pop=()=>setNavStack(s=>s.slice(0,-1));
  const popTo=(idx)=>setNavStack(s=>s.slice(0,idx+1));
  const reset=()=>setNavStack([]);

  const switchTab=t=>{setTab(t);reset();};

  const currentPage = navStack.length>0?navStack[navStack.length-1]:null;

  if(!auth) return <Login onLogin={()=>setAuth(true)}/>;
  if(!leads||!sessions) return <div style={{minHeight:"100vh",background:G.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><Fonts/><Spin size={28} color={G.gold}/></div>;

  const TABS=[
    {id:"pipeline",label:"Pipeline",icon:"layers"},
    {id:"candidatures",label:"Candidatures",icon:"users"},
    {id:"sessions",label:"Sessions",icon:"calendar"},
    {id:"devis",label:"Devis",icon:"euro"},
    {id:"paiements",label:"Paiements",icon:"credit"},
    {id:"relances",label:"Relances",icon:"bell"},
    {id:"partenaires",label:"Partenaires",icon:"hand"},
    {id:"stats",label:"Stats",icon:"chart"},
  ];

  const props = {leads,sessions,partners,saveL,saveS,saveP,updLead,push,pop,popTo,reset,navStack};

  return (
    <div style={{minHeight:"100vh",background:G.bg}}>
      <Fonts/>
      {/* NAV */}
      <nav style={{background:G.bg2,borderBottom:`1px solid ${G.border}`,height:50,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 18px",position:"sticky",top:0,zIndex:200}}>
        <button onClick={()=>{switchTab("pipeline");}} style={{background:"none",border:"none",
          cursor:"pointer",display:"flex",alignItems:"baseline",gap:7}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:G.white}}>CAZ</span>
          <span style={{fontSize:8,letterSpacing:".22em",textTransform:"uppercase",color:G.gold}}>CRM</span>
        </button>
        <div style={{display:"flex",gap:0,overflowX:"auto"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>switchTab(t.id)}
              style={{background:"none",border:"none",
                borderBottom:`2px solid ${tab===t.id&&!currentPage?G.gold:"transparent"}`,
                borderTop:"2px solid transparent",color:tab===t.id&&!currentPage?G.gold:G.gray,
                padding:"13px 11px 11px",fontSize:9,letterSpacing:".13em",textTransform:"uppercase",
                fontWeight:600,cursor:"pointer",transition:"color .18s",
                display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
              <Icon n={t.icon} size={11} color={tab===t.id&&!currentPage?G.gold:"currentColor"}/>{t.label}
            </button>
          ))}
        </div>
        <button onClick={()=>setAuth(false)} style={{background:"none",border:`1px solid ${G.border}`,
          color:G.gray,padding:"5px 11px",fontSize:9,cursor:"pointer",
          display:"flex",alignItems:"center",gap:5,letterSpacing:".1em",textTransform:"uppercase"}}>
          <Icon n="logout" size={11} color={G.gray}/>Quitter
        </button>
      </nav>

      <div style={{padding:"22px 20px",maxWidth:1280,margin:"0 auto"}}>
        {/* Current page routing */}
        {currentPage?.page==="lead"   && <LeadPage    {...props} lead={leads.find(l=>l.id===currentPage.params.id)}/>}
        {currentPage?.page==="session"&& <SessionPage {...props} session={sessions.find(s=>s.id===currentPage.params.id)}/>}
        {currentPage?.page==="partner"&& <PartnerPage {...props} partner={partners.find(p=>p.id===currentPage.params.id)}/>}

        {/* Tab views (only when no page open) */}
        {!currentPage&&tab==="pipeline"    && <PipelineTab    {...props} saveL={saveL}/>}
        {!currentPage&&tab==="candidatures"&& <CandidaturesTab {...props}/>}
        {!currentPage&&tab==="sessions"    && <SessionsTab    {...props}/>}
        {!currentPage&&tab==="devis"       && <DevisTab       {...props} saveL={saveL}/>}
        {!currentPage&&tab==="paiements"   && <PaiementsTab   {...props} saveL={saveL}/>}
        {!currentPage&&tab==="relances"    && <RelancesTab    {...props} saveL={saveL}/>}
        {!currentPage&&tab==="partenaires" && <PartenairesTab {...props}/>}
        {!currentPage&&tab==="stats"       && <StatsTab       {...props}/>}
      </div>
    </div>
  );
}

// ── Page header with back button ──────────────────────────────────
const PageHdr = ({title,sub,crumbs,onBack,actions}) => (
  <div style={{marginBottom:22}}>
    <button onClick={onBack} style={{background:"none",border:"none",color:G.gray,cursor:"pointer",
      fontSize:11,display:"flex",alignItems:"center",gap:6,marginBottom:14,padding:0,
      letterSpacing:".05em",fontFamily:"'Montserrat',sans-serif",transition:"color .18s"}}
      onMouseEnter={e=>e.currentTarget.style.color=G.gold}
      onMouseLeave={e=>e.currentTarget.style.color=G.gray}>
      <Icon n="arrowL" size={13} color="currentColor"/>Retour
    </button>
    {crumbs&&<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12,flexWrap:"wrap"}}>
      {crumbs.map((c,i)=>(
        <span key={i} style={{display:"flex",alignItems:"center",gap:6}}>
          {i>0&&<Icon n="arrowR" size={10} color={G.gray}/>}
          <span style={{fontSize:11,color:i<crumbs.length-1?G.gold:G.gray}}>{c}</span>
        </span>
      ))}
    </div>}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
      <div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:28,color:G.white,marginBottom:sub?4:0}}>{title}</h1>
        {sub&&<p style={{fontSize:11,color:G.gray}}>{sub}</p>}
      </div>
      {actions&&<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{actions}</div>}
    </div>
    <GL style={{marginTop:10}}/>
  </div>
);

// ── Section header ────────────────────────────────────────────────
const TabHdr = ({title,sub,actions}) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,flexWrap:"wrap",gap:12}}>
    <div>
      <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:28,color:G.white,marginBottom:sub?3:0}}>{title}</h1>
      {sub&&<p style={{fontSize:11,color:G.gray}}>{sub}</p>}
    </div>
    {actions&&<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{actions}</div>}
  </div>
);

// ── KPI card ──────────────────────────────────────────────────────
const KPI = ({label,value,color,icon}) => (
  <div style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"16px 18px",display:"flex",gap:14,alignItems:"center"}}>
    {icon&&<div style={{width:34,height:34,borderRadius:"50%",background:`${color||G.gold}15`,
      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <Icon n={icon} size={15} color={color||G.gold}/>
    </div>}
    <div>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,color:color||G.gold,marginBottom:2}}>{value}</p>
      <p style={{fontSize:9,color:G.gray,letterSpacing:".1em",textTransform:"uppercase"}}>{label}</p>
    </div>
  </div>
);

// ── Document download row ─────────────────────────────────────────
// DocRow : aperçu + statut (validé/refusé/attente) + commentaire
function DocRow({label,filename,docId,docMeta={},onUpdateMeta}) {
  const hasFile = !!filename;
  const [showComment,setShowComment]=useState(false);
  const [comment,setComment]=useState(docMeta.comment||"");
  const status = docMeta.status||"pending"; // pending | ok | rejected

  const statusCfg = {
    pending:{label:"En attente",color:G.gray,bg:G.gray+"18"},
    ok:{label:"✓ Validé",color:G.green,bg:G.green+"18"},
    rejected:{label:"✗ Refusé",color:G.red,bg:G.red+"18"},
  };
  const sc = statusCfg[status];

  const handleDownload = () => {
    if(!hasFile) return;
    // Simulate: in real app this would open a signed URL
    const isPdf = filename.toLowerCase().endsWith(".pdf");
    const content = isPdf
      ? `%PDF-1.4 — Simulation\nDocument: ${filename}\nCandidature Caz Formation\n\nCe document a été soumis par le candidat.`
      : `Document: ${filename}\nCandidature Caz Formation`;
    const blob = new Blob([content],{type:isPdf?"application/pdf":"text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const saveComment = () => {
    onUpdateMeta&&onUpdateMeta(docId,{...docMeta,comment});
    setShowComment(false);
  };

  // File type icon
  const ext = filename?.split(".").pop()?.toLowerCase()||"";
  const fileIcon = ext==="pdf"?"📄":["jpg","jpeg","png"].includes(ext)?"🖼️":"📎";

  return (
    <div style={{marginBottom:10,background:G.bg2,border:`1px solid ${hasFile&&status==="rejected"?G.red:hasFile&&status==="ok"?G.green:G.border}`,transition:"border-color .2s"}}>
      {/* Main row */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
          <span style={{fontSize:18,flexShrink:0}}>{hasFile?fileIcon:"❌"}</span>
          <div style={{minWidth:0}}>
            <p style={{fontSize:12,color:G.white,fontWeight:500}}>{label}</p>
            {filename
              ?<p style={{fontSize:10,color:G.gray,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{filename}</p>
              :<p style={{fontSize:10,color:G.red}}>Document manquant</p>}
            {docMeta.comment&&<p style={{fontSize:10,color:G.orange,marginTop:2}}>💬 {docMeta.comment}</p>}
          </div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0,marginLeft:10}}>
          {/* Status badge */}
          <span style={{fontSize:9,padding:"2px 9px",borderRadius:20,background:sc.bg,color:sc.color,fontWeight:600,letterSpacing:".08em"}}>{sc.label}</span>
          {hasFile&&<>
            {/* Validate / Reject buttons */}
            <button onClick={()=>onUpdateMeta&&onUpdateMeta(docId,{...docMeta,status:"ok"})}
              title="Valider"
              style={{background:status==="ok"?G.green+"25":"none",border:`1px solid ${G.green}40`,color:G.green,
                width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>✓</button>
            <button onClick={()=>onUpdateMeta&&onUpdateMeta(docId,{...docMeta,status:"rejected"})}
              title="Refuser"
              style={{background:status==="rejected"?G.red+"25":"none",border:`1px solid ${G.red}40`,color:G.red,
                width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>✗</button>
            {/* Comment */}
            <button onClick={()=>setShowComment(v=>!v)} title="Commenter"
              style={{background:docMeta.comment?G.orange+"20":"none",border:`1px solid ${G.orange}40`,color:G.orange,
                width:26,height:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>💬</button>
            {/* Download */}
            <button onClick={handleDownload}
              style={{background:"none",border:`1px solid ${G.gold}35`,color:G.gold,
                padding:"4px 10px",fontSize:9,cursor:"pointer",letterSpacing:".1em",textTransform:"uppercase",
                display:"flex",alignItems:"center",gap:4,transition:"all .18s"}}
              onMouseEnter={e=>e.currentTarget.style.background=G.goldGlow}
              onMouseLeave={e=>e.currentTarget.style.background="none"}>
              <Icon n="download" size={10} color={G.gold}/>Télécharger
            </button>
          </>}
        </div>
      </div>
      {/* Comment input */}
      {showComment&&<div style={{padding:"8px 14px",borderTop:`1px solid ${G.border}`,display:"flex",gap:8}}>
        <input value={comment} onChange={e=>setComment(e.target.value)}
          placeholder="Note sur ce document (ex: CNI expirée, illisible…)"
          style={{flex:1,background:G.bg4,border:`1px solid ${G.border}`,color:G.white,
            padding:"7px 10px",fontSize:11,outline:"none"}}
          onFocus={e=>e.target.style.borderColor=G.gold}
          onBlur={e=>e.target.style.borderColor=G.border}/>
        <button onClick={saveComment}
          style={{background:`linear-gradient(135deg,${G.goldD},${G.gold})`,border:"none",
            color:G.bg,padding:"7px 14px",fontSize:9,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer"}}>
          Sauver
        </button>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PIPELINE TAB
// ══════════════════════════════════════════════════════════════════
function PipelineTab({leads,sessions,push,saveL}) {
  const [showNew,setShowNew]=useState(false);
  const [sessF,setSessF]=useState("all");

  // normalise legacy stages
  const normed = leads.map(l=>({...l,stage:normStage(l.stage)}));
  const filtered = sessF==="all" ? normed : normed.filter(l=>l.sessId===sessF);
  const active = STAGES.filter(s=>s.id!=="rejected");

  // Doc completion % for a lead
  const docPct = (l) => {
    const sess = sessions.find(s=>s.id===l.sessId);
    if(!sess) return 0;
    const req = sess.docs.filter(d=>d.req);
    if(!req.length) return 100;
    const filled = req.filter(d=>l.docs?.[d.id]).length;
    return Math.round(filled/req.length*100);
  };

  const hasRejectedDoc = (l) => {
    const meta = l.docsMeta||{};
    return Object.values(meta).some(m=>m.status==="rejected");
  };

  return (
    <div>
      <TabHdr title="Pipeline" sub={`${normed.filter(l=>l.stage!=="rejected").length} dossiers actifs`}
        actions={[
          <select key="sf" value={sessF} onChange={e=>setSessF(e.target.value)}
            style={{background:G.bg3,border:`1px solid ${G.border}`,color:G.gray,
              padding:"7px 12px",fontSize:9,letterSpacing:".08em",cursor:"pointer",outline:"none"}}>
            <option value="all">Toutes sessions</option>
            {sessions.map(s=><option key={s.id} value={s.id}>{s.label} – {s.lieu}</option>)}
          </select>,
          <Btn key="new" v="gold" size="sm" onClick={()=>setShowNew(true)}><Icon n="plus" size={11} color={G.bg}/>Nouveau lead</Btn>
        ]}/>

      {/* Step indicator */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
        {active.map((stage,i)=>(
          <div key={stage.id} style={{background:G.bg2,border:`1px solid ${stage.color}30`,
            borderTop:`3px solid ${stage.color}`,padding:"12px 14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{fontSize:18}}>{stage.icon}</span>
              <div>
                <p style={{fontSize:9,color:G.gray,letterSpacing:".08em"}}>ÉTAPE {stage.num}</p>
                <p style={{fontSize:11,fontWeight:600,color:stage.color}}>{stage.label}</p>
              </div>
              <span style={{marginLeft:"auto",fontFamily:"'Cormorant Garamond',serif",
                fontSize:22,fontWeight:300,color:stage.color}}>
                {filtered.filter(l=>l.stage===stage.id).length}
              </span>
            </div>
            <p style={{fontSize:9,color:G.gray2,lineHeight:1.5}}>{stage.desc}</p>
          </div>
        ))}
      </div>

      {/* Kanban columns */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,overflowX:"auto",paddingBottom:6}}>
        {active.map(stage=>{
          const sl=filtered.filter(l=>l.stage===stage.id);
          return (
            <div key={stage.id} style={{background:G.bg2,border:`1px solid ${G.border}`,
              borderTop:`2px solid ${stage.color}`,minHeight:180}}>
              <div style={{padding:"9px 12px",borderBottom:`1px solid ${G.border}`,
                display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:8,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:stage.color}}>
                  {stage.icon} {stage.label}
                </span>
                <span style={{fontSize:10,fontWeight:600,color:stage.color,background:`${stage.color}18`,
                  minWidth:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>
                  {sl.length}
                </span>
              </div>
              <div style={{padding:6}}>
                {sl.map(l=>{
                  const sess=sessions.find(s=>s.id===l.sessId);
                  const pct=docPct(l);
                  const hasRej=hasRejectedDoc(l);
                  const lastAction=(l.history||[]).slice(-1)[0];
                  return (
                    <div key={l.id} onClick={()=>push("lead",{id:l.id})}
                      style={{background:G.bg3,border:`1px solid ${hasRej?G.red:G.border}`,
                        padding:"9px 10px",marginBottom:6,cursor:"pointer",transition:"all .15s",position:"relative"}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=hasRej?G.red:stage.color+"60";e.currentTarget.style.transform="translateY(-1px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=hasRej?G.red:G.border;e.currentTarget.style.transform="translateY(0)"}}>
                      {hasRej&&<span style={{position:"absolute",top:6,right:7,fontSize:10}} title="Document refusé">🔴</span>}
                      <p style={{fontSize:11,color:G.white,fontWeight:500,marginBottom:1,paddingRight:hasRej?16:0}}>{l.prenom} {l.nom}</p>
                      <p style={{fontSize:9,color:G.gray,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{sess?.label}</p>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                        <span style={{fontSize:9,color:G.gold}}>{sess?.lieu}</span>
                        {l.devis?.montantNet&&<span style={{fontSize:9,color:G.goldL,fontWeight:600}}>{fmtM(l.devis.montantNet)}</span>}
                      </div>
                      {/* Doc progress bar */}
                      <div style={{marginBottom:4}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                          <span style={{fontSize:8,color:G.gray}}>Dossier</span>
                          <span style={{fontSize:8,color:pct===100?G.green:G.orange}}>{pct}%</span>
                        </div>
                        <div style={{height:2,background:G.bg4,borderRadius:2}}>
                          <div style={{height:"100%",borderRadius:2,
                            background:pct===100?G.green:pct>50?G.orange:G.red,
                            width:`${pct}%`,transition:"width .4s"}}/>
                        </div>
                      </div>
                      {l.promoLabel&&<p style={{fontSize:8,color:G.green}}>👥 {l.promoLabel}</p>}
                      {lastAction&&<p style={{fontSize:8,color:G.gray2,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>↩ {lastAction.action}</p>}
                    </div>
                  );
                })}
                {sl.length===0&&<p style={{fontSize:9,color:G.gray2,textAlign:"center",padding:"20px 0"}}>Aucun dossier</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Refused */}
      {normed.filter(l=>l.stage==="rejected").length>0&&(
        <div style={{marginTop:10,padding:"10px 14px",background:G.bg2,border:`1px solid ${G.border}`,borderTop:`2px solid ${G.red}`}}>
          <p style={{fontSize:9,color:G.red,letterSpacing:".1em",textTransform:"uppercase",marginBottom:8}}>
            ❌ Refusés ({normed.filter(l=>l.stage==="rejected").length})
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {normed.filter(l=>l.stage==="rejected").map(l=>(
              <button key={l.id} onClick={()=>push("lead",{id:l.id})}
                style={{background:"none",border:`1px solid ${G.border}`,color:G.gray,
                  padding:"4px 10px",fontSize:10,cursor:"pointer"}}>
                {l.prenom} {l.nom}
              </button>
            ))}
          </div>
        </div>
      )}
      {showNew&&<NewLeadModal sessions={sessions} onClose={()=>setShowNew(false)}
        onSave={async l=>{await saveL([...leads,l]);setShowNew(false);}}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// CANDIDATURES TAB
// ══════════════════════════════════════════════════════════════════
function CandidaturesTab({leads,sessions,push,saveL}) {
  const [search,setSearch]=useState(""); const [stgF,setStgF]=useState("all"); const [sessF,setSessF]=useState("all");
  const [showNew,setShowNew]=useState(false);
  const shown=leads.filter(l=>{
    const ms=stgF==="all"||l.stage===stgF; const mf=sessF==="all"||l.sessId===sessF;
    const mq=!search||`${l.prenom} ${l.nom} ${l.email}`.toLowerCase().includes(search.toLowerCase());
    return ms&&mf&&mq;
  });
  return (
    <div>
      <TabHdr title="Candidatures" sub={`${leads.length} dossier${leads.length>1?"s":""}`}
        actions={[<Btn key="n" v="gold" size="sm" onClick={()=>setShowNew(true)}><Icon n="plus" size={11} color={G.bg}/>Nouveau</Btn>]}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
        <button onClick={()=>setStgF("all")} style={{...pillStyle(stgF==="all",G.gold)}}>Tous ({leads.length})</button>
        {STAGES.map(s=><button key={s.id} onClick={()=>setStgF(stgF===s.id?"all":s.id)}
          style={{...pillStyle(stgF===s.id,s.color)}}>{s.label} ({leads.filter(l=>l.stage===s.id).length})</button>)}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:150}}>
          <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><Icon n="search" size={12} color={G.gray}/></div>
          <Inp value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher…" style={{paddingLeft:30}}/>
        </div>
        <Sel value={sessF} onChange={e=>setSessF(e.target.value)} style={{minWidth:170}}>
          <option value="all">Toutes sessions</option>
          {sessions.map(s=><option key={s.id} value={s.id}>{s.label} – {s.lieu}</option>)}
        </Sel>
      </div>
      <div style={{border:`1px solid ${G.border}`,overflowX:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1.5fr 1fr 32px",
          padding:"8px 14px",background:G.bg2,borderBottom:`1px solid ${G.border}`,minWidth:600}}>
          {["Candidat","Formation","Ville","Étape","Devis",""].map(h=>(
            <span key={h} style={{fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:G.gray}}>{h}</span>))}
        </div>
        {shown.map((l,i)=>{
          const sess=sessions.find(s=>s.id===l.sessId);
          return (
            <div key={l.id} onClick={()=>push("lead",{id:l.id})}
              style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1.5fr 1fr 32px",
                padding:"11px 14px",borderBottom:`1px solid ${G.border}`,cursor:"pointer",
                transition:"background .15s",alignItems:"center",background:i%2===0?G.bg:G.bg2,minWidth:600}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.04)"}
              onMouseLeave={e=>e.currentTarget.style.background=i%2===0?G.bg:G.bg2}>
              <div><p style={{fontSize:12,color:G.white,marginBottom:1}}>{l.prenom} {l.nom}</p><p style={{fontSize:10,color:G.gray}}>{fmtD(l.createdAt,true)}</p></div>
              <p style={{fontSize:11,color:G.gray,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{sess?.label}</p>
              <div style={{display:"flex",alignItems:"center",gap:4}}><Icon n="map" size={10} color={G.gold}/><span style={{fontSize:11,color:G.gray}}>{sess?.lieu}</span></div>
              <StagePill id={l.stage} small/>
              {l.devis?(<div><p style={{fontSize:11,color:G.goldL,fontWeight:600}}>{fmtM(l.devis.montantNet)}</p><p style={{fontSize:9,color:l.devis.status==="signed"?G.green:l.devis.status==="sent"?G.orange:G.gray}}>{l.devis.status==="signed"?"✓ Signé":l.devis.status==="sent"?"Envoyé":"Brouillon"}</p></div>)
                :<span style={{fontSize:10,color:G.gray2}}>—</span>}
              <Icon n="arrowR" size={13} color={G.gold}/>
            </div>
          );
        })}
        {shown.length===0&&<p style={{textAlign:"center",padding:"40px",color:G.gray}}>Aucune candidature</p>}
      </div>
      {showNew&&<NewLeadModal sessions={sessions} onClose={()=>setShowNew(false)}
        onSave={async l=>{await saveL([...leads,l]);setShowNew(false);}}/>}
    </div>
  );
}
const pillStyle=(active,color)=>({background:active?`${color}14`:"transparent",border:`1px solid ${active?color:G.border}`,
  color:active?color:G.gray,padding:"4px 11px",fontSize:9,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer"});

// ══════════════════════════════════════════════════════════════════
// SESSIONS TAB
// ══════════════════════════════════════════════════════════════════
function SessionsTab({sessions,leads,saveS,push}) {
  const [showModal,setShowModal]=useState(null);
  const [confirmDel,setConfirmDel]=useState(null);
  const toggle=async s=>{const st=s.status==="available"?"indisponible":"available";await saveS(sessions.map(x=>x.id===s.id?{...x,status:st}:x));};
  return (
    <div>
      <TabHdr title="Sessions" sub={`${sessions.length} session${sessions.length>1?"s":""}`}
        actions={[<Btn key="n" v="gold" size="sm" onClick={()=>setShowModal("new")}><Icon n="plus" size={11} color={G.bg}/>Nouvelle session</Btn>]}/>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {sessions.map(s=>{
          const ins=leads.filter(l=>l.promoSessId===s.id).length;
          const ca=leads.filter(l=>l.promoSessId===s.id&&l.devis?.status==="signed").reduce((sum,l)=>sum+(l.devis?.montantNet||0),0);
          return (
            <div key={s.id} style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"16px 20px",
              display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,
              opacity:s.status==="archived"?.45:1}}>
              <div style={{flex:1,minWidth:200}}>
                <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:7,flexWrap:"wrap"}}>
                  <span style={{fontSize:8,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",
                    padding:"2px 8px",borderRadius:20,
                    background:s.status==="available"?`${G.green}14`:`${G.orange}10`,
                    color:s.status==="available"?G.green:G.orange}}>
                    {s.status==="available"?"Ouvert":s.status==="archived"?"Archivé":"Inactif"}
                  </span>
                  <span style={{fontSize:11,color:G.gold}}>{s.lieu}</span>
                  {s.dateDebut&&<span style={{fontSize:10,color:G.gray}}>{fmtD(s.dateDebut,true)}</span>}
                </div>
                <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:G.white,marginBottom:4}}>{s.label}</h3>
                <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,color:G.gray}}>{ins}/{s.places} inscrits</span>
                  <span style={{fontSize:11,color:G.goldL,fontWeight:600}}>{fmtM(s.prix)}</span>
                  {ca>0&&<span style={{fontSize:11,color:G.gold}}>CA : {fmtM(ca)}</span>}
                </div>
                <div style={{height:2,background:G.bg4,borderRadius:2,marginTop:10,maxWidth:300}}>
                  <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${G.goldD},${G.gold})`,
                    width:`${s.places?Math.min(Math.round(ins/s.places*100),100):0}%`}}/>
                </div>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <Btn v="outline" size="sm" onClick={()=>push("session",{id:s.id})}>Voir inscrits</Btn>
                {s.status!=="archived"&&<Btn v="ghost" size="sm" onClick={()=>toggle(s)}>{s.status==="available"?"Désactiver":"Activer"}</Btn>}
                <Btn v="ghost" size="sm" onClick={()=>setShowModal(s)}><Icon n="edit" size={11} color={G.gold}/></Btn>
                <Btn v="danger" size="sm" onClick={()=>setConfirmDel(s.id)}><Icon n="trash" size={11} color={G.red}/></Btn>
              </div>
            </div>
          );
        })}
      </div>
      {confirmDel&&<Modal onClose={()=>setConfirmDel(null)} width={340}>
        <MH title="Supprimer cette session ?" onClose={()=>setConfirmDel(null)}/>
        <p style={{color:G.gray,fontSize:12,marginBottom:18,lineHeight:1.7}}>Action irréversible. Les candidatures liées restent.</p>
        <div style={{display:"flex",gap:10}}><Btn v="ghost" onClick={()=>setConfirmDel(null)} style={{flex:1}}>Annuler</Btn><Btn v="danger" style={{flex:1}} onClick={async()=>{await saveS(sessions.filter(x=>x.id!==confirmDel));setConfirmDel(null);}}>Supprimer</Btn></div>
      </Modal>}
      {showModal&&<SessionModal session={showModal==="new"?null:showModal} onClose={()=>setShowModal(null)}
        onSave={async s=>{const u=showModal==="new"?[...sessions,{...s,id:uid()}]:sessions.map(x=>x.id===s.id?s:x);await saveS(u);setShowModal(null);}}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SESSION PAGE (detail with enrolled list)
// ══════════════════════════════════════════════════════════════════
function SessionPage({session,leads,sessions,saveS,push,pop}) {
  const [showEdit,setShowEdit]=useState(false);
  const enrolled=leads.filter(l=>l.promoSessId===session.id);
  const ca=enrolled.filter(l=>l.devis?.status==="signed").reduce((s,l)=>s+(l.devis?.montantNet||0),0);

  if(!session) return <div style={{padding:40,color:G.gray}}>Session introuvable. <button onClick={pop} style={{color:G.gold,background:"none",border:"none",cursor:"pointer"}}>Retour</button></div>;

  return (
    <div>
      <PageHdr title={session.label} sub={`${session.lieu} · ${fmtD(session.dateDebut,true)} → ${fmtD(session.dateFin,true)}`}
        crumbs={["Sessions",session.label]} onBack={pop}
        actions={[<Btn key="e" v="ghost" size="sm" onClick={()=>setShowEdit(true)}><Icon n="edit" size={11} color={G.gold}/>Modifier</Btn>]}/>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:22}}>
        <KPI label="Inscrits" value={`${enrolled.length}/${session.places}`} color={G.green} icon="users"/>
        <KPI label="Places restantes" value={session.places-enrolled.length} color={G.white} icon="calendar"/>
        <KPI label="CA prévisionnel" value={fmtM(enrolled.length*session.prix)} color={G.gold} icon="euro"/>
        <KPI label="CA signé" value={fmtM(ca)} color={G.cyan} icon="credit"/>
      </div>

      {/* Docs requis */}
      <div style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"14px 18px",marginBottom:20}}>
        <p style={{fontSize:9,color:G.gold,letterSpacing:".12em",textTransform:"uppercase",marginBottom:10}}>Pièces requises</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {session.docs.map(d=>(
            <span key={d.id} style={{fontSize:10,color:G.white,background:G.bg3,border:`1px solid ${G.border}`,
              padding:"4px 12px",display:"flex",alignItems:"center",gap:5}}>
              <Icon n="file" size={10} color={G.gold}/>{d.label}
              {d.req&&<span style={{fontSize:8,color:G.red}}>*</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Enrolled table */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:20,color:G.white}}>Inscrits ({enrolled.length})</h2>
        <Btn v="ghost" size="sm"><Icon n="printer" size={11} color={G.gray}/>Émargement PDF</Btn>
      </div>
      {enrolled.length===0?(
        <div style={{textAlign:"center",padding:"40px",background:G.bg2,border:`1px solid ${G.border}`,color:G.gray}}>
          Aucun stagiaire inscrit pour l'instant
        </div>
      ):(
        <div style={{border:`1px solid ${G.border}`,overflowX:"auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr",
            padding:"8px 14px",background:G.bg2,borderBottom:`1px solid ${G.border}`,minWidth:560}}>
            {["Stagiaire","Email","Dossier","Devis","Paiements"].map(h=>(
              <span key={h} style={{fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:G.gray}}>{h}</span>))}
          </div>
          {enrolled.map((l,i)=>{
            const allDocs=session.docs.every(d=>l.docs?.[d.id]);
            const paid=(l.payments||[]).filter(p=>p.status==="encaissé").reduce((s,p)=>s+p.montant,0);
            return (
              <div key={l.id} onClick={()=>push("lead",{id:l.id})}
                style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr",
                  padding:"11px 14px",borderBottom:`1px solid ${G.border}`,cursor:"pointer",
                  transition:"background .15s",alignItems:"center",background:i%2===0?G.bg:G.bg2,minWidth:560}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.04)"}
                onMouseLeave={e=>e.currentTarget.style.background=i%2===0?G.bg:G.bg2}>
                <div><p style={{fontSize:12,color:G.white}}>{l.prenom} {l.nom}</p><p style={{fontSize:10,color:G.gray}}>{l.phone}</p></div>
                <p style={{fontSize:11,color:G.gray,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.email}</p>
                <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,
                  background:allDocs?`${G.green}14`:`${G.red}14`,color:allDocs?G.green:G.red}}>
                  {allDocs?"Complet":"Incomplet"}
                </span>
                <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,
                  background:l.devis?.status==="signed"?`${G.green}14`:`${G.orange}14`,
                  color:l.devis?.status==="signed"?G.green:G.orange}}>
                  {l.devis?.status==="signed"?"Signé":"En attente"}
                </span>
                <span style={{fontSize:11,color:paid>0?G.gold:G.gray}}>{paid>0?fmtM(paid):"—"}</span>
              </div>
            );
          })}
        </div>
      )}
      {showEdit&&<SessionModal session={session} onClose={()=>setShowEdit(false)}
        onSave={async s=>{await saveS(sessions.map(x=>x.id===s.id?s:x));setShowEdit(false);}}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// LEAD PAGE (full detail)
// ══════════════════════════════════════════════════════════════════
function LeadPage({lead,leads,sessions,updLead,saveL,push,pop}) {
  const [tab,setTab]=useState("overview");
  const [saving,setSaving]=useState(false);
  const [note,setNote]=useState("");
  const [showStage,setShowStage]=useState(false);
  const [showDevis,setShowDevis]=useState(false);
  const [showPromo,setShowPromo]=useState(false);
  const [showEmail,setShowEmail]=useState(false);
  const [showPay,setShowPay]=useState(false);
  const [localLead,setLocalLead]=useState(lead);

  const sess=sessions.find(s=>s.id===localLead?.sessId);

  if(!localLead) return <div style={{padding:40,color:G.gray}}>Lead introuvable. <button onClick={pop} style={{color:G.gold,background:"none",border:"none",cursor:"pointer"}}>Retour</button></div>;

  const save=async(patch,msg)=>{
    setSaving(true);
    const hist=[...(localLead.history||[]),{date:new Date().toISOString(),action:msg||"Mise à jour",by:"Admin"}];
    const updated={...localLead,...patch,history:hist};
    setLocalLead(updated);
    await updLead(localLead.id,updated);
    setSaving(false);
    return updated;
  };

  const addNote=async()=>{
    if(!note.trim())return;
    const notes=(localLead.notes?localLead.notes+"\n\n":"")+"["+new Date().toLocaleDateString("fr-FR")+"] "+note;
    await save({notes},"Note ajoutée");
    setNote("");
  };

  const TABS=["Aperçu","Documents","Devis","Paiements","Notes","Historique"];
  const sc=stg[localLead.stage]?.color||G.gray;
  const allDocs=sess?.docs.every(d=>localLead.docs?.[d.id]);

  return (
    <div>
      <PageHdr
        title={`${localLead.prenom} ${localLead.nom}`}
        sub={`${sess?.label||"Formation"} – ${sess?.lieu||""}`}
        crumbs={["Candidatures",`${localLead.prenom} ${localLead.nom}`]}
        onBack={pop}
        actions={[
          <StagePill key="s" id={localLead.stage}/>,
          localLead.source&&<span key="src" style={{fontSize:10,color:G.gray}}>via {localLead.source}</span>,
        ].filter(Boolean)}
      />

      {/* Quick contact row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:8,marginBottom:16}}>
        {[[localLead.email,"mail"],[localLead.phone,"phone"],[fmtD(localLead.createdAt,true),"calendar"],[localLead.source||"—","tag"]].map(([v,icon])=>(
          <div key={icon} style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"9px 12px",display:"flex",alignItems:"center",gap:7}}>
            <Icon n={icon} size={12} color={G.gold}/><span style={{fontSize:11,color:G.white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</span>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:14,padding:"12px 16px",background:G.bg2,border:`1px solid ${G.border}`}}>
        <Btn v="blue" size="sm" onClick={()=>setShowStage(true)}><Icon n="arrowR" size={11} color={G.blue}/>Changer étape</Btn>
        <Btn v="orange" size="sm" onClick={()=>setShowDevis(true)}><Icon n="euro" size={11} color={G.orange}/>{localLead.devis?"Modifier devis":"Créer devis"}</Btn>
        {(localLead.stage==="signed"||localLead.stage==="devis_sent")&&<Btn v="green" size="sm" onClick={()=>setShowPromo(true)}><Icon n="users" size={11} color={G.green}/>Affecter promo</Btn>}
        <Btn v="purple" size="sm" onClick={()=>setShowPay(true)}><Icon n="credit" size={11} color={G.purple}/>Paiement</Btn>
        <Btn v="ghost" size="sm" onClick={()=>setShowEmail(true)}><Icon n="send" size={11} color={G.gray}/>Email</Btn>
        <Btn v="danger" size="sm" disabled={localLead.stage==="rejected"} onClick={()=>save({stage:"rejected"},"Dossier refusé")}>
          <Icon n="x" size={11} color={G.red}/>Refuser
        </Btn>
        {saving&&<Spin size={14} color={G.gold}/>}
      </div>

      {/* Banners */}
      {localLead.promoLabel&&(
        <div style={{marginBottom:10,padding:"8px 14px",background:`${G.green}09`,border:`1px solid ${G.green}22`,display:"flex",alignItems:"center",gap:8}}>
          <Icon n="users" size={13} color={G.green}/><span style={{fontSize:11,color:G.green}}>Inscrit promo : <strong>{localLead.promoLabel}</strong></span>
        </div>
      )}
      {localLead.devis&&(
        <div style={{marginBottom:10,padding:"8px 14px",background:`${G.orange}09`,border:`1px solid ${G.orange}22`,
          display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Icon n="euro" size={13} color={G.orange}/>
            <span style={{fontSize:11,color:G.orange}}>Devis <strong>{localLead.devis.numero}</strong> — {fmtM(localLead.devis.montantNet)}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,
              background:localLead.devis.status==="signed"?`${G.green}18`:`${G.orange}18`,
              color:localLead.devis.status==="signed"?G.green:G.orange}}>
              {localLead.devis.status==="signed"?"✓ Signé":localLead.devis.status==="sent"?"Envoyé":"Brouillon"}
            </span>
            {localLead.devis.status!=="signed"&&(
              <button onClick={()=>save({devis:{...localLead.devis,status:"signed",signedAt:new Date().toISOString()},stage:"confirme"},"Devis signé")}
                style={{background:"none",border:`1px solid ${G.green}`,color:G.green,padding:"2px 9px",
                  fontSize:9,cursor:"pointer",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>
                Signer ✓
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{display:"flex",borderBottom:`1px solid ${G.border}`,marginBottom:16,overflowX:"auto"}}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{background:"none",border:"none",
              borderBottom:`2px solid ${tab===t?G.gold:"transparent"}`,
              color:tab===t?G.gold:G.gray,padding:"9px 14px 7px",fontSize:10,
              letterSpacing:".1em",textTransform:"uppercase",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab==="Aperçu"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[["Email",localLead.email],["Téléphone",localLead.phone],["Formation",sess?.label||"—"],
            ["Ville",sess?.lieu||"—"],["Créé le",fmtD(localLead.createdAt)],["Source",localLead.source||"—"],
            ...(localLead.cpf?[["N° CPF",localLead.cpf]]:[])].map(([k,v])=>(
            <div key={k} style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"10px 12px"}}>
              <p style={{fontSize:9,color:G.gray,letterSpacing:".1em",textTransform:"uppercase",marginBottom:3}}>{k}</p>
              <p style={{fontSize:12,color:G.white}}>{v}</p>
            </div>
          ))}
          {localLead.message&&(
            <div style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"10px 12px",gridColumn:"1/-1"}}>
              <p style={{fontSize:9,color:G.gold,letterSpacing:".1em",textTransform:"uppercase",marginBottom:5}}>Message candidat</p>
              <p style={{fontSize:12,color:G.gray,lineHeight:1.7}}>{localLead.message}</p>
            </div>
          )}
        </div>
      )}

      {tab==="Documents"&&(
        <div>
          {/* Global completion bar */}
          {(()=>{
            const req=sess?.docs.filter(d=>d.req)||[];
            const done=req.filter(d=>localLead.docs?.[d.id]).length;
            const pct=req.length?Math.round(done/req.length*100):100;
            const metas=localLead.docsMeta||{};
            const hasRej=Object.values(metas).some(m=>m.status==="rejected");
            return(
              <div style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"12px 14px",marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{fontSize:11,color:G.white}}>Complétion du dossier</span>
                  <span style={{fontSize:13,fontWeight:600,color:pct===100?G.green:G.orange}}>{pct}%</span>
                </div>
                <div style={{height:4,background:G.bg4,borderRadius:2}}>
                  <div style={{height:"100%",borderRadius:2,background:pct===100?G.green:G.orange,width:`${pct}%`,transition:"width .5s"}}/>
                </div>
                {hasRej&&<p style={{fontSize:10,color:G.red,marginTop:6}}>🔴 Un ou plusieurs documents ont été refusés — relancer le candidat</p>}
                {pct===100&&!hasRej&&<p style={{fontSize:10,color:G.green,marginTop:6}}>✅ Dossier complet</p>}
              </div>
            );
          })()}
          {/* Doc rows */}
          {sess?.docs.map(d=>(
            <DocRow key={d.id} docId={d.id} label={d.label}
              filename={localLead.docs?.[d.id]}
              docMeta={(localLead.docsMeta||{})[d.id]||{}}
              onUpdateMeta={(id,meta)=>{
                const docsMeta={...(localLead.docsMeta||{}),[id]:meta};
                save({docsMeta},`${d.label} : ${meta.status==="ok"?"validé":meta.status==="rejected"?"refusé":"commenté"}`);
              }}/>
          ))}
          {/* Add missing */}
          {sess?.docs.some(d=>!localLead.docs?.[d.id])&&(
            <div style={{marginTop:10,padding:"12px 14px",background:G.bg2,border:`1px dashed ${G.border}`}}>
              <p style={{fontSize:10,color:G.gray,marginBottom:8}}>Ajouter un document manquant :</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {sess?.docs.filter(d=>!localLead.docs?.[d.id]).map(d=>(
                  <button key={d.id} onClick={()=>{
                    const docs={...localLead.docs,[d.id]:`${d.id}_${localLead.nom.toLowerCase()}_manuel.pdf`};
                    save({docs},`Document ajouté : ${d.label}`);
                  }} style={{background:"none",border:`1px solid ${G.border}`,color:G.gray,
                    padding:"5px 11px",fontSize:9,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                    <Icon n="upload" size={10} color={G.gray}/>+ {d.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab==="Devis"&&(
        <div>
          {!localLead.devis?(
            <div style={{textAlign:"center",padding:"36px"}}>
              <Icon n="euro" size={34} color={G.border}/>
              <p style={{color:G.gray,fontSize:12,margin:"10px 0 18px"}}>Aucun devis</p>
              <Btn v="orange" onClick={()=>setShowDevis(true)}><Icon n="plus" size={12} color={G.orange}/>Créer un devis</Btn>
            </div>
          ):(
            <div>
              {/* Devis preview */}
              <div style={{background:"#080808",border:`1px solid ${G.border}`,padding:20,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,paddingBottom:14,borderBottom:`1px solid #1a1a1a`}}>
                  <div>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:G.gold}}>CAZ FORMATION</p>
                    <p style={{fontSize:9,color:G.gray}}>SIRET 100 157 247 00014 · Qualiopi</p>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <p style={{fontSize:11,color:G.white,fontWeight:600}}>DEVIS {localLead.devis.numero}</p>
                    <p style={{fontSize:9,color:G.gray}}>{fmtD(localLead.devis.sentAt)}</p>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                  <div><p style={{fontSize:9,color:G.gray,marginBottom:2}}>DESTINATAIRE</p><p style={{fontSize:11,color:G.white,fontWeight:500}}>{localLead.prenom} {localLead.nom}</p><p style={{fontSize:10,color:G.gray}}>{localLead.email}</p></div>
                  <div><p style={{fontSize:9,color:G.gray,marginBottom:2}}>FORMATION</p><p style={{fontSize:11,color:G.white}}>{sess?.label}</p><p style={{fontSize:10,color:G.gray}}>{sess?.lieu} · {fmtD(sess?.dateDebut,true)}</p></div>
                </div>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,marginBottom:10}}>
                  <thead><tr style={{borderBottom:`1px solid #1a1a1a`}}>{["Désignation","Qté","P.U.","Total"].map(h=><th key={h} style={{color:G.gray,fontSize:9,padding:"5px 0",textAlign:h==="Désignation"?"left":"right",letterSpacing:".08em"}}>{h}</th>)}</tr></thead>
                  <tbody>
                    <tr><td style={{padding:"7px 0",color:G.white}}>{sess?.label} – {sess?.lieu}</td><td style={{textAlign:"right",color:G.gray}}>1</td><td style={{textAlign:"right",color:G.gray}}>{fmtM(localLead.devis.montant)}</td><td style={{textAlign:"right",color:G.white}}>{fmtM(localLead.devis.montant)}</td></tr>
                    {localLead.devis.remise>0&&<tr><td style={{color:G.green,fontSize:10}} colSpan={3}>Remise</td><td style={{textAlign:"right",color:G.green}}>- {fmtM(localLead.devis.remise)}</td></tr>}
                  </tbody>
                </table>
                <div style={{borderTop:`1px solid #1a1a1a`,paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                  <div><p style={{fontSize:10,color:G.gray}}>Financement : <span style={{color:G.white}}>{localLead.devis.financement}</span></p></div>
                  <div style={{textAlign:"right"}}><p style={{fontSize:9,color:G.gray}}>MONTANT NET</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:G.gold,fontWeight:300}}>{fmtM(localLead.devis.montantNet)}</p></div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <Btn v="orange" size="sm" onClick={()=>setShowDevis(true)}><Icon n="edit" size={11} color={G.orange}/>Modifier</Btn>
                {localLead.devis.status==="draft"&&<Btn v="blue" size="sm" onClick={()=>save({devis:{...localLead.devis,status:"sent",sentAt:new Date().toISOString()}},"Devis envoyé")}><Icon n="send" size={11} color={G.blue}/>Envoyer</Btn>}
                {localLead.devis.status!=="signed"&&<Btn v="green" size="sm" onClick={()=>save({devis:{...localLead.devis,status:"signed",signedAt:new Date().toISOString()},stage:"confirme"},"Devis signé")}><Icon n="pen" size={11} color={G.green}/>Signer</Btn>}
                <Btn v="ghost" size="sm"><Icon n="printer" size={11} color={G.gray}/>Imprimer</Btn>
              </div>
            </div>
          )}
        </div>
      )}

      {tab==="Paiements"&&(
        <div>
          {(localLead.payments||[]).length===0?(
            <div style={{textAlign:"center",padding:"32px"}}>
              <p style={{color:G.gray,fontSize:12,marginBottom:16}}>Aucun paiement</p>
              <Btn v="purple" onClick={()=>setShowPay(true)}><Icon n="plus" size={12} color={G.purple}/>Ajouter</Btn>
            </div>
          ):(
            <div>
              {(localLead.payments||[]).map(p=>(
                <div key={p.id} style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"12px 14px",
                  marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><p style={{fontSize:12,color:G.white,fontWeight:500,textTransform:"capitalize"}}>{p.type}</p><p style={{fontSize:10,color:G.gray}}>{fmtD(p.date,true)}</p></div>
                  <div style={{textAlign:"right"}}>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:G.gold}}>{fmtM(p.montant)}</p>
                    <span style={{fontSize:9,padding:"1px 8px",borderRadius:20,
                      background:p.status==="encaissé"?`${G.green}15`:`${G.orange}15`,
                      color:p.status==="encaissé"?G.green:G.orange}}>{p.status}</span>
                  </div>
                </div>
              ))}
              <div style={{padding:"10px 14px",background:G.bg2,border:`1px solid ${G.border}`,
                display:"flex",justifyContent:"space-between",marginBottom:12}}>
                <span style={{fontSize:11,color:G.gray}}>Total encaissé</span>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:G.gold}}>
                  {fmtM((localLead.payments||[]).filter(p=>p.status==="encaissé").reduce((s,p)=>s+p.montant,0))}
                </span>
              </div>
              <Btn v="purple" size="sm" onClick={()=>setShowPay(true)}><Icon n="plus" size={11} color={G.purple}/>Ajouter</Btn>
            </div>
          )}
        </div>
      )}

      {tab==="Notes"&&(
        <div>
          {localLead.notes&&(
            <div style={{background:G.bg2,border:`1px solid ${G.border}`,padding:14,marginBottom:12,
              fontSize:12,color:G.gray,lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:200,overflowY:"auto"}}>
              {localLead.notes}
            </div>
          )}
          <TA value={note} onChange={e=>setNote(e.target.value)} rows={3} placeholder="Ajouter une note…"/>
          <Btn v="gold" size="sm" onClick={addNote} disabled={!note.trim()||saving} style={{marginTop:8}}>
            {saving?<Spin size={11}/>:<><Icon n="plus" size={11} color={G.bg}/>Ajouter</>}
          </Btn>
        </div>
      )}

      {tab==="Historique"&&(
        <div>
          {[...(localLead.history||[])].reverse().map((h,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:`1px solid ${G.border}`}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:G.gold,marginTop:5,flexShrink:0}}/>
              <div><p style={{fontSize:12,color:G.white,marginBottom:1}}>{h.action}</p><p style={{fontSize:10,color:G.gray}}>{fmtD(h.date)} · {h.by}</p></div>
            </div>
          ))}
          {(!localLead.history||localLead.history.length===0)&&<p style={{color:G.gray,textAlign:"center",padding:"32px"}}>Aucun historique</p>}
        </div>
      )}

      {/* Modals */}
      {showStage&&<StageModal lead={localLead} onClose={()=>setShowStage(false)}
        onSave={async id=>{await save({stage:id},`Étape → ${stg[id]?.label}`);setShowStage(false);}}/>}
      {showDevis&&<DevisEditorModal lead={localLead} session={sess} onClose={()=>setShowDevis(false)}
        onSave={async d=>{await save({devis:d,stage:localLead.stage==="docs_ok"?"devis_sent":localLead.stage},`Devis ${d.numero} ${localLead.devis?"modifié":"créé"}`);setShowDevis(false);}}/>}
      {showPromo&&<PromoModal lead={localLead} sessions={sessions} onClose={()=>setShowPromo(false)}
        onSave={async(pid,pl)=>{await save({promoSessId:pid,promoLabel:pl,stage:"inscrit",promoAssignedAt:new Date().toISOString()},`Inscrit promo : ${pl}`);setShowPromo(false);}}/>}
      {showEmail&&<EmailModal onClose={()=>setShowEmail(false)} onSend={async t=>{await save({},`Email envoyé : ${t}`);setShowEmail(false);}}/>}
      {showPay&&<PaymentModal lead={localLead} onClose={()=>setShowPay(false)}
        onSave={async p=>{const payments=[...(localLead.payments||[]),{id:uid(),...p}];await save({payments},`Paiement ${fmtM(p.montant)} – ${p.type}`);setShowPay(false);}}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// DEVIS TAB
// ══════════════════════════════════════════════════════════════════
function DevisTab({leads,sessions,updLead,saveL,push}) {
  const [stF,setStF]=useState("all");
  const [showCreate,setShowCreate]=useState(false);  // lead picker for new devis
  const [pickLead,setPickLead]=useState("");

  const allDevis=leads.filter(l=>l.devis).map(l=>({...l.devis,lead:l,sess:sessions.find(s=>s.id===l.sessId)}));
  const shown=stF==="all"?allDevis:allDevis.filter(d=>d.status===stF);
  const caSigne=allDevis.filter(d=>d.status==="signed").reduce((s,d)=>s+d.montantNet,0);
  const caCours=allDevis.filter(d=>d.status==="sent").reduce((s,d)=>s+d.montantNet,0);

  // Leads without a devis yet
  const leadsNoDevis = leads.filter(l=>!l.devis&&l.stage!=="rejected");

  const [showEditor,setShowEditor]=useState(false);
  const selectedLead = leads.find(l=>l.id===pickLead);

  return (
    <div>
      <TabHdr title="Devis" sub={`${allDevis.length} devis émis`}
        actions={[
          <Btn key="n" v="gold" size="sm" onClick={()=>setShowCreate(true)}>
            <Icon n="plus" size={11} color={G.bg}/>Créer un devis
          </Btn>
        ]}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
        <KPI label="CA signé" value={fmtM(caSigne)} color={G.gold} icon="euro"/>
        <KPI label="En attente" value={fmtM(caCours)} color={G.orange} icon="send"/>
        <KPI label="Brouillons" value={allDevis.filter(d=>d.status==="draft").length} color={G.gray} icon="file"/>
        <KPI label="Taux signature" value={allDevis.length?Math.round(allDevis.filter(d=>d.status==="signed").length/allDevis.length*100)+"%":"—"} color={G.green} icon="percent"/>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        {["all","draft","sent","signed"].map(s=>(
          <button key={s} onClick={()=>setStF(s)} style={{...pillStyle(stF===s,G.gold)}}>
            {{all:"Tous",draft:"Brouillons",sent:"Envoyés",signed:"Signés"}[s]}
          </button>
        ))}
      </div>
      <div style={{border:`1px solid ${G.border}`,overflowX:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.8fr 1fr 1fr 1fr 1fr 80px",
          padding:"8px 14px",background:G.bg2,borderBottom:`1px solid ${G.border}`,minWidth:640}}>
          {["Numéro","Candidat","Formation","Montant","Statut","Date",""].map(h=>(
            <span key={h} style={{fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:G.gray}}>{h}</span>))}
        </div>
        {shown.map((d,i)=>(
          <div key={d.id}
            style={{display:"grid",gridTemplateColumns:"1fr 1.8fr 1fr 1fr 1fr 1fr 80px",
              padding:"11px 14px",borderBottom:`1px solid ${G.border}`,
              alignItems:"center",background:i%2===0?G.bg:G.bg2,minWidth:640}}>
            <span style={{fontSize:11,color:G.gold,fontWeight:600,cursor:"pointer"}} onClick={()=>push("lead",{id:d.lead.id})}>{d.numero}</span>
            <span style={{fontSize:12,color:G.white,cursor:"pointer"}} onClick={()=>push("lead",{id:d.lead.id})}>{d.lead.prenom} {d.lead.nom}</span>
            <span style={{fontSize:10,color:G.gray}}>{d.sess?.lieu}</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:G.goldL}}>{fmtM(d.montantNet)}</span>
            <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,
              background:d.status==="signed"?`${G.green}15`:d.status==="sent"?`${G.orange}15`:`${G.gray}15`,
              color:d.status==="signed"?G.green:d.status==="sent"?G.orange:G.gray}}>
              {d.status==="signed"?"✓ Signé":d.status==="sent"?"Envoyé":"Brouillon"}
            </span>
            <span style={{fontSize:10,color:G.gray}}>{fmtD(d.sentAt||d.lead.createdAt,true)}</span>
            <div style={{display:"flex",gap:5}}>
              {d.status!=="signed"&&(
                <button onClick={async()=>{
                  const updated=leads.map(l=>l.id===d.lead.id?{...l,devis:{...l.devis,status:"signed",signedAt:new Date().toISOString()},stage:"confirme",history:[...(l.history||[]),{date:new Date().toISOString(),action:`Devis ${l.devis.numero} signé`,by:"Admin"}]}:l);
                  await saveL(updated);
                }} style={{background:"none",border:`1px solid ${G.green}`,color:G.green,
                  padding:"3px 7px",fontSize:9,cursor:"pointer",letterSpacing:".08em",textTransform:"uppercase"}}>
                  ✓ Signer
                </button>
              )}
              {d.status==="draft"&&(
                <button onClick={async()=>{
                  const updated=leads.map(l=>l.id===d.lead.id?{...l,devis:{...l.devis,status:"sent",sentAt:new Date().toISOString()}}:l);
                  await saveL(updated);
                }} style={{background:"none",border:`1px solid ${G.blue}`,color:G.blue,
                  padding:"3px 7px",fontSize:9,cursor:"pointer",letterSpacing:".08em",textTransform:"uppercase"}}>
                  ✉ Envoyer
                </button>
              )}
            </div>
          </div>
        ))}
        {shown.length===0&&<p style={{textAlign:"center",padding:"40px",color:G.gray}}>Aucun devis</p>}
      </div>

      {/* Step 1: Pick lead */}
      {showCreate&&!showEditor&&(
        <Modal onClose={()=>setShowCreate(false)} width={480}>
          <MH title="Créer un devis" sub="Choisissez le candidat" onClose={()=>setShowCreate(false)}/>
          <div style={{marginBottom:14}}>
            <Sel value={pickLead} onChange={e=>setPickLead(e.target.value)}>
              <option value="">— Sélectionner un candidat —</option>
              {leadsNoDevis.map(l=>{
                const sess=sessions.find(s=>s.id===l.sessId);
                return <option key={l.id} value={l.id}>{l.prenom} {l.nom} — {sess?.label} {sess?.lieu}</option>;
              })}
              <option disabled>──────────</option>
              {leads.filter(l=>l.devis&&l.stage!=="rejected").map(l=>{
                const sess=sessions.find(s=>s.id===l.sessId);
                return <option key={l.id+"ex"} value={l.id}>{l.prenom} {l.nom} (modifier) — {sess?.lieu}</option>;
              })}
            </Sel>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn v="ghost" onClick={()=>setShowCreate(false)} style={{flex:1}}>Annuler</Btn>
            <Btn v="gold" disabled={!pickLead} style={{flex:2}} onClick={()=>setShowEditor(true)}>
              <Icon n="euro" size={12} color={G.bg}/>Continuer →
            </Btn>
          </div>
        </Modal>
      )}

      {/* Step 2: Devis editor */}
      {showCreate&&showEditor&&selectedLead&&(
        <DevisEditorModal
          lead={selectedLead}
          session={sessions.find(s=>s.id===selectedLead.sessId)}
          onClose={()=>{setShowCreate(false);setShowEditor(false);setPickLead("");}}
          onSave={async devis=>{
            const hist=[...(selectedLead.history||[]),{date:new Date().toISOString(),action:`Devis ${devis.numero} créé`,by:"Admin"}];
            const updated=leads.map(l=>l.id===selectedLead.id?{...l,devis,stage:l.stage==="en_cours"?l.stage:"en_cours",history:hist}:l);
            await saveL(updated);
            setShowCreate(false);setShowEditor(false);setPickLead("");
          }}/>
      )}
    </div>
  );
}

function PaiementsTab({leads,sessions,saveL}) {
  const [showCreate,setShowCreate]=useState(false);
  const [pickLead,setPickLead]=useState("");

  const allP=leads.flatMap(l=>(l.payments||[]).map(p=>({...p,lead:l,sess:sessions.find(s=>s.id===l.sessId)})));
  const enc=allP.filter(p=>p.status==="encaissé").reduce((s,p)=>s+p.montant,0);
  const prev=allP.filter(p=>p.status==="prévu").reduce((s,p)=>s+p.montant,0);
  const imp=leads.filter(l=>l.devis?.status==="signed"&&((l.payments||[]).filter(p=>p.status==="encaissé").reduce((s,p)=>s+p.montant,0)<l.devis.montantNet));

  const selectedLead = leads.find(l=>l.id===pickLead);

  return (
    <div>
      <TabHdr title="Paiements"
        actions={[
          <Btn key="n" v="gold" size="sm" onClick={()=>setShowCreate(true)}>
            <Icon n="plus" size={11} color={G.bg}/>Enregistrer un paiement
          </Btn>
        ]}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:22}}>
        <KPI label="Encaissé" value={fmtM(enc)} color={G.green} icon="credit"/>
        <KPI label="À recevoir" value={fmtM(prev)} color={G.orange} icon="bell"/>
        <KPI label="Transactions" value={allP.length} color={G.white} icon="layers"/>
        <KPI label="Impayés" value={imp.length} color={G.red} icon="x"/>
      </div>
      {imp.length>0&&(
        <div style={{marginBottom:18,padding:"12px 16px",background:`${G.red}07`,border:`1px solid ${G.red}20`}}>
          <p style={{fontSize:11,color:G.red,fontWeight:600,marginBottom:8}}>⚠ Soldes à encaisser ({imp.length})</p>
          {imp.map(l=>{
            const paid=(l.payments||[]).filter(p=>p.status==="encaissé").reduce((s,p)=>s+p.montant,0);
            return (
              <div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${G.red}12`}}>
                <span style={{fontSize:12,color:G.white}}>{l.prenom} {l.nom}</span>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:12,color:G.red,fontWeight:600}}>{fmtM(l.devis.montantNet-paid)} restant</span>
                  <button onClick={()=>{setPickLead(l.id);setShowCreate(true);}}
                    style={{background:"none",border:`1px solid ${G.orange}`,color:G.orange,
                      padding:"3px 9px",fontSize:9,cursor:"pointer",letterSpacing:".1em",textTransform:"uppercase"}}>
                    + Paiement
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{border:`1px solid ${G.border}`,overflowX:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr",padding:"8px 14px",background:G.bg2,borderBottom:`1px solid ${G.border}`,minWidth:500}}>
          {["Date","Candidat","Type","Montant","Statut"].map(h=><span key={h} style={{fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:G.gray}}>{h}</span>)}
        </div>
        {[...allP].sort((a,b)=>b.date>a.date?1:-1).map((p,i)=>(
          <div key={p.id} style={{display:"grid",gridTemplateColumns:"1fr 2fr 1fr 1fr 1fr",
            padding:"10px 14px",borderBottom:`1px solid ${G.border}`,alignItems:"center",background:i%2===0?G.bg:G.bg2,minWidth:500}}>
            <span style={{fontSize:11,color:G.gray}}>{fmtD(p.date,true)}</span>
            <span style={{fontSize:12,color:G.white}}>{p.lead.prenom} {p.lead.nom}</span>
            <span style={{fontSize:11,color:G.gray,textTransform:"capitalize"}}>{p.type}</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:G.goldL}}>{fmtM(p.montant)}</span>
            <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,
              background:p.status==="encaissé"?`${G.green}15`:p.status==="annulé"?`${G.red}15`:`${G.orange}15`,
              color:p.status==="encaissé"?G.green:p.status==="annulé"?G.red:G.orange}}>{p.status}</span>
          </div>
        ))}
        {allP.length===0&&<p style={{textAlign:"center",padding:"40px",color:G.gray}}>Aucun paiement</p>}
      </div>

      {/* Pick lead then payment form */}
      {showCreate&&!selectedLead&&(
        <Modal onClose={()=>{setShowCreate(false);setPickLead("");}} width={440}>
          <MH title="Enregistrer un paiement" sub="Choisissez le candidat" onClose={()=>{setShowCreate(false);setPickLead("");}}/>
          <Sel value={pickLead} onChange={e=>setPickLead(e.target.value)} style={{marginBottom:16}}>
            <option value="">— Sélectionner un candidat —</option>
            {leads.filter(l=>l.stage!=="rejected").map(l=>{
              const sess=sessions.find(s=>s.id===l.sessId);
              return <option key={l.id} value={l.id}>{l.prenom} {l.nom} — {sess?.lieu} {l.devis?`(${fmtM(l.devis.montantNet)})`:""}</option>;
            })}
          </Sel>
          <div style={{display:"flex",gap:10}}>
            <Btn v="ghost" onClick={()=>{setShowCreate(false);setPickLead("");}} style={{flex:1}}>Annuler</Btn>
            <Btn v="gold" disabled={!pickLead} style={{flex:2}} onClick={()=>{}}>Continuer →</Btn>
          </div>
        </Modal>
      )}
      {showCreate&&selectedLead&&(
        <PaymentModal lead={selectedLead}
          onClose={()=>{setShowCreate(false);setPickLead("");}}
          onSave={async p=>{
            const payments=[...(selectedLead.payments||[]),{id:uid(),...p}];
            const hist=[...(selectedLead.history||[]),{date:new Date().toISOString(),action:`Paiement ${fmtM(p.montant)} – ${p.type}`,by:"Admin"}];
            const updated=leads.map(l=>l.id===selectedLead.id?{...l,payments,history:hist}:l);
            await saveL(updated);
            setShowCreate(false);setPickLead("");
          }}/>
      )}
    </div>
  );
}

function RelancesTab({leads,sessions,saveL}) {
  const [sent,setSent]=useState(new Set());
  const [sending,setSending]=useState(null);
  const [showCustom,setShowCustom]=useState(null); // lead for custom email
  const [customTmpl,setCustomTmpl]=useState("accuse");
  const [customMsg,setCustomMsg]=useState("");

  const now=Date.now();
  const d48=new Date(now-48*3600*1000).toISOString();
  const d5=new Date(now-5*24*3600*1000).toISOString();
  const noContact=leads.filter(l=>(normStage(l.stage)==="prospect")&&l.createdAt<d48);
  const incomplet=leads.filter(l=>{const sess=sessions.find(s=>s.id===l.sessId);return sess?.docs.some(d=>d.req&&!l.docs?.[d.id])&&normStage(l.stage)!=="rejected";});
  const stale=leads.filter(l=>l.devis?.status==="sent"&&(l.devis.sentAt||"")<d5);
  const rejectedDoc=leads.filter(l=>{const m=l.docsMeta||{};return Object.values(m).some(x=>x.status==="rejected");});

  const doSend=async(l,t,msg)=>{
    const k=l.id+t;
    setSending(k);
    await new Promise(r=>setTimeout(r,700));
    // Log in history
    const hist=[...(l.history||[]),{date:new Date().toISOString(),action:`Email envoyé : ${t}`,by:"Admin"}];
    const updated=leads.map(x=>x.id===l.id?{...x,history:hist}:x);
    await saveL(updated);
    setSent(p=>new Set([...p,k]));
    setSending(null);
  };

  const TEMPLATES=[
    {id:"accuse",label:"Accusé de réception",color:G.blue},
    {id:"incomplet",label:"Dossier incomplet",color:G.purple},
    {id:"doc_refuse",label:"Document refusé",color:G.red},
    {id:"relance_devis",label:"Relance devis",color:G.orange},
    {id:"confirmation",label:"Confirmation inscription",color:G.green},
    {id:"convocation",label:"Convocation",color:G.gold},
  ];

  const Group=({title,color,items,template,btn,extra})=>(
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:19,color:G.white}}>{title}</h2>
        <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,background:`${color}15`,color}}>{items.length}</span>
      </div>
      {items.length===0
        ?<p style={{color:G.gray,fontSize:11,padding:"8px 0"}}>Aucun dossier concerné.</p>
        :<div style={{display:"flex",flexDirection:"column",gap:6}}>
          {items.map(l=>{
            const k=l.id+template;const done=sent.has(k);const isSending=sending===k;
            const sess=sessions.find(s=>s.id===l.sessId);
            return(
              <div key={l.id} style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"11px 16px",
                display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:180}}>
                  <p style={{fontSize:12,color:G.white,fontWeight:500}}>{l.prenom} {l.nom}</p>
                  <p style={{fontSize:10,color:G.gray}}>{sess?.label} – {sess?.lieu}</p>
                  <p style={{fontSize:10,color:G.gold}}>{l.email}</p>
                  {extra&&extra(l)}
                </div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <button onClick={()=>doSend(l,template)} disabled={done||isSending}
                    style={{background:"none",border:`1px solid ${done?G.green:color}`,color:done?G.green:color,
                      padding:"6px 12px",fontSize:9,letterSpacing:".1em",textTransform:"uppercase",
                      fontFamily:"'Montserrat',sans-serif",cursor:done?"default":"pointer",
                      display:"flex",alignItems:"center",gap:5,opacity:isSending?.6:1}}>
                    {isSending?<Spin size={11} color={color}/>:done?<><Icon n="check" size={11} color={G.green}/>Envoyé</>:<><Icon n="send" size={11} color={color}/>{btn}</>}
                  </button>
                  <button onClick={()=>{setShowCustom(l);setCustomTmpl(template);}}
                    style={{background:"none",border:`1px solid ${G.border}`,color:G.gray,
                      padding:"6px 10px",fontSize:9,cursor:"pointer"}} title="Email personnalisé">
                    ✏️
                  </button>
                </div>
              </div>
            );
          })}
        </div>}
    </div>
  );

  return (
    <div>
      <TabHdr title="Relances"
        actions={[
          <Btn key="c" v="outline" size="sm" onClick={()=>setShowCustom("pick")}>
            <Icon n="mail" size={11} color={G.gold}/>Email personnalisé
          </Btn>
        ]}/>

      <Group title="Sans contact depuis 48h" color={G.blue} items={noContact} template="accuse" btn="Envoyer accusé"/>
      <Group title="Dossier incomplet" color={G.purple} items={incomplet} template="incomplet" btn="Demander docs"/>
      <Group title="Document refusé" color={G.red} items={rejectedDoc} template="doc_refuse" btn="Informer candidat"
        extra={l=>{
          const m=l.docsMeta||{};
          const rej=Object.entries(m).filter(([,v])=>v.status==="rejected").map(([k])=>k);
          return rej.length>0?<p style={{fontSize:9,color:G.red,marginTop:2}}>Refusés : {rej.join(", ")}</p>:null;
        }}/>
      <Group title="Devis sans réponse (5j+)" color={G.orange} items={stale} template="relance_devis" btn="Relancer"/>

      {/* Custom email modal — pick lead */}
      {showCustom==="pick"&&(
        <Modal onClose={()=>setShowCustom(null)} width={480}>
          <MH title="Email personnalisé" sub="Choisir le destinataire" onClose={()=>setShowCustom(null)}/>
          <Sel style={{marginBottom:14}} onChange={e=>{const l=leads.find(x=>x.id===e.target.value);if(l)setShowCustom(l);}}>
            <option value="">— Sélectionner un candidat —</option>
            {leads.filter(l=>l.stage!=="rejected").map(l=>{
              const sess=sessions.find(s=>s.id===l.sessId);
              return <option key={l.id} value={l.id}>{l.prenom} {l.nom} — {sess?.lieu}</option>;
            })}
          </Sel>
        </Modal>
      )}

      {/* Custom email composer */}
      {showCustom&&showCustom!=="pick"&&(
        <Modal onClose={()=>setShowCustom(null)} width={520}>
          <MH title={`Email à ${showCustom.prenom} ${showCustom.nom}`} onClose={()=>setShowCustom(null)}/>
          <div style={{background:G.bg3,border:`1px solid ${G.border}`,padding:"10px 14px",marginBottom:14,display:"flex",gap:16}}>
            <div><p style={{fontSize:9,color:G.gray}}>Destinataire</p><p style={{fontSize:12,color:G.white}}>{showCustom.prenom} {showCustom.nom}</p></div>
            <div><p style={{fontSize:9,color:G.gray}}>Email</p><p style={{fontSize:12,color:G.gold}}>{showCustom.email}</p></div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:G.gray,marginBottom:7}}>Template</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {TEMPLATES.map(t=>(
                <button key={t.id} onClick={()=>setCustomTmpl(t.id)}
                  style={{background:customTmpl===t.id?`${t.color}15`:"transparent",
                    border:`1px solid ${customTmpl===t.id?t.color:G.border}`,
                    color:customTmpl===t.id?t.color:G.gray,
                    padding:"5px 12px",fontSize:9,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer"}}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:G.gray,marginBottom:7}}>
              Message personnalisé (optionnel)
            </label>
            <TA value={customMsg} onChange={e=>setCustomMsg(e.target.value)} rows={3}
              placeholder="Ajoutez un message personnalisé au template standard…"/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn v="ghost" onClick={()=>setShowCustom(null)} style={{flex:1}}>Annuler</Btn>
            <Btn v="gold" style={{flex:2}} onClick={async()=>{
              await doSend(showCustom,customTmpl,customMsg);
              setShowCustom(null);setCustomMsg("");
            }}>
              <Icon n="send" size={12} color={G.bg}/>Envoyer l'email
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function PartenairesTab({partners,leads,saveP,push}) {
  const [showNew,setShowNew]=useState(false);
  return (
    <div>
      <TabHdr title="Partenaires" sub={`${partners.length} partenaire${partners.length>1?"s":""}`}
        actions={[<Btn key="n" v="gold" size="sm" onClick={()=>setShowNew(true)}><Icon n="plus" size={11} color={G.bg}/>Nouveau partenaire</Btn>]}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14,marginBottom:28}}>
        {partners.map(p=>{
          const pl=leads.filter(l=>l.source===p.name);
          const ca=pl.filter(l=>l.devis?.status==="signed").reduce((s,l)=>s+(l.devis?.montantNet||0),0);
          return (
            <div key={p.id} onClick={()=>push("partner",{id:p.id})}
              style={{background:G.bg2,border:`1px solid ${G.border}`,padding:20,cursor:"pointer",transition:"border-color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=G.goldD}
              onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                <div>
                  <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:G.white,marginBottom:2}}>{p.name}</h3>
                  <span style={{fontSize:9,color:G.gold,letterSpacing:".08em"}}>{p.type}</span>
                </div>
                <Icon n="arrowR" size={14} color={G.gold}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {[["Contact",p.contact],["Email",p.email],["Leads",pl.length],["CA généré",fmtM(ca)]].map(([k,v])=>(
                  <div key={k} style={{background:G.bg3,padding:"7px 10px"}}>
                    <p style={{fontSize:9,color:G.gray,marginBottom:2}}>{k}</p>
                    <p style={{fontSize:11,color:k==="CA généré"?G.gold:k==="Leads"?G.goldL:G.white}}>{v}</p>
                  </div>
                ))}
              </div>
              {p.notes&&<p style={{fontSize:10,color:G.gray,marginTop:10,borderTop:`1px solid ${G.border}`,paddingTop:8}}>{p.notes}</p>}
            </div>
          );
        })}
      </div>
      {/* Source analysis */}
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:22,color:G.white,marginBottom:12}}>Analyse par source d'acquisition</h2>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {Object.entries(leads.reduce((acc,l)=>{const s=l.source||"Autre";if(!acc[s])acc[s]={c:0,ca:0};acc[s].c++;if(l.devis?.status==="signed")acc[s].ca+=l.devis.montantNet;return acc;},{})).sort((a,b)=>b[1].ca-a[1].ca).map(([src,d])=>(
          <div key={src} style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"11px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}><Icon n="tag" size={12} color={G.gold}/><span style={{fontSize:12,color:G.white}}>{src}</span></div>
            <div style={{display:"flex",gap:20}}><span style={{fontSize:11,color:G.gray}}>{d.c} lead{d.c>1?"s":""}</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:G.gold}}>{fmtM(d.ca)}</span></div>
          </div>
        ))}
      </div>
      {showNew&&<PartnerModal partner={null} onClose={()=>setShowNew(false)}
        onSave={async p=>{await saveP([...partners,{...p,id:uid()}]);setShowNew(false);}}/>}
    </div>
  );
}

function PartnerPage({partner,partners,leads,saveP,pop}) {
  const [showEdit,setShowEdit]=useState(false);
  if(!partner) return <div style={{padding:40,color:G.gray}}>Introuvable. <button onClick={pop} style={{color:G.gold,background:"none",border:"none",cursor:"pointer"}}>Retour</button></div>;
  const pl=leads.filter(l=>l.source===partner.name);
  const ca=pl.filter(l=>l.devis?.status==="signed").reduce((s,l)=>s+(l.devis?.montantNet||0),0);
  return (
    <div>
      <PageHdr title={partner.name} sub={partner.type} crumbs={["Partenaires",partner.name]} onBack={pop}
        actions={[<Btn key="e" v="ghost" size="sm" onClick={()=>setShowEdit(true)}><Icon n="edit" size={11} color={G.gold}/>Modifier</Btn>]}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
        <KPI label="Leads apportés" value={pl.length} color={G.white} icon="users"/>
        <KPI label="CA généré" value={fmtM(ca)} color={G.gold} icon="euro"/>
        <KPI label="Contact" value={partner.contact} color={G.white} icon="phone"/>
        <KPI label="Email" value={partner.email} color={G.blue} icon="mail"/>
      </div>
      {partner.clubs&&<div style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"12px 16px",marginBottom:14}}><p style={{fontSize:9,color:G.gray,marginBottom:4}}>CLUBS / VILLES</p><p style={{fontSize:12,color:G.white}}>{partner.clubs}</p></div>}
      {partner.notes&&<div style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"12px 16px",marginBottom:18}}><p style={{fontSize:9,color:G.gray,marginBottom:4}}>NOTES</p><p style={{fontSize:12,color:G.gray,lineHeight:1.7}}>{partner.notes}</p></div>}
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:20,color:G.white,marginBottom:12}}>Leads ({pl.length})</h2>
      {pl.length===0?<p style={{color:G.gray,fontSize:12}}>Aucun lead de ce partenaire.</p>:(
        <div style={{border:`1px solid ${G.border}`}}>
          {pl.map((l,i)=>(
            <div key={l.id} style={{display:"flex",justifyContent:"space-between",padding:"11px 14px",
              borderBottom:`1px solid ${G.border}`,background:i%2===0?G.bg:G.bg2}}>
              <div><p style={{fontSize:12,color:G.white}}>{l.prenom} {l.nom}</p><p style={{fontSize:10,color:G.gray}}>{l.email}</p></div>
              <StagePill id={l.stage} small/>
            </div>
          ))}
        </div>
      )}
      {showEdit&&<PartnerModal partner={partner} onClose={()=>setShowEdit(false)}
        onSave={async p=>{await saveP(partners.map(x=>x.id===p.id?p:x));setShowEdit(false);}}/>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// STATS TAB
// ══════════════════════════════════════════════════════════════════
function StatsTab({leads,sessions}) {
  const caSigne=leads.filter(l=>l.devis?.status==="signed").reduce((s,l)=>s+(l.devis?.montantNet||0),0);
  const caEnc=leads.flatMap(l=>l.payments||[]).filter(p=>p.status==="encaissé").reduce((s,p)=>s+p.montant,0);
  const caCours=leads.filter(l=>l.devis?.status==="sent").reduce((s,l)=>s+(l.devis?.montantNet||0),0);
  const enr=leads.filter(l=>l.stage==="enrolled"||l.stage==="signed").length;
  return (
    <div>
      <TabHdr title="Statistiques"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:26}}>
        <KPI label="CA signé" value={fmtM(caSigne)} color={G.gold} icon="euro"/>
        <KPI label="CA encaissé" value={fmtM(caEnc)} color={G.green} icon="credit"/>
        <KPI label="CA en cours" value={fmtM(caCours)} color={G.orange} icon="send"/>
        <KPI label="Leads total" value={leads.length} color={G.white} icon="users"/>
        <KPI label="Taux conversion" value={leads.length?Math.round(enr/leads.length*100)+"%":"—"} color={G.blue} icon="percent"/>
        <KPI label="Sessions ouvertes" value={sessions.filter(s=>s.status==="available").length} color={G.cyan} icon="calendar"/>
      </div>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:22,color:G.white,marginBottom:12}}>Funnel pipeline</h2>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:24}}>
        {STAGES.map(s=>{const c=leads.filter(l=>l.stage===s.id).length;const p=leads.length?Math.round(c/leads.length*100):0;return(
          <div key={s.id} style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"11px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
              <span style={{fontSize:12,color:G.white}}>{s.label}</span>
              <div style={{display:"flex",gap:10}}><span style={{fontSize:10,color:G.gray}}>{p}%</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:s.color}}>{c}</span></div>
            </div>
            <div style={{height:2,background:G.bg4,borderRadius:2}}><div style={{height:"100%",borderRadius:2,background:s.color,width:`${p}%`,opacity:.8}}/></div>
          </div>
        );})}
      </div>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:22,color:G.white,marginBottom:12}}>Par session</h2>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {sessions.map(s=>{
          const sl=leads.filter(l=>l.sessId===s.id); const ins=leads.filter(l=>l.promoSessId===s.id).length;
          const ca=leads.filter(l=>l.promoSessId===s.id&&l.devis?.status==="signed").reduce((sum,l)=>sum+(l.devis?.montantNet||0),0);
          return (
            <div key={s.id} style={{background:G.bg2,border:`1px solid ${G.border}`,padding:"14px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:7}}>
                <div><span style={{fontSize:13,color:G.white,fontWeight:500}}>{s.label}</span><span style={{fontSize:12,color:G.gold,marginLeft:10}}>{s.lieu}</span></div>
                <div style={{display:"flex",gap:14}}><span style={{fontSize:11,color:G.gray}}>{sl.length} dossiers</span><span style={{fontSize:11,color:G.green}}>{ins}/{s.places} inscrits</span>{ca>0&&<span style={{fontSize:11,color:G.gold,fontWeight:600}}>{fmtM(ca)}</span>}</div>
              </div>
              <div style={{height:3,background:G.bg4,borderRadius:2}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${G.goldD},${G.gold})`,width:`${s.places?Math.min(Math.round(ins/s.places*100),100):0}%`}}/></div>
              <p style={{fontSize:9,color:G.gray,marginTop:4}}>{s.places?Math.min(Math.round(ins/s.places*100),100):0}% de remplissage</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MODALS
// ══════════════════════════════════════════════════════════════════

function StageModal({lead,onSave,onClose}) {
  const curStage = normStage(lead.stage);
  return <Modal onClose={onClose} width={400}>
    <MH title="Changer l'étape" onClose={onClose}/>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:6}}>
      {STAGES.map(s=>{
        const isCur = curStage===s.id;
        return (
          <button key={s.id} onClick={()=>onSave(s.id)}
            style={{background:isCur?`${s.color}14`:G.bg3,border:`1px solid ${isCur?s.color:G.border}`,
              padding:"12px 14px",cursor:"pointer",textAlign:"left",transition:"all .15s"}}
            onMouseEnter={e=>{if(!isCur)e.currentTarget.style.borderColor=s.color+"50"}}
            onMouseLeave={e=>{if(!isCur)e.currentTarget.style.borderColor=G.border}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>{s.icon}</span>
                <div>
                  {s.num>0&&<p style={{fontSize:9,color:G.gray2,letterSpacing:".08em",marginBottom:1}}>ÉTAPE {s.num}</p>}
                  <p style={{fontSize:12,fontWeight:600,color:isCur?s.color:G.white}}>{s.label}</p>
                  <p style={{fontSize:10,color:G.gray,marginTop:1}}>{s.desc}</p>
                </div>
              </div>
              {isCur&&<span style={{fontSize:9,padding:"2px 8px",borderRadius:20,background:`${s.color}20`,color:s.color}}>actuel</span>}
            </div>
          </button>
        );
      })}
    </div>
  </Modal>;
}

function DevisEditorModal({lead,session,onSave,onClose}) {
  const ex=lead.devis;
  const [f,setF]=useState({
    numero:ex?.numero||`CAZ-${new Date().getFullYear()}-${String(Math.floor(Math.random()*900)+100).padStart(4,"0")}`,
    montant:ex?.montant?.toString()||session?.prix?.toString()||"",
    remise:ex?.remise?.toString()||"0",
    financement:ex?.financement||"CPF",
    notes:ex?.notes||"",
  });
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const m=parseInt(f.montant||0); const r=parseInt(f.remise||0); const net=m-r;
  const FINS=["CPF","CPF + complément","Autofinancement","OPCO","Prise en charge employeur","Autre"];
  return <Modal onClose={onClose} width={580}>
    <MH title={ex?"Modifier le devis":"Éditeur de devis"} sub={session?.label+" – "+session?.lieu} onClose={onClose}/>
    {/* Live preview */}
    <div style={{background:"#070707",border:`1px solid ${G.border}`,padding:16,marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,paddingBottom:12,borderBottom:`1px solid #1a1a1a`}}>
        <div><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:G.gold}}>CAZ FORMATION</p><p style={{fontSize:9,color:G.gray}}>SIRET 100 157 247 00014 · Qualiopi</p></div>
        <div style={{textAlign:"right"}}><p style={{fontSize:10,color:G.white,fontWeight:600}}>DEVIS {f.numero}</p><p style={{fontSize:9,color:G.gray}}>{new Date().toLocaleDateString("fr-FR")}</p></div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,marginBottom:8}}>
        <thead><tr style={{borderBottom:`1px solid #1a1a1a`}}>{["Désignation","P.U.","Total"].map(h=><th key={h} style={{color:G.gray,fontSize:9,padding:"4px 0",textAlign:h==="Désignation"?"left":"right"}}>{h}</th>)}</tr></thead>
        <tbody>
          <tr><td style={{padding:"6px 0",color:G.white}}>{session?.label} – {session?.lieu}</td><td style={{textAlign:"right",color:G.gray}}>{fmtM(m)}</td><td style={{textAlign:"right",color:G.white}}>{fmtM(m)}</td></tr>
          {r>0&&<tr><td style={{color:G.green,fontSize:10}} colSpan={2}>Remise</td><td style={{textAlign:"right",color:G.green}}>- {fmtM(r)}</td></tr>}
        </tbody>
      </table>
      <div style={{borderTop:`1px solid #1a1a1a`,paddingTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <p style={{fontSize:10,color:G.gray}}>Financement : <span style={{color:G.white}}>{f.financement}</span></p>
        <div style={{textAlign:"right"}}><p style={{fontSize:8,color:G.gray}}>MONTANT NET</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:G.gold,fontWeight:300}}>{fmtM(net)}</p></div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
      <Fld label="Numéro"><Inp value={f.numero} onChange={e=>set("numero",e.target.value)}/></Fld>
      <Fld label="Financement"><Sel value={f.financement} onChange={e=>set("financement",e.target.value)}>{FINS.map(x=><option key={x} value={x}>{x}</option>)}</Sel></Fld>
      <Fld label="Montant (€)"><Inp type="number" value={f.montant} onChange={e=>set("montant",e.target.value)}/></Fld>
      <Fld label="Remise (€)"><Inp type="number" value={f.remise} onChange={e=>set("remise",e.target.value)}/></Fld>
    </div>
    <div style={{background:G.bg3,border:`1px solid ${G.border}`,padding:"10px 14px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:9,color:G.gray,letterSpacing:".12em",textTransform:"uppercase"}}>Montant net</span>
      <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:G.gold}}>{fmtM(net)}</span>
    </div>
    <Fld label="Observations"><TA rows={2} value={f.notes} onChange={e=>set("notes",e.target.value)}/></Fld>
    <div style={{display:"flex",gap:10,marginTop:8}}>
      <Btn v="ghost" onClick={onClose} style={{flex:1}}>Annuler</Btn>
      <Btn v="orange" style={{flex:2}} onClick={()=>onSave({...(ex||{}),id:ex?.id||uid(),numero:f.numero,montant:m,remise:r,montantNet:net,financement:f.financement,notes:f.notes,status:ex?.status||"draft",sentAt:ex?.sentAt||null,signedAt:ex?.signedAt||null})}>
        <Icon n="euro" size={12} color={G.orange}/>{ex?"Mettre à jour":"Créer le devis"}
      </Btn>
    </div>
  </Modal>;
}

function PromoModal({lead,sessions,onSave,onClose}) {
  const [sel,setSel]=useState(lead.promoSessId||"");
  const sess=sessions.find(s=>s.id===lead.sessId);
  const compat=sessions.filter(s=>s.type===sess?.type&&s.status!=="archived");
  return <Modal onClose={onClose} width={420}>
    <MH title="Affecter à une promo" onClose={onClose}/>
    <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:18}}>
      {compat.map(s=>(
        <button key={s.id} onClick={()=>setSel(s.id)}
          style={{background:sel===s.id?G.goldGlow:G.bg3,border:`1px solid ${sel===s.id?G.gold:G.border}`,
            padding:"11px 14px",cursor:"pointer",textAlign:"left"}}>
          <p style={{fontSize:12,color:sel===s.id?G.gold:G.white,fontWeight:500,marginBottom:2}}>{s.label}</p>
          <p style={{fontSize:10,color:G.gray}}>{s.lieu} · {fmtD(s.dateDebut,true)} · {s.places} places</p>
        </button>
      ))}
    </div>
    <div style={{display:"flex",gap:10}}>
      <Btn v="ghost" onClick={onClose} style={{flex:1}}>Annuler</Btn>
      <Btn v="green" disabled={!sel} style={{flex:2}} onClick={()=>{const s=sessions.find(x=>x.id===sel);onSave(sel,`${s.label} – ${s.lieu}`);}}>
        <Icon n="users" size={12} color={G.bg}/>Inscrire
      </Btn>
    </div>
  </Modal>;
}

function EmailModal({onSend,onClose}) {
  const [sel,setSel]=useState("accuse");
  const TMPL=[{id:"accuse",label:"Accusé de réception",desc:"Confirme la réception du dossier"},{id:"incomplet",label:"Dossier incomplet",desc:"Demande les pièces manquantes"},{id:"devis",label:"Envoi du devis",desc:"Transmet le devis PDF"},{id:"relance",label:"Relance devis",desc:"Relance après 5 jours sans réponse"},{id:"confirmation",label:"Confirmation inscription",desc:"Félicite l'inscription définitive"},{id:"convocation",label:"Convocation",desc:"Infos pratiques de la formation"}];
  return <Modal onClose={onClose} width={400}>
    <MH title="Envoyer un email" onClose={onClose}/>
    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:18}}>
      {TMPL.map(t=><button key={t.id} onClick={()=>setSel(t.id)} style={{background:sel===t.id?G.goldGlow:G.bg3,border:`1px solid ${sel===t.id?G.gold:G.border}`,padding:"9px 13px",cursor:"pointer",textAlign:"left"}}>
        <p style={{fontSize:12,color:sel===t.id?G.gold:G.white,marginBottom:1}}>{t.label}</p>
        <p style={{fontSize:10,color:G.gray}}>{t.desc}</p>
      </button>)}
    </div>
    <div style={{display:"flex",gap:10}}>
      <Btn v="ghost" onClick={onClose} style={{flex:1}}>Annuler</Btn>
      <Btn v="gold" style={{flex:2}} onClick={()=>onSend(sel)}><Icon n="send" size={12} color={G.bg}/>Envoyer</Btn>
    </div>
  </Modal>;
}

function PaymentModal({lead,onSave,onClose}) {
  const [f,setF]=useState({montant:"",type:"acompte",date:new Date().toISOString().split("T")[0],status:"prévu",notes:""});
  const net=lead.devis?.montantNet||0; const paid=(lead.payments||[]).reduce((s,p)=>s+p.montant,0);
  return <Modal onClose={onClose} width={400}>
    <MH title="Ajouter un paiement" onClose={onClose}/>
    {net>0&&<div style={{background:G.bg3,border:`1px solid ${G.border}`,padding:"10px 14px",marginBottom:14,display:"flex",gap:20}}>
      <div><p style={{fontSize:9,color:G.gray}}>Devis</p><p style={{fontSize:12,color:G.white}}>{fmtM(net)}</p></div>
      <div><p style={{fontSize:9,color:G.gray}}>Encaissé</p><p style={{fontSize:12,color:G.green}}>{fmtM(paid)}</p></div>
      <div><p style={{fontSize:9,color:G.gray}}>Reste</p><p style={{fontSize:12,color:G.orange}}>{fmtM(net-paid)}</p></div>
    </div>}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
      <Fld label="Montant (€)"><Inp type="number" value={f.montant} onChange={e=>setF(p=>({...p,montant:parseInt(e.target.value)||0}))}/></Fld>
      <Fld label="Type"><Sel value={f.type} onChange={e=>setF(p=>({...p,type:e.target.value}))}>{["acompte","solde","avoir","autre"].map(t=><option key={t} value={t}>{t}</option>)}</Sel></Fld>
      <Fld label="Date"><Inp type="date" value={f.date} onChange={e=>setF(p=>({...p,date:e.target.value}))}/></Fld>
      <Fld label="Statut"><Sel value={f.status} onChange={e=>setF(p=>({...p,status:e.target.value}))}>{["prévu","encaissé","annulé"].map(t=><option key={t} value={t}>{t}</option>)}</Sel></Fld>
    </div>
    <div style={{display:"flex",gap:10,marginTop:8}}>
      <Btn v="ghost" onClick={onClose} style={{flex:1}}>Annuler</Btn>
      <Btn v="purple" style={{flex:2}} disabled={!f.montant} onClick={()=>onSave(f)}><Icon n="credit" size={12} color={G.bg}/>Enregistrer</Btn>
    </div>
  </Modal>;
}

function NewLeadModal({sessions,onSave,onClose}) {
  const [f,setF]=useState({prenom:"",nom:"",email:"",phone:"",cpf:"",sessId:"",message:"",source:"Site web"});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const [err,setErr]=useState({});
  const validate=()=>{const e={};if(!f.prenom)e.prenom="Requis";if(!f.nom)e.nom="Requis";if(!f.email.includes("@"))e.email="Email invalide";if(!f.phone)e.phone="Requis";if(!f.sessId)e.sessId="Requis";setErr(e);return !Object.keys(e).length;};
  const submit=()=>{if(!validate())return;onSave({id:uid(),...f,stage:"prospect",notes:"",createdAt:new Date().toISOString(),docs:{},devis:null,payments:[],history:[{date:new Date().toISOString(),action:"Lead créé manuellement",by:"Admin"}],promoSessId:null,promoLabel:null});};
  return <Modal onClose={onClose} width={500}>
    <MH title="Nouveau lead" sub="Création manuelle d'une candidature" onClose={onClose}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
      <Fld label="Prénom *">{err.prenom&&<span style={{fontSize:9,color:G.red}}>{err.prenom}</span>}<Inp value={f.prenom} onChange={e=>set("prenom",e.target.value)}/></Fld>
      <Fld label="Nom *">{err.nom&&<span style={{fontSize:9,color:G.red}}>{err.nom}</span>}<Inp value={f.nom} onChange={e=>set("nom",e.target.value)}/></Fld>
      <Fld label="Email *">{err.email&&<span style={{fontSize:9,color:G.red}}>{err.email}</span>}<Inp type="email" value={f.email} onChange={e=>set("email",e.target.value)}/></Fld>
      <Fld label="Téléphone *">{err.phone&&<span style={{fontSize:9,color:G.red}}>{err.phone}</span>}<Inp type="tel" value={f.phone} onChange={e=>set("phone",e.target.value)}/></Fld>
    </div>
    <Fld label="Session *">{err.sessId&&<span style={{fontSize:9,color:G.red}}>{err.sessId}</span>}
      <Sel value={f.sessId} onChange={e=>set("sessId",e.target.value)}><option value="">Choisir une session…</option>{sessions.map(s=><option key={s.id} value={s.id}>{s.label} – {s.lieu}</option>)}</Sel></Fld>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
      <Fld label="N° CPF"><Inp value={f.cpf} onChange={e=>set("cpf",e.target.value)} placeholder="Optionnel"/></Fld>
      <Fld label="Source"><Sel value={f.source} onChange={e=>set("source",e.target.value)}>{["Site web","Meta Ads","Basic Fit","Trans-Faire","Recommandation","Téléphone","Autre"].map(s=><option key={s} value={s}>{s}</option>)}</Sel></Fld>
    </div>
    <Fld label="Message"><TA rows={2} value={f.message} onChange={e=>set("message",e.target.value)}/></Fld>
    <div style={{display:"flex",gap:10,marginTop:8}}>
      <Btn v="ghost" onClick={onClose} style={{flex:1}}>Annuler</Btn>
      <Btn v="gold" style={{flex:2}} onClick={submit}><Icon n="plus" size={12} color={G.bg}/>Créer le lead</Btn>
    </div>
  </Modal>;
}

function SessionModal({session,onSave,onClose}) {
  const isNew=!session;
  const DOC_P={cqp:[{id:"cv",label:"CV",req:true},{id:"cni",label:"CNI",req:true},{id:"psc",label:"PSC1",req:true},{id:"cm",label:"Cert. médical",req:true}],pilates:[{id:"cm",label:"Cert. médical",req:true},{id:"cv",label:"CV",req:true},{id:"diplome",label:"Diplôme coach",req:true},{id:"carte_pro",label:"Carte pro",req:true}]};
  const [f,setF]=useState({type:session?.type||"cqp",label:session?.label||"CQP Instructeur Fitness",lieu:session?.lieu||"",dateDebut:session?.dateDebut||"",dateFin:session?.dateFin||"",places:session?.places?.toString()||"16",prix:session?.prix?.toString()||"4000",status:session?.status||"available",description:session?.description||"",docs:session?.docs||[...DOC_P.cqp]});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  return <Modal onClose={onClose} width={480}>
    <MH title={isNew?"Nouvelle session":"Modifier la session"} onClose={onClose}/>
    <div style={{display:"flex",gap:9,marginBottom:14}}>
      {["cqp","pilates"].map(t=><button key={t} onClick={()=>setF(p=>({...p,type:t,label:t==="cqp"?"CQP Instructeur Fitness":"Pilates Matwork 1 & 2",docs:[...DOC_P[t]],prix:t==="cqp"?"4000":"890"}))} style={{flex:1,background:f.type===t?G.goldGlow:"transparent",border:`1px solid ${f.type===t?G.gold:G.border}`,color:f.type===t?G.gold:G.gray,padding:"8px",fontSize:9,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer"}}>{t==="cqp"?"CQP IF":"Pilates"}</button>)}
    </div>
    <Fld label="Intitulé *"><Inp value={f.label} onChange={e=>set("label",e.target.value)}/></Fld>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
      <Fld label="Ville *"><Inp value={f.lieu} onChange={e=>set("lieu",e.target.value)} placeholder="ex: Bordeaux"/></Fld>
      <Fld label="Tarif (€)"><Inp type="number" value={f.prix} onChange={e=>set("prix",e.target.value)}/></Fld>
      <Fld label="Date début"><Inp type="date" value={f.dateDebut} onChange={e=>set("dateDebut",e.target.value)}/></Fld>
      <Fld label="Date fin"><Inp type="date" value={f.dateFin} onChange={e=>set("dateFin",e.target.value)}/></Fld>
      <Fld label="Places"><Inp type="number" value={f.places} onChange={e=>set("places",e.target.value)}/></Fld>
      <Fld label="Statut"><Sel value={f.status} onChange={e=>set("status",e.target.value)}><option value="available">Ouvert</option><option value="indisponible">Inactif</option><option value="complet">Complet</option><option value="archived">Archivée</option></Sel></Fld>
    </div>
    <Fld label="Description"><TA rows={2} value={f.description} onChange={e=>set("description",e.target.value)}/></Fld>
    <div style={{background:G.bg3,border:`1px solid ${G.border}`,padding:12,marginBottom:14}}>
      <p style={{fontSize:9,color:G.gold,letterSpacing:".1em",textTransform:"uppercase",marginBottom:7}}>Pièces requises ({f.docs.length})</p>
      {f.docs.map(d=><div key={d.id} style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}><Icon n="check" size={10} color={G.gold}/><span style={{fontSize:11,color:G.gray}}>{d.label}{d.req&&<span style={{color:G.red}}> *</span>}</span></div>)}
      <p style={{fontSize:9,color:G.gray2,marginTop:5}}>Adapté auto selon le type.</p>
    </div>
    <div style={{display:"flex",gap:10}}>
      <Btn v="ghost" onClick={onClose} style={{flex:1}}>Annuler</Btn>
      <Btn v="gold" style={{flex:2}} onClick={()=>onSave({...(session||{}),id:session?.id||uid(),...f,places:parseInt(f.places),prix:parseInt(f.prix)})}>{isNew?"Créer":"Enregistrer"}</Btn>
    </div>
  </Modal>;
}

function PartnerModal({partner,onSave,onClose}) {
  const [f,setF]=useState({name:partner?.name||"",type:partner?.type||"Partenaire",contact:partner?.contact||"",email:partner?.email||"",clubs:partner?.clubs||"",notes:partner?.notes||""});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  return <Modal onClose={onClose} width={440}>
    <MH title={partner?"Modifier le partenaire":"Nouveau partenaire"} onClose={onClose}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
      <Fld label="Nom *"><Inp value={f.name} onChange={e=>set("name",e.target.value)}/></Fld>
      <Fld label="Type"><Inp value={f.type} onChange={e=>set("type",e.target.value)} placeholder="ex: Partenaire HT"/></Fld>
      <Fld label="Contact"><Inp value={f.contact} onChange={e=>set("contact",e.target.value)}/></Fld>
      <Fld label="Email"><Inp type="email" value={f.email} onChange={e=>set("email",e.target.value)}/></Fld>
    </div>
    <Fld label="Clubs / Villes"><Inp value={f.clubs} onChange={e=>set("clubs",e.target.value)}/></Fld>
    <Fld label="Notes"><TA rows={3} value={f.notes} onChange={e=>set("notes",e.target.value)}/></Fld>
    <div style={{display:"flex",gap:10,marginTop:8}}>
      <Btn v="ghost" onClick={onClose} style={{flex:1}}>Annuler</Btn>
      <Btn v="gold" style={{flex:2}} onClick={()=>onSave({...(partner||{}),id:partner?.id||uid(),...f})}>{partner?"Enregistrer":"Créer"}</Btn>
    </div>
  </Modal>;
}
