import{p as r,L as S,D as m,d as nt,i as it,a8 as rt,n as K,O as lt,J as st,o as ct,B as dt,e as mt,f as ut,x as pt,v as ht,a4 as J,a9 as ft,aa as gt}from"./twk-main.js";const X=["emitter","i18n","socket","jsApi","tawkWindow","widgetSettings","chatManager","audioPlayer","scheduler","sessionManager","activityMonitor","webStorage","logger"],Q={colorYiq(i){const p=parseInt(i.slice(1,3),16),s=parseInt(i.slice(3,5),16),c=parseInt(i.slice(5,7),16);return(p*299+s*587+c*144)/1e3>=180?"#000000":"#FFFFFF"}};function bt(){return{isRTL:r(()=>m().isRTL),language:r(()=>m().language),headerBgColor:r(()=>m().headerBgColor),headerTxtColor:r(()=>m().headerTxtColor),visitorBgColor:r(()=>m().visitorBgColor),visitorTxtColor:r(()=>m().visitorTxtColor),agentBgColor:r(()=>m().agentBgColor),agentTxtColor:r(()=>m().agentTxtColor),mobileBrowserName:r(()=>S().mobileBrowserName),isIE:r(()=>S().isIE),browserVersion:r(()=>S().version)}}const wt=["id","srcdoc","src","title","width","height"],vt=nt({name:"WidgetIFrame",__name:"WidgetIFrame",props:{width:{default:void 0},height:{default:void 0},cssLink:{default:void 0},styleObject:{default:()=>({})},classString:{default:""},isMaxWidget:{type:Boolean,default:!1},title:{default:void 0},onLoad:{type:[Function,null],default:null}},setup(i){const p=Object.fromEntries(X.map(t=>[t,it(t,void 0)])),s=p.emitter,c=p.jsApi,{isRTL:T,language:v,headerBgColor:d,headerTxtColor:b,visitorBgColor:y,visitorTxtColor:B,agentBgColor:$,agentTxtColor:I,mobileBrowserName:O,isIE:_,browserVersion:W}=bt(),f=i,M=rt(),Z=K(lt()),w=K(null),k=J(null),x=J([]);function tt(){return f.styleObject?Object.entries(f.styleObject).map(([t,o])=>t+o).join(" "):""}function z(t,o){let e=`:root {
		--tawk-header-background-color: ${d.value} !important;
		--tawk-header-background-color-alpha: ${d.value}50 !important;
		--tawk-header-text-color: ${b.value} !important;
		--tawk-header-override-padding-top: ${t} !important;
		--tawk-footer-override-padding-bottom: ${o} !important;
	}`;return e+=`.tawk-chat-bubble code,
		.tawk-chat-bubble pre {
		border-color: ${Q.colorYiq(y.value)}40 !important;
		background-color: ${Q.colorYiq(y.value)}20 !important;
	}`,e+=`.tawk-visitor-chat-bubble {
		background: ${y.value} !important;
		color: ${B.value} !important;
	}`,e+=`.tawk-visitor-chat-bubble .tawk-timeago {
		color: ${B.value} !important;
	}`,e+=`.tawk-agent-chat-bubble {
		background: ${$.value} !important;
		color: ${I.value} !important;
	}`,e+=`.tawk-agent-chat-bubble .tawk-timeago {
		color: ${I.value} !important;
	}`,e+=`.tawk-agent-chat-bubble-dots {
		background: ${$.value} !important;
	}`,e}function et(){let t="";return _.value&&W.value<=11&&(t+=`.tawk-custom-color-inverse {
			background-color: ${b.value} !important;
			color: ${d.value} !important;
		}
		.tawk-custom-border-color {
			border-color: ${d.value} !important;
		}
		.tawk-custom-border-left {
			border-left: 5px solid ${d.value} !important;
		}
		.tawk-custom-color {
			background-color: ${d.value} !important;
			color: ${b.value} !important;
		}
		.tawk-custom-text-color {
			color: ${d.value} !important;
		}
		.tawk-custom-text-color-inverse {
			color: ${b.value} !important;
		}
		.tawk-custom-image .tawk-image {
			max-height: 250px;
		}
		.tawk-timeago {
			font-size: .75rem !important;
			font-family: 'Lato', sans-serif !important;
		}
		.tawk-main-panel .tawk-chat-panel {
			height: 100%;
		}
		.tawk-tooltip-hover {
			max-width: 120px;
		}
		.card-container:first-child::before {
			background-color: ${d.value} !important;
		}
		.tawk-form-wrapper .tawk-input:-ms-input-placeholder,
		.tawk-form-wrapper .tawk-textarea:-ms-input-placeholder {
			opacity: 1 !important;
		}
		.tawk-home-list-chat-content {
			-ms-flex-grow:1;
			-ms-flex: 1;
			width: auto;
		}
		.tawk-home-list-chat-content .tawk-custom-chat-left {
			flex: 0 0 50%;
			max-width: 50%;
			display: inline-block;
		}
		.tawk-home-list-chat-content .tawk-custom-chat-right {
			flex: 0 0 40%;
			max-width: 40%;
			width: 100%;
		}
		.tawk-home-list-chat-content .tawk-custom-chat-right .tawk-timeago {
			display: inline-block;
			word-wrap: break-word;
			word-break: all;
			width: 100%;
		}`),_.value&&W.value<=10&&(t+=`
			.tawk-custom-flex-1 {
				flex: 0 0 auto !important;
			}
			.tawk-input, .tawk-select, .tawk-textarea, .tawk-chatinput-editor, .tawk-form-label {
				font-size: .812rem !important;
				font-family: 'Lato', sans-serif !important;
			}
		`),t}function A(){var e,n,l;let t="1rem",o="0";if(O.value){const a=(n=(e=c==null?void 0:c.local_API)==null?void 0:e.customStyle)==null?void 0:n.visibility;(l=a==null?void 0:a.mobile)!=null&&l.maximized&&(a.mobile.maximized.paddingTop&&(t=`${a.mobile.maximized.paddingTop}px`),a.mobile.maximized.paddingBottom&&(o=`${a.mobile.maximized.paddingBottom}px`))}return{paddingTop:t,paddingBottom:o}}function ot(t){const{paddingTop:o,paddingBottom:e}=A(),n=document.createElement("style");n.classList.add("tawk-global-variables");let l=z(o,e);l+=et(),n.appendChild(document.createTextNode(l)),t.appendChild(n)}function at(){var g,h;const t=(g=w.value)==null?void 0:g.contentDocument;if(!t)return;const o=t.head,e=o.querySelector(".tawk-global-variables");e&&((h=e.parentNode)==null||h.removeChild(e));const{paddingTop:n,paddingBottom:l}=A(),a=document.createElement("style");a.classList.add("tawk-global-variables");let u=z(n,l);a.appendChild(document.createTextNode(u)),o.appendChild(a)}let F=!1;function D(){var Y,P,H;if(F)return;const t=(Y=w.value)==null?void 0:Y.contentDocument;if(!t)return;F=!0;const o=t.documentElement,e=t.body,n=t.head,l="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&subset=latin-ext",a=document.createElement("div");a.style.width="100%",a.style.height="100%";const u=document.createElement("link"),g=document.createElement("link");u.href=f.cssLink||"",u.rel="stylesheet",g.href=l,o.style.height="100%",e.style.height="100%",e.style.margin="0",e.appendChild(a),e.classList.add("font-lato"),T.value&&e.classList.add("tawk-rtl"),O.value&&(o.classList.add("tawk-mobile"),e.classList.add("tawk-mobile")),v.value&&o.setAttribute("lang",v.value);const h=document.createElement("meta");h.setAttribute("http-equiv","Content-Type"),h.content="text/html; charset=utf-8";const C=document.createElement("meta");C.name="viewport",C.content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",n.appendChild(h),n.appendChild(C),ot(n),(P=c==null?void 0:c.local_API)!=null&&P.disableWidgetFont||n.appendChild(g);const j=f.onLoad,R=M.default,V=(H=w.value)==null?void 0:H.contentWindow,q=window.__VUE_DEVTOOLS_GLOBAL_HOOK__;V&&q&&(V.__VUE_DEVTOOLS_GLOBAL_HOOK__=q);const E=ft({name:"WidgetIFrameApp",mounted(){typeof j=="function"&&j()},render(){return gt("div",{style:"width: 100%; height: 100%;"},x.value)}});for(const L of X)p[L]!==void 0&&E.provide(L,p[L]);let G=!1;const U=()=>{G||(G=!0,x.value=R?R():[],E.mount(a))};u.onload=U,u.onerror=U,n.appendChild(u),k.value=E}function N(){at()}return st(()=>{const t=M.default;return t?t():[]},t=>{x.value=t},{flush:"pre"}),ct(()=>{s==null||s.on("updateWidgetSettings",N),f.isMaxWidget||D()}),dt(()=>{s==null||s.off("updateWidgetSettings",N),k.value&&(k.value.unmount(),k.value=null)}),(t,o)=>(mt(),ut("iframe",{id:Z.value,ref_key:"iframeRef",ref:w,srcdoc:i.isMaxWidget?"<html></html>":void 0,src:i.isMaxWidget?void 0:"about:blank",title:i.title,frameborder:"0",scrolling:"no",width:i.width,height:i.height,style:ht(tt()),class:pt(i.classString),referrerpolicy:"no-referrer-when-downgrade",onLoad:D},null,46,wt))}}),yt={"outline:":"none !important;","visibility:":"visible !important;","resize:":"none !important;","box-shadow:":"none !important;","overflow:":"visible !important;","background:":"none !important;","opacity:":"1 !important;","filter:":"alpha(opacity=100) !important;","-ms-filter:":"progid:DXImageTransform.Microsoft.Alpha(Opacity 1}) !important;","-mz-opacity:":"1 !important;","-khtml-opacity:":"1 !important;","top:":"auto !important;","right:":"auto !important;","bottom:":"auto !important;","left:":"auto !important;","position:":"absolute !important;","border:":"0 !important;","min-height:":"auto !important;","min-width:":"auto !important;","max-height:":"none !important;","max-width:":"none !important;","padding:":"0 !important;","margin:":"0 !important;","-moz-transition-property:":"none !important;","-webkit-transition-property:":"none !important;","-o-transition-property:":"none !important;","transition-property:":"none !important;","transform:":"none !important;","-webkit-transform:":"none !important;","-ms-transform:":"none !important;","width:":"auto !important;","height:":"auto !important;","display:":"block !important;","z-index:":"auto !important;","background-color:":"transparent !important;","cursor:":"none !important;","float:":"none !important;","border-radius:":"unset !important;","pointer-events:":"auto !important;","clip:":"auto !important;","color-scheme:":"light !important;"};export{yt as G,vt as _};
