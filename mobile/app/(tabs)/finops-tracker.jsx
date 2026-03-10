import { useState } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────
const C = {
  oliveDark: "#2C2F1E", oliveMid: "#3D4128", oliveBase: "#4A4E30",
  oliveLight: "#6B7040", oliveMuted: "#8A8F60", tan: "#C8BC8A",
  cream: "#F0EAD2", amber: "#D4A017", red: "#8B2020",
  green: "#3A6B3A", greenBright: "#5A9B5A", textMuted: "#8A8F60",
  border: "rgba(200,188,138,0.2)", borderBright: "rgba(200,188,138,0.5)",
};

const fonts = {
  condensed: "'Barlow Condensed', sans-serif",
  body: "'Barlow', sans-serif",
  mono: "'Share Tech Mono', monospace",
};

// ─── SHARED COMPONENTS ───────────────────────────────────────────

const StatusBar = () => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
    padding:"34px 20px 8px", fontFamily:fonts.mono, fontSize:10, color:C.tan, letterSpacing:1 }}>
    <span style={{ fontSize:13, fontWeight:600 }}>09:41</span>
    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
      <span>▲▲▲</span><span>⬛</span>
    </div>
  </div>
);

const TopBar = ({ role, rank, onSwitchRole }) => (
  <div style={{ padding:"4px 18px 14px", background:`linear-gradient(180deg,#1A1C10 0%,${C.oliveDark} 100%)`,
    borderBottom:`1px solid ${C.border}` }}>
    <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:1,
      textTransform:"uppercase", marginBottom:4 }}>09:41 TUE 10 MAR</div>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ fontFamily:fonts.condensed, fontSize:20, fontWeight:800,
        color:C.cream, letterSpacing:3, textTransform:"uppercase" }}>
        FIN<span style={{ color:C.amber }}>OPS</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div onClick={onSwitchRole} title="Switch Role" style={{ cursor:"pointer",
          background: role === "ACO" ? "rgba(58,107,58,0.15)" : C.oliveMid,
          border:`1px solid ${role === "ACO" ? "rgba(90,155,90,0.6)" : C.borderBright}`,
          padding:"4px 10px", fontFamily:fonts.mono, fontSize:9,
          color: role === "ACO" ? "#7DC47D" : C.tan, letterSpacing:1, textTransform:"uppercase" }}>
          {role} ⇄
        </div>
        <div style={{ width:30, height:30, background:C.oliveBase, border:`1px solid ${C.borderBright}`,
          borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:10, color:C.tan, fontFamily:fonts.mono }}>{rank}</div>
      </div>
    </div>
  </div>
);

const BackBar = ({ title, sub, role, onBack }) => (
  <div style={{ padding:"4px 18px 14px", background:`linear-gradient(180deg,#1A1C10 0%,${C.oliveDark} 100%)`,
    borderBottom:`1px solid ${C.border}` }}>
    <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:1,
      textTransform:"uppercase", marginBottom:4 }}>09:41 TUE 10 MAR</div>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span onClick={onBack} style={{ fontSize:20, color:C.tan, cursor:"pointer", lineHeight:1 }}>←</span>
        <div>
          <div style={{ fontFamily:fonts.condensed, fontSize:16, fontWeight:800,
            color:C.cream, letterSpacing:2, textTransform:"uppercase" }}>{title}</div>
          <div style={{ fontFamily:fonts.mono, fontSize:8, color: sub === "PURCHASE REQUEST" ? C.oliveMuted : C.amber,
            letterSpacing:1 }}>{sub}</div>
        </div>
      </div>
      <div style={{ background: role === "ACO" ? "rgba(58,107,58,0.15)" : C.oliveMid,
        border:`1px solid ${role === "ACO" ? "rgba(90,155,90,0.6)" : C.borderBright}`,
        padding:"4px 10px", fontFamily:fonts.mono, fontSize:9,
        color: role === "ACO" ? "#7DC47D" : C.tan, letterSpacing:1, textTransform:"uppercase" }}>
        {role}
      </div>
    </div>
  </div>
);

