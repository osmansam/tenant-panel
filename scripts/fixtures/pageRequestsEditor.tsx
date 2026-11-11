import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import PageRequestsEditor from "../../src/components/PageDesigner/PageRequestsEditor";
import type {PageModel} from "../../src/utils/api/page";
import "../../src/index.css";
const initial = {"name": "Products", "sections": [{"type": "component", "component": {"id": "table", "type": "table", "title": "Products table"}}, {"type": "component", "component": {"id": "visual", "type": "custom", "title": "Product cards", "props": {"visualBuilder": {"document": {"root": {"id": "root", "type": "section", "children": [{"id": "products", "type": "repeater", "source": {"kind": "autotable", "schemaName": "products", "limit": 20}, "children": []}]}}}}}}]} as PageModel;
function App(){
 const [page,setPage]=useState<PageModel>(()=>JSON.parse(sessionStorage.getItem("request-qa")||"null")||initial);
 return <main style={{padding:32,maxWidth:1100,margin:"auto"}}><h1>Page request authoring QA</h1><PageRequestsEditor page={page} onChange={setPage}/><button onClick={()=>{sessionStorage.setItem("request-qa",JSON.stringify(page));document.querySelector("#saved")!.textContent="Saved"}}>Save fixture</button><p id="saved"></p><output id="payload" style={{display:"none"}}>{JSON.stringify(page)}</output></main>
}
createRoot(document.getElementById("root")!).render(<App/>);
