"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Presence = { team: number; region: string; focus: string[] };
const PRESENCE: Record<number, Presence> = {
  566:{team:18,region:"West Africa",focus:["Research","Strategy","Transformation & AI"]},404:{team:8,region:"East Africa",focus:["Data & Insights","Strategy"]},710:{team:7,region:"Southern Africa",focus:["Transformation & AI","Strategy"]},288:{team:6,region:"West Africa",focus:["Research","Strategy"]},686:{team:4,region:"West Africa",focus:["Research","Francophone markets"]},818:{team:4,region:"North Africa",focus:["Research","Policy"]},384:{team:3,region:"West Africa",focus:["Research"]},646:{team:3,region:"East Africa",focus:["Policy","Impact"]},231:{team:3,region:"East Africa",focus:["Impact evaluation"]},834:{team:2,region:"East Africa",focus:["Research"]},800:{team:2,region:"East Africa",focus:["Impact evaluation"]},504:{team:2,region:"North Africa",focus:["Research"]},120:{team:2,region:"Central Africa",focus:["Research"]},894:{team:2,region:"Southern Africa",focus:["Research"]},24:{team:1,region:"Southern Africa",focus:["Field research"]},508:{team:1,region:"Southern Africa",focus:["Field research"]},788:{team:1,region:"North Africa",focus:["Research"]},854:{team:1,region:"West Africa",focus:["Field research"]},768:{team:1,region:"West Africa",focus:["Field research"]},180:{team:1,region:"Central Africa",focus:["Field research"]},
};
const AFRICA = new Set([12,24,204,72,854,108,120,132,140,148,174,178,180,384,262,818,226,232,748,231,266,270,288,324,624,404,426,430,434,450,454,466,478,480,504,508,516,562,566,646,678,686,690,694,706,710,728,729,834,768,788,800,732,894,716]);

type GeoFeature = { id: string | number; properties: { name: string } };
type Topology = { objects: { countries: unknown } };
type D3Api = { geoMercator:()=>{fitExtent:(extent:number[][],features:unknown)=>unknown}; geoPath:(projection:unknown)=>(feature:GeoFeature)=>string; scaleLinear:()=>{domain:(values:number[])=>{range:(values:string[])=>(value:number)=>string}} };
type TopoApi = { feature:(topology:Topology,object:unknown)=>{features:GeoFeature[]} };

function Overview() {
  return <><div className="team-map-kicker">Pan-African presence</div><h3 className="team-map-title">Present in<br />20 markets.</h3><p className="team-map-lead">Our consultants and field researchers are spread across the continent — close to the markets we study. Tap any highlighted country to see our presence there.</p><div className="team-map-stats"><div><b>20</b><span>Markets</span></div><div><b>72+</b><span>Consultants</span></div><div><b>5</b><span>Regions</span></div></div><div className="team-map-legend"><span>Depth of presence</span><i /><div><small>Field reach</small><small>Established</small></div></div></>;
}

export function TeamMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [d3Ready,setD3Ready] = useState(false);
  const [topoReady,setTopoReady] = useState(false);
  const [selected,setSelected] = useState<{code:number;name:string}|null>(null);
  const [failed,setFailed] = useState(false);

  useEffect(()=>{
    if(!d3Ready||!topoReady||!rootRef.current) return;
    const root=rootRef.current; root.replaceChildren(); let cancelled=false;
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(r=>{if(!r.ok)throw new Error();return r.json() as Promise<Topology>}).then(topology=>{
      if(cancelled)return;
      const d3=(window as typeof window&{d3:D3Api}).d3;
      const topojson=(window as typeof window&{topojson:TopoApi}).topojson;
      const features=topojson.feature(topology,topology.objects.countries).features.filter(f=>AFRICA.has(Number(f.id)));
      const projection=d3.geoMercator().fitExtent([[24,24],[736,776]],{type:"FeatureCollection",features});
      const path=d3.geoPath(projection); const shade=d3.scaleLinear().domain([1,18]).range(["#C9B6F0","#32079C"]);
      const svg=document.createElementNS("http://www.w3.org/2000/svg","svg"); svg.setAttribute("viewBox","0 0 760 800"); svg.setAttribute("class","team-africa-svg"); svg.setAttribute("role","img"); svg.setAttribute("aria-label","Map of Native Insight presence across Africa"); root.appendChild(svg);
      features.forEach(feature=>{const code=Number(feature.id),presence=PRESENCE[code],country=document.createElementNS("http://www.w3.org/2000/svg","path"); country.setAttribute("d",path(feature)); country.setAttribute("class",`team-country${presence?" has-presence":""}`); if(presence)country.style.setProperty("--country-color",shade(presence.team)); country.addEventListener("mousemove",event=>{const tip=tipRef.current;if(!tip)return;const rect=root.getBoundingClientRect();tip.style.opacity="1";tip.style.left=`${event.clientX-rect.left}px`;tip.style.top=`${event.clientY-rect.top}px`;tip.innerHTML=`<b>${feature.properties.name}</b><span>${presence?`${presence.team} consultant${presence.team>1?"s":""} · ${presence.region}`:"Mobilise on demand"}</span>`}); country.addEventListener("mouseleave",()=>{if(tipRef.current)tipRef.current.style.opacity="0"}); country.addEventListener("click",()=>{root.querySelector(".is-selected")?.classList.remove("is-selected");country.classList.add("is-selected");setSelected({code,name:feature.properties.name});if(tipRef.current)tipRef.current.style.opacity="0"}); svg.appendChild(country)});
    }).catch(()=>setFailed(true)); return()=>{cancelled=true};
  },[d3Ready,topoReady]);
  const presence=selected?PRESENCE[selected.code]:undefined;
  const reset=()=>{rootRef.current?.querySelector(".is-selected")?.classList.remove("is-selected");setSelected(null)};
  return <><Script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js" strategy="afterInteractive" onReady={()=>setD3Ready(true)} /><Script src="https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js" strategy="afterInteractive" onReady={()=>setTopoReady(true)} /><div className="team-map-wrap"><div className="team-map-stage"><div ref={rootRef} className="team-map-root">{failed?<div className="team-map-fallback"><b>Pan-African presence</b><p>Present across 20 markets, with field teams ready to mobilise throughout the continent.</p></div>:null}</div><div ref={tipRef} className="team-map-tip" /></div><aside className="team-map-panel" aria-live="polite">{!selected?<Overview />:presence?<><div className="team-map-kicker">{presence.region}</div><h3 className="team-map-title">{selected.name}</h3><div className="team-map-stats two"><div><b>{presence.team}</b><span>Consultants on the ground</span></div><div><b>Active</b><span>Presence status</span></div></div><div className="team-map-focus"><span>Where we focus here</span><div>{presence.focus.map(f=><em key={f}>{f}</em>)}</div></div><button type="button" onClick={reset} className="team-map-back">← Back to overview</button></>:<><div className="team-map-kicker">{selected.name}</div><h3 className="team-map-title small">Not yet a market.</h3><p className="team-map-lead">We don&apos;t have a standing presence in {selected.name} yet — but our pan-African network lets us mobilise field teams quickly.</p><button type="button" onClick={reset} className="team-map-back">← Back to overview</button></>}</aside></div><p className="team-map-caption">Interactive map — hover a country for coverage, click a highlighted country to inspect our presence.</p></>;
}
