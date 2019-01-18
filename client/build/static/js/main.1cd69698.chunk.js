(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{106:function(e,t,a){},183:function(e,t,a){"use strict";a.r(t);a(98),a(100);var n=a(0),r=a.n(n),i=a(42),o=a.n(i),s=a(48),c=a(18),l=a(95),u=a(10),d=a(12),p=a(11),h=a(8),m=a(13),f=a(23),v=(a(106),a(43)),b=a(37),y=a.n(b),k=a(29),g=a.n(k),E=a(134),w=a(51),O=a(135),j=a(21),I=a.n(j),x=a(27),D=a(62),S=a.n(D),C=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={item:void 0},a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return null}},{key:"componentDidMount",value:function(){var e=Object(x.a)(I.a.mark(function e(){var t,a,n,r=this;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a.getItem(this.props.storageName);case 2:if(void 0!==(t=e.sent)&&null!==t){e.next=6;break}return this.setState({item:void 0},function(){return r.props.dataDidUpdate(void 0)}),e.abrupt("return");case 6:if(null!==(a=S.a.decompress(t))){e.next=11;break}return y.a.removeItem(this.props.storageName),this.setState({item:void 0},function(){return r.props.dataDidUpdate(void 0)}),e.abrupt("return");case 11:n=JSON.parse(a),this.setState({item:n},function(){return r.props.dataDidUpdate(n)});case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e,t){var a=this;if(!g.a.isEqual(e.activeItem,this.props.activeItem)){if(void 0===this.props.activeItem)return;if(g.a.isEqual(this.state.item,this.props.activeItem))return;console.log("save item",this.props.activeItem);var n=JSON.stringify(this.props.activeItem),r=S.a.compress(n);y.a.setItem(this.props.storageName,r),this.setState({item:this.props.activeItem},function(){return a.props.dataDidUpdate(a.props.activeItem)})}}}]),t}(r.a.Component),N=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={dayItems:[],frontItems:[],monthItems:[],weekItems:[]},a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"refreshData",value:function(e){}}]),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(C,{dataDidUpdate:function(t){return e.updateNewItems(t,Q.Front)},activeItem:this.state.frontItems,storageName:"HN-ITEMS"}),r.a.createElement(C,{dataDidUpdate:function(t){return e.updateNewItems(t,Q.Day)},activeItem:this.state.dayItems,storageName:"HN-DAY-ITEMS"}),r.a.createElement(C,{dataDidUpdate:function(t){return e.updateNewItems(t,Q.Week)},activeItem:this.state.weekItems,storageName:"HN-WEEK-ITEMS"}),r.a.createElement(C,{dataDidUpdate:function(t){return e.updateNewItems(t,Q.Month)},activeItem:this.state.monthItems,storageName:"HN-MONTH-ITEMS"}))}},{key:"getStoryData",value:function(){var e=Object(x.a)(I.a.mark(function e(t){var a;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===(a=this.state.frontItems.find(function(e){return e.id===t}))){e.next=3;break}return e.abrupt("return",a);case 3:if(void 0===(a=this.state.dayItems.find(function(e){return e.id===t}))){e.next=6;break}return e.abrupt("return",a);case 6:if(void 0===(a=this.state.weekItems.find(function(e){return e.id===t}))){e.next=9;break}return e.abrupt("return",a);case 9:if(void 0===(a=this.state.monthItems.find(function(e){return e.id===t}))){e.next=12;break}return e.abrupt("return",a);case 12:return e.next=14,this.getStoryFromServer(t);case 14:return e.abrupt("return",e.sent);case 15:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getStoryFromServer",value:function(){var e=Object(x.a)(I.a.mark(function e(t){var a,n,r;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="/api/story/"+t,e.next=3,fetch(a);case 3:if((n=e.sent).ok){e.next=7;break}return console.error(n),e.abrupt("return",void 0);case 7:return e.next=9,n.json();case 9:if(!("error"in(r=e.sent))){e.next=13;break}return console.error(r),e.abrupt("return",void 0);case 13:return console.log("hn item from server",r),e.abrupt("return",r);case 15:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getPageData",value:function(e){switch(console.log("getpage state",this.state),e){case"day":return 0===this.state.dayItems.length&&this.loadData(Q.Day),this.state.dayItems||[];case"week":return 0===this.state.weekItems.length&&this.loadData(Q.Week),this.state.weekItems||[];case"month":return 0===this.state.monthItems.length&&this.loadData(Q.Month),this.state.monthItems||[];default:return 0===this.state.frontItems.length&&this.loadData(Q.Front),this.state.frontItems||[]}}},{key:"loadData",value:function(){var e=Object(x.a)(I.a.mark(function e(t){var a,n,r;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("loading data"),a="",e.t0=t,e.next=e.t0===Q.Front?5:e.t0===Q.Day?7:e.t0===Q.Week?9:e.t0===Q.Month?11:13;break;case 5:return a="/topstories/topstories",e.abrupt("break",13);case 7:return a="/topstories/day",e.abrupt("break",13);case 9:return a="/topstories/week",e.abrupt("break",13);case 11:return a="/topstories/month",e.abrupt("break",13);case 13:return e.next=15,fetch(a);case 15:if((n=e.sent).ok){e.next=19;break}return console.error(n),e.abrupt("return");case 19:return e.next=21,n.json();case 21:r=e.sent,t!==Q.Front&&(r=g.a.sortBy(r,function(e){return-e.score})),console.log("hn items",r),this.updateNewItems(r,t);case 25:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"updateNewItems",value:function(e,t){switch(console.log("new items2",e,t),void 0===e&&(e=[]),t){case Q.Front:this.setState({frontItems:e});break;case Q.Day:this.setState({dayItems:e});break;case Q.Week:this.setState({weekItems:e});break;case Q.Month:this.setState({monthItems:e})}this.props.provideNewItems(e,t)}}]),t}(r.a.Component),L=a(188),M=a(189),F=a(185),R=a(186),W=a(187),T=a(54),U=a(50),H=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(L.a,null,r.a.createElement(L.a.Header,null,r.a.createElement(L.a.Brand,null,r.a.createElement(U.a,{to:"/"},"hn-offline"))),r.a.createElement(M.a,null,r.a.createElement(T.LinkContainer,{to:"/day"},r.a.createElement(F.a,{eventKey:1},"day")),r.a.createElement(T.LinkContainer,{to:"/week"},r.a.createElement(F.a,{eventKey:2},"week")),r.a.createElement(T.LinkContainer,{to:"/month"},r.a.createElement(F.a,{eventKey:3},"month"))),r.a.createElement(c.a,{render:function(t){return-1===t.location.pathname.indexOf("/story")?r.a.createElement(L.a.Form,{pullRight:!0},r.a.createElement(R.a,{bsStyle:"primary",onClick:function(){return e.props.requestNewData()}},r.a.createElement(W.a,{glyph:"refresh"}))):null}}))}}]),t}(r.a.PureComponent),P=a(17);function A(e){if(void 0===e)return"";var t=e.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);return t&&t[1]}function q(e){var t=Math.floor((new Date).getTime()/1e3-e),a=Math.floor(t/31536e3);return a>1?a+" years":(a=Math.floor(t/2592e3))>1?a+" months":(a=Math.floor(t/86400))>1?a+" days":(a=Math.floor(t/3600))>=1?a+" hour"+(a>1?"s":""):(a=Math.floor(t/60))>1?a+" minutes":Math.floor(t)+" seconds"}var B=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props.data,t=r.a.createElement(r.a.Fragment,null," | ",r.a.createElement(P.a,{to:"/story/"+e.id},r.a.createElement(W.a,{glyph:"comment"})," ",e.descendants)),a=void 0===e.url?r.a.createElement(P.a,{to:"/story/"+e.id},e.title):r.a.createElement("a",{href:e.url},e.title);return r.a.createElement("div",null,r.a.createElement("p",null,a),r.a.createElement("p",null,r.a.createElement("span",null,r.a.createElement(W.a,{glyph:"chevron-up"})," "," "+e.score),void 0!==e.descendants&&t,r.a.createElement("span",null," | "+q(e.time)+" ago"),r.a.createElement("span",null," | "+A(e.url))))}}]),t}(r.a.Component),J=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={items:[]},a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.props.items.map(function(e){return r.a.createElement(B,{data:e,key:e.id})}))}}]),t}(r.a.Component),K=a(5),_=a.n(K),$=a(66),X=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).childRefs=[],e.childComments.forEach(function(e){null!==e&&(a.childRefs[e.id]=r.a.createRef())}),a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this,t=this.props.childComments.filter(function(e){return null!==e});return r.a.createElement(r.a.Fragment,null,t.map(function(a,n){return r.a.createElement(z,{key:a.id,comment:a,depth:e.props.depth,canExpand:e.props.canExpand,ref:e.childRefs[a.id],scrollToNextChild:function(){var a=t[n+1],r=t[n];if(null!==r){void 0!==a&&null!==a||(a=r);var i=e.childRefs[a.id].current.getDivRef(),o=Object($.a)(i,{block:"nearest",inline:"nearest",scrollMode:"if-needed"}),s=e.childRefs[r.id].current.getDivRef(),c=Object($.a)(s,{block:"nearest",inline:"nearest",scrollMode:"if-needed"});0==o.length&&0==c.length||window.scrollTo({top:i.offsetTop-80,behavior:"smooth"})}}})}))}}]),t}(r.a.Component),Y=["#bc8672","#c5be53","#d46850","#8c7f3b","#dec392","#c9893a"],z=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={isOpen:!0,expandSelf:!1},a.divRef=r.a.createRef(),a}return Object(m.a)(t,e),Object(h.a)(t,null,[{key:"getDerivedStateFromProps",value:function(e,t){return e.canExpand?null:{isOpen:t.isOpen,expandSelf:!1}}}]),Object(h.a)(t,[{key:"getDivRef",value:function(){return this.divRef.current}},{key:"render",value:function(){var e=this,t=this.props.comment;if(null===t)return null;var a=t.kidsObj||[],n=t.text||"";if(!G(t))return null;var i=this.state.isOpen?r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"comment",dangerouslySetInnerHTML:{__html:n}}),a.length>0&&r.a.createElement(X,{childComments:a,canExpand:this.props.canExpand&&!this.state.expandSelf,depth:this.props.depth+1})):null,o=this.props.depth<Y.length?Y[this.props.depth]:"#bbb";return r.a.createElement("div",{className:_()("bp3-card",{collapsed:!this.state.isOpen}),onClick:function(t){return e.handleCardClick(t)},style:{paddingLeft:12,marginLeft:this.state.expandSelf&&this.state.isOpen?-15*this.props.depth:0,borderLeftColor:o,borderLeftWidth:this.state.expandSelf?6:void 0,borderRight:this.state.expandSelf?"1px solid"+o:void 0,paddingRight:this.state.expandSelf?6:void 0}},r.a.createElement("p",{style:{fontWeight:this.state.isOpen?450:300},ref:this.divRef},t.by," | ",q(t.time)," ago"),i)}},{key:"handleCardClick",value:function(e){var t=this;if(e.stopPropagation(),"A"!==e.target.tagName){var a=e.target,n=this.state.expandSelf?.85:.9;if(this.props.depth>0&&this.props.canExpand&&(e.pageX+a.offsetLeft)/window.innerWidth>n)this.setState({expandSelf:!this.state.expandSelf});else{var r=!this.state.isOpen;this.setState({isOpen:r},function(){r||t.props.scrollToNextChild()})}}}}]),t}(r.a.Component);function G(e){return null!==e&&!(e.deleted&&(void 0===e.kidsObj||0===e.kidsObj.length))}var Q,V=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={data:void 0},a.anchorClickHandler=a.anchorClickHandler.bind(Object(f.a)(Object(f.a)(a))),a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){if(void 0===this.state.data)return null;var e=this.state.data,t=void 0===e.url?r.a.createElement("span",null,e.title):r.a.createElement("a",{href:e.url},e.title),a=(e.kidsObj||[]).filter(G);return r.a.createElement("div",null,r.a.createElement("h2",{style:{overflowWrap:"break-word"}},t),r.a.createElement("h4",null,r.a.createElement("span",null,e.by),r.a.createElement("span",null," | "),r.a.createElement("span",null,e.score," points"),r.a.createElement("span",null," | "),r.a.createElement("span",null,q(e.time)," ago"),r.a.createElement("span",null," | "),r.a.createElement("span",null,A(e.url))),void 0!==e.text&&r.a.createElement("p",{className:"top-text",dangerouslySetInnerHTML:{__html:e.text}}),r.a.createElement(X,{childComments:a,canExpand:!0,depth:0}))}},{key:"componentDidMount",value:function(){window.scrollTo(0,0),this.updateDataFromDataLayer(),document.body.addEventListener("click",this.anchorClickHandler)}},{key:"componentWillUnmount",value:function(){document.body.removeEventListener("click",this.anchorClickHandler)}},{key:"anchorClickHandler",value:function(e){if("A"===e.target.tagName){var t=e.target.href.match(/https?:\/\/news\.ycombinator\.com\/item\?id=(\d+)/);if(null!==t)return this.props.history.push("/story/"+t[1]),e.preventDefault(),!1}}},{key:"updateDataFromDataLayer",value:function(){var e=Object(x.a)(I.a.mark(function e(){var t;return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getStoryData(this.props.id);case 2:t=e.sent,this.setState({data:t});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e){null===e.dataLayer&&null!==this.props.dataLayer&&this.updateDataFromDataLayer()}},{key:"getStoryData",value:function(){var e=Object(x.a)(I.a.mark(function e(t){return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==this.props.dataLayer){e.next=4;break}e.t0=void 0,e.next=7;break;case 4:return e.next=6,this.props.dataLayer.getStoryData(t);case 6:e.t0=e.sent;case 7:return e.abrupt("return",e.t0);case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),t}(r.a.Component),Z=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={items:[],allItems:[],activeList:Q.Front,error:void 0},a.dataLayer=r.a.createRef(),a.updateActiveDataStore=a.updateActiveDataStore.bind(Object(f.a)(Object(f.a)(a))),a.newItemsProvided=a.newItemsProvided.bind(Object(f.a)(Object(f.a)(a))),a}return Object(m.a)(t,e),Object(h.a)(t,null,[{key:"getDerivedStateFromProps",value:function(e,t){var a;switch(e.match.params.page){case"day":a=Q.Day;break;case"week":a=Q.Week;break;case"month":a=Q.Month;break;default:a=Q.Front}return console.log("derived state",e.match.params.page,a),Object(l.a)({},t,{activeList:a})}}]),Object(h.a)(t,[{key:"updateActiveDataStore",value:function(e,t){t&&this.setState({items:e}),this.setState(function(t){var a=g.a.cloneDeep(t.allItems).concat(e);return a=g.a.uniqBy(a,function(e){return e.id}),console.log("new all itemS",a),{allItems:a}})}},{key:"componentDidCatch",value:function(e,t){this.setState({error:e}),v.withScope(function(a){Object.keys(t).forEach(function(e){a.setExtra(e,t[e])}),v.captureException(e)}),y.a.clear()}},{key:"render",value:function(){var e=this;return console.log("render state",this.state),void 0!==this.state.error?r.a.createElement("div",null,r.a.createElement("p",null,"an error occurred, refresh the page"),r.a.createElement("p",null,"unfortunately, your local data was cleared to prevent corruption")):r.a.createElement("div",null,r.a.createElement(N,{ref:this.dataLayer,provideNewItems:this.newItemsProvided}),r.a.createElement(H,{requestNewData:function(){e.dataLayer.current.loadData(e.state.activeList)}}),r.a.createElement(E.a,null,r.a.createElement(w.a,{path:"/story/:id",exact:!0,render:function(t){return r.a.createElement(V,{id:+t.match.params.id,dataLayer:e.dataLayer.current,history:t.history,key:+t.match.params.id})}}),r.a.createElement(w.a,{path:"/:page?",render:function(t){return r.a.createElement(J,{items:null===e.dataLayer.current?[]:e.dataLayer.current.getPageData(t.match.params.page)})}})),r.a.createElement("span",{onClick:function(){throw new Error("testing Sentry")}},"test"))}},{key:"newItemsProvided",value:function(e,t){t===this.state.activeList&&this.setState({items:e})}}]),t}(r.a.Component),ee=Object(O.a)(Z);!function(e){e[e.Front=0]="Front",e[e.Day=1]="Day",e[e.Week=2]="Week",e[e.Month=3]="Month"}(Q||(Q={}));var te=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ae(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var ne=a(94);a.n(ne).a.polyfill(),v.init({dsn:"https://d8e8092157294c86b5014343cede60e6@sentry.io/1362584"}),o.a.render(r.a.createElement(s.a,null,r.a.createElement(c.a,{path:"/:page?"},r.a.createElement(ee,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");te?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):ae(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):ae(t,e)})}}()},97:function(e,t,a){e.exports=a(183)}},[[97,2,1]]]);
//# sourceMappingURL=main.1cd69698.chunk.js.map