const BottomNav = ({ items, active, onNav }) => (
  <div style={{ background:"#1A1C10", borderTop:`1px solid ${C.border}`,
    display:"flex", padding:"10px 0 20px", flexShrink:0 }}>
    {items.map(item => (
      <div key={item.key} onClick={() => onNav(item.key)} style={{ flex:1, display:"flex",
        flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer", position:"relative" }}>
        <span style={{ fontSize:18 }}>{item.icon}</span>
        <span style={{ fontFamily:fonts.mono, fontSize:8, letterSpacing:1, textTransform:"uppercase",
          color: active === item.key ? C.amber : C.textMuted }}>{item.label}</span>
        {item.notif && <div style={{ width:6, height:6, background:C.amber, borderRadius:"50%",
          position:"absolute", top:2, right:"22%" }} />}
      </div>
    ))}
  </div>
);

const SectionHeader = ({ title, action, onAction }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
    marginBottom:10, paddingBottom:8, borderBottom:`1px solid ${C.border}` }}>
    <div style={{ fontFamily:fonts.condensed, fontSize:14, fontWeight:700, color:C.tan,
      letterSpacing:2, textTransform:"uppercase", display:"flex", alignItems:"center", gap:6 }}>
      <span style={{ width:3, height:14, background:C.amber, display:"inline-block" }} />
      {title}
    </div>
    {action && <span onClick={onAction} style={{ fontFamily:fonts.mono, fontSize:9,
      color:C.amber, letterSpacing:1, textTransform:"uppercase", cursor:"pointer" }}>{action}</span>}
  </div>
);

