import { useState, useEffect } from "react";

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

const C = {
  white:"#FEFCF7", cream:"#F7F2E4", cream2:"#EDE6CC",
  gold:"#C9A84C", goldL:"#E8C97A", goldD:"#8A6C28", goldXD:"#5C4615",
  goldGlow:"rgba(201,168,76,0.13)",
  black:"#0D0D0D", dark:"#181818", dark2:"#2A2410",
  gray:"#7A7060", grayL:"#B0A898",
};

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:#FEFCF7;color:#181818;font-family:'Montserrat',sans-serif}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#F7F2E4}::-webkit-scrollbar-thumb{background:#8A6C28}
    .AN{font-family:'Anton',sans-serif;letter-spacing:.03em}
    .SE{font-family:'Cormorant Garamond',serif}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    .fu{animation:fadeUp .6s ease both}
    .d1{animation-delay:.08s}.d2{animation-delay:.16s}.d3{animation-delay:.24s}.d4{animation-delay:.32s}
    input,textarea,select,button{font-family:'Montserrat',sans-serif}
    input::placeholder,textarea::placeholder{color:#B0A898}
    select option{background:#F7F2E4}
  `}</style>
);

const IC={
  check:"M20 6L9 17l-5-5",x:"M18 6L6 18 M6 6l12 12",
  arrowR:"M5 12h14 M12 5l7 7-7 7",arrowD:"M12 5v14 M5 12l7 7 7-7",
  chevD:"M6 9l6 6 6-6",
  map:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a2 2 0 100-4 2 2 0 000 4z",
  cal:"M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18",
  users:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  award:"M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  euro:"M12 2a10 10 0 100 20A10 10 0 0012 2z M14.5 8H10a3 3 0 000 6h4 M8 12h8",
  phone:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock:"M12 2a10 10 0 100 20A10 10 0 0012 2z M12 6v6l4 2",
  book:"M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  cpf:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  zap:"M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  send:"M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  sun:"M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 5a7 7 0 100 14A7 7 0 0012 5z",
  target:"M12 2a10 10 0 100 20A10 10 0 0012 2z M12 6a6 6 0 100 12A6 6 0 0012 6z M12 10a2 2 0 100 4A2 2 0 0012 10z",
  download:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  instagram:"M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z",
  linkedin:"M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  quote:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
};
const Ic = ({n,size=16,color="currentColor",style:s={}}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={s}>
    {(IC[n]||"").split(" M").map((d,i)=><path key={i} d={i===0?d:"M"+d}/>)}
  </svg>
);

const GL = ({style={}}) => <div style={{width:52,height:2.5,background:`linear-gradient(90deg,${C.goldD},${C.gold},${C.goldL},transparent)`,...style}}/>;
const Tag = ({ch,dk,style={}}) => <span style={{fontSize:9,letterSpacing:".28em",textTransform:"uppercase",fontWeight:700,color:dk?C.goldL:C.goldD,...style}}>{ch}</span>;
const Bdg = ({ch,style={}}) => <span style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:"3px 11px",background:C.goldGlow,color:C.goldD,border:`1px solid ${C.gold}50`,...style}}>{ch}</span>;

const Btn = ({ch,onClick,v="gold",disabled,full,style={},...p}) => {
  const vs={
    gold:{background:`linear-gradient(135deg,${C.goldD},${C.gold})`,color:C.white,border:"none"},
    dark:{background:C.dark,color:C.gold,border:"none"},
    outline:{background:"transparent",border:`1.5px solid ${C.gold}`,color:C.gold},
    outlineL:{background:"transparent",border:`1.5px solid rgba(248,242,228,.4)`,color:"rgba(248,242,228,.85)"},
    outlineD:{background:"transparent",border:`1.5px solid ${C.dark}`,color:C.dark},
    white:{background:C.white,color:C.dark,border:"none"},
  };
  return <button onClick={onClick} disabled={disabled} {...p}
    style={{padding:"11px 26px",fontSize:10,letterSpacing:".2em",textTransform:"uppercase",fontWeight:700,
      cursor:disabled?"not-allowed":"pointer",opacity:disabled?.6:1,transition:"all .22s",
      display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,
      width:full?"100%":"auto",...(vs[v]||vs.outline),...style}}
    onMouseEnter={e=>{if(!disabled){e.currentTarget.style.filter="brightness(1.1)";e.currentTarget.style.transform="translateY(-2px)"}}}
    onMouseLeave={e=>{e.currentTarget.style.filter="none";e.currentTarget.style.transform="translateY(0)"}}>
    {ch}
  </button>;
};

function Nav({page,setPage}) {
  const [sc,setSc]=useState(false);
  useEffect(()=>{const h=()=>setSc(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  const isH=page==="home";
  const bg=sc||!isH?"rgba(254,252,247,.97)":"transparent";
  const lc=sc||!isH?C.dark:C.white;
  const lg=sc||!isH?C.gold:C.goldL;
  const tc=sc||!isH?C.dark:"rgba(254,252,247,.88)";
  const links=[{id:"home",l:"Accueil"},{id:"cqp",l:"Formations diplômantes"},{id:"pilates",l:"Formations continues"},{id:"about",l:"L'organisme"},{id:"contact",l:"Contact"}];
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:bg,backdropFilter:"blur(14px)",borderBottom:sc||!isH?`1px solid ${C.cream2}`:"none",transition:"all .3s",padding:"0 5%"}}>
      <div style={{maxWidth:1180,margin:"0 auto",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"baseline",gap:5}}>
          <span className="AN" style={{fontSize:21,color:lc}}>CAZ</span>
          <span className="AN" style={{fontSize:21,color:lg}}>FORMATION</span>
        </button>
        <div style={{display:"flex",gap:0,alignItems:"center"}}>
          {links.map(({id,l})=>(
            <button key={id} onClick={()=>setPage(id)}
              style={{background:"none",border:"none",borderBottom:`2px solid ${page===id?C.gold:"transparent"}`,
                color:page===id?C.gold:tc,padding:"20px 11px 18px",fontSize:9.5,letterSpacing:".12em",
                textTransform:"uppercase",fontWeight:600,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap"}}
              onMouseEnter={e=>e.currentTarget.style.color=C.gold}
              onMouseLeave={e=>e.currentTarget.style.color=page===id?C.gold:tc}>{l}
            </button>
          ))}
          <Btn v="gold" onClick={()=>setPage("contact")} ch="Candidater" style={{marginLeft:10,padding:"8px 16px",fontSize:9}}/>
        </div>
      </div>
    </nav>
  );
}

function Footer({setPage}) {
  return (
    <footer style={{background:C.dark,padding:"52px 5% 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:28,marginBottom:36}}>
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:5,marginBottom:10}}>
              <span className="AN" style={{fontSize:19,color:C.white}}>CAZ</span>
              <span className="AN" style={{fontSize:19,color:C.gold}}>FORMATION</span>
            </div>
            <p style={{fontSize:12,color:"rgba(248,242,228,.35)",lineHeight:1.8,maxWidth:230,marginBottom:14}}>L'École Française du Coaching Sportif — Certifications professionnelles, format 100% weekend.</p>
          </div>
          {[{t:"Formations",ls:[{l:"CQP Instructeur Fitness",p:"cqp"},{l:"Pilates Matwork 1 & 2",p:"pilates"}]},
            {t:"Villes CQP",ls:[{l:"Niort (79)",p:"cqp"},{l:"Orléans (45)",p:"cqp"},{l:"Limoges (87)",p:"cqp"}]},
            {t:"Organisme",ls:[{l:"À propos",p:"about"},{l:"Contact",p:"contact"},{l:"Candidater",p:"contact"}]}].map(col=>(
            <div key={col.t}>
              <p className="AN" style={{fontSize:10,color:C.gold,marginBottom:10,letterSpacing:".1em"}}>{col.t}</p>
              {col.ls.map(({l,p})=>(
                <button key={l} onClick={()=>setPage(p)} style={{display:"block",background:"none",border:"none",color:"rgba(248,242,228,.32)",fontSize:11.5,cursor:"pointer",textAlign:"left",padding:"3px 0",fontFamily:"'Montserrat',sans-serif",transition:"color .18s",width:"100%"}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.gold}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(248,242,228,.32)"}>{l}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid rgba(201,168,76,.1)`,paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <p style={{fontSize:9,color:"rgba(248,242,228,.2)",letterSpacing:".06em"}}>© 2025 Caz Formation · SIRET 100 157 247 00014 · NDA 75170365217 · Certifié Qualiopi</p>
          <div style={{display:"flex",gap:14}}>{["Mentions légales","CGV","Confidentialité"].map(t=><span key={t} style={{fontSize:9,color:"rgba(248,242,228,.15)",cursor:"pointer"}}>{t}</span>)}</div>
        </div>
      </div>
    </footer>
  );
}


