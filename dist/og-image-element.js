const t=new WeakMap; const e=e=>typeof e==="function"&&t.has(e); const s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback; const n=function(t,e){const s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}}; const i={}; const r={}; const o=`{{lit-${String(Math.random()).slice(2)}}}`; const a=`\x3c!--${o}--\x3e`; const l=new RegExp(`${o}|${a}`); const h="$lit$";class c{constructor(t,e){this.parts=[],this.element=e;const s=[]; const n=[]; const i=document.createTreeWalker(e.content,133,null,!1);let r=0; let a=-1; let c=0;const{strings:p,values:{length:_}}=t;for(;c<_;){const t=i.nextNode();if(t!==null){if(a++,t.nodeType===1){if(t.hasAttributes()){const e=t.attributes; const {length:s}=e;let n=0;for(let t=0;t<s;t++)d(e[t].name,h)&&n++;for(;n-- >0;){const e=p[c]; const s=m.exec(e)[2]; const n=s.toLowerCase()+h; const i=t.getAttribute(n);t.removeAttribute(n);const r=i.split(l);this.parts.push({type:"attribute",index:a,name:s,strings:r}),c+=r.length-1}}t.tagName==="TEMPLATE"&&(n.push(t),i.currentNode=t.content)}else if(t.nodeType===3){const e=t.data;if(e.indexOf(o)>=0){const n=t.parentNode; const i=e.split(l); const r=i.length-1;for(let e=0;e<r;e++){let s; let r=i[e];if(r==="")s=u();else{const t=m.exec(r);t!==null&&d(t[2],h)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-h.length)+t[3]),s=document.createTextNode(r)}n.insertBefore(s,t),this.parts.push({type:"node",index:++a})}i[r]===""?(n.insertBefore(u(),t),s.push(t)):t.data=i[r],c+=r}}else if(t.nodeType===8)if(t.data===o){const e=t.parentNode;t.previousSibling!==null&&a!==r||(a++,e.insertBefore(u(),t)),r=a,this.parts.push({type:"node",index:a}),t.nextSibling===null?t.data="":(s.push(t),a--),c++}else{let e=-1;for(;(e=t.data.indexOf(o,e+1))!==-1;)this.parts.push({type:"node",index:-1}),c++}}else i.currentNode=n.pop()}for(const t of s)t.parentNode.removeChild(t)}}const d=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e}; const p=t=>t.index!==-1; const u=()=>document.createComment(""); const m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class _{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}

update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}

_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0); const e=[]; const n=this.template.parts; const i=document.createTreeWalker(t,133,null,!1);let r; let o=0; let a=0; let l=i.nextNode();for(;o<n.length;)if(r=n[o],p(r)){for(;a<r.index;)a++,l.nodeName==="TEMPLATE"&&(e.push(l),i.currentNode=l.content),(l=i.nextNode())===null&&(i.currentNode=e.pop(),l=i.nextNode());if(r.type==="node"){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}const f=` ${o} `;class g{constructor(t,e,s,n){this.strings=t,this.values=e,this.type=s,this.processor=n}

getHTML(){const t=this.strings.length-1;let e=""; let s=!1;for(let n=0;n<t;n++){const t=this.strings[n]; const i=t.lastIndexOf("\x3c!--");s=(i>-1||s)&&t.indexOf("--\x3e",i+1)===-1;const r=m.exec(t);e+=r===null?t+(s?f:a):t.substr(0,r.index)+r[1]+r[2]+h+r[3]+o}return e+=this.strings[t]}

getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>t===null||!(typeof t==="object"||typeof t==="function"); const v=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}

_createPart(){return new w(this)}

_getValue(){const t=this.strings; const e=t.length-1;let s="";for(let n=0;n<e;n++){s+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(y(t)||!v(t))s+=typeof t==="string"?t:String(t);else for(const e of t)s+=typeof e==="string"?e:String(e)}}return s+=t[e]}

commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(t){this.value=void 0,this.committer=t}

setValue(t){t===i||y(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}

commit(){for(;e(this.value);){const t=this.value;this.value=i,t(this)}this.value!==i&&this.committer.commit()}}class b{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}

appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}

insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}

appendIntoPart(t){t.__insert(this.startNode=u()),t.__insert(this.endNode=u())}

insertAfterPart(t){t.__insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}

setValue(t){this.__pendingValue=t}

commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}const t=this.__pendingValue;t!==i&&(y(t)?t!==this.value&&this.__commitText(t):t instanceof g?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):v(t)?this.__commitIterable(t):t===r?(this.value=r,this.clear()):this.__commitText(t))}

__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}

__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}

__commitText(t){const e=this.startNode.nextSibling; const s=typeof(t=t==null?"":t)==="string"?t:String(t);e===this.endNode.previousSibling&&e.nodeType===3?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}