const PRCard = ({ pr, showAction, onAction, onOpen }) => {
  const statusColors = {
    pending: { bg:"rgba(212,160,23,0.15)", color:C.amber, border:"rgba(212,160,23,0.3)", left:C.amber },
    partial: { bg:"rgba(139,96,32,0.2)", color:"#C4882A", border:"rgba(139,96,32,0.4)", left:"#8B6020" },
    complete: { bg:"rgba(58,107,58,0.2)", color:"#7DC47D", border:"rgba(58,107,58,0.4)", left:C.greenBright },
  };
  const s = statusColors[pr.status];
  const progressMap = { pending:0, partial:67, complete:100 };
  const progressColor = pr.status === "complete" ? C.greenBright : C.amber;
  return (
    <div onClick={onOpen} style={{ background:"rgba(0,0,0,0.25)", border:`1px solid ${C.border}`,
      borderLeft:`3px solid ${s.left}`, padding:"12px 14px", marginBottom:8, cursor: onOpen ? "pointer" : "default" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
        <span style={{ fontFamily:fonts.mono, fontSize:11, color:C.amber, letterSpacing:1 }}>{pr.id}</span>
        <span style={{ background:s.bg, color:s.color, border:`1px solid ${s.border}`,
          fontFamily:fonts.condensed, fontSize:11, fontWeight:700, letterSpacing:1,
          textTransform:"uppercase", padding:"2px 8px" }}>{pr.statusLabel}</span>
      </div>
      <div style={{ fontFamily:fonts.body, fontSize:13, fontWeight:600, color:C.cream,
        marginBottom:4, lineHeight:1.3 }}>{pr.title}</div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        {pr.meta.map((m,i) => (
          <span key={i} style={{ fontFamily:fonts.mono, fontSize:9, color:C.textMuted, letterSpacing:.5 }}>
            {m.label} <span style={{ color:C.tan }}>{m.value}</span>
          </span>
        ))}
      </div>
      <div style={{ marginTop:8, background:"rgba(0,0,0,0.3)", height:4 }}>
        <div style={{ height:"100%", width:`${progressMap[pr.status]}%`, background:progressColor, transition:"width .3s" }} />
      </div>
      {showAction && pr.status !== "complete" && (
        <div style={{ marginTop:10 }}>
          <button onClick={e=>{ e.stopPropagation(); onAction(pr); }} style={{ width:"100%",
            background:"rgba(58,107,58,0.3)", color:"#7DC47D", border:"1px solid rgba(90,155,90,0.5)",
            padding:"8px", fontFamily:fonts.condensed, fontSize:13, fontWeight:700,
            letterSpacing:2, textTransform:"uppercase", cursor:"pointer" }}>
            ✅ {pr.status === "partial" ? "UPDATE GR" : "MARK GR"}
          </button>
        </div>
      )}
    </div>
  );
};

// ─── DATA ────────────────────────────────────────────────────────

const PR_DATA = [
  { id:"PR-2025-034", title:"Office Supplies & Stationery Q1", status:"pending", statusLabel:"PENDING GR",
    meta:[{label:"DATE",value:"08 MAR 25"},{label:"ITEMS",value:"6"},{label:"AMT",value:"$1,240"}] },
  { id:"PR-2025-031", title:"IT Equipment — Laptops & Peripherals", status:"partial", statusLabel:"PARTIAL GR",
    meta:[{label:"DATE",value:"02 MAR 25"},{label:"ITEMS",value:"4 / 6"},{label:"AMT",value:"$12,400"}] },
  { id:"PR-2025-028", title:"Medical Supplies Restock — Bay A", status:"complete", statusLabel:"GR COMPLETE",
    meta:[{label:"DATE",value:"22 FEB 25"},{label:"ITEMS",value:"8 / 8"},{label:"AMT",value:"$3,860"}] },
];

const GR_ITEMS_INIT = [
  { id:1, name:"A4 Paper — 80gsm (Box)", qty:"10 boxes", unit:"$12.00/ea", price:"$120", checked:true },
  { id:2, name:"Whiteboard Markers (Set)", qty:"20 sets", unit:"$8.50/ea", price:"$170", checked:true },
  { id:3, name:"Lever Arch Files (Blue)", qty:"50 pcs", unit:"$3.20/ea", price:"$160", checked:false },
  { id:4, name:"Correction Tape (Bulk Pk)", qty:"30 pcs", unit:"$2.80/ea", price:"$84", checked:false },
  { id:5, name:"Ballpoint Pens — Blue (Box)", qty:"5 boxes", unit:"$15.00/ea", price:"$75", checked:true },
  { id:6, name:"Stapler + Staples Set", qty:"10 sets", unit:"$18.50/ea", price:"$185", checked:false },
];

const LINE_ITEMS = [
  { num:"01", name:"Industrial Mop Set (x5)", meta:"QTY: 5 · UNIT $18.00", price:"$90" },
  { num:"02", name:"Disinfectant Concentrate 5L", meta:"QTY: 10 · UNIT $22.50", price:"$225" },
  { num:"03", name:"Refuse Bags (Box)", meta:"QTY: 20 · UNIT $4.80", price:"$96" },
];

// ─── SCREENS ─────────────────────────────────────────────────────

const LoginScreen = ({ onLogin }) => {
  const [role, setRole] = useState("FA");
  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100%", background:C.oliveDark }}>
      <div style={{ background:`linear-gradient(180deg,#1A1C10 0%,${C.oliveDark} 100%)`,
        padding:"50px 24px 32px", textAlign:"center" }}>
        <StatusBar />
        <div style={{ width:72, height:72, background:C.oliveMid, border:`2px solid ${C.amber}`,
          borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 16px", fontSize:28, boxShadow:`0 0 24px rgba(212,160,23,0.3)` }}>🪖</div>
        <div style={{ fontFamily:fonts.condensed, fontSize:26, fontWeight:800, color:C.cream,
          letterSpacing:5, textTransform:"uppercase" }}>FINOPS</div>
        <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.amber, letterSpacing:3,
          marginTop:4, textTransform:"uppercase" }}>ARMY FINANCIAL TRACKER SYSTEM</div>
      </div>

      <div style={{ flex:1, padding:"24px 20px" }}>
        <div style={{ background:C.amber, color:C.oliveDark, fontFamily:fonts.condensed,
          fontSize:10, fontWeight:700, letterSpacing:3, textAlign:"center", padding:5,
          textTransform:"uppercase", marginBottom:24 }}>⚠ AUTHORISED PERSONNEL ONLY ⚠</div>

        {[{label:"Service Number", val:"S8821043B", type:"text"},
          {label:"Password", val:"••••••••", type:"password"}].map(f => (
          <div key={f.label} style={{ marginBottom:14 }}>
            <label style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted,
              letterSpacing:2, textTransform:"uppercase", marginBottom:6, display:"block" }}>{f.label}</label>
            <input readOnly defaultValue={f.val} type={f.type} style={{ width:"100%",
              background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`,
              borderLeft:`3px solid ${C.oliveLight}`, padding:"11px 14px", color:C.cream,
              fontFamily:fonts.body, fontSize:14, outline:"none" }} />
          </div>
        ))}

        <label style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted,
          letterSpacing:2, textTransform:"uppercase", marginBottom:8, display:"block" }}>SELECT ROLE</label>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
          {[{key:"FA",icon:"📋",name:"Fin Asst",desc:"Create PRs & Line Items"},
            {key:"ACO",icon:"📦",name:"ACO",desc:"Mark Goods Received"}].map(r => (
            <div key={r.key} onClick={() => setRole(r.key)} style={{ background:"rgba(0,0,0,0.3)",
              border:`1px solid ${role===r.key ? C.amber : C.border}`,
              background: role===r.key ? "rgba(212,160,23,0.1)" : "rgba(0,0,0,0.3)",
              padding:"14px 10px", textAlign:"center", cursor:"pointer", position:"relative" }}>
              {role===r.key && <span style={{ position:"absolute", top:6, right:8,
                fontSize:10, color:C.amber }}>✓</span>}
              <div style={{ fontSize:22, marginBottom:6 }}>{r.icon}</div>
              <div style={{ fontFamily:fonts.condensed, fontSize:13, fontWeight:700,
                color:C.cream, letterSpacing:1, textTransform:"uppercase" }}>{r.name}</div>
              <div style={{ fontSize:9, color:C.textMuted, marginTop:3,
                fontFamily:fonts.mono }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <button onClick={() => onLogin(role)} style={{ width:"100%", background:C.amber,
          color:C.oliveDark, border:"none", padding:14, fontFamily:fonts.condensed,
          fontSize:16, fontWeight:800, letterSpacing:3, textTransform:"uppercase", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          🔓 AUTHENTICATE
        </button>

        <div style={{ marginTop:20, borderTop:`1px solid ${C.border}`, paddingTop:12, textAlign:"center" }}>
          <p style={{ fontFamily:fonts.mono, fontSize:8, color:C.oliveMuted, letterSpacing:1,
            lineHeight:1.6, textTransform:"uppercase" }}>
            All activities are monitored and logged<br/>Unauthorised access is an offence
          </p>
        </div>
      </div>
    </div>
  );
};

// ── FA Dashboard ──
const FADashboard = ({ onNav, onCreatePR, onOpenPR, onSwitchRole }) => (
  <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
    <StatusBar />
    <TopBar role="FIN ASST" rank="CPL" onSwitchRole={onSwitchRole} />
    <div style={{ flex:1, overflowY:"auto", padding:16, background:C.oliveDark }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div>
          <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted,
            letterSpacing:2, textTransform:"uppercase" }}>CPL // S4 BRANCH</div>
          <div style={{ fontFamily:fonts.condensed, fontSize:20, fontWeight:700,
            color:C.cream, textTransform:"uppercase", letterSpacing:1 }}>TAN WEI LIANG</div>
        </div>
        <div style={{ background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`, padding:"8px 10px", textAlign:"center" }}>
          <div style={{ fontFamily:fonts.mono, fontSize:10, color:C.tan, letterSpacing:1 }}>FY 2025/26</div>
          <div style={{ fontFamily:fonts.mono, fontSize:8, color:C.textMuted, letterSpacing:1 }}>Q4 OCT–MAR</div>
        </div>
      </div>

      {/* Budget */}
      <div style={{ background:"rgba(0,0,0,0.25)", border:`1px solid ${C.border}`, padding:14, marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:8 }}>
          <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.textMuted, letterSpacing:2, textTransform:"uppercase" }}>TOTAL BUDGET UTILISED</div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:fonts.condensed, fontSize:18, fontWeight:700, color:C.cream }}>$48,250</div>
            <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.textMuted }}>of $78,000 allocated</div>
          </div>
        </div>
        <div style={{ height:6, background:"rgba(0,0,0,0.4)", border:`1px solid ${C.border}`, marginBottom:6 }}>
          <div style={{ height:"100%", width:"62%", background:`linear-gradient(90deg,${C.oliveLight},${C.amber})` }} />
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", fontFamily:fonts.mono, fontSize:8, color:C.textMuted, letterSpacing:1 }}>
          <span>UTILISED 61.9%</span><span>REMAINING $29,750</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:20 }}>
        {[{val:"7",label:"Active PRs",color:C.amber},{val:"14",label:"GR'd Items",color:C.greenBright},{val:"3",label:"Pending GR",color:"#8B4444"}].map(s => (
          <div key={s.label} style={{ background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`,
            borderTop:`2px solid ${s.color}`, padding:"12px 10px", textAlign:"center" }}>
            <div style={{ fontFamily:fonts.condensed, fontSize:22, fontWeight:800, color:C.cream, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontFamily:fonts.mono, fontSize:8, color:C.textMuted, letterSpacing:1, textTransform:"uppercase", marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Alert */}
      <div style={{ background:"rgba(212,160,23,0.1)", border:`1px solid rgba(212,160,23,0.3)`,
        borderLeft:`3px solid ${C.amber}`, padding:"10px 12px", marginBottom:14,
        display:"flex", alignItems:"center", gap:8 }}>
        <span>⚠️</span>
        <span style={{ fontFamily:fonts.mono, fontSize:9, color:C.tan, letterSpacing:.5, lineHeight:1.5 }}>
          PR-2025-031 has 2 items pending<br/>Goods Receipt confirmation.
        </span>
      </div>

      <SectionHeader title="RECENT PRs" action="VIEW ALL →" />
      {PR_DATA.map(pr => <PRCard key={pr.id} pr={pr} onOpen={() => onOpenPR(pr)} />)}

      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
        <button onClick={onCreatePR} style={{ width:48, height:48, background:C.amber, border:"none",
          borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:24, color:C.oliveDark, boxShadow:`0 4px 16px rgba(212,160,23,0.4)`, cursor:"pointer", fontWeight:"bold" }}>+</button>
      </div>
    </div>
    <BottomNav active="home" onNav={onNav}
      items={[{key:"home",icon:"🏠",label:"Dashboard"},{key:"prs",icon:"📋",label:"My PRs",notif:true},
              {key:"reports",icon:"📊",label:"Reports"},{key:"settings",icon:"⚙️",label:"Settings"}]} />
  </div>
);

// ── Create PR ──
const CreatePRScreen = ({ onBack }) => (
  <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
    <StatusBar />
    <BackBar title="NEW PR" sub="PURCHASE REQUEST" role="FIN ASST" onBack={onBack} />
    <div style={{ flex:1, overflowY:"auto", padding:16, background:C.oliveDark }}>
      <div style={{ background:C.amber, color:C.oliveDark, fontFamily:fonts.condensed, fontSize:10,
        fontWeight:700, letterSpacing:3, textAlign:"center", padding:5, textTransform:"uppercase", marginBottom:14 }}>
        AUTO-ID: PR-2025-035
      </div>

      <div style={{ background:"rgba(0,0,0,0.2)", border:`1px solid ${C.border}`, padding:14, marginBottom:12 }}>
        <div style={{ fontFamily:fonts.condensed, fontSize:12, fontWeight:700, color:C.oliveMuted,
          letterSpacing:2, textTransform:"uppercase", marginBottom:12, paddingBottom:6,
          borderBottom:`1px solid ${C.border}` }}>📋 PR DETAILS</div>

        {[{label:"PR Title / Description",val:"Cleaning Equipment & Supplies",type:"text"},].map(f=>(
          <div key={f.label} style={{ marginBottom:14 }}>
            <label style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:2,
              textTransform:"uppercase", marginBottom:6, display:"block" }}>{f.label}</label>
            <input readOnly defaultValue={f.val} style={{ width:"100%", background:"rgba(0,0,0,0.3)",
              border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.oliveLight}`,
              padding:"11px 14px", color:C.cream, fontFamily:fonts.body, fontSize:13, outline:"none" }} />
          </div>
        ))}

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
          {[{label:"Department",val:"S4 BRANCH"},{label:"Priority",val:"ROUTINE"}].map(f=>(
            <div key={f.label}>
              <label style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:2,
                textTransform:"uppercase", marginBottom:6, display:"block" }}>{f.label}</label>
              <select style={{ width:"100%", background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${C.oliveLight}`, padding:"11px 14px", color:C.cream,
                fontFamily:fonts.body, fontSize:13, outline:"none", appearance:"none" }}>
                <option>{f.val}</option>
              </select>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:2,
            textTransform:"uppercase", marginBottom:6, display:"block" }}>Budget Head</label>
          <select style={{ width:"100%", background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`,
            borderLeft:`3px solid ${C.oliveLight}`, padding:"11px 14px", color:C.cream,
            fontFamily:fonts.body, fontSize:13, outline:"none", appearance:"none" }}>
            <option>OE-MISC // OPERATIONAL EXPENSES</option>
          </select>
        </div>

        <div>
          <label style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:2,
            textTransform:"uppercase", marginBottom:6, display:"block" }}>Remarks</label>
          <textarea readOnly defaultValue="Monthly cleaning supplies restocking for HQ building and training bays. Approved by OC."
            style={{ width:"100%", background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`,
            borderLeft:`3px solid ${C.oliveLight}`, padding:"11px 14px", color:C.cream,
            fontFamily:fonts.body, fontSize:13, outline:"none", resize:"none", height:70, lineHeight:1.5 }} />
        </div>
      </div>

      <SectionHeader title="LINE ITEMS" action="3 ITEMS" />

      {LINE_ITEMS.map(item => (
        <div key={item.num} style={{ background:"rgba(0,0,0,0.25)", border:`1px solid ${C.border}`,
          padding:"10px 12px", marginBottom:8, display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:24, height:24, background:C.oliveBase, border:`1px solid ${C.borderBright}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:fonts.mono, fontSize:10, color:C.tan, flexShrink:0 }}>{item.num}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:600, color:C.cream, marginBottom:2 }}>{item.name}</div>
            <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.textMuted }}>{item.meta}</div>
          </div>
          <div style={{ fontFamily:fonts.condensed, fontSize:15, fontWeight:700, color:C.tan }}>{item.price}</div>
        </div>
      ))}

      <button style={{ width:"100%", border:`1px dashed ${C.oliveMuted}`, background:"rgba(74,78,48,0.1)",
        padding:12, color:C.oliveMuted, fontFamily:fonts.condensed, fontSize:13, letterSpacing:2,
        textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center",
        justifyContent:"center", gap:6, marginBottom:14 }}>＋ ADD LINE ITEM</button>

      <div style={{ background:"rgba(212,160,23,0.08)", border:`1px solid rgba(212,160,23,0.2)`,
        padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <span style={{ fontFamily:fonts.condensed, fontSize:13, fontWeight:700, color:C.tan,
          letterSpacing:2, textTransform:"uppercase" }}>TOTAL AMOUNT</span>
        <span style={{ fontFamily:fonts.condensed, fontSize:22, fontWeight:800, color:C.amber }}>$411.00</span>
      </div>

      <button style={{ width:"100%", background:C.amber, color:C.oliveDark, border:"none", padding:14,
        fontFamily:fonts.condensed, fontSize:16, fontWeight:800, letterSpacing:3, textTransform:"uppercase",
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:8 }}>
        📤 SUBMIT PR
      </button>
      <button style={{ width:"100%", background:"transparent", color:C.tan, border:`1px solid ${C.borderBright}`,
        padding:12, fontFamily:fonts.condensed, fontSize:14, fontWeight:600, letterSpacing:2,
        textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center",
        justifyContent:"center", gap:8 }}>💾 SAVE AS DRAFT</button>
    </div>
  </div>
);

// ── ACO Dashboard ──
const ACODashboard = ({ onNav, onOpenGR, onSwitchRole }) => {
  const [activeTab, setActiveTab] = useState("ALL");
  const tabs = ["ALL (7)","PENDING (3)","PARTIAL (2)","GR'D (2)"];
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <StatusBar />
      <TopBar role="ACO" rank="SGT" onSwitchRole={onSwitchRole} />
      <div style={{ flex:1, overflowY:"auto", padding:16, background:C.oliveDark }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:2, textTransform:"uppercase" }}>SGT // ACO — S4</div>
            <div style={{ fontFamily:fonts.condensed, fontSize:20, fontWeight:700, color:C.cream, textTransform:"uppercase", letterSpacing:1 }}>LIM HONG KIAT</div>
          </div>
          <div style={{ background:"rgba(58,107,58,0.1)", border:"1px solid rgba(90,155,90,0.3)", padding:"8px 10px", textAlign:"center" }}>
            <div style={{ fontFamily:fonts.condensed, fontSize:20, fontWeight:800, color:"#7DC47D" }}>3</div>
            <div style={{ fontFamily:fonts.mono, fontSize:8, color:C.textMuted, letterSpacing:1 }}>PENDING GR</div>
          </div>
        </div>

        <div style={{ background:"rgba(0,0,0,0.3)", border:`2px dashed ${C.oliveLight}`, padding:20,
          textAlign:"center", marginBottom:14, cursor:"pointer" }}>
          <div style={{ fontSize:32, marginBottom:6 }}>📷</div>
          <div style={{ fontFamily:fonts.condensed, fontSize:14, fontWeight:700, color:C.oliveMuted, letterSpacing:2, textTransform:"uppercase" }}>SCAN QR / BARCODE</div>
          <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.textMuted, marginTop:4 }}>Scan delivery order to auto-match PR</div>
        </div>

        <div style={{ display:"flex", border:`1px solid ${C.border}`, marginBottom:14, overflow:"hidden" }}>
          {tabs.map(t => (
            <div key={t} onClick={() => setActiveTab(t)} style={{ flex:1, padding:"8px 4px", textAlign:"center",
              fontFamily:fonts.mono, fontSize:9, letterSpacing:1, textTransform:"uppercase", cursor:"pointer",
              borderRight:`1px solid ${C.border}`,
              background: activeTab===t ? "rgba(212,160,23,0.15)" : "rgba(0,0,0,0.2)",
              color: activeTab===t ? C.amber : C.textMuted }}>
              {t.replace(/ \(\d+\)/,"")}
            </div>
          ))}
        </div>

        <SectionHeader title="PURCHASE REQUESTS" />
        {PR_DATA.map(pr => <PRCard key={pr.id} pr={pr} showAction onAction={() => onOpenGR(pr)} onOpen={() => onOpenGR(pr)} />)}
      </div>
      <BottomNav active="home" onNav={onNav}
        items={[{key:"home",icon:"🏠",label:"Dashboard"},{key:"queue",icon:"📦",label:"GR Queue",notif:true},
                {key:"scan",icon:"📷",label:"Scan"},{key:"history",icon:"📜",label:"History"}]} />
    </div>
  );
};