// ══ HOME ══════════════════════════════════════════════════════════
function HomePage({setPage}) {
  const sess=[
    {v:"NIORT",r:"Deux-Sèvres",d:"Oct. 2025",dispo:4,total:16,c:"#4c8ecf"},
    {v:"ORLÉANS",r:"Loiret",d:"Nov. 2025",dispo:9,total:16,c:C.gold},
    {v:"LIMOGES",r:"Haute-Vienne",d:"Oct. 2025",dispo:7,total:16,c:"#9b6fc7"},
  ];
  return (
    <div>
      {/* HERO */}
      <section style={{minHeight:"100vh",position:"relative",overflow:"hidden",
        background:`linear-gradient(155deg,${C.dark} 0%,#1A1200 55%,#2A1E00 100%)`,
        display:"flex",alignItems:"center",padding:"100px 5% 80px"}}>
        <div style={{position:"absolute",inset:0,opacity:.032,backgroundImage:`radial-gradient(${C.gold} 1px,transparent 1px)`,backgroundSize:"44px 44px"}}/>
        <div style={{position:"absolute",top:"15%",right:"8%",width:380,height:380,borderRadius:"50%",background:`radial-gradient(circle,rgba(201,168,76,.1) 0%,transparent 68%)`,pointerEvents:"none"}}/>
        <div style={{maxWidth:1150,margin:"0 auto",width:"100%",position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 310px",gap:44,alignItems:"center"}}>
            <div>
              <div className="fu" style={{display:"flex",alignItems:"center",gap:10,marginBottom:22}}>
                <div style={{width:26,height:2,background:`linear-gradient(90deg,${C.gold},${C.goldL})`}}/>
                <Tag ch="L'École Française du Coaching Sportif" dk style={{color:C.goldL,letterSpacing:".26em"}}/>
              </div>
              <h1 className="fu d1 AN" style={{fontSize:"clamp(58px,10vw,112px)",lineHeight:.88,color:C.white}}>CAZ</h1>
              <h1 className="fu d2 AN" style={{fontSize:"clamp(58px,10vw,112px)",lineHeight:.88,marginBottom:28,
                background:`linear-gradient(135deg,${C.goldD} 0%,${C.gold} 35%,${C.goldL} 65%,${C.gold} 100%)`,
                backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 5s linear infinite"}}>FORMATION</h1>
              <GL className="fu d2" style={{marginBottom:22}}/>
              <p className="fu d3 SE" style={{fontSize:"clamp(15px,2.2vw,22px)",color:"rgba(248,242,228,.7)",lineHeight:1.65,maxWidth:500,marginBottom:28,fontStyle:"italic",fontWeight:300}}>
                Certifications professionnelles d'excellence pour les coaches et instructeurs fitness
              </p>
              {/* 100% WEEKEND PILL */}
              <div className="fu d3" style={{display:"inline-flex",alignItems:"center",gap:12,padding:"12px 20px",
                background:"rgba(201,168,76,.09)",border:`1.5px solid ${C.gold}45`,marginBottom:32}}>
                <Ic n="sun" size={22} color={C.gold}/>
                <div>
                  <p className="AN" style={{fontSize:16,color:C.gold,letterSpacing:".06em"}}>FORMAT 100% WEEK-END</p>
                  <p style={{fontSize:10,color:"rgba(248,242,228,.45)",letterSpacing:".1em",textTransform:"uppercase"}}>Samedi & Dimanche · Continuez à travailler</p>
                </div>
              </div>
              <div className="fu d4" style={{display:"flex",gap:11,flexWrap:"wrap"}}>
                <Btn v="gold" ch={<>CQP Instructeur Fitness <Ic n="arrowR" size={13} color={C.white}/></>} onClick={()=>setPage("cqp")}/>
                <Btn v="outlineL" ch="Pilates Matwork" onClick={()=>setPage("pilates")}/>
              </div>
            </div>
            {/* Sessions sidebar */}
            <div className="fu d3">
              <div style={{background:"rgba(255,255,255,.04)",border:`1px solid rgba(201,168,76,.18)`,padding:"24px 20px"}}>
                <p className="AN" style={{fontSize:11,color:C.gold,letterSpacing:".15em",marginBottom:4}}>CQP IF — SESSIONS</p>
                <p style={{fontSize:9,color:"rgba(248,242,228,.3)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:20}}>2025-2026 · 100% weekend</p>
                {sess.map(s=>(
                  <div key={s.v} style={{marginBottom:15}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                      <div>
                        <p className="AN" style={{fontSize:15,color:C.white,letterSpacing:".04em"}}>{s.v}</p>
                        <p style={{fontSize:9,color:"rgba(248,242,228,.3)",letterSpacing:".06em"}}>{s.r} · {s.d}</p>
                      </div>
                      <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",background:`${s.c}20`,color:s.c,border:`1px solid ${s.c}38`,letterSpacing:".06em",textTransform:"uppercase"}}>{s.dispo} places</span>
                    </div>
                    <div style={{height:3,background:"rgba(255,255,255,.07)",borderRadius:2}}>
                      <div style={{height:"100%",borderRadius:2,background:s.c,width:`${Math.round((s.total-s.dispo)/s.total*100)}%`}}/>
                    </div>
                  </div>
                ))}
                <Btn v="gold" full ch={<>Voir les sessions <Ic n="arrowR" size={12} color={C.white}/></>} onClick={()=>setPage("cqp")} style={{marginTop:6,padding:"10px"}}/>
              </div>
            </div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:5,animation:"float 2.5s ease-in-out infinite"}}>
          <span style={{fontSize:8,color:"rgba(201,168,76,.4)",letterSpacing:".2em",textTransform:"uppercase"}}>Découvrir</span>
          <Ic n="arrowD" size={14} color="rgba(201,168,76,.4)"/>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:C.gold,padding:"20px 5%"}}>
        <div style={{maxWidth:880,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,textAlign:"center"}}>
          {[["200+","Diplômés"],["3","Villes CQP"],["100%","Week-end"],["15 ans","Expérience"],["Qualiopi","Certifié"]].map(([n,l])=>(
            <div key={n}><p className="AN" style={{fontSize:24,color:C.dark,lineHeight:1}}>{n}</p><p style={{fontSize:9,fontWeight:700,letterSpacing:".13em",textTransform:"uppercase",color:C.goldXD,marginTop:3}}>{l}</p></div>
          ))}
        </div>
      </section>

      {/* 100% WEEKEND SECTION */}
      <section style={{padding:"88px 5%",background:C.white}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
          <div>
            <Tag ch="Le concept Caz Formation"/>
            <h2 className="fu AN" style={{fontSize:"clamp(30px,5vw,54px)",color:C.dark,margin:"12px 0 4px",lineHeight:.9}}>100% WEEK-END</h2>
            <h2 className="fu d1 AN" style={{fontSize:"clamp(30px,5vw,54px)",color:C.gold,margin:"0 0 20px",lineHeight:.9}}>ZÉRO CONTRAINTE</h2>
            <GL className="fu d1" style={{marginBottom:22}}/>
            <p className="fu d2 SE" style={{fontSize:17,color:C.gray,lineHeight:1.75,marginBottom:22,fontStyle:"italic"}}>
              Toutes nos formations se déroulent le samedi et dimanche pour que vous puissiez continuer à exercer votre activité professionnelle en semaine.
            </p>
            <div className="fu d3" style={{display:"flex",flexDirection:"column",gap:10}}>
              {["Conservez votre emploi actuel pendant toute la formation",
                "Progression sur 6 à 8 mois, weekend après weekend",
                "Planning annuel complet dès votre inscription",
                "Accompagnement individuel tout au long du parcours",
                "Certification RNCP reconnue par tous les employeurs"].map(t=>(
                <div key={t} style={{display:"flex",alignItems:"flex-start",gap:11}}>
                  <div style={{width:19,height:19,borderRadius:"50%",background:C.goldGlow,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                    <Ic n="check" size={10} color={C.gold}/>
                  </div>
                  <span style={{fontSize:13,color:C.dark,lineHeight:1.6}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="fu d1">
            <div style={{background:C.cream,border:`1px solid ${C.cream2}`,padding:"26px 22px"}}>
              <p className="AN" style={{fontSize:11,color:C.gold,letterSpacing:".14em",marginBottom:16}}>SEMAINE TYPE</p>
              {["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"].map((j,i)=>(
                <div key={j} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <span style={{width:82,fontSize:11,color:i>=5?C.dark:C.grayL,fontWeight:i>=5?700:400}}>{j}</span>
                  <div style={{flex:1,height:24,background:i>=5?`linear-gradient(90deg,${C.goldD},${C.gold})`:`${C.cream2}70`,display:"flex",alignItems:"center",paddingLeft:9}}>
                    {i>=5
                      ?<span className="AN" style={{fontSize:9,color:C.white,letterSpacing:".1em"}}>FORMATION CQP IF</span>
                      :<span style={{fontSize:10,color:C.grayL}}>Votre activité habituelle</span>}
                  </div>
                </div>
              ))}
              <div style={{marginTop:14,padding:"10px 12px",background:C.goldGlow,border:`1px solid ${C.gold}38`,display:"flex",alignItems:"center",gap:8}}>
                <Ic n="sun" size={14} color={C.goldD}/>
                <p style={{fontSize:11,color:C.goldD,fontWeight:700}}>Weekend = Formation · Semaine = Liberté</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 VILLES */}
      <section style={{padding:"88px 5%",background:C.cream}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="fu" style={{textAlign:"center",marginBottom:48}}>
            <Tag ch="Sessions CQP IF ouvertes"/>
            <h2 className="AN" style={{fontSize:"clamp(28px,5vw,52px)",color:C.dark,marginTop:10,marginBottom:12,lineHeight:.9}}>3 VILLES · 1 CERTIFICATION</h2>
            <GL style={{margin:"0 auto"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {[
              {v:"NIORT",r:"Deux-Sèvres (79)",d:"4 oct. 2025 → 12 avr. 2026",dispo:4,total:16,c:"#4c8ecf",desc:"Au cœur de la Nouvelle-Aquitaine, idéal pour les coaches du département et des villes voisines."},
              {v:"ORLÉANS",r:"Loiret (45)",d:"8 nov. 2025 → 17 mai 2026",dispo:9,total:16,c:C.gold,desc:"Région Centre-Val de Loire, rayonne sur tout le bassin ligérien et l'Île-de-France."},
              {v:"LIMOGES",r:"Haute-Vienne (87)",d:"11 oct. 2025 → 26 avr. 2026",dispo:7,total:16,c:"#9b6fc7",desc:"Nouvelle-Aquitaine, accueille les professionnels de toute la région limousine."},
            ].map(s=>(
              <div key={s.v} className="fu"
                style={{background:C.white,border:`1px solid ${C.cream2}`,padding:"28px 22px",position:"relative",overflow:"hidden",transition:"all .28s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=s.c;e.currentTarget.style.transform="translateY(-5px)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.cream2;e.currentTarget.style.transform="translateY(0)"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:s.c}}/>
                <h3 className="AN" style={{fontSize:32,color:C.dark,marginBottom:2,letterSpacing:".04em"}}>{s.v}</h3>
                <p style={{fontSize:10,color:s.c,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:14}}>{s.r}</p>
                <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                  <div style={{display:"flex",gap:7}}><Ic n="cal" size={11} color={C.gold}/><span style={{fontSize:11,color:C.dark}}>{s.d}</span></div>
                  <div style={{display:"flex",gap:7}}><Ic n="sun" size={11} color={C.gold}/><span style={{fontSize:11,color:C.dark}}>Format 100% weekend</span></div>
                </div>
                <p style={{fontSize:12,color:C.gray,lineHeight:1.7,marginBottom:14}}>{s.desc}</p>
                <div style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:10,color:C.gray}}>Places dispo</span>
                    <span style={{fontSize:11,fontWeight:700,color:s.c}}>{s.dispo}/{s.total}</span>
                  </div>
                  <div style={{height:4,background:C.cream2,borderRadius:2}}>
                    <div style={{height:"100%",borderRadius:2,background:s.c,width:`${Math.round((s.total-s.dispo)/s.total*100)}%`}}/>
                  </div>
                </div>
                <Btn v="outline" full ch={`Candidater → ${s.v}`} onClick={()=>setPage("cqp")} style={{borderColor:s.c,color:s.c,padding:"8px"}}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section style={{padding:"88px 5%",background:C.white}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="fu" style={{textAlign:"center",marginBottom:48}}>
            <Tag ch="Pourquoi nous choisir"/>
            <h2 className="AN" style={{fontSize:"clamp(26px,4.5vw,48px)",color:C.dark,marginTop:10,marginBottom:12,lineHeight:.9}}>L'EXCELLENCE AU SERVICE<br/>DE VOTRE CARRIÈRE</h2>
            <GL style={{margin:"0 auto"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:20}}>
            {[{i:"award",t:"Certifié Qualiopi",d:"Certification qualité d'État — gage de sérieux auprès des financeurs CPF et OPCO."},
              {i:"cpf",t:"Éligible CPF",d:"Financement total ou partiel via votre Compte Personnel de Formation."},
              {i:"sun",t:"100% Weekend",d:"Toutes nos sessions ont lieu samedi et dimanche. Votre semaine reste libre."},
              {i:"users",t:"Groupes réduits",d:"16 stagiaires maximum par promo pour un suivi vraiment personnalisé."},
              {i:"target",t:"90% de réussite",d:"Plus de 90% de nos stagiaires obtiennent leur CQP dès la première session."},
              {i:"zap",t:"Réseau professionnel",d:"Partenariat Basic-Fit et grands clubs — accès à un réseau d'emploi privilégié."}].map((it,i)=>(
              <div key={it.t} className={`fu d${Math.min(i+1,4)}`}
                style={{background:C.cream,padding:"24px 18px",borderBottom:`3px solid transparent`,transition:"all .28s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderBottomColor=C.gold;e.currentTarget.style.background=C.white}}
                onMouseLeave={e=>{e.currentTarget.style.borderBottomColor="transparent";e.currentTarget.style.background=C.cream}}>
                <div style={{width:42,height:42,background:C.goldGlow,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
                  <Ic n={it.i} size={18} color={C.gold}/>
                </div>
                <h3 className="SE" style={{fontSize:18,color:C.dark,marginBottom:7,fontWeight:400}}>{it.t}</h3>
                <p style={{fontSize:12,color:C.gray,lineHeight:1.75}}>{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section style={{padding:"88px 5%",background:C.dark,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.03,backgroundImage:`radial-gradient(${C.gold} 1px,transparent 1px)`,backgroundSize:"50px 50px"}}/>
        <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>
          <div className="fu" style={{textAlign:"center",marginBottom:48}}>
            <Tag ch="Témoignages" dk/>
            <h2 className="AN" style={{fontSize:"clamp(26px,4.5vw,48px)",color:C.white,marginTop:10,marginBottom:12,lineHeight:.9}}>ILS L'ONT FAIT</h2>
            <GL style={{margin:"0 auto"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:18}}>
            {[{n:"Marie L.",r:"Instructrice, Basic Fit Niort",s:5,t:"Le format weekend m'a permis de continuer à travailler pendant toute la formation. Aujourd'hui je suis coach à temps plein grâce à Caz Formation !"},
              {n:"Julien D.",r:"Coach indépendant, Limoges",s:5,t:"Mickael et son équipe m'ont accompagné du début à la fin. CQP obtenu du premier coup. Les weekends sont intenses mais la progression est réelle."},
              {n:"Sophie M.",r:"Coach sportif, Orléans",s:5,t:"Groupe soudé, formateurs passionnés. Libre en semaine pour continuer à coacher mes clients. Parfait équilibre entre pro et formation."}].map((t,i)=>(
              <div key={t.n} className={`fu d${i+1}`} style={{background:"rgba(255,255,255,.04)",border:`1px solid rgba(201,168,76,.15)`,padding:"26px 22px"}}>
                <div style={{display:"flex",gap:3,marginBottom:11}}>{[...Array(t.s)].map((_,j)=><Ic key={j} n="star" size={12} color={C.gold}/>)}</div>
                <Ic n="quote" size={19} color={`${C.gold}38`} style={{marginBottom:9}}/>
                <p className="SE" style={{fontSize:15,fontStyle:"italic",color:"rgba(248,242,228,.72)",lineHeight:1.75,marginBottom:18}}>"{t.t}"</p>
                <div>
                  <p style={{fontSize:12,fontWeight:700,color:C.gold}}>{t.n}</p>
                  <p style={{fontSize:10,color:"rgba(248,242,228,.35)",marginTop:2}}>{t.r}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"88px 5%",background:`linear-gradient(135deg,${C.goldXD},${C.goldD},${C.gold})`,textAlign:"center"}}>
        <div style={{maxWidth:620,margin:"0 auto"}}>
          <h2 className="fu AN" style={{fontSize:"clamp(28px,5vw,56px)",color:C.white,marginBottom:14,lineHeight:.9}}>PRÊT À FRANCHIR LE PAS ?</h2>
          <p className="fu d1 SE" style={{fontSize:19,color:"rgba(255,255,255,.78)",lineHeight:1.65,marginBottom:36,fontStyle:"italic",fontWeight:300}}>Rejoignez nos prochaines sessions 2025-2026 à Niort, Orléans ou Limoges.</p>
          <div className="fu d2" style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn v="dark" ch="Voir les formations" onClick={()=>setPage("cqp")} style={{boxShadow:"none"}}/>
            <Btn v="white" ch={<>Candidater maintenant <Ic n="arrowR" size={13} color={C.dark}/></>} onClick={()=>setPage("contact")}/>
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
}

// ══ CQP PAGE ══════════════════════════════════════════════════════
function CQPPage({setPage}) {
  const [activeBC,setActiveBC]=useState(null);
  const [faqOpen,setFaqOpen]=useState(null);
  const sessions=[
    {v:"Niort",r:"Deux-Sèvres",d:"4 oct. 2025",f:"12 avr. 2026",dispo:4,total:16,c:"#4c8ecf"},
    {v:"Limoges",r:"Haute-Vienne",d:"11 oct. 2025",f:"26 avr. 2026",dispo:7,total:16,c:"#9b6fc7"},
    {v:"Orléans",r:"Loiret",d:"8 nov. 2025",f:"17 mai 2026",dispo:9,total:16,c:C.gold},
  ];
  const bcs=[
    {code:"BC1",titre:"Encadrement des activités physiques",h:"42h",competence:"Encadrer en toute sécurité une activité physique en tenant compte des caractéristiques du public.",
     items:["Cadre réglementaire et législatif du coaching sportif","Responsabilité civile et pénale de l'éducateur sportif","Organisation et sécurité d'une séance fitness","Adaptation aux différents publics (débutants, seniors, femmes enceintes…)","Gestion des accidents et premiers secours","Éthique professionnelle et déontologie sportive"]},
    {code:"BC2",titre:"Animation de séances fitness",h:"70h",competence:"Animer des séances de fitness adaptées aux objectifs et au niveau des participants en toute sécurité.",
     items:["Techniques d'animation de cours collectifs (step, LIA, cardio, HIIT…)","Physiologie de l'effort et du mouvement","Construction et progression pédagogique d'une séance","Communication verbale et non verbale avec les pratiquants","Renforcement musculaire, stretching et récupération","Cours spécialisés : body pump, zumba, aquafitness, yoga fitness…"]},
    {code:"BC3",titre:"Suivi et accompagnement des pratiquants",h:"42h",competence:"Établir un bilan, définir des objectifs et concevoir un programme d'entraînement personnalisé.",
     items:["Bilan initial et analyse des besoins du pratiquant","Définition des objectifs à court, moyen et long terme","Planification de l'entraînement (mésocycle, macrocycle)","Suivi de la progression et ajustement du programme","Bases de nutrition sportive appliquée","Relation coach-client, motivation et psychologie sportive"]},
    {code:"BC4",titre:"Promotion et développement commercial",h:"35h",competence:"Promouvoir ses services, développer sa clientèle et gérer son activité commerciale de façon autonome.",
     items:["Marketing digital et réseaux sociaux pour le coach","Création et gestion d'une page professionnelle","Techniques de vente et approche commerciale bienveillante","Fidélisation client et bouche-à-oreille","Tarification de ses prestations","Développement d'un portefeuille clients solide"]},
    {code:"BC5",titre:"Gestion de son activité professionnelle",h:"35h",competence:"Créer, gérer et développer son activité professionnelle en choisissant le statut juridique adapté.",
     items:["Statuts juridiques du coach sportif (salarié, auto-entrepreneur…)","Obligations administratives, déclaratives et fiscales","Établissement d'un business plan et prévisionnel financier","Gestion comptable et financière de base","Construction et présentation de son projet professionnel"]},
  ];
  const faqs=[
    {q:"Faut-il avoir de l'expérience en coaching sportif ?",a:"Non. La formation est accessible à tous : pratiquant souhaitant se professionnaliser, salarié en reconversion, ou étudiant. Nous adaptons notre accompagnement à votre niveau."},
    {q:"Comment se déroulent les weekends de formation ?",a:"Sessions le samedi de 9h à 18h et le dimanche de 9h à 17h, environ 2 weekends par mois. Le planning annuel complet vous est communiqué dès votre inscription."},
    {q:"La formation est-elle finançable par le CPF ?",a:"Oui. Le CQP IF est éligible CPF (4 000 €). Notre équipe vous accompagne dans la démarche MonCompteFormation.gouv.fr de A à Z."},
    {q:"Quel est le taux de réussite à l'examen ?",a:"Notre taux de réussite dépasse 90% en première session d'examen. En cas d'échec partiel, il est possible de repasser uniquement les blocs non validés."},
    {q:"La certification est-elle reconnue par les clubs professionnels ?",a:"Oui. Le CQP IF est inscrit au RNCP et exigé par la quasi-totalité des clubs professionnels (Basic-Fit, Fitness Park, Orange Bleue, L'Appart Fitness…) pour exercer légalement."},
    {q:"Peut-on démarrer sans le PSC1 ?",a:"Le PSC1 est obligatoire pour le dossier. Des formations d'une journée sont organisées partout en France (environ 60 €). Nous pouvons vous orienter vers des sessions proches de chez vous."},
  ];
  return (
    <div style={{paddingTop:64}}>
      {/* HERO */}
      <section style={{background:`linear-gradient(160deg,${C.dark} 0%,#1A1200 60%,#2A1E00 100%)`,padding:"84px 5% 64px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.032,backgroundImage:`radial-gradient(${C.gold} 1px,transparent 1px)`,backgroundSize:"44px 44px"}}/>
        <div style={{maxWidth:980,margin:"0 auto",position:"relative",zIndex:1}}>
          <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:"rgba(248,242,228,.35)",fontSize:10,cursor:"pointer",letterSpacing:".12em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:5,marginBottom:18,fontFamily:"'Montserrat',sans-serif",transition:"color .2s"}}
            onMouseEnter={e=>e.currentTarget.style.color=C.gold} onMouseLeave={e=>e.currentTarget.style.color="rgba(248,242,228,.35)"}>← Accueil</button>
          <div className="fu" style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
            <Bdg ch="RNCP"/><Bdg ch="CPF Éligible"/>
            <Bdg ch="✓ Inscriptions ouvertes" style={{background:"rgba(76,175,122,.1)",color:"#3a8a5a",borderColor:"rgba(76,175,122,.3)"}}/>
            <Bdg ch="100% Weekend"/>
          </div>
          <h1 className="fu d1 AN" style={{fontSize:"clamp(38px,7vw,82px)",color:C.white,lineHeight:.88,marginBottom:6}}>CQP INSTRUCTEUR</h1>
          <h1 className="fu d2 AN" style={{fontSize:"clamp(38px,7vw,82px)",color:C.gold,lineHeight:.88,marginBottom:24}}>FITNESS</h1>
          <GL className="fu d2" style={{marginBottom:18}}/>
          <p className="fu d3 SE" style={{fontSize:"clamp(14px,2vw,19px)",color:"rgba(248,242,228,.68)",lineHeight:1.75,maxWidth:520,marginBottom:36,fontStyle:"italic",fontWeight:300}}>
            La certification professionnelle de référence pour exercer comme instructeur fitness en France. Inscrite au RNCP — éligible CPF — format 100% weekend.
          </p>
          <div className="fu d4" style={{display:"flex",gap:11,flexWrap:"wrap"}}>
            <Btn v="gold" ch="Candidater maintenant" onClick={()=>setPage("contact")}/>
            <a href="#sessions" style={{textDecoration:"none"}}><Btn v="outlineL" ch="Voir les sessions ↓"/></a>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section style={{background:C.gold}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))"}}>
          {[["4 000 €","Tarif","CPF / OPCO possible"],["6→8 mois","Durée","Weekends uniquement"],["5","Blocs","BC1 → BC5"],["224h","Volume total","Dont 70h pratique"],["16","Places max","Suivi individuel"]].map(([v,l,sub])=>(
            <div key={l} style={{padding:"20px 14px",borderRight:`1px solid ${C.goldD}30`,textAlign:"center"}}>
              <p className="AN" style={{fontSize:24,color:C.dark,lineHeight:1}}>{v}</p>
              <p style={{fontSize:9,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:C.goldXD,marginTop:3}}>{l}</p>
              <p style={{fontSize:10,color:C.goldD,marginTop:2}}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRÉSENTATION */}
      <section style={{padding:"76px 5%",background:C.white}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"start"}}>
          <div>
            <Tag ch="Présentation"/>
            <h2 className="AN" style={{fontSize:"clamp(24px,4vw,40px)",color:C.dark,margin:"12px 0 16px",lineHeight:.9}}>LA CERTIFICATION QUI OUVRE TOUTES LES PORTES</h2>
            <GL style={{marginBottom:20}}/>
            <p style={{fontSize:13,color:C.gray,lineHeight:1.85,marginBottom:12}}>Le Certificat de Qualification Professionnelle Instructeur Fitness (CQP IF) est la certification reconnue nationalement pour enseigner le fitness en club sportif, salle de remise en forme ou en libéral.</p>
            <p style={{fontSize:13,color:C.gray,lineHeight:1.85,marginBottom:12}}>Inscrite au Répertoire National des Certifications Professionnelles (RNCP), elle est exigée par la plupart des clubs professionnels comme Basic-Fit, Fitness Park, Orange Bleue pour exercer légalement.</p>
            <p style={{fontSize:13,color:C.gray,lineHeight:1.85}}>Notre format <strong style={{color:C.dark}}>100% weekend</strong> permet à tous les actifs de se certifier sans sacrifier leur emploi ni leurs revenus actuels.</p>
          </div>
          <div>
            <div style={{background:C.cream,border:`1px solid ${C.cream2}`,padding:"22px 20px",marginBottom:12}}>
              <p className="AN" style={{fontSize:10,color:C.gold,letterSpacing:".14em",marginBottom:10}}>DÉBOUCHÉS PROFESSIONNELS</p>
              {["Instructeur fitness en club (CDI, CDD, vacation)","Coach indépendant / auto-entrepreneur","Animateur en entreprise — QVT et bien-être","Professeur en salle de remise en forme","Créateur de contenus fitness en ligne"].map(d=>(
                <div key={d} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
                  <Ic n="arrowR" size={10} color={C.gold} style={{marginTop:3,flexShrink:0}}/>
                  <span style={{fontSize:12,color:C.dark,lineHeight:1.6}}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{background:C.goldGlow,border:`1px solid ${C.gold}45`,padding:"16px 18px",display:"flex",gap:11,alignItems:"center"}}>
              <Ic n="award" size={24} color={C.gold}/>
              <div>
                <p style={{fontSize:12,fontWeight:700,color:C.goldD,marginBottom:2}}>Certification RNCP reconnue par l'État</p>
                <p style={{fontSize:11,color:C.gray}}>Exigée par les principaux employeurs du secteur fitness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME BC */}
      <section style={{padding:"76px 5%",background:C.cream}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div className="fu" style={{marginBottom:40}}>
            <Tag ch="Programme de formation"/>
            <h2 className="AN" style={{fontSize:"clamp(24px,4vw,40px)",color:C.dark,margin:"12px 0 12px",lineHeight:.9}}>5 BLOCS DE COMPÉTENCES</h2>
            <GL/>
            <p style={{fontSize:13,color:C.gray,marginTop:12,maxWidth:500,lineHeight:1.7}}>Chaque bloc est validé par une épreuve spécifique et peut être obtenu séparément en cas d'échec partiel.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {bcs.map((bc,i)=>(
              <div key={bc.code} style={{border:`1px solid ${activeBC===i?C.gold:C.cream2}`,background:activeBC===i?C.white:C.cream,transition:"all .22s",overflow:"hidden"}}>
                <div style={{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setActiveBC(activeBC===i?null:i)}>
                  <div style={{display:"flex",alignItems:"center",gap:16}}>
                    <span className="AN" style={{fontSize:28,color:activeBC===i?C.gold:C.cream2,lineHeight:1,minWidth:50,letterSpacing:".04em"}}>{bc.code}</span>
                    <div>
                      <h3 style={{fontSize:13.5,fontWeight:700,color:C.dark,letterSpacing:".02em"}}>{bc.titre}</h3>
                      <span style={{fontSize:10,color:C.gold,fontWeight:700,letterSpacing:".1em"}}>{bc.h} de formation</span>
                    </div>
                  </div>
                  <Ic n="chevD" size={14} color={C.gold} style={{transform:activeBC===i?"rotate(180deg)":"none",transition:"transform .22s"}}/>
                </div>
                {activeBC===i&&(
                  <div style={{padding:"0 20px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:22}}>
                    <div>
                      <p style={{fontSize:9,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.gold,marginBottom:10}}>Contenu pédagogique</p>
                      {bc.items.map(c=>(
                        <div key={c} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:7}}>
                          <div style={{width:4,height:4,borderRadius:"50%",background:C.gold,marginTop:6,flexShrink:0}}/>
                          <span style={{fontSize:12,color:C.dark,lineHeight:1.6}}>{c}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{fontSize:9,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.gold,marginBottom:10}}>Compétence visée</p>
                      <p className="SE" style={{fontSize:15,color:C.gray,lineHeight:1.75,fontStyle:"italic"}}>"{bc.competence}"</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÉREQUIS & DOSSIER */}
      <section style={{padding:"76px 5%",background:C.white}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:44}}>
          <div>
            <Tag ch="Conditions d'admission"/>
            <h2 className="AN" style={{fontSize:"clamp(20px,3.5vw,34px)",color:C.dark,margin:"12px 0 16px",lineHeight:.9}}>PRÉREQUIS</h2>
            <GL style={{marginBottom:20}}/>
            {[{r:"Être majeur(e)",d:"18 ans révolus au démarrage"},
              {r:"Aucun diplôme sportif requis",d:"Formation accessible sans qualification préalable"},
              {r:"Aptitude physique",d:"Pratiquer les activités fitness enseignées"},
              {r:"Niveau B1 en français",d:"Compréhension et expression orale et écrite"},
              {r:"Entretien de positionnement",d:"Préalable à l'admission — projet professionnel"}].map(({r,d})=>(
              <div key={r} style={{padding:"11px 14px",background:C.cream,border:`1px solid ${C.cream2}`,marginBottom:6}}>
                <div style={{display:"flex",gap:10}}>
                  <div style={{width:18,height:18,borderRadius:"50%",background:C.goldGlow,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                    <Ic n="check" size={9} color={C.gold}/>
                  </div>
                  <div>
                    <p style={{fontSize:12.5,fontWeight:700,color:C.dark,marginBottom:1}}>{r}</p>
                    <p style={{fontSize:11,color:C.gray}}>{d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Tag ch="Pièces justificatives"/>
            <h2 className="AN" style={{fontSize:"clamp(20px,3.5vw,34px)",color:C.dark,margin:"12px 0 16px",lineHeight:.9}}>DOSSIER</h2>
            <GL style={{marginBottom:20}}/>
            {[{doc:"CV",l:"Curriculum Vitae",d:"À jour avec expériences sportives et pro"},
              {doc:"CNI",l:"Carte Nationale d'Identité",d:"Recto-verso, en cours de validité"},
              {doc:"PSC1",l:"Prévention Secours Civique",d:"Attestation PSC1 ou équivalent premiers secours"},
              {doc:"CERT.",l:"Certificat médical",d:"Non contre-indication à la pratique sportive (- 3 mois)"}].map(({doc,l,d})=>(
              <div key={doc} style={{display:"flex",gap:11,padding:"11px 13px",background:C.cream,border:`1px solid ${C.cream2}`,marginBottom:6}}>
                <span className="AN" style={{fontSize:10,color:C.gold,background:C.goldGlow,padding:"3px 8px",letterSpacing:".04em",whiteSpace:"nowrap",alignSelf:"flex-start"}}>{doc}</span>
                <div>
                  <p style={{fontSize:12.5,fontWeight:700,color:C.dark,marginBottom:1}}>{l} <span style={{fontSize:9,color:C.gold}}>*obligatoire</span></p>
                  <p style={{fontSize:11,color:C.gray}}>{d}</p>
                </div>
              </div>
            ))}
            <div style={{marginTop:12,padding:"11px 14px",background:C.goldGlow,border:`1px solid ${C.gold}38`,display:"flex",gap:8,alignItems:"flex-start"}}>
              <Ic n="download" size={14} color={C.goldD} style={{marginTop:2,flexShrink:0}}/>
              <p style={{fontSize:11,color:C.goldD,lineHeight:1.7}}><strong>Documents en PDF ou JPG</strong> — Max 10 Mo. Dossier validé sous 48h ouvrées.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SESSIONS */}
      <section id="sessions" style={{padding:"76px 5%",background:C.cream}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div className="fu" style={{marginBottom:40}}>
            <Tag ch="Inscriptions ouvertes"/>
            <h2 className="AN" style={{fontSize:"clamp(24px,4vw,40px)",color:C.dark,margin:"12px 0 12px",lineHeight:.9}}>SESSIONS 2025-2026</h2>
            <GL/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20}}>
            {sessions.map(s=>(
              <div key={s.v} style={{background:C.white,border:`1px solid ${C.cream2}`,padding:"28px 22px",position:"relative",overflow:"hidden",transition:"all .28s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=s.c;e.currentTarget.style.transform="translateY(-5px)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.cream2;e.currentTarget.style.transform="translateY(0)"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:s.c}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div>
                    <h3 className="AN" style={{fontSize:28,color:C.dark,letterSpacing:".04em"}}>{s.v}</h3>
                    <p style={{fontSize:10,color:s.c,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase"}}>{s.r}</p>
                  </div>
                  <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",background:`${s.c}18`,color:s.c,border:`1px solid ${s.c}38`,letterSpacing:".06em",textTransform:"uppercase"}}>{s.dispo} places</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                  {[[s.d+" → "+s.f,"cal"],["Format 100% weekend","sun"],["16 places max · Groupe réduit","users"],["4 000 € · CPF éligible","euro"]].map(([t,ic])=>(
                    <div key={t} style={{display:"flex",gap:7,alignItems:"flex-start"}}>
                      <Ic n={ic} size={11} color={C.gold} style={{marginTop:2,flexShrink:0}}/>
                      <span style={{fontSize:11,color:C.dark,lineHeight:1.5}}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:10,color:C.gray}}>Remplissage</span>
                    <span style={{fontSize:11,fontWeight:700,color:s.c}}>{s.total-s.dispo}/{s.total}</span>
                  </div>
                  <div style={{height:4,background:C.cream2,borderRadius:2}}>
                    <div style={{height:"100%",borderRadius:2,background:s.c,width:`${Math.round((s.total-s.dispo)/s.total*100)}%`}}/>
                  </div>
                </div>
                <Btn v="gold" full ch={`Candidater → ${s.v}`} onClick={()=>setPage("contact")}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCEMENT */}
      <section style={{padding:"76px 5%",background:`linear-gradient(160deg,${C.dark},#1A1200)`}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div className="fu" style={{marginBottom:40}}>
            <Tag ch="Financement" dk/>
            <h2 className="AN" style={{fontSize:"clamp(22px,4vw,38px)",color:C.white,margin:"12px 0 12px",lineHeight:.9}}>FINANCER VOTRE FORMATION</h2>
            <GL/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(195px,1fr))",gap:14}}>
            {[{t:"CPF",i:"cpf",d:"Utilisez vos droits MonCompteFormation. Formation éligible à hauteur de 4 000 €. Accompagnement inclus."},
              {t:"OPCO",i:"users",d:"Pour salariés et demandeurs d'emploi, votre OPCO peut prendre en charge tout ou partie du coût."},
              {t:"France Travail",i:"target",d:"Sous conditions, France Travail peut financer votre formation. Notre équipe vous accompagne dans le dossier."},
              {t:"Paiement personnel",i:"euro",d:"Paiement en 3× sans frais possible. Contactez-nous pour un plan adapté à votre situation."}].map(f=>(
              <div key={f.t} style={{background:"rgba(255,255,255,.05)",border:`1px solid rgba(201,168,76,.18)`,padding:"22px 18px"}}>
                <Ic n={f.i} size={20} color={C.gold} style={{marginBottom:11}}/>
                <h3 className="AN" style={{fontSize:16,color:C.gold,marginBottom:8,letterSpacing:".04em"}}>{f.t}</h3>
                <p style={{fontSize:12,color:"rgba(248,242,228,.55)",lineHeight:1.75}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:"76px 5%",background:C.white}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div className="fu" style={{marginBottom:36,textAlign:"center"}}>
            <Tag ch="Questions fréquentes"/>
            <h2 className="AN" style={{fontSize:"clamp(22px,4vw,38px)",color:C.dark,margin:"12px 0 12px",lineHeight:.9}}>FAQ</h2>
            <GL style={{margin:"0 auto"}}/>
          </div>
          {faqs.map((f,i)=>(
            <div key={i} style={{border:`1px solid ${faqOpen===i?C.gold:C.cream2}`,marginBottom:6,background:faqOpen===i?C.cream:C.white,transition:"all .22s"}}>
              <div style={{padding:"15px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setFaqOpen(faqOpen===i?null:i)}>
                <h3 style={{fontSize:13,fontWeight:700,color:C.dark,paddingRight:12}}>{f.q}</h3>
                <Ic n="chevD" size={13} color={C.gold} style={{flexShrink:0,transform:faqOpen===i?"rotate(180deg)":"none",transition:"transform .22s"}}/>
              </div>
              {faqOpen===i&&<p style={{padding:"0 18px 15px",fontSize:13,color:C.gray,lineHeight:1.8}}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
}

// ══ PILATES ═══════════════════════════════════════════════════════
function PilatesPage({setPage}) {
  const [tab,setTab]=useState(0);
  const prog=[
    {t:"Histoire & philosophie Pilates",items:["Joseph Pilates et l'origine de la méthode","Les 6 principes fondamentaux (concentration, contrôle, centrage…)","Éthique et cadre professionnel de l'enseignant Pilates"]},
    {t:"Anatomie fonctionnelle",items:["Anatomie appliquée au mouvement Pilates","Gainage profond et core stability","Alignement postural et placement du corps","Contre-indications et précautions médicales"]},
    {t:"Les 34 exercices classiques",items:["Maîtrise technique complète des exercices fondateurs","Progressions et régressions adaptées","Enchaînements et flow pédagogique","Respiration, coordination et précision"]},
    {t:"Pédagogie & enseignement",items:["Construction d'un cours de 45/60 min","Verbal cueing et démonstration","Adaptation aux différents niveaux","Évaluation et correction individuelle"]},
  ];
  const prog2=[
    {t:"Exercices avancés",items:["Variations et exercices de niveau expert","Travail avec accessoires (cerceau, bande, ballon)","Flow et enchaînements complexes","Préparation physique et performance sportive"]},
    {t:"Populations spécifiques",items:["Pilates prénatal et postnatal","Seniors et mobilité réduite","Sportifs de haut niveau","Rééducation fonctionnelle post-traumatique"]},
    {t:"Développement professionnel",items:["Création et gestion de cours Pilates","Marketing et développement clientèle","Tarification et positionnement prix","Passage de la certification RS6755"]},
  ];
  return (
    <div style={{paddingTop:64}}>
      <section style={{background:C.cream,padding:"84px 5% 64px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,width:"50%",height:"100%",background:`linear-gradient(to left,${C.goldGlow},transparent)`,pointerEvents:"none"}}/>
        <div style={{maxWidth:980,margin:"0 auto",position:"relative",zIndex:1}}>
          <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:C.grayL,fontSize:10,cursor:"pointer",letterSpacing:".12em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:5,marginBottom:20,fontFamily:"'Montserrat',sans-serif",transition:"color .2s"}}
            onMouseEnter={e=>e.currentTarget.style.color=C.gold} onMouseLeave={e=>e.currentTarget.style.color=C.grayL}>← Accueil</button>
          <div className="fu" style={{display:"flex",gap:8,marginBottom:16}}>
            <Bdg ch="Formation continue"/><Bdg ch="RS6755"/>
            <Bdg ch="✓ 5 places restantes" style={{background:"rgba(76,175,122,.1)",color:"#3a6b3a",borderColor:"rgba(76,175,122,.3)"}}/>
          </div>
          <h1 className="fu d1 AN" style={{fontSize:"clamp(34px,7vw,74px)",color:C.dark,lineHeight:.88,marginBottom:6}}>PILATES MATWORK</h1>
          <h1 className="fu d2 AN" style={{fontSize:"clamp(34px,7vw,74px)",color:C.gold,lineHeight:.88,marginBottom:22}}>NIVEAUX 1 & 2</h1>
          <GL className="fu d2" style={{marginBottom:18}}/>
          <p className="fu d3 SE" style={{fontSize:"clamp(14px,2vw,19px)",color:C.gray,lineHeight:1.75,maxWidth:500,marginBottom:34,fontStyle:"italic"}}>La certification Pilates de référence pour les professionnels du sport et du bien-être. Format intensif 6 jours.</p>
          <div className="fu d4" style={{display:"flex",gap:11,flexWrap:"wrap"}}>
            <Btn v="gold" ch="Réserver ma place" onClick={()=>setPage("contact")}/>
            <Btn v="outlineD" ch="Télécharger le programme"/>
          </div>
        </div>
      </section>
      <section style={{background:C.dark}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))"}}>
          {[["890 €","Tarif","Tout inclus"],["6 jours","Durée","Format intensif"],["La Rochelle","Lieu","Sept. 2025"],["12 places","Max","Groupe réduit"],["RS6755","Certif.","Reconnue"]].map(([v,l,sub])=>(
            <div key={l} style={{padding:"18px 14px",borderRight:`1px solid rgba(201,168,76,.15)`,textAlign:"center"}}>
              <p className="AN" style={{fontSize:22,color:C.gold,lineHeight:1}}>{v}</p>
              <p style={{fontSize:9,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(248,242,228,.38)",marginTop:3}}>{l}</p>
              <p style={{fontSize:10,color:"rgba(201,168,76,.45)",marginTop:2}}>{sub}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:"76px 5%",background:C.white}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div className="fu" style={{marginBottom:32}}>
            <Tag ch="Programme de formation"/>
            <h2 className="AN" style={{fontSize:"clamp(22px,4vw,38px)",color:C.dark,margin:"12px 0 12px",lineHeight:.9}}>CONTENU PÉDAGOGIQUE</h2>
            <GL/>
          </div>
          <div style={{display:"flex",borderBottom:`1.5px solid ${C.cream2}`,marginBottom:24}}>
            {["Niveau 1 — Fondamentaux","Niveau 2 — Approfondissement"].map((t,i)=>(
              <button key={t} onClick={()=>setTab(i)}
                style={{background:"none",border:"none",borderBottom:`3px solid ${tab===i?C.gold:"transparent"}`,
                  color:tab===i?C.gold:C.gray,padding:"12px 22px",fontSize:10,letterSpacing:".12em",
                  textTransform:"uppercase",fontWeight:700,cursor:"pointer",transition:"all .2s",marginBottom:-1.5}}>
                {t}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
            {(tab===0?prog:prog2).map(m=>(
              <div key={m.t} style={{background:C.cream,border:`1px solid ${C.cream2}`,padding:"20px 18px",borderLeft:`3px solid ${C.gold}`}}>
                <h3 className="SE" style={{fontSize:17,fontWeight:400,color:C.dark,marginBottom:10}}>{m.t}</h3>
                {m.items.map(item=>(
                  <div key={item} style={{display:"flex",alignItems:"flex-start",gap:7,marginBottom:6}}>
                    <div style={{width:4,height:4,borderRadius:"50%",background:C.gold,marginTop:6,flexShrink:0}}/>
                    <span style={{fontSize:12,color:C.dark,lineHeight:1.6}}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"76px 5%",background:C.cream}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:44}}>
          <div>
            <Tag ch="Pièces à fournir"/>
            <h2 className="AN" style={{fontSize:"clamp(20px,3vw,32px)",color:C.dark,margin:"12px 0 16px",lineHeight:.9}}>DOSSIER</h2>
            <GL style={{marginBottom:20}}/>
            {[{doc:"CERT.",l:"Certificat médical",d:"Non contre-indication à la pratique sportive professionnelle"},
              {doc:"CV",l:"Curriculum Vitae",d:"Avec vos expériences sportives et d'enseignement"},
              {doc:"DIPLÔME",l:"Diplôme coach sportif",d:"BPJEPS, STAPS, CQP ou équivalent (obligatoire)"},
              {doc:"CARTE PRO",l:"Carte professionnelle",d:"Carte d'éducateur sportif en cours de validité"}].map(({doc,l,d})=>(
              <div key={doc} style={{display:"flex",gap:10,padding:"10px 12px",background:C.white,border:`1px solid ${C.cream2}`,marginBottom:6}}>
                <span className="AN" style={{fontSize:9,color:C.gold,background:C.goldGlow,padding:"2px 7px",letterSpacing:".04em",whiteSpace:"nowrap",alignSelf:"flex-start"}}>{doc}</span>
                <div><p style={{fontSize:12.5,fontWeight:700,color:C.dark,marginBottom:1}}>{l}</p><p style={{fontSize:11,color:C.gray}}>{d}</p></div>
              </div>
            ))}
          </div>
          <div>
            <Tag ch="Session disponible"/>
            <h2 className="AN" style={{fontSize:"clamp(20px,3vw,32px)",color:C.dark,margin:"12px 0 16px",lineHeight:.9}}>SEPT. 2025</h2>
            <GL style={{marginBottom:20}}/>
            <div style={{background:C.white,border:`1px solid ${C.cream2}`,padding:"22px 20px",marginBottom:12}}>
              <h3 className="AN" style={{fontSize:22,color:C.dark,marginBottom:5,letterSpacing:".04em"}}>LA ROCHELLE</h3>
              <p style={{fontSize:10,color:C.gold,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:14}}>Charente-Maritime (17)</p>
              {[["cal","15 → 20 septembre 2025"],["clock","9h00 → 18h00 (pause déjeuner incluse)"],["map","Studio partenaire — La Rochelle Centre"],["users","12 places max · 5 places disponibles"],["euro","890 € tout inclus"]].map(([ic,t])=>(
                <div key={t} style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                  <Ic n={ic} size={11} color={C.gold}/><span style={{fontSize:12,color:C.dark}}>{t}</span>
                </div>
              ))}
              <div style={{margin:"12px 0"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:10,color:C.gray}}>Places réservées</span>
                  <span style={{fontSize:11,fontWeight:700,color:C.gold}}>7/12</span>
                </div>
                <div style={{height:4,background:C.cream2,borderRadius:2}}>
                  <div style={{height:"100%",borderRadius:2,background:C.gold,width:"58%"}}/>
                </div>
              </div>
              <Btn v="gold" full ch={<>Réserver ma place <Ic n="arrowR" size={12} color={C.white}/></>} onClick={()=>setPage("contact")}/>
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
}

// ══ ABOUT ═════════════════════════════════════════════════════════
function AboutPage({setPage}) {
  const team=[
    {i:"MC",n:"Mickael Cazalas",r:"Directeur & Fondateur",b:"Fondateur de Caz Formation, expert fitness et formation depuis 15 ans. Il a développé un réseau national de certifications d'excellence."},
    {i:"EC",n:"Enzo Clinco",r:"Coordinateur pédagogique",b:"Responsable de la coordination des sessions et du suivi des stagiaires. Spécialiste du CQP IF."},
    {i:"AP",n:"Agathe Poitrenaud",r:"Formatrice BC2",b:"Experte en animation de cours collectifs. Formatrice référente pour le bloc de compétences BC2."},
    {i:"JG",n:"Julien Gaumet",r:"Formateur CQP IF",b:"Coach professionnel certifié. Spécialisé dans la préparation aux examens et l'accompagnement individualisé."},
  ];
  return (
    <div style={{paddingTop:64}}>
      <section style={{background:`linear-gradient(160deg,${C.dark},#1A1200)`,padding:"84px 5% 64px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.032,backgroundImage:`radial-gradient(${C.gold} 1px,transparent 1px)`,backgroundSize:"44px 44px"}}/>
        <div style={{maxWidth:880,margin:"0 auto",position:"relative",zIndex:1}}>
          <Tag ch="Notre histoire" dk style={{color:C.goldL}}/>
          <h1 className="fu AN" style={{fontSize:"clamp(32px,6vw,64px)",color:C.white,margin:"12px 0 6px",lineHeight:.88}}>CAZ FORMATION</h1>
          <h2 className="fu d1 SE" style={{fontSize:"clamp(16px,3vw,28px)",color:C.gold,margin:"0 0 20px",fontStyle:"italic",fontWeight:300}}>L'École Française du Coaching Sportif</h2>
          <GL className="fu d1" style={{marginBottom:20}}/>
          <p className="fu d2" style={{fontSize:13.5,color:"rgba(248,242,228,.68)",lineHeight:1.9,maxWidth:520}}>
            Fondé par Mickael Cazalas à Yves (Charente-Maritime), Caz Formation est l'organisme de référence pour la formation des professionnels du fitness en France. Certifié Qualiopi, nous formons et certifions les coaches de demain depuis plus de 15 ans.
          </p>
        </div>
      </section>
      <section style={{padding:"76px 5%",background:C.cream}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div className="fu" style={{marginBottom:40}}>
            <Tag ch="Nos valeurs"/>
            <h2 className="AN" style={{fontSize:"clamp(22px,4vw,38px)",color:C.dark,margin:"12px 0 12px",lineHeight:.9}}>CE QUI NOUS DÉFINIT</h2>
            <GL/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",gap:18}}>
            {[["01","Excellence","Qualité au cœur de chaque formation. Nos stagiaires méritent le meilleur."],
              ["02","Accessibilité","Le format weekend permet à tous d'accéder à la certification."],
              ["03","Proximité","Groupes réduits, suivi individuel. Nous connaissons chaque stagiaire."],
              ["04","Engagement","90% de réussite. Nous nous engageons sur les résultats."]].map(([num,t,d])=>(
              <div key={t} style={{background:C.white,padding:"24px 18px",borderTop:`3px solid ${C.gold}`}}>
                <span className="AN" style={{fontSize:34,color:C.cream2,display:"block",marginBottom:8,lineHeight:1}}>{num}</span>
                <h3 className="SE" style={{fontSize:19,color:C.dark,marginBottom:7,fontWeight:400}}>{t}</h3>
                <p style={{fontSize:12,color:C.gray,lineHeight:1.8}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"76px 5%",background:C.white}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div className="fu" style={{textAlign:"center",marginBottom:44}}>
            <Tag ch="L'équipe"/>
            <h2 className="AN" style={{fontSize:"clamp(22px,4vw,38px)",color:C.dark,margin:"12px 0 12px",lineHeight:.9}}>DES EXPERTS À VOTRE SERVICE</h2>
            <GL style={{margin:"0 auto"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(205px,1fr))",gap:18}}>
            {team.map((m,i)=>(
              <div key={m.n} className={`fu d${i+1}`} style={{padding:"26px 18px",background:C.cream,border:`1px solid ${C.cream2}`,textAlign:"center",transition:"all .28s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.transform="translateY(-4px)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.cream2;e.currentTarget.style.transform="translateY(0)"}}>
                <div className="AN" style={{width:60,height:60,borderRadius:"50%",background:`linear-gradient(135deg,${C.goldD},${C.gold})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:17,color:C.white,letterSpacing:".05em"}}>{m.i}</div>
                <h3 className="SE" style={{fontSize:17,color:C.dark,marginBottom:3,fontWeight:400}}>{m.n}</h3>
                <p style={{fontSize:9,color:C.gold,letterSpacing:".12em",textTransform:"uppercase",fontWeight:700,marginBottom:10}}>{m.r}</p>
                <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,marginBottom:10}}/>
                <p style={{fontSize:11,color:C.gray,lineHeight:1.75}}>{m.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
}

// ══ CONTACT ═══════════════════════════════════════════════════════
function ContactPage({setPage}) {
  const [form,setForm]=useState({prenom:"",nom:"",email:"",phone:"",formation:"",cpf:"",message:""});
  const [sent,setSent]=useState(false);
  const [sending,setSending]=useState(false);
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const submit=async e=>{
  e.preventDefault();setSending(true);
  const SM={"CQP Instructeur Fitness — Niort (4 oct. 2025)":"s1","CQP Instructeur Fitness — Limoges (11 oct. 2025)":"s2","CQP Instructeur Fitness — Orléans (8 nov. 2025)":"s3","Pilates Matwork 1 & 2 — La Rochelle (15 sept. 2025)":"s4"};
  const lead={id:"l"+Date.now(),sess_id:SM[form.formation]||"s1",prenom:form.prenom,nom:form.nom,email:form.email,phone:form.phone||'',cpf:form.cpf||'',message:form.message||'',stage:"prospect",notes:'',source:"Site web — Formulaire",docs:{},docs_meta:{},devis:null,payments:[],history:[{date:new Date().toISOString(),action:"Candidature reçue via le site web",by:"Formulaire"}],promo_sess_id:null,promo_label:null};
  await sbUpsert("leads",lead);
  setSent(true);setSending(false);
};

  const inp={width:"100%",background:C.cream,border:`1.5px solid ${C.cream2}`,color:C.dark,padding:"11px 12px",fontSize:13,outline:"none",transition:"border-color .2s",fontFamily:"'Montserrat',sans-serif"};
  const lbl={display:"block",fontSize:9,letterSpacing:".14em",textTransform:"uppercase",color:C.gray,marginBottom:6,fontWeight:600};
  return (
    <div style={{paddingTop:64}}>
      <section style={{background:`linear-gradient(160deg,${C.dark},#1A1200)`,padding:"76px 5% 54px"}}>
        <div style={{maxWidth:760,margin:"0 auto",textAlign:"center"}}>
          <Tag ch="Contact & Candidatures" dk style={{color:C.goldL}}/>
          <h1 className="fu AN" style={{fontSize:"clamp(30px,6vw,58px)",color:C.white,margin:"12px 0 6px",lineHeight:.88}}>COMMENCEZ VOTRE PARCOURS</h1>
          <h2 className="fu d1 SE" style={{fontStyle:"italic",fontWeight:300,fontSize:"clamp(15px,3vw,24px)",color:C.gold,marginBottom:16}}>Notre équipe répond sous 48h ouvrées</h2>
          <GL className="fu d2" style={{margin:"0 auto"}}/>
        </div>
      </section>
      <section style={{padding:"64px 5%",background:C.white}}>
        <div style={{maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:56}}>
          <div>
            <Tag ch="Formulaire"/>
            <h2 className="AN" style={{fontSize:"clamp(20px,3vw,32px)",color:C.dark,margin:"12px 0 20px",lineHeight:.9}}>
              {sent?"MESSAGE ENVOYÉ !":"CANDIDATURE EN LIGNE"}
            </h2>
            <GL style={{marginBottom:28}}/>
            {sent?(
              <div style={{textAlign:"center",padding:"44px 20px",background:C.cream,border:`1px solid ${C.cream2}`}}>
                <div style={{width:60,height:60,borderRadius:"50%",background:C.goldGlow,border:`2px solid ${C.gold}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
                  <Ic n="check" size={26} color={C.gold}/>
                </div>
                <h3 className="AN" style={{fontSize:20,color:C.dark,marginBottom:10,letterSpacing:".04em"}}>CANDIDATURE REÇUE</h3>
                <p style={{fontSize:13,color:C.gray,lineHeight:1.8}}>Notre équipe vous contacte sous <strong>48 heures ouvrées</strong> pour confirmer votre dossier.</p>
              </div>
            ):(
              <form onSubmit={submit}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
                  {[{k:"prenom",l:"Prénom *",r:true},{k:"nom",l:"Nom *",r:true}].map(({k,l,r})=>(
                    <div key={k} style={{marginBottom:14}}>
                      <label style={lbl}>{l}</label>
                      <input value={form[k]} onChange={e=>set(k,e.target.value)} required={r} style={inp}
                        onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.cream2}/>
                    </div>
                  ))}
                </div>
                {[{k:"email",l:"Email *",t:"email",r:true},{k:"phone",l:"Téléphone",t:"tel",r:false}].map(({k,l,t,r})=>(
                  <div key={k} style={{marginBottom:14}}>
                    <label style={lbl}>{l}</label>
                    <input type={t} value={form[k]} onChange={e=>set(k,e.target.value)} required={r} style={inp}
                      onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.cream2}/>
                  </div>
                ))}
                <div style={{marginBottom:14}}>
                  <label style={lbl}>Formation souhaitée *</label>
                  <select value={form.formation} onChange={e=>set("formation",e.target.value)} required
                    style={{...inp,color:form.formation?C.dark:C.grayL}}>
                    <option value="">Choisir une formation…</option>
                    <option>CQP Instructeur Fitness — Niort (4 oct. 2025)</option>
                    <option>CQP Instructeur Fitness — Limoges (11 oct. 2025)</option>
                    <option>CQP Instructeur Fitness — Orléans (8 nov. 2025)</option>
                    <option>Pilates Matwork 1 & 2 — La Rochelle (15 sept. 2025)</option>
                    <option>Renseignements généraux</option>
                  </select>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={lbl}>N° CPF (optionnel)</label>
                  <input value={form.cpf} onChange={e=>set("cpf",e.target.value)} placeholder="1234567890123" style={inp}
                    onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.cream2}/>
                </div>
                <div style={{marginBottom:22}}>
                  <label style={lbl}>Message</label>
                  <textarea value={form.message} onChange={e=>set("message",e.target.value)} rows={4}
                    placeholder="Présentez-vous brièvement, posez vos questions…"
                    style={{...inp,resize:"vertical"}}
                    onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.cream2}/>
                </div>
                <Btn v="gold" type="submit" disabled={sending} full
                  ch={sending?<><span style={{display:"inline-block",width:12,height:12,border:`2px solid ${C.white}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>Envoi…</>:<><Ic n="send" size={12} color={C.white}/>Envoyer ma candidature</>}
                  style={{padding:"13px"}}/>
              </form>
            )}
          </div>
          <div>
            <Tag ch="Coordonnées"/>
            <h2 className="AN" style={{fontSize:"clamp(20px,3vw,32px)",color:C.dark,margin:"12px 0 20px",lineHeight:.9}}>RESTONS EN CONTACT</h2>
            <GL style={{marginBottom:24}}/>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
              {[{i:"map",t:"Siège social",v:"Yves (17340), Charente-Maritime"},
                {i:"phone",t:"Téléphone",v:"+33 (0)6 00 00 00 00"},
                {i:"mail",t:"Email",v:"contact@cazformation.fr"},
                {i:"clock",t:"Disponibilités",v:"Lun → Ven · 9h → 18h"}].map(({i,t,v})=>(
                <div key={t} style={{display:"flex",gap:11,padding:"12px 14px",background:C.cream,border:`1px solid ${C.cream2}`}}>
                  <div style={{width:34,height:34,background:C.goldGlow,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Ic n={i} size={13} color={C.gold}/>
                  </div>
                  <div>
                    <p style={{fontSize:9,color:C.gold,letterSpacing:".12em",textTransform:"uppercase",fontWeight:700,marginBottom:2}}>{t}</p>
                    <p style={{fontSize:12.5,color:C.dark}}>{v}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{padding:"18px",background:C.cream,border:`1px solid ${C.cream2}`}}>
              <p style={{fontSize:9,color:C.grayL,letterSpacing:".1em",textTransform:"uppercase",marginBottom:7}}>Informations légales</p>
              <p style={{fontSize:11,color:C.gray,lineHeight:1.85}}>Caz Formation — EURL<br/>SIRET : 100 157 247 00014<br/>NDA : 75170365217<br/>Certifié Qualiopi</p>
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/>
    </div>
  );
}

// ══ APP ROOT ══════════════════════════════════════════════════════
export default function Site({ onAdmin }) {
  const [page,setPage]=useState("home");
  const go=p=>{setPage(p);setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),10);};
  return (
    <div style={{minHeight:"100vh",background:C.white}}>
      <Fonts/>
      <Nav page={page} setPage={go}/>
      {page==="home"    && <HomePage  setPage={go}/>}
      {page==="cqp"     && <CQPPage   setPage={go}/>}
      {page==="pilates" && <PilatesPage setPage={go}/>}
      {page==="about"   && <AboutPage setPage={go}/>}
      {page==="contact" && <ContactPage setPage={go}/>}
    </div>
  );
}