__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const s=new _(e,t.processor,this.options); const n=s._clone();s.update(t.values),this.__commitNode(n),this.value=s}}

__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s; let n=0;for(const i of t)void 0===(s=e[n])&&(s=new b(this.options),e.push(s),n===0?s.appendIntoPart(this):s.insertAfterPart(e[n-1])),s.setValue(i),s.commit(),n++;n<e.length&&(e.length=n,this.clear(s&&s.endNode))}

clear(){const t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.startNode;n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,s.length!==2||s[0]!==""||s[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}

setValue(t){this.__pendingValue=t}

commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}if(this.__pendingValue===i)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=i}}class P extends S{constructor(t,e,s){super(t,e,s),this.single=s.length===2&&s[0]===""&&s[1]===""}

_createPart(){return new C(this)}

_getValue(){return this.single?this.parts[0].value:super._getValue()}

commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends w{}let N=!1;try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class A{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=(t=>this.handleEvent(t))}

setValue(t){this.__pendingValue=t}

commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i,t(this)}if(this.__pendingValue===i)return;const t=this.__pendingValue; const s=this.value; const n=t==null||s!=null&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive); const r=t!=null&&(s==null||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=T(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=i}

handleEvent(t){typeof this.value==="function"?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const E=new class{handleAttributeExpressions(t,e,s,n){const i=e[0];return i==="."?new P(t,e.slice(1),s).parts:i==="@"?[new A(t,e.slice(1),n.eventContext)]:i==="?"?[new x(t,e.slice(1),s)]:new S(t,e,s).parts}

handleTextExpression(t){return new b(t)}};function V(t){let e=k.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},k.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(o);return void 0===(s=e.keyString.get(n))&&(s=new c(t,t.getTemplateElement()),e.keyString.set(n,s)),e.stringsArray.set(t.strings,s),s}const k=new Map; const O=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const U=function(t){for(var e=arguments.length,s=new Array(e>1?e-1:0),n=1;n<e;n++)s[n-1]=arguments[n];return new g(t,s,"html",E)}; const R=133;function M(t,e){const{element:{content:s},parts:n}=t; const i=document.createTreeWalker(s,R,null,!1);let r=j(n); let o=n[r]; let a=-1; let l=0;const h=[];let c=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(h.push(t),c===null&&(c=t)),c!==null&&l++;void 0!==o&&o.index===a;)o.index=c!==null?-1:o.index-l,o=n[r=j(n,r)]}h.forEach(t=>t.parentNode.removeChild(t))}const z=t=>{let e=t.nodeType===11?0:1;const s=document.createTreeWalker(t,R,null,!1);for(;s.nextNode();)e++;return e}; const j=function(t){for(let e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1)+1;e<t.length;e++){const s=t[e];if(p(s))return e}return-1};const q=(t,e)=>`${t}--${e}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),F=!1);const $=t=>e=>{const s=q(e.type,t);let n=k.get(s);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},k.set(s,n));let i=n.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(o);if(void 0===(i=n.keyString.get(r))){const s=e.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(s,t),i=new c(e,s),n.keyString.set(r,i)}return n.stringsArray.set(e.strings,i),i}; const I=["html","svg"]; const L=new Set; const B=(t,e,s)=>{L.add(t);const n=s?s.element:document.createElement("template"); const i=e.querySelectorAll("style"); const {length:r}=i;if(r===0)return void window.ShadyCSS.prepareTemplateStyles(n,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=i[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{I.forEach(e=>{const s=k.get(q(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t; const s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),M(t,s)})})})(t);const a=n.content;s?function(t,e){const s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const{element:{content:n},parts:i}=t;if(s==null)return void n.appendChild(e);const r=document.createTreeWalker(n,R,null,!1);let o=j(i); let a=0; let l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=z(e),s.parentNode.insertBefore(e,s));o!==-1&&i[o].index===l;){if(a>0){for(;o!==-1;)i[o].index+=a,o=j(i,o);return}o=j(i,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&l!==null)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),M(s,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return t!==null;case Number:return t===null?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}}; const W=(t,e)=>e!==t&&(e==e||t==t); const J={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W}; const D=Promise.resolve(!0); const G=1; const K=4; const Q=8; const X=16; const Y=32; const Z="finalized";class tt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=D,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}

static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const n=this._attributeNameForProperty(s,e);void 0!==n&&(this._attributeToPropertyMap.set(n,s),t.push(n))}),t}

static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}

static createProperty(t){const e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:J;if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s=typeof t==="symbol"?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const n=this[t];this[s]=e,this._requestUpdate(t,n)},configurable:!0,enumerable:!0})}

static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(Z)||t.finalize(),this[Z]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties; const e=[...Object.getOwnPropertyNames(t),...typeof Object.getOwnPropertySymbols==="function"?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}

static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:typeof s==="string"?s:typeof t==="string"?t.toLowerCase():void 0}

static _valueHasChanged(t,e){return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:W)(t,e)}

static _propertyValueFromAttribute(t,e){const s=e.type; const n=e.converter||H; const i=typeof n==="function"?n:n.fromAttribute;return i?i(t,s):t}

static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type; const n=e.converter;return(n&&n.toAttribute||H.toAttribute)(t,s)}

initialize(){this._saveInstanceProperties(),this._requestUpdate()}

_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}

_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}

connectedCallback(){this._updateState=this._updateState|Y,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}

disconnectedCallback(){}

attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}

_propertyToAttribute(t,e){const s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:J;const n=this.constructor; const i=n._attributeNameForProperty(t,s);if(void 0!==i){const t=n._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|Q,t==null?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=this._updateState&~Q}}

_attributeToProperty(t,e){if(this._updateState&Q)return;const s=this.constructor; const n=s._attributeToPropertyMap.get(t);if(void 0!==n){const t=s._classProperties.get(n)||J;this._updateState=this._updateState|X,this[n]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~X}}

_requestUpdate(t,e){let s=!0;if(void 0!==t){const n=this.constructor; const i=n._classProperties.get(t)||J;n._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}

requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}

async _enqueueUpdate(){let t; let e;this._updateState=this._updateState|K;const s=this._updatePromise;this._updatePromise=new Promise((s,n)=>{t=s,e=n});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();t!=null&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}

get _hasConnected(){return this._updateState&Y}

get _hasRequestedUpdate(){return this._updateState&K}

get hasUpdated(){return this._updateState&G}

performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(e)),this.updated(e))}

_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~K}

get updateComplete(){return this._getUpdateComplete()}

_getUpdateComplete(){return this._updatePromise}

shouldUpdate(t){return!0}

update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}

updated(t){}

firstUpdated(t){}}tt[Z]=!0;const et="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype; const st=Symbol();class nt{constructor(t,e){if(e!==st)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}

get styleSheet(){return void 0===this._styleSheet&&(et?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}

toString(){return this.cssText}}const it=function(t){for(var e=arguments.length,s=new Array(e>1?e-1:0),n=1;n<e;n++)s[n-1]=arguments[n];const i=s.reduce((e,s,n)=>e+(t=>{if(t instanceof nt)return t.cssText;if(typeof t==="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[n+1],t[0]);return new nt(i,st)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const rt=t=>t.flat?t.flat(1/0):function t(e){const s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let n=0,i=e.length;n<i;n++){const i=e[n];Array.isArray(i)?t(i,s):s.push(i)}return s}(t);class ot extends tt{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}

static _getUniqueStyles(){const t=this.styles; const e=[];if(Array.isArray(t)){rt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}

initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}

createRenderRoot(){return this.attachShadow({mode:"open"})}

adoptStyles(){const t=this.constructor._styles;t.length!==0&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?et?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}

connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}

update(t){super.update(t);const e=this.render();e instanceof g&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}

render(){}}ot.finalized=!0,ot.render=((t,e,s)=>{if(!s||typeof s!=="object"||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName; const r=O.has(e); const o=F&&e.nodeType===11&&!!e.host; const a=o&&!L.has(i); const l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let i=O.get(e);void 0===i&&(n(e,e.firstChild),O.set(e,i=new b({templateFactory:V,...s})),i.appendInto(e)),i.setValue(t),i.commit()})(t,l,{templateFactory:$(i),...s}),a){const t=O.get(l);O.delete(l);const s=t.value instanceof _?t.value.template:void 0;B(i,l,s),n(e,e.firstChild),e.appendChild(l),O.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});window.customElements.define("og-image-element",class extends ot{static get styles(){return it`:host{display:block;height:100vh;width:100vw}main{display:flex;align-items:center;justify-content:center;flex-direction:column;height:100%;padding:0 8rem;text-align:center;background:var(--background,#fff);color:var(--fontColor,#000);font-size:var(--fontSize,100%);font-kerning:none;font-feature-settings:normal;hanging-punctuation:allow-end;line-break:loose;hyphens:auto}h1{font-size:var(--headingSize,4em);font-family:var(--headingFont,serif);font-weight:var(--headingWeight,400);font-kerning:normal;font-feature-settings:'palt' 1;line-break:strict;hyphens:manual;margin:0}p{font-size:1.5em}.image-container{margin-bottom:1em;width:100%;height:15%;text-align:center}`}

static get properties(){return{subtitle:{type:String}}}

constructor(){super(),this.subtitle=""}

render(){return U`<main><div class="image-container"><slot name="image"></slot></div><h1><slot name="title"></slot></h1><p>${this.subtitle}</p></main>`}});
// # sourceMappingURL=og-image-element.js.map