// ── GR Detail ──
const GRDetailScreen = ({ pr, onBack }) => {
  const [items, setItems] = useState(GR_ITEMS_INIT);
  const toggle = id => setItems(items.map(i => i.id===id ? {...i, checked:!i.checked} : i));
  const received = items.filter(i=>i.checked).length;
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <StatusBar />
      <BackBar title="GOODS RECEIPT" sub={pr?.id || "PR-2025-034"} role="ACO" onBack={onBack} />
      <div style={{ flex:1, overflowY:"auto", padding:16, background:C.oliveDark }}>
        {/* PR Info */}
        <div style={{ background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`, padding:14, marginBottom:10 }}>
          <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.textMuted, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>PR INFORMATION</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[{l:"RAISED BY",v:"CPL Tan Wei Liang"},{l:"DATE RAISED",v:"08 MAR 2025"},
              {l:"SUPPLIER",v:"Office Plaza Pte Ltd"},{l:"TOTAL VALUE",v:"$1,240.00",amber:true}].map(r=>(
              <div key={r.l}>
                <div style={{ fontFamily:fonts.mono, fontSize:8, color:C.oliveMuted, letterSpacing:1, textTransform:"uppercase", marginBottom:3 }}>{r.l}</div>
                <div style={{ fontFamily: r.amber ? fonts.condensed : fonts.body, fontSize: r.amber ? 15 : 12,
                  fontWeight: r.amber ? 800 : 600, color: r.amber ? C.amber : C.cream }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <SectionHeader title="LINE ITEMS" action="TAP TO TOGGLE" />

        <div style={{ background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`, padding:14, marginBottom:10 }}>
          {items.map((item, idx) => (
            <div key={item.id} onClick={() => toggle(item.id)} style={{ display:"flex", alignItems:"center",
              gap:10, padding:"10px 0", borderBottom: idx<items.length-1 ? `1px solid ${C.border}` : "none",
              cursor:"pointer" }}>
              <div style={{ width:20, height:20, flexShrink:0, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:11,
                background: item.checked ? "rgba(58,107,58,0.3)" : "rgba(0,0,0,0.3)",
                border: `2px solid ${item.checked ? C.greenBright : C.oliveLight}`,
                color: "#7DC47D" }}>{item.checked ? "✓" : "—"}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:600, color:C.cream, marginBottom:2 }}>{item.name}</div>
                <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.textMuted }}>
                  {item.qty} · {item.unit} ·{" "}
                  <span style={{ color: item.checked ? C.greenBright : C.amber }}>
                    {item.checked ? "RECEIVED" : "PENDING"}
                  </span>
                </div>
              </div>
              <div style={{ fontFamily:fonts.condensed, fontSize:14, fontWeight:700,
                color: item.checked ? "#7DC47D" : C.tan }}>{item.price}</div>
            </div>
          ))}
        </div>

        <div style={{ background:"rgba(58,107,58,0.15)", border:"1px solid rgba(90,155,90,0.3)",
          padding:"10px 14px", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:16 }}>📋</span>
          <span style={{ fontFamily:fonts.mono, fontSize:9, color:"#7DC47D", letterSpacing:1, lineHeight:1.4 }}>
            {received} of {items.length} items marked received<br/>GR by SGT Lim · 10 MAR 25 09:41
          </span>
        </div>

        <div style={{ marginBottom:12 }}>
          <label style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:2,
            textTransform:"uppercase", marginBottom:6, display:"block" }}>GR Remarks (optional)</label>
          <textarea readOnly defaultValue="Partial delivery. Remaining items backordered. Expected next week."
            style={{ width:"100%", background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`,
            borderLeft:`3px solid ${C.oliveLight}`, padding:"11px 14px", color:C.cream,
            fontFamily:fonts.body, fontSize:13, outline:"none", resize:"none", height:54, lineHeight:1.5 }} />
        </div>

        <button style={{ width:"100%", background:"rgba(58,107,58,0.3)", color:"#7DC47D",
          border:"1px solid rgba(90,155,90,0.5)", padding:"10px 14px", fontFamily:fonts.condensed,
          fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", cursor:"pointer",
          display:"flex", alignItems:"center", gap:6, justifyContent:"center", marginBottom:8 }}>
          ✅ CONFIRM GOODS RECEIVED
        </button>
        <button style={{ width:"100%", background:"rgba(139,32,32,0.2)", color:"#E07070",
          border:"1px solid rgba(139,32,32,0.4)", padding:"10px 14px", fontFamily:fonts.condensed,
          fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", cursor:"pointer",
          display:"flex", alignItems:"center", gap:6, justifyContent:"center" }}>
          ❌ RAISE DISCREPANCY
        </button>
      </div>
    </div>
  );
};

// ─── PHONE FRAME WRAPPER ─────────────────────────────────────────

const PhoneFrame = ({ children }) => (
  <div style={{ width:320, height:650, background:"#0E0F08", borderRadius:44,
    border:"2px solid #3D4128", boxShadow:"0 0 0 1px #1A1C10, 0 24px 80px rgba(0,0,0,0.8)",
    overflow:"hidden", position:"relative", flexShrink:0 }}>
    <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
      width:120, height:28, background:"#0E0F08", borderRadius:"0 0 18px 18px", zIndex:100,
      display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:8, height:8, borderRadius:"50%", background:"#1A2010", border:"1px solid #2C3018" }} />
    </div>
    <div style={{ width:"100%", height:"100%", overflowY:"auto", overflowX:"hidden",
      scrollbarWidth:"none", background:C.oliveDark, display:"flex", flexDirection:"column" }}>
      {children}
    </div>
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("login");
  const [role, setRole] = useState("FA");
  const [selectedPR, setSelectedPR] = useState(null);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setScreen(selectedRole === "FA" ? "fa-dashboard" : "aco-dashboard");
  };

  const handleSwitchRole = () => {
    const newRole = role === "FA" ? "ACO" : "FA";
    setRole(newRole);
    setScreen(newRole === "FA" ? "fa-dashboard" : "aco-dashboard");
  };

  const handleOpenGR = (pr) => {
    setSelectedPR(pr);
    setScreen("gr-detail");
  };

  const renderScreen = () => {
    switch(screen) {
      case "login":       return <LoginScreen onLogin={handleLogin} />;
      case "fa-dashboard":return <FADashboard onNav={()=>{}} onCreatePR={()=>setScreen("create-pr")} onOpenPR={()=>{}} onSwitchRole={handleSwitchRole} />;
      case "create-pr":   return <CreatePRScreen onBack={()=>setScreen("fa-dashboard")} />;
      case "aco-dashboard":return <ACODashboard onNav={()=>{}} onOpenGR={handleOpenGR} onSwitchRole={handleSwitchRole} />;
      case "gr-detail":   return <GRDetailScreen pr={selectedPR} onBack={()=>setScreen("aco-dashboard")} />;
      default:            return <LoginScreen onLogin={handleLogin} />;
    }
  };

  const screenLabels = {
    "login":"01 — Login / Role Select", "fa-dashboard":"02 — FA Dashboard",
    "create-pr":"03 — Create Purchase Request", "aco-dashboard":"04 — ACO: PR List",
    "gr-detail":"05 — ACO: Mark Goods Received"
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #1A1C10; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#1A1C10", display:"flex", flexDirection:"column",
        alignItems:"center", padding:"40px 20px",
        backgroundImage:"radial-gradient(ellipse at 20% 20%, rgba(74,78,48,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(44,47,30,0.4) 0%, transparent 60%)" }}>

        {/* Page Header */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#3D4128",
            border:`1px solid ${C.borderBright}`, padding:"6px 16px", fontFamily:fonts.mono,
            fontSize:11, color:C.tan, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>
            🛡 RESTRICTED — INTERNAL USE ONLY
          </div>
          <div style={{ fontFamily:fonts.condensed, fontSize:42, fontWeight:800, color:C.cream,
            letterSpacing:4, textTransform:"uppercase", lineHeight:1 }}>
            FIN<span style={{ color:C.amber }}>OPS</span>
          </div>
          <div style={{ fontFamily:fonts.mono, fontSize:13, color:C.textMuted, letterSpacing:1, marginTop:6 }}>
            // ARMY FINANCIAL TRACKER — INTERACTIVE PROTOTYPE v1.0
          </div>
        </div>

        {/* Nav Pills */}
        <div style={{ display:"flex", gap:6, marginBottom:32, flexWrap:"wrap", justifyContent:"center" }}>
          {[["login","01 Login"],["fa-dashboard","02 FA Dash"],["create-pr","03 Create PR"],
            ["aco-dashboard","04 ACO List"],["gr-detail","05 GR Detail"]].map(([key,label]) => (
            <button key={key} onClick={() => { setScreen(key); if(key==="gr-detail") setSelectedPR(PR_DATA[0]); }}
              style={{ background: screen===key ? C.amber : "rgba(61,65,40,0.8)",
                color: screen===key ? C.oliveDark : C.tan, border:`1px solid ${screen===key ? C.amber : C.border}`,
                padding:"6px 14px", fontFamily:fonts.mono, fontSize:10, letterSpacing:1,
                textTransform:"uppercase", cursor:"pointer" }}>{label}</button>
          ))}
        </div>

        {/* Phone */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
          <div style={{ fontFamily:fonts.mono, fontSize:10, color:C.oliveMuted, letterSpacing:2,
            textTransform:"uppercase" }}>{screenLabels[screen]}</div>
          <PhoneFrame>{renderScreen()}</PhoneFrame>
          <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:1,
            textAlign:"center", marginTop:4 }}>
            {screen === "login" && "👆 Select a role and tap AUTHENTICATE"}
            {screen === "fa-dashboard" && "👆 Tap + to create PR · Tap role badge to switch roles"}
            {screen === "create-pr" && "👆 Tap ← to go back"}
            {screen === "aco-dashboard" && "👆 Tap a PR card to open GR screen"}
            {screen === "gr-detail" && "👆 Tap items to toggle received status"}
          </div>
        </div>

        <div style={{ marginTop:40, background:"#3D4128", border:`1px solid ${C.borderBright}`,
          padding:"12px 28px", textAlign:"center" }}>
          <div style={{ fontFamily:fonts.mono, fontSize:10, color:C.tan, letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>
            FINOPS // INTERACTIVE PROTOTYPE v1.0
          </div>
          <div style={{ fontFamily:fonts.mono, fontSize:9, color:C.oliveMuted, letterSpacing:1 }}>
            5 SCREENS · 2 ROLES · ROLE SWITCHING · INTERNAL ARMY USE
          </div>
        </div>
      </div>
    </>
  );
}
