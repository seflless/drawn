(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`http://www.w3.org/2000/svg`,t=class{constructor(e){this.seed=e}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}};function n(e,t,n,r,i){return{type:`path`,ops:l(e,t,n,r,i)}}function r(e,t,r){let i=(e||[]).length;if(i>2){let n=[];for(let t=0;t<i-1;t++)n.push(...l(e[t][0],e[t][1],e[t+1][0],e[t+1][1],r));return t&&n.push(...l(e[i-1][0],e[i-1][1],e[0][0],e[0][1],r)),{type:`path`,ops:n}}return i===2?n(e[0][0],e[0][1],e[1][0],e[1][1],r):{type:`path`,ops:[]}}function i(e,t,n,i,a){return function(e,t){return r(e,!0,t)}([[e,t],[e+n,t],[e+n,t+i],[e,t+i]],a)}function a(e,t,n,r,i){return function(e,t,n,r){let[i,a]=f(r.increment,e,t,r.rx,r.ry,1,r.increment*s(.1,s(.4,1,n),n),n),o=d(i,null,n);if(!n.disableMultiStroke){let[i]=f(r.increment,e,t,r.rx,r.ry,1.5,0,n),a=d(i,null,n);o=o.concat(a)}return{estimatedPoints:a,opset:{type:`path`,ops:o}}}(e,t,i,function(e,t,n){let r=Math.sqrt(2*Math.PI*Math.sqrt(((e/2)**2+(t/2)**2)/2)),i=Math.max(n.curveStepCount,n.curveStepCount/Math.sqrt(200)*r),a=2*Math.PI/i,o=Math.abs(e/2),s=Math.abs(t/2),l=1-n.curveFitting;return o+=c(o*l,n),s+=c(s*l,n),{increment:a,rx:o,ry:s}}(n,r,i)).opset}function o(e){return e.randomizer||=new t(e.seed||0),e.randomizer.next()}function s(e,t,n,r=1){return n.roughness*r*(o(n)*(t-e)+e)}function c(e,t,n=1){return s(-e,e,t,n)}function l(e,t,n,r,i,a=!1){let o=a?i.disableMultiStrokeFill:i.disableMultiStroke,s=u(e,t,n,r,i,!0,!1);if(o)return s;let c=u(e,t,n,r,i,!0,!0);return s.concat(c)}function u(e,t,n,r,i,a,s){let l=(e-n)**2+(t-r)**2,u=Math.sqrt(l),d=1;d=u<200?1:u>500?.4:-.0016668*u+1.233334;let f=i.maxRandomnessOffset||0;f*f*100>l&&(f=u/10);let p=f/2,m=.2+.2*o(i),h=i.bowing*i.maxRandomnessOffset*(r-t)/200,g=i.bowing*i.maxRandomnessOffset*(e-n)/200;h=c(h,i,d),g=c(g,i,d);let _=[],v=()=>c(p,i,d),y=()=>c(f,i,d);return a&&(s?_.push({op:`move`,data:[e+v(),t+v()]}):_.push({op:`move`,data:[e+c(f,i,d),t+c(f,i,d)]})),s?_.push({op:`bcurveTo`,data:[h+e+(n-e)*m+v(),g+t+(r-t)*m+v(),h+e+2*(n-e)*m+v(),g+t+2*(r-t)*m+v(),n+v(),r+v()]}):_.push({op:`bcurveTo`,data:[h+e+(n-e)*m+y(),g+t+(r-t)*m+y(),h+e+2*(n-e)*m+y(),g+t+2*(r-t)*m+y(),n+y(),r+y()]}),_}function d(e,t,n){let r=e.length,i=[];if(r>3){let a=[],o=1-n.curveTightness;i.push({op:`move`,data:[e[1][0],e[1][1]]});for(let t=1;t+2<r;t++){let n=e[t];a[0]=[n[0],n[1]],a[1]=[n[0]+(o*e[t+1][0]-o*e[t-1][0])/6,n[1]+(o*e[t+1][1]-o*e[t-1][1])/6],a[2]=[e[t+1][0]+(o*e[t][0]-o*e[t+2][0])/6,e[t+1][1]+(o*e[t][1]-o*e[t+2][1])/6],a[3]=[e[t+1][0],e[t+1][1]],i.push({op:`bcurveTo`,data:[a[1][0],a[1][1],a[2][0],a[2][1],a[3][0],a[3][1]]})}if(t&&t.length===2){let e=n.maxRandomnessOffset;i.push({op:`lineTo`,data:[t[0]+c(e,n),t[1]+c(e,n)]})}}else r===3?(i.push({op:`move`,data:[e[1][0],e[1][1]]}),i.push({op:`bcurveTo`,data:[e[1][0],e[1][1],e[2][0],e[2][1],e[2][0],e[2][1]]})):r===2&&i.push(...l(e[0][0],e[0][1],e[1][0],e[1][1],n));return i}function f(e,t,n,r,i,a,o,s){let l=[],u=[],d=c(.5,s)-Math.PI/2;u.push([c(a,s)+t+.9*r*Math.cos(d-e),c(a,s)+n+.9*i*Math.sin(d-e)]);for(let o=d;o<2*Math.PI+d-.01;o+=e){let e=[c(a,s)+t+r*Math.cos(o),c(a,s)+n+i*Math.sin(o)];l.push(e),u.push(e)}return u.push([c(a,s)+t+r*Math.cos(d+2*Math.PI+.5*o),c(a,s)+n+i*Math.sin(d+2*Math.PI+.5*o)]),u.push([c(a,s)+t+.98*r*Math.cos(d+o),c(a,s)+n+.98*i*Math.sin(d+o)]),u.push([c(a,s)+t+.9*r*Math.cos(d+.5*o),c(a,s)+n+.9*i*Math.sin(d+.5*o)]),[u,l]}function p(e,t){return{maxRandomnessOffset:2,roughness:e===`highlight`?3:1.5,bowing:1,stroke:`#000`,strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:`hachure`,fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,combineNestedSvgPaths:!1,disableMultiStroke:e!==`double`,disableMultiStrokeFill:!1,seed:t}}function m(t,o,s,c,l,u){let d=[],f=s.strokeWidth||2,m=function(e){let t=e.padding;if(t||t===0){if(typeof t==`number`)return[t,t,t,t];if(Array.isArray(t)){let e=t;if(e.length)switch(e.length){case 4:return[...e];case 1:return[e[0],e[0],e[0],e[0]];case 2:return[...e,...e];case 3:return[...e,e[1]];default:return[e[0],e[1],e[2],e[3]]}}}return[5,5,5,5]}(s),h=s.animate===void 0||!!s.animate,g=s.iterations||2,_=+!!s.rtl,v=p(`single`,u);switch(s.type){case`underline`:{let e=o.y+o.h+m[2];for(let t=_;t<g+_;t++)t%2?d.push(n(o.x+o.w,e,o.x,e,v)):d.push(n(o.x,e,o.x+o.w,e,v));break}case`strike-through`:{let e=o.y+o.h/2;for(let t=_;t<g+_;t++)t%2?d.push(n(o.x+o.w,e,o.x,e,v)):d.push(n(o.x,e,o.x+o.w,e,v));break}case`box`:{let e=o.x-m[3],t=o.y-m[0],n=o.w+(m[1]+m[3]),r=o.h+(m[0]+m[2]);for(let a=0;a<g;a++)d.push(i(e,t,n,r,v));break}case`bracket`:{let e=Array.isArray(s.brackets)?s.brackets:s.brackets?[s.brackets]:[`right`],t=o.x-2*m[3],n=o.x+o.w+2*m[1],i=o.y-2*m[0],a=o.y+o.h+2*m[2];for(let s of e){let e;switch(s){case`bottom`:e=[[t,o.y+o.h],[t,a],[n,a],[n,o.y+o.h]];break;case`top`:e=[[t,o.y],[t,i],[n,i],[n,o.y]];break;case`left`:e=[[o.x,i],[t,i],[t,a],[o.x,a]];break;case`right`:e=[[o.x+o.w,i],[n,i],[n,a],[o.x+o.w,a]]}e&&d.push(r(e,!1,v))}break}case`crossed-off`:{let e=o.x,t=o.y,r=e+o.w,i=t+o.h;for(let a=_;a<g+_;a++)a%2?d.push(n(r,i,e,t,v)):d.push(n(e,t,r,i,v));for(let a=_;a<g+_;a++)a%2?d.push(n(e,i,r,t,v)):d.push(n(r,t,e,i,v));break}case`circle`:{let e=p(`double`,u),t=o.w+(m[1]+m[3]),n=o.h+(m[0]+m[2]),r=o.x-m[3]+t/2,i=o.y-m[0]+n/2,s=Math.floor(g/2),c=g-2*s;for(let o=0;o<s;o++)d.push(a(r,i,t,n,e));for(let e=0;e<c;e++)d.push(a(r,i,t,n,v));break}case`highlight`:{let e=p(`highlight`,u);f=.95*o.h;let t=o.y+o.h/2;for(let r=_;r<g+_;r++)r%2?d.push(n(o.x+o.w,t,o.x,t,e)):d.push(n(o.x,t,o.x+o.w,t,e));break}}if(d.length){let n=function(e){let t=[];for(let n of e){let e=``;for(let r of n.ops){let n=r.data;switch(r.op){case`move`:e.trim()&&t.push(e.trim()),e=`M${n[0]} ${n[1]} `;break;case`bcurveTo`:e+=`C${n[0]} ${n[1]}, ${n[2]} ${n[3]}, ${n[4]} ${n[5]} `;break;case`lineTo`:e+=`L${n[0]} ${n[1]} `}}e.trim()&&t.push(e.trim())}return t}(d),r=[],i=[],a=0,o=(e,t,n)=>e.setAttribute(t,n);for(let c of n){let n=document.createElementNS(e,`path`);if(o(n,`d`,c),o(n,`fill`,`none`),o(n,`stroke`,s.color||`currentColor`),o(n,`stroke-width`,``+f),h){let e=n.getTotalLength();r.push(e),a+=e}t.appendChild(n),i.push(n)}if(h){let e=0;for(let t=0;t<i.length;t++){let n=i[t],o=r[t],s=a?o/a*l:0,u=c+e,d=n.style;d.strokeDashoffset=``+o,d.strokeDasharray=``+o,d.animation=`rough-notation-dash ${s}ms ease-out ${u}ms forwards`,e+=s}}}}var h=class{constructor(e,t){this._state=`unattached`,this._resizing=!1,this._seed=Math.floor(Math.random()*2**31),this._lastSizes=[],this._animationDelay=0,this._resizeListener=()=>{this._resizing||(this._resizing=!0,setTimeout(()=>{this._resizing=!1,this._state===`showing`&&this.haveRectsChanged()&&this.show()},400))},this._e=e,this._config=JSON.parse(JSON.stringify(t)),this.attach()}get animate(){return this._config.animate}set animate(e){this._config.animate=e}get animationDuration(){return this._config.animationDuration}set animationDuration(e){this._config.animationDuration=e}get iterations(){return this._config.iterations}set iterations(e){this._config.iterations=e}get color(){return this._config.color}set color(e){this._config.color!==e&&(this._config.color=e,this.refresh())}get strokeWidth(){return this._config.strokeWidth}set strokeWidth(e){this._config.strokeWidth!==e&&(this._config.strokeWidth=e,this.refresh())}get padding(){return this._config.padding}set padding(e){this._config.padding!==e&&(this._config.padding=e,this.refresh())}attach(){if(this._state===`unattached`&&this._e.parentElement){(function(){if(!window.__rno_kf_s){let e=window.__rno_kf_s=document.createElement(`style`);e.textContent=`@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }`,document.head.appendChild(e)}})();let t=this._svg=document.createElementNS(e,`svg`);t.setAttribute(`class`,`rough-annotation`);let n=t.style;n.position=`absolute`,n.top=`0`,n.left=`0`,n.overflow=`visible`,n.pointerEvents=`none`,n.width=`100px`,n.height=`100px`;let r=this._config.type===`highlight`;if(this._e.insertAdjacentElement(r?`beforebegin`:`afterend`,t),this._state=`not-showing`,r){let e=window.getComputedStyle(this._e).position;(!e||e===`static`)&&(this._e.style.position=`relative`)}this.attachListeners()}}detachListeners(){window.removeEventListener(`resize`,this._resizeListener),this._ro&&this._ro.unobserve(this._e)}attachListeners(){this.detachListeners(),window.addEventListener(`resize`,this._resizeListener,{passive:!0}),!this._ro&&`ResizeObserver`in window&&(this._ro=new window.ResizeObserver(e=>{for(let t of e)t.contentRect&&this._resizeListener()})),this._ro&&this._ro.observe(this._e)}haveRectsChanged(){if(this._lastSizes.length){let e=this.rects();if(e.length!==this._lastSizes.length)return!0;for(let t=0;t<e.length;t++)if(!this.isSameRect(e[t],this._lastSizes[t]))return!0}return!1}isSameRect(e,t){let n=(e,t)=>Math.round(e)===Math.round(t);return n(e.x,t.x)&&n(e.y,t.y)&&n(e.w,t.w)&&n(e.h,t.h)}isShowing(){return this._state!==`not-showing`}refresh(){this.isShowing()&&!this.pendingRefresh&&(this.pendingRefresh=Promise.resolve().then(()=>{this.isShowing()&&this.show(),delete this.pendingRefresh}))}show(){switch(this._state){case`unattached`:break;case`showing`:this.hide(),this._svg&&this.render(this._svg,!0);break;case`not-showing`:this.attach(),this._svg&&this.render(this._svg,!1)}}hide(){if(this._svg)for(;this._svg.lastChild;)this._svg.removeChild(this._svg.lastChild);this._state=`not-showing`}remove(){this._svg&&this._svg.parentElement&&this._svg.parentElement.removeChild(this._svg),this._svg=void 0,this._state=`unattached`,this.detachListeners()}render(e,t){let n=this._config;t&&(n=JSON.parse(JSON.stringify(this._config)),n.animate=!1);let r=this.rects(),i=0;r.forEach(e=>i+=e.w);let a=n.animationDuration||800,o=0;for(let t=0;t<r.length;t++){let s=a*(r[t].w/i);m(e,r[t],n,o+this._animationDelay,s,this._seed),o+=s}this._lastSizes=r,this._state=`showing`}rects(){let e=[];if(this._svg)if(this._config.multiline){let t=this._e.getClientRects();for(let n=0;n<t.length;n++)e.push(this.svgRect(this._svg,t[n]))}else e.push(this.svgRect(this._svg,this._e.getBoundingClientRect()));return e}svgRect(e,t){let n=e.getBoundingClientRect(),r=t;return{x:(r.x||r.left)-(n.x||n.left),y:(r.y||r.top)-(n.y||n.top),w:r.width,h:r.height}}};function g(e,t){return new h(e,t)}var _=document.getElementById(`app`);_.innerHTML=`
  <main class="article-shell">
    <article class="article">
      <!--
      <p class="eyebrow">Draft markup demo</p> -->
      <h1>
        How readers <span class="annotate-highlighted">learn from notes</span> <span class="annotate-underlined">in the margin</span>
      </h1>

      <p class="lede">
        A good annotation does more than <span class="annotate-boxed">decorate a page</span>.
        It slows the reader down at the exact moment a sentence deserves a
        <span class="annotate-circled">second look</span>.
      </p>

      <p>
        When students study an essay, they
        <span class="annotate-highlighted">rarely move</span> in a straight line
        from the first word to the last. They <span class="annotate-underlined">circle claims</span>,
        underline the <span class="annotate-boxed">evidence</span>, and leave small arguments
        with the author in the margin. The page becomes a record of attention
        rather than a <span class="annotate-crossed-off">passive block of text</span>.
      </p>

      <p>
        This demo treats that familiar habit as an <span class="annotate-boxed">interface pattern</span>.
        The browser still renders <span class="annotate-underlined">ordinary HTML</span>, but the
        marks arrive like a professor reading with a red pen:
        <span class="annotate-circled">find the thesis</span>, question the weak parts,
        and make the <span class="annotate-highlighted">strongest ideas</span> easier to return to.
      </p>

      <section class="paper-note">
        <h2>1. Mark the <span class="annotate-underlined">claim</span> before the evidence</h2>
        <p>
          Readers need a <span class="annotate-boxed">clear place</span> to begin. In a draft,
          that usually means identifying the sentence that makes the piece accountable:
          good notes turn attention into a <span class="annotate-highlighted">visible trail</span>.
          Once the claim is visible, the rest of the paragraph can be
          <span class="annotate-circled">judged against it</span>.
        </p>
        <p>
          A teacher might underline the next sentence and ask whether it actually
          <span class="annotate-underlined">supports the claim</span>. A designer might use
          the same motion to guide someone through a <span class="annotate-boxed">product tour</span>
          without adding <span class="annotate-crossed-off">another panel or tooltip</span>.
        </p>
      </section>

      <section class="paper-note">
        <h2>2. Use friction where the draft gets <span class="annotate-circled">vague</span></h2>
        <p>
          The easiest <span class="annotate-underlined">sentences to ignore</span> are often
          the ones most in need of review: "this improves engagement,"
          <span class="annotate-boxed">"users love it,"</span> or
          <span class="annotate-crossed-off">the experience is simply better</span>.
          Crossing out that kind of phrase creates useful friction. It says the
          idea may be right, but the writing has not <span class="annotate-circled">earned it yet</span>.
        </p>
        <p>
          The same <span class="annotate-highlighted">visual language</span> works for studying.
          A reader can mark the line where an author jumps from
          <span class="annotate-underlined">observation to conclusion</span>, then return later
          with a <span class="annotate-circled">sharper question</span>.
        </p>
      </section>

      <aside class="margin-callout annotate-bracketed">
        The most useful marks are not always the loudest marks.
        Brackets are good for paragraphs that need to be
        reconsidered as a whole.
      </aside>

      <section class="paper-note">
        <h2>3. Box terms that need <span class="annotate-boxed">definition</span></h2>
        <p>
          Some words <span class="annotate-underlined">carry more weight</span> than the sentence admits.
          If a post says a system is <span class="annotate-boxed">agentic</span>, the reader
          deserves to know whether that means <span class="annotate-highlighted">autonomous planning</span>,
          tool use, background work, or merely a <span class="annotate-crossed-off">conversational wrapper</span>
          around a form.
        </p>
        <p>
          A quick box makes the term feel <span class="annotate-circled">pending</span>.
          It is a compact way to say: <span class="annotate-underlined">define this</span>
          before asking the reader to build on it.
        </p>
      </section>

      <section class="paper-note">
        <h2>4. Let emphasis arrive with the <span class="annotate-underlined">scroll</span></h2>
        <p>
          If every mark appears on page load, the annotations become a
          <span class="annotate-crossed-off">screenshot</span>. If each mark starts as the
          relevant passage <span class="annotate-highlighted">scrolls into view</span>, the page
          feels like it is being read <span class="annotate-circled">in real time</span>. That timing makes
          the effect <span class="annotate-underlined">part of the explanation</span>,
          not just a layer on top of it.
        </p>
        <p>
          This is the behavior the prototype should preserve as it grows into a
          <span class="annotate-boxed">component collection</span>: effects should be attachable
          to <span class="annotate-underlined">real content</span> and triggered by reading position,
          interaction, or an <span class="annotate-circled">explicit sequence</span>.
        </p>
      </section>

      <section class="paper-note">
        <h2>5. Show revision as a <span class="annotate-highlighted">visible act</span></h2>
        <p>
          A marked-up page can be more honest than a
          <span class="annotate-crossed-off">polished final version</span>. It can show where
          an <span class="annotate-boxed">editor paused</span>, where a student noticed a pattern,
          and where the <span class="annotate-underlined">argument changed direction</span>.
          The goal is not to imitate paper for its own sake; the goal is to
          <span class="annotate-circled">make attention visible</span>.
        </p>
        <p>
          That is why a simple phrase like
          <span class="annotate-struck">obviously true</span> benefits from a strike.
          The mark gives the writer a <span class="annotate-highlighted">concrete next step</span>:
          replace <span class="annotate-crossed-off">certainty</span> with
          <span class="annotate-underlined">evidence</span>.
        </p>
      </section>
    </article>
  </main>
`;var v=`rgba(219, 28, 28,0.8)`,y=`rgba(255, 232, 28, 0.61)`,b=3,x=90,S=0,C=0,w=120,T=180,E=[{selector:`.annotate-circled`,config:{type:`circle`,color:v,multiline:!0,strokeWidth:b,padding:5,iterations:2,animationDuration:550}},{selector:`.annotate-highlighted`,config:{type:`highlight`,color:y,multiline:!0,iterations:1,padding:0,animationDuration:650}},{selector:`.annotate-crossed-off`,config:{type:`crossed-off`,color:v,multiline:!0,strokeWidth:b,padding:4,iterations:2,animationDuration:450}},{selector:`.annotate-bracketed`,config:{type:`bracket`,color:v,strokeWidth:b,padding:8,iterations:1,animationDuration:650,brackets:[`left`,`right`]}},{selector:`.annotate-boxed`,config:{type:`box`,color:v,multiline:!0,strokeWidth:b,padding:0,iterations:2,animationDuration:400}},{selector:`.annotate-underlined`,config:{type:`underline`,color:v,multiline:!0,strokeWidth:b,padding:2,iterations:2,animationDuration:450}},{selector:`.annotate-struck`,config:{type:`strike-through`,color:v,multiline:!0,strokeWidth:b,padding:2,iterations:2,animationDuration:450}}];function D(){let e=E.map(({selector:e})=>e).join(`,`);return[..._.querySelectorAll(e)].map((e,t)=>{let n=E.find(({selector:t})=>e.matches(t));if(!n)throw Error(`Missing annotation config for target element.`);let{config:r}=n,i=g(e,r);return e.previousElementSibling&&e.previousElementSibling.setAttribute(`data-annotation-type`,r.type),{element:e,annotation:i,duration:Number(r.animationDuration)||0,order:t,status:`pending`,visible:!1}})}function O(e){let t=e.getBoundingClientRect(),n=window.innerHeight;return t.bottom>w&&t.top<n-T}function k(e){return new Promise(t=>{window.setTimeout(t,e)})}function A(){return S+Math.random()*(C-S)}function j(e){let t;async function n(){if(t)return;let i=e.filter(e=>e.status===`pending`&&e.visible&&O(e.element)).sort((e,t)=>e.order-t.order)[0];if(i){if(t=i,i.status=`waiting`,await k(A()),!i.visible||!O(i.element)){i.status=`pending`,t=void 0,n();return}i.status=`drawing`,i.annotation.show(),await k(i.duration+x),i.status=`shown`,r.unobserve(i.element),t=void 0,n()}}let r=new IntersectionObserver(t=>{t.forEach(t=>{let n=e.find(({element:e})=>e===t.target);!n||n.status===`shown`||(n.visible=t.isIntersecting)}),n()},{threshold:.2,rootMargin:`0px 0px -8% 0px`});e.forEach(({element:e})=>r.observe(e)),n()}async function M(){await document.fonts.ready,j(D())}document.addEventListener(`DOMContentLoaded`,M);