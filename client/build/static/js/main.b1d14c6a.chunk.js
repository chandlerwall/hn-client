(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t,a){},180:function(e,t,a){"use strict";a.r(t);a(97),a(99);var n=a(1),r=a.n(n),o=a(31),s=a.n(o),i=a(64),c=a(36),u=a(94),l=a(14),m=a(16),p=a(15),d=a(10),h=a(17),f=a(40),v=(a(105),a(43)),b=a.n(v),y=a(84),k=a(66),g=a(85),w=a(39),E=a.n(w),O=a(41),I=a(57),j=a.n(I),D=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={item:void 0},a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return null}},{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem(this.props.storageName);if(void 0!==t&&null!==t){var a=j.a.decompress(t);if(null===a)return localStorage.removeItem(this.props.storageName),void this.setState({item:void 0},function(){return e.props.dataDidUpdate(void 0)});var n=JSON.parse(a);this.setState({item:n},function(){return e.props.dataDidUpdate(n)})}else this.setState({item:void 0},function(){return e.props.dataDidUpdate(void 0)})}},{key:"componentDidUpdate",value:function(e,t){var a=this;if(!b.a.isEqual(e.activeItem,this.props.activeItem)){if(void 0===this.props.activeItem)return;if(b.a.isEqual(this.state.item,this.props.activeItem))return;console.log("save item",this.props.activeItem);var n=JSON.stringify(this.props.activeItem),r=j.a.compress(n);localStorage.setItem(this.props.storageName,r),this.setState({item:this.props.activeItem},function(){return a.props.dataDidUpdate(a.props.activeItem)})}}}]),t}(r.a.Component),S=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={dayItems:[],frontItems:[],monthItems:[],weekItems:[]},a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"refreshData",value:function(e){}}]),Object(d.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(D,{dataDidUpdate:function(t){return e.updateNewItems(t,H.Front)},activeItem:this.state.frontItems,storageName:"HN-ITEMS"}),r.a.createElement(D,{dataDidUpdate:function(t){return e.updateNewItems(t,H.Day)},activeItem:this.state.dayItems,storageName:"HN-DAY-ITEMS"}),r.a.createElement(D,{dataDidUpdate:function(t){return e.updateNewItems(t,H.Week)},activeItem:this.state.weekItems,storageName:"HN-WEEK-ITEMS"}),r.a.createElement(D,{dataDidUpdate:function(t){return e.updateNewItems(t,H.Month)},activeItem:this.state.monthItems,storageName:"HN-MONTH-ITEMS"}))}},{key:"getStoryData",value:function(){var e=Object(O.a)(E.a.mark(function e(t){var a;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===(a=this.state.frontItems.find(function(e){return e.id===t}))){e.next=3;break}return e.abrupt("return",a);case 3:if(void 0===(a=this.state.dayItems.find(function(e){return e.id===t}))){e.next=6;break}return e.abrupt("return",a);case 6:if(void 0===(a=this.state.weekItems.find(function(e){return e.id===t}))){e.next=9;break}return e.abrupt("return",a);case 9:if(void 0===(a=this.state.monthItems.find(function(e){return e.id===t}))){e.next=12;break}return e.abrupt("return",a);case 12:return e.next=14,this.getStoryFromServer(t);case 14:return e.abrupt("return",e.sent);case 15:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getStoryFromServer",value:function(){var e=Object(O.a)(E.a.mark(function e(t){var a,n,r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="/api/story/"+t,e.next=3,fetch(a);case 3:if((n=e.sent).ok){e.next=7;break}return console.error(n),e.abrupt("return",void 0);case 7:return e.next=9,n.json();case 9:if(!("error"in(r=e.sent))){e.next=13;break}return console.error(r),e.abrupt("return",void 0);case 13:return console.log("hn item from server",r),e.abrupt("return",r);case 15:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getPageData",value:function(e){switch(console.log("getpage state",this.state),e){case"day":return 0===this.state.dayItems.length&&this.loadData(H.Day),this.state.dayItems||[];case"week":return 0===this.state.weekItems.length&&this.loadData(H.Week),this.state.weekItems||[];case"month":return 0===this.state.monthItems.length&&this.loadData(H.Month),this.state.monthItems||[];default:return 0===this.state.frontItems.length&&this.loadData(H.Front),this.state.frontItems||[]}}},{key:"loadData",value:function(){var e=Object(O.a)(E.a.mark(function e(t){var a,n,r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("loading data"),a="",e.t0=t,e.next=e.t0===H.Front?5:e.t0===H.Day?7:e.t0===H.Week?9:e.t0===H.Month?11:13;break;case 5:return a="/topstories/topstories",e.abrupt("break",13);case 7:return a="/topstories/day",e.abrupt("break",13);case 9:return a="/topstories/week",e.abrupt("break",13);case 11:return a="/topstories/month",e.abrupt("break",13);case 13:return e.next=15,fetch(a);case 15:if((n=e.sent).ok){e.next=19;break}return console.error(n),e.abrupt("return");case 19:return e.next=21,n.json();case 21:r=e.sent,console.log("hn items",r),this.updateNewItems(r,t);case 24:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"updateNewItems",value:function(e,t){switch(console.log("new items2",e,t),void 0===e&&(e=[]),t){case H.Front:this.setState({frontItems:e});break;case H.Day:this.setState({dayItems:e});break;case H.Week:this.setState({weekItems:e});break;case H.Month:this.setState({monthItems:e})}this.props.provideNewItems(e,t)}}]),t}(r.a.Component),x=a(186),L=a(188),N=a(183),M=a(184),C=a(185),F=a(49),W=a(65),U=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(x.a,null,r.a.createElement(x.a.Header,null,r.a.createElement(x.a.Brand,null,r.a.createElement(W.a,{to:"/"},"hn-offline"))),r.a.createElement(L.a,null,r.a.createElement(F.LinkContainer,{to:"/day"},r.a.createElement(N.a,{eventKey:1},"day")),r.a.createElement(F.LinkContainer,{to:"/week"},r.a.createElement(N.a,{eventKey:2},"week")),r.a.createElement(F.LinkContainer,{to:"/month"},r.a.createElement(N.a,{eventKey:3},"month"))),r.a.createElement(x.a.Form,{pullRight:!0},r.a.createElement(M.a,{bsStyle:"primary",onClick:function(){return e.props.requestNewData()}},r.a.createElement(C.a,{glyph:"refresh"}))))}}]),t}(r.a.PureComponent),P=a(35);function T(e){if(void 0===e)return"";var t=e.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);return t&&t[1]}function A(e){var t=Math.floor((new Date).getTime()/1e3-e),a=Math.floor(t/31536e3);return a>1?a+" years":(a=Math.floor(t/2592e3))>1?a+" months":(a=Math.floor(t/86400))>1?a+" days":(a=Math.floor(t/3600))>1?a+" hours":(a=Math.floor(t/60))>1?a+" minutes":Math.floor(t)+" seconds"}var H,q=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.data;return r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement("a",{href:e.url},e.title)),r.a.createElement("p",null,r.a.createElement("span",null,e.score+" | "),r.a.createElement(P.a,{to:"/story/"+e.id},r.a.createElement("span",null,r.a.createElement(C.a,{glyph:"comment"})," "," "+e.descendants)),r.a.createElement("span",null," | "+A(e.time)+" ago"),r.a.createElement("span",null," | "+T(e.url))))}}]),t}(r.a.Component),R=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={items:[]},a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.props.items.map(function(e){return r.a.createElement(q,{data:e,key:e.id})}))}}]),t}(r.a.Component),B=a(187),J=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={isOpen:!0},a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,a=this.props.comment.kidsObj||[],n=this.props.comment.text||"",o=this.props.comment;if(this.props.comment.deleted&&(void 0===this.props.comment.kidsObj||0===o.kidsObj.length))return null;var s=this.state.isOpen?r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{dangerouslySetInnerHTML:{__html:n}}),a.map(function(a){return r.a.createElement(t,{key:e.props.comment.id+"-"+a.id,comment:a,depth:e.props.depth+1})})):null;return r.a.createElement(B.a,{interactive:!0,onClick:function(t){return e.handleCardClick(t)},style:{paddingLeft:12,width:"100%"}},r.a.createElement("p",null,this.props.comment.by," | ",A(this.props.comment.time)," ago"),s)}},{key:"handleCardClick",value:function(e){e.stopPropagation(),this.setState({isOpen:!this.state.isOpen})}}]),t}(r.a.Component),K=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={data:void 0},a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){if(void 0===this.state.data)return null;var e=this.state.data,t=e.kidsObj||[];return r.a.createElement("div",null,r.a.createElement("h2",null,r.a.createElement("a",{href:e.url},e.title)),r.a.createElement("h4",null,r.a.createElement("span",null,e.by),r.a.createElement("span",null," | "),r.a.createElement("span",null,e.score),r.a.createElement("span",null," | "),r.a.createElement("span",null,A(e.time)," ago"),r.a.createElement("span",null," | "),r.a.createElement("span",null,T(e.url))),void 0!==e.text&&r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.text}}),t.map(function(e){return r.a.createElement(J,{key:e.id,comment:e,depth:0})}))}},{key:"componentDidMount",value:function(){window.scrollTo(0,0),this.updateDataFromDataLayer()}},{key:"updateDataFromDataLayer",value:function(){var e=Object(O.a)(E.a.mark(function e(){var t;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getStoryData(this.props.id);case 2:t=e.sent,this.setState({data:t});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e){null===e.dataLayer&&null!==this.props.dataLayer&&this.updateDataFromDataLayer()}},{key:"getStoryData",value:function(){var e=Object(O.a)(E.a.mark(function e(t){return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==this.props.dataLayer){e.next=4;break}e.t0=void 0,e.next=7;break;case 4:return e.next=6,this.props.dataLayer.getStoryData(t);case 6:e.t0=e.sent;case 7:return e.abrupt("return",e.t0);case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),t}(r.a.Component),$=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={items:[],allItems:[],activeList:H.Front},a.dataLayer=r.a.createRef(),a.updateActiveDataStore=a.updateActiveDataStore.bind(Object(f.a)(Object(f.a)(a))),a.newItemsProvided=a.newItemsProvided.bind(Object(f.a)(Object(f.a)(a))),a}return Object(h.a)(t,e),Object(d.a)(t,null,[{key:"getDerivedStateFromProps",value:function(e,t){var a;switch(e.match.params.page){case"day":a=H.Day;break;case"week":a=H.Week;break;case"month":a=H.Month;break;default:a=H.Front}return console.log("derived state",e.match.params.page,a),Object(u.a)({},t,{activeList:a})}}]),Object(d.a)(t,[{key:"updateActiveDataStore",value:function(e,t){t&&this.setState({items:e}),this.setState(function(t){var a=b.a.cloneDeep(t.allItems).concat(e);return a=b.a.uniqBy(a,function(e){return e.id}),console.log("new all itemS",a),{allItems:a}})}},{key:"render",value:function(){var e=this;return console.log("render state",this.state),r.a.createElement("div",null,r.a.createElement(S,{ref:this.dataLayer,provideNewItems:this.newItemsProvided}),r.a.createElement(U,{requestNewData:function(){e.dataLayer.current.loadData(e.state.activeList)}}),r.a.createElement(y.a,null,r.a.createElement(k.a,{path:"/story/:id",exact:!0,render:function(t){return r.a.createElement(K,{id:+t.match.params.id,dataLayer:e.dataLayer.current})}}),r.a.createElement(k.a,{path:"/:page?",render:function(t){return r.a.createElement(R,{items:null===e.dataLayer.current?[]:e.dataLayer.current.getPageData(t.match.params.page)})}})))}},{key:"newItemsProvided",value:function(e,t){t===this.state.activeList&&this.setState({items:e})}}]),t}(r.a.Component),Y=Object(g.a)($);!function(e){e[e.Front=0]="Front",e[e.Day=1]="Day",e[e.Week=2]="Week",e[e.Month=3]="Month"}(H||(H={}));var G=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Q(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(93).init({dsn:"https://d8e8092157294c86b5014343cede60e6@sentry.io/1362584"}),s.a.render(r.a.createElement(i.a,null,r.a.createElement(c.a,{path:"/:page?"},r.a.createElement(Y,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");G?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Q(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):Q(t,e)})}}()},96:function(e,t,a){e.exports=a(180)}},[[96,2,1]]]);
//# sourceMappingURL=main.b1d14c6a.chunk.js.map