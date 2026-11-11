async (page) => {
  const result = await page.evaluate(async () => {
    const host = document.createElement("div"); host.style.cssText = "width:400px;height:200px";
    const canvas = document.createElement("canvas"); canvas.width = 123; canvas.height = 45; host.append(canvas); document.body.append(host);
    const effect = document.createElement("div"); effect.className = "ve-utilities"; effect.style.cssText = "width:400px;height:200px";
    const effectCanvas = document.createElement("canvas"); effectCanvas.width = 123; effectCanvas.height = 45; effect.append(effectCanvas); document.body.append(effect);
    const before = canvas.getBoundingClientRect();
    const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "/src/visual-engine/effects/providers/reactbits/official/backgrounds/Hyperspeed/Hyperspeed.css?direct&t=" + Date.now();
    await new Promise((resolve, reject) => { link.onload = resolve; link.onerror = reject; document.head.append(link); });
    const after = canvas.getBoundingClientRect(); const effectSize = effectCanvas.getBoundingClientRect();
    const result = { before: [before.width, before.height], after: [after.width, after.height], effect: [effectSize.width, effectSize.height] };
    host.remove(); effect.remove(); link.remove(); return result;
  });
  if (result.after[0] !== result.before[0] || result.after[1] !== result.before[1]) throw new Error(`Effect CSS changed an application canvas from ${result.before} to ${result.after}`);
  if (result.effect[0] !== 400 || result.effect[1] !== 200) throw new Error("Effect canvas no longer fills its own surface");
}
