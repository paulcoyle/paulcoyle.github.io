webpackJsonp([0],{0:function(e,t,n){"use strict";var r,i=n(1),o=n(32),a=n(163),s=n(177),l=n(183),u=[500,1e3/15,1e3/60];n(184),r=i.createClass({displayName:"App",getInitialState:function(){return{ruleSets:l.ruleSets,currentRuleSetIndex:0,playing:!1,speed:1,scale:1,offset:{x:0,y:0},clearIndex:0,seedIndex:0,stepIndex:0}},currentRuleSet:function(){return this.state.ruleSets[this.state.currentRuleSetIndex]},currentFrameDuration:function(){return u[this.state.speed]},setScale:function(e){this.state.scale=Math.min(10,Math.max(1,e)),this.setState(this.state)},handleRenderDrag:function(e){this.state.offset.x+=e.x/this.state.scale,this.state.offset.y+=e.y/this.state.scale,this.setState(this.state)},handleRenderZoom:function(e){this.setScale(this.state.scale+e*this.state.scale)},handleStateClear:function(){this.state.clearIndex+=1,this.setState(this.state)},handleStateSeed:function(){this.state.seedIndex+=1,this.setState(this.state)},handleRuleSetChange:function(e){this.state.currentRuleSetIndex=e,this.setState(this.state)},handleStep:function(){this.state.stepIndex+=1,this.setState(this.state)},handlePlay:function(){this.state.playing=!0,this.setState(this.state)},handleStop:function(){this.state.playing=!1,this.setState(this.state)},handleSpeedChange:function(e){this.state.speed=e,this.setState(this.state)},handleDisplayReset:function(){this.state.scale=1,this.state.offset.x=0,this.state.offset.y=0,this.setState(this.state)},handleScaleChange:function(e){this.state.scale=e,this.setState(this.state)},handleImpatientUser:function(){this.state.currentRuleSetIndex=Math.floor(Math.random()*this.state.ruleSets.length),this.state.clearIndex+=1,this.state.seedIndex+=5,this.state.speed=2,this.state.playing=!0,this.setState(this.state)},render:function(){return i.createElement("div",{id:"container"},i.createElement(a,{clearIndex:this.state.clearIndex,seedIndex:this.state.seedIndex,stepIndex:this.state.stepIndex,ruleSet:this.currentRuleSet(),playing:this.state.playing,frameDuration:this.currentFrameDuration(),speed:this.state.speed,scale:this.state.scale,offset:this.state.offset,onDrag:this.handleRenderDrag,onZoom:this.handleRenderZoom}),i.createElement(s,{ruleSets:this.state.ruleSets,currentRuleSetIndex:this.state.currentRuleSetIndex,playing:this.state.playing,speed:this.state.speed,scale:this.state.scale,offset:this.state.offset,onStateClear:this.handleStateClear,onStateSeed:this.handleStateSeed,onRuleSetChange:this.handleRuleSetChange,onStep:this.handleStep,onPlay:this.handlePlay,onStop:this.handleStop,onSpeedChange:this.handleSpeedChange,onDisplayReset:this.handleDisplayReset,onScaleChange:this.handleScaleChange,onImpatientUser:this.handleImpatientUser}))}}),o.render(i.createElement(r,null),document.getElementById("app-mount"))},163:function(e,t,n){"use strict";var r=n(1),i=n(164),o=n(167),a=n(172);n(173),e.exports=r.createClass({displayName:"exports",getInitialState:function(){return{clearIndex:0,seedIndex:0,stepIndex:0,rafHandle:null,nextFrameDeadline:0}},getDefaultProps:function(){return{playing:!1,frameDuration:500,onDrag:function(){},onZoom:function(){}}},componentDidMount:function(){this._renderer=o(this.refs.render,this.refs.seed),this._dragDispose=a(this.refs.render,this.handleDrag)},componentWillReceiveProps:function(e){this.executeClears(e),this.executeSeeds(e),this._renderer.setScale(e.scale),this._renderer.setPan(e.offset.x,e.offset.y),this._renderer.setBirths(e.ruleSet.birth),this._renderer.setDeaths(e.ruleSet.death),this.executeSteps(e),this.executePlayback(e),this._renderer.draw()},componentWillUnmount:function(){this._dragDispose()},executeIndexedPairing:function(e,t,n){for(var r=this.state[t];r<e[t];)n(),r++;this.state[t]=e[t],this.setState(this.state)},executeClears:function(e){var t=this;this.executeIndexedPairing(e,"clearIndex",function(){t._renderer.clear()})},executeSeeds:function(e){var t=this;this.executeIndexedPairing(e,"seedIndex",function(){t._renderer.seed()})},executeSteps:function(e){var t=this;this.executeIndexedPairing(e,"stepIndex",function(){t._renderer.step()})},executePlayback:function(e){e.playing===!0&&null===this.state.rafHandle?(this.state.nextFrameDeadline=Date.now(),this.setState(this.state),this.handlePlaybackFrame()):e.playing===!1&&null!==this.state.rafHandle&&(i.cancel(this.state.rafHandle),this.state.rafHandle=null,this.setState(this.state))},handlePlaybackFrame:function(){Date.now()>this.state.nextFrameDeadline&&(this._renderer.step(),this._renderer.draw(),this.state.nextFrameDeadline=Date.now()+this.props.frameDuration),this.state.rafHandle=i(this.handlePlaybackFrame),this.setState(this.state)},handleDrag:function(e){this.props.onDrag(e)},handleRenderWheel:function(e){e.preventDefault(),this.props.onZoom(Math.sign(e.deltaY)*-.025)},render:function(){return r.createElement("div",{id:"render-container"},r.createElement("canvas",{id:"gol",ref:"render",width:"1024",height:"512",onWheel:this.handleRenderWheel}),r.createElement("canvas",{id:"seed",ref:"seed",width:"1024",height:"512"}))}})},164:function(e,t,n){(function(t){for(var r=n(165),i="undefined"==typeof window?t:window,o=["moz","webkit"],a="AnimationFrame",s=i["request"+a],l=i["cancel"+a]||i["cancelRequest"+a],u=0;!s&&u<o.length;u++)s=i[o[u]+"Request"+a],l=i[o[u]+"Cancel"+a]||i[o[u]+"CancelRequest"+a];if(!s||!l){var c=0,h=0,d=[],f=1e3/60;s=function(e){if(0===d.length){var t=r(),n=Math.max(0,f-(t-c));c=n+t,setTimeout(function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c)}catch(n){setTimeout(function(){throw n},0)}},Math.round(n))}return d.push({handle:++h,callback:e,cancelled:!1}),h},l=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return s.call(i,e)},e.exports.cancel=function(){l.apply(i,arguments)},e.exports.polyfill=function(){i.requestAnimationFrame=s,i.cancelAnimationFrame=l}}).call(t,function(){return this}())},165:function(e,t,n){(function(t){(function(){var n,r,i;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-i)/1e6},r=t.hrtime,n=function(){var e;return e=r(),1e9*e[0]+e[1]},i=n()):Date.now?(e.exports=function(){return Date.now()-i},i=Date.now()):(e.exports=function(){return(new Date).getTime()-i},i=(new Date).getTime())}).call(this)}).call(t,n(166))},166:function(e,t){function n(){u&&a&&(u=!1,a.length?l=a.concat(l):c=-1,l.length&&r())}function r(){if(!u){var e=setTimeout(n);u=!0;for(var t=l.length;t;){for(a=l,l=[];++c<t;)a&&a[c].run();c=-1,t=l.length}a=null,u=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function o(){}var a,s=e.exports={},l=[],u=!1,c=-1;s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new i(e,t)),1!==l.length||u||setTimeout(r,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=o,s.addListener=o,s.once=o,s.off=o,s.removeListener=o,s.removeAllListeners=o,s.emit=o,s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},167:function(e,t,n){function r(e,t){function n(){E=e.getContext("webgl"),R={width:e.width,height:e.height},E.clearColor(0,0,0,1),D=y(i,o),T=y(a,s),_=E.createBuffer(),E.bindBuffer(E.ARRAY_BUFFER,_),E.bufferData(E.ARRAY_BUFFER,new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0]),E.STATIC_DRAW),L=[S(),S()],I=0,w=f([2,3],8,-1),F=f([3],8,-1),A=1,U=[0,0],r(),l(),p()}function r(){var e=t.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,R.width,R.height),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,!0),E.bindTexture(E.TEXTURE_2D,L[I].texture),E.texImage2D(E.TEXTURE_2D,0,E.RGBA,E.RGBA,E.UNSIGNED_BYTE,t),E.bindTexture(E.TEXTURE_2D,null),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,!1)}function l(){var e=t.getContext("2d"),n=20;e.fillStyle="#ff0";for(var r=0;400>r;r++)e.fillRect(Math.round(Math.random()*(R.width-n)),Math.round(Math.random()*(R.height-n)),Math.round(Math.random()*n),Math.round(Math.random()*n));E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,!0),E.bindTexture(E.TEXTURE_2D,L[I].texture),E.texImage2D(E.TEXTURE_2D,0,E.RGBA,E.RGBA,E.UNSIGNED_BYTE,t),E.bindTexture(E.TEXTURE_2D,null),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,!1)}function u(e){w=f(e.slice(),8,-1)}function c(e){F=f(e.slice(),8,-1)}function h(e){A=e}function d(e,t){U=[e,t]}function f(e,t,n){for(;e.length<t;)e.push(n);return e}function p(){E.useProgram(D),m(D),v(D),E.bindFramebuffer(E.FRAMEBUFFER,null),E.viewport(0,0,E.drawingBufferWidth,E.drawingBufferHeight),E.clear(E.COLOR_BUFFER_BIT),b(D,L[I].texture)}function g(){var e=(I+1)%L.length,t=L[e],n=L[I];E.useProgram(T),m(T),x(T),E.bindFramebuffer(E.FRAMEBUFFER,t.frameBuffer),E.viewport(0,0,E.drawingBufferWidth,E.drawingBufferHeight),E.clear(E.COLOR_BUFFER_BIT),b(T,n.texture),I=e}function m(e){var t=E.getUniformLocation(e,"pixelStep");E.uniform2fv(t,[1/R.width,1/R.height])}function v(e){var t=E.getUniformLocation(e,"scale"),n=E.getUniformLocation(e,"translate");E.uniform1f(t,A),E.uniform2fv(n,U)}function x(e){var t=E.getUniformLocation(e,"birth"),n=E.getUniformLocation(e,"death");E.uniform1iv(t,w),E.uniform1iv(n,F)}function b(e,t){var n=E.getAttribLocation(e,"position"),r=E.getUniformLocation(e,"tex");E.enableVertexAttribArray(n),E.vertexAttribPointer(n,3,E.FLOAT,!1,0,0),E.uniform1i(r,0),E.activeTexture(E.TEXTURE0),E.bindTexture(E.TEXTURE_2D,t),E.drawArrays(E.TRIANGLE_STRIP,0,4),E.bindTexture(E.TEXTURE_2D,null)}function S(){var e=E.createTexture(),t=E.createFramebuffer();return E.bindTexture(E.TEXTURE_2D,e),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MAG_FILTER,E.NEAREST),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MIN_FILTER,E.NEAREST),E.texImage2D(E.TEXTURE_2D,0,E.RGBA,R.width,R.height,0,E.RGBA,E.UNSIGNED_BYTE,null),E.bindTexture(E.TEXTURE_2D,null),E.bindFramebuffer(E.FRAMEBUFFER,t),E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,e,0),E.bindFramebuffer(E.FRAMEBUFFER,null),{texture:e,frameBuffer:t}}function y(e,t){var n=C(e,E.VERTEX_SHADER),r=C(t,E.FRAGMENT_SHADER),i=E.createProgram();if(E.attachShader(i,n),E.attachShader(i,r),E.linkProgram(i),!E.getProgramParameter(i,E.LINK_STATUS))throw new Error("Linking of shader program failed.");return i}function C(e,t){var n=E.createShader(t);if(E.shaderSource(n,e),E.compileShader(n),!E.getShaderParameter(n,E.COMPILE_STATUS))throw new Error("Shader compile failed: "+E.getShaderInfoLog(n));return n}var E,R,D,T,_,L,I,w,F,A,U;return n(),{clear:r,seed:l,draw:p,step:g,setBirths:u,setDeaths:c,setScale:h,setPan:d}}var i=n(168),o=n(169),a=n(170),s=n(171);e.exports=r},168:function(e,t){e.exports="precision highp float;\n\nuniform vec2 pixelStep;\nuniform vec2 translate;\nuniform float scale;\n\nattribute vec3 position;\n\nvarying vec2 out_texCoord;\n\nvoid main() {\n  vec2 pan = translate * pixelStep * 2.0;\n\n  mat4 scaleMat = mat4(scale, 0.0, 0.0, 0.0,\n                       0.0, scale, 0.0, 0.0,\n                       0.0, 0.0, 1.0, 0.0,\n                       0.0, 0.0, 0.0, 1.0);\n\n  mat4 translateMat = mat4(1.0, 0.0, 0.0, 0.0,\n                           0.0, 1.0, 0.0, 0.0,\n                           0.0, 0.0, 1.0, 0.0,\n                           pan.x, -pan.y, 0.0, 1.0);\n\n  out_texCoord = (position.xy / 2.0) + vec2(0.5, 0.5);\n  gl_Position = scaleMat * translateMat * vec4(position, 1.0);\n}\n"},169:function(e,t){e.exports="precision highp float;\n\nuniform vec2 pixelStep;\nuniform sampler2D tex;\n\nvarying vec2 out_texCoord;\n\nvoid main() {\n  gl_FragColor = texture2D(tex, out_texCoord);\n}\n"},170:function(e,t){e.exports="precision highp float;\n\nattribute vec3 position;\n\nvarying vec2 out_texCoord;\n\nvoid main() {\n  out_texCoord = (position.xy / 2.0) + vec2(0.5, 0.5);\n  gl_Position = vec4(position, 1);\n}\n"},171:function(e,t){e.exports="precision highp float;\n\nuniform vec2 pixelStep;\nuniform sampler2D tex;\nuniform int birth[8];\nuniform int death[8];\n\nvarying vec2 out_texCoord;\n\n// Forward decls.\nint countNeighbours(in sampler2D tex, in vec2 loc);\nbool isCellAlive(in vec4 cellColor);\nvec4 nextCycleForLivingCell(in vec4 currentColor, in int neighbourCount);\nvec4 nextCycleForDeadCell(in vec4 currentColor, in int neighbourCount);\nbool isContainedIn(in int[8] list, in int value);\n\nvoid main() {\n  vec4 cellColor = texture2D(tex, out_texCoord);\n  bool cellAlive = isCellAlive(cellColor);\n  int neighbours = countNeighbours(tex, out_texCoord);\n\n  if (cellAlive) {\n    gl_FragColor = nextCycleForLivingCell(cellColor, neighbours);\n  } else {\n    gl_FragColor = nextCycleForDeadCell(cellColor, neighbours);\n  }\n}\n\nint countNeighbours(in sampler2D tex, in vec2 loc) {\n  int count = 0;\n\n  // Sadly, GLSL ES 2.0 doesn't allow constant arrays because it doesn't\n  // support array constructors.\n  vec2 neighbourOffsets[8];\n  neighbourOffsets[0] = vec2(-1.0, -1.0);\n  neighbourOffsets[1] = vec2( 0.0, -1.0);\n  neighbourOffsets[2] = vec2( 1.0, -1.0);\n  neighbourOffsets[3] = vec2(-1.0,  0.0);\n  neighbourOffsets[4] = vec2( 1.0,  0.0);\n  neighbourOffsets[5] = vec2(-1.0,  1.0);\n  neighbourOffsets[6] = vec2( 0.0,  1.0);\n  neighbourOffsets[7] = vec2( 1.0,  1.0);\n\n  for (int i = 0; i < 8; i++) {\n    vec2 neighbourLoc = loc + (neighbourOffsets[i] * pixelStep);\n    vec4 neighbourColor = texture2D(tex, neighbourLoc);\n\n    if (isCellAlive(neighbourColor)) {\n      count++;\n    }\n  }\n\n  return count;\n}\n\nbool isCellAlive(in vec4 cellColor) {\n  return cellColor.r == 1.0;\n}\n\nvec4 nextCycleForLivingCell(in vec4 currentColor, in int neighbourCount) {\n  if (isContainedIn(birth, neighbourCount)) {\n    return currentColor + vec4(0.0, -0.01, 0.0, 0.0);\n  } else {\n    return vec4(0.9, 0.0, 1.0, 1.0);\n  }\n}\n\nvec4 nextCycleForDeadCell(in vec4 currentColor, in int neighbourCount) {\n  if (isContainedIn(death, neighbourCount)) {\n    return vec4(1.0, 1.0, 0.3, 1.0);\n  } else {\n    return currentColor + vec4(-0.02, 0, -0.01, 0.0);\n  }\n}\n\nbool isContainedIn(in int[8] list, in int value) {\n  for (int i = 0; i < 8; i++) {\n    if (list[i] == value) {\n      return true;\n    }\n  }\n\n  return false;\n}\n"},172:function(e,t){function n(e,t){function n(e){l=u={x:e.pageX,y:e.pageY},o()}function r(e){var n={x:e.pageX,y:e.pageY},r={x:n.x-u.x,y:n.y-u.y};u=n,t(r)}function i(e){a(),l=void 0,u=void 0}function o(){document.addEventListener("mousemove",r),document.addEventListener("mouseup",i)}function a(){document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",i)}function s(){e.removeEventListener("mousedown",n),a()}var l,u;return e.addEventListener("mousedown",n),function(){s()}}e.exports=n},173:function(e,t,n){var r=n(174);"string"==typeof r&&(r=[[e.id,r,""]]);n(176)(r,{});r.locals&&(e.exports=r.locals)},174:function(e,t,n){t=e.exports=n(175)(),t.push([e.id,"#gol{cursor:move}#seed{display:none}",""])},175:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},176:function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=f[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(u(r.parts[o],t))}else{for(var a=[],o=0;o<r.parts.length;o++)a.push(u(r.parts[o],t));f[r.id]={id:r.id,refs:1,parts:a}}}}function i(e){for(var t=[],n={},r=0;r<e.length;r++){var i=e[r],o=i[0],a=i[1],s=i[2],l=i[3],u={css:a,media:s,sourceMap:l};n[o]?n[o].parts.push(u):t.push(n[o]={id:o,parts:[u]})}return t}function o(e,t){var n=m(),r=b[b.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",o(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",o(e,t),t}function u(e,t){var n,r,i;if(t.singleton){var o=x++;n=v||(v=s(t)),r=c.bind(null,n,o,!1),i=c.bind(null,n,o,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),r=d.bind(null,n),i=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),r=h.bind(null,n),i=function(){a(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}function c(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=S(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function h(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function d(e,t){var n=t.css,r=t.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var i=new Blob([n],{type:"text/css"}),o=e.href;e.href=URL.createObjectURL(i),o&&URL.revokeObjectURL(o)}var f={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},g=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),m=p(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,x=0,b=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=g()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return r(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var s=n[a],l=f[s.id];l.refs--,o.push(l)}if(e){var u=i(e);r(u,t)}for(var a=0;a<o.length;a++){var l=o[a];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete f[l.id]}}}};var S=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},177:function(e,t,n){"use strict";var r=n(1),i=n(178),o=["Slow","Normal","Fast"];n(181),e.exports=r.createClass({displayName:"exports",getInitialState:function(){return{speedRange:{min:0,max:2},scaleRange:{min:1,max:10}}},getDefaultProps:function(){return{ruleSets:[],currentRuleSetIndex:-1,playing:!1,speed:0,scale:1,offset:{x:0,y:0},onStateClear:function(){},onStateSeed:function(){},onRuleSetChange:function(){},onStep:function(){},onPlay:function(){},onStop:function(){},onSpeedChange:function(){},onDisplayReset:function(){},onScaleChange:function(){},onImpatientUser:function(){}}},getPlayStopLabel:function(){return this.props.playing?"Stop":"Play"},ruleOptions:function(){return this.props.ruleSets.map(function(e,t){return r.createElement("option",{key:t,value:t},e.label)})},handleStateClear:function(){this.props.onStateClear()},handleStateSeed:function(){this.props.onStateSeed()},handleRuleChange:function(e){this.props.onRuleSetChange(e.target.value)},handleStep:function(){this.props.onStep()},handlePlayStop:function(){this.props.playing?this.props.onStop():this.props.onPlay()},handleSpeedChange:function(e){this.props.onSpeedChange(e)},handleDisplayReset:function(){this.props.onDisplayReset()},handleScaleChange:function(e){this.props.onScaleChange(e)},handleImpatientUser:function(){this.props.onImpatientUser()},offsetX:function(){return this.roundValue(this.props.offset.x,100)},offsetY:function(){return this.roundValue(this.props.offset.y,100)},roundValue:function(e,t){return Math.round(e*t)/t},render:function(){return r.createElement("div",null,r.createElement("div",{className:"controls-container"},r.createElement("div",{className:"control-group"},r.createElement("button",{type:"button",onClick:this.handleImpatientUser},"Just Do Something Cool"))),r.createElement("div",{className:"controls-container"},r.createElement("div",{className:"control-group"},r.createElement("p",null,"Initial State"),r.createElement("button",{type:"button",onClick:this.handleStateClear},"Clear"),r.createElement("button",{type:"button",onClick:this.handleStateSeed},"Seed")),r.createElement("div",{className:"control-group"},r.createElement("p",null,"Rules"),r.createElement("select",{value:this.props.currentRuleSetIndex,onChange:this.handleRuleChange},this.ruleOptions())),r.createElement("div",{className:"control-group"},r.createElement("p",null,"Simulation"),r.createElement("button",{type:"button",onClick:this.handleStep,disabled:this.props.playing},"Step"),r.createElement("button",{type:"button",onClick:this.handlePlayStop},this.getPlayStopLabel()),r.createElement(i,{id:"speed",label:"Speed",range:this.state.speedRange,step:"1",value:this.props.speed,valueLabel:o[this.props.speed],onChange:this.handleSpeedChange})),r.createElement("div",{className:"control-group"},r.createElement("p",null,"Display"),r.createElement("button",{type:"button",onClick:this.handleDisplayReset},"Reset"),r.createElement(i,{id:"scale",label:"Scale",range:this.state.scaleRange,step:"0.1",value:this.props.scale,valueLabelRounding:"100",onChange:this.handleScaleChange}),r.createElement("div",{className:"coords"},r.createElement("p",null,"(",r.createElement("span",null,this.offsetX()),",",r.createElement("span",null,this.offsetY()),")")))))}})},178:function(e,t,n){"use strict";var r=n(1);n(179),e.exports=r.createClass({displayName:"exports",getDefaultProps:function(){return{id:"__none__",label:"Range",valueLabel:null,valueLabelRounding:1,range:{min:0,max:1},step:.1,value:.5,onChange:function(){}}},getLabel:function(){return null!==this.props.valueLabel?this.props.valueLabel:Math.round(parseFloat(this.props.value)*this.props.valueLabelRounding)/this.props.valueLabelRounding},handleRangeChange:function(e){var t;t=e.target.hasOwnProperty("valueAsNumber")?e.target.valueAsNumber:parseFloat(e.target.value),this.props.onChange(t)},render:function(){return r.createElement("div",{className:"range"},r.createElement("label",{htmlFor:this.props.id},this.props.label),r.createElement("input",{id:this.props.id,type:"range",min:this.props.range.min,max:this.props.range.max,step:this.props.step,value:this.props.value,onChange:this.handleRangeChange}),r.createElement("span",{className:"value"},this.getLabel()))}})},179:function(e,t,n){var r=n(180);"string"==typeof r&&(r=[[e.id,r,""]]);n(176)(r,{});r.locals&&(e.exports=r.locals)},180:function(e,t,n){t=e.exports=n(175)(),t.push([e.id,".control-group .range{position:relative;display:inline-block;margin-left:5px}.control-group .range label{position:absolute;top:-5px;left:0}.control-group .range input[type=range]{position:relative;top:10px;width:120px}.control-group .range .value{position:absolute;top:-5px;right:0}",""])},181:function(e,t,n){var r=n(182);"string"==typeof r&&(r=[[e.id,r,""]]);n(176)(r,{});r.locals&&(e.exports=r.locals)},182:function(e,t,n){t=e.exports=n(175)(),t.push([e.id,".controls-container{text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.control-group{display:inline-block;padding:10px 20px;border-right:1px solid #ddd}.control-group:last-child{border-right:none}.control-group>*{margin-right:5px}.control-group>:last-child{margin-right:0}.control-group p{text-align:left;margin:0 0 5px;font-size:12px;color:#999}.control-group button{padding:6px 10px;border:none}.control-group select{height:24px}.control-group .coords{display:inline-block;font-family:monospace;cursor:default}.control-group .coords span{display:inline-block;width:50px;overflow:hidden;text-align:right;vertical-align:middle;line-height:14px}",""])},183:function(e,t){function n(e,t,n){return{label:e,birth:t,death:n}}e.exports={ruleSets:[n("Conway's Life",[2,3],[3]),n("Mazectric",[1,2,3,4],[3]),n("Maze",[1,2,3,4,5],[3]),n("Serviettes",[],[2,3,4]),n("DotLife",[0,2,3],[3]),n("Coral",[4,5,6,7,8],[3]),n("34 Life",[3,4],[3,4]),n("Assimilation",[4,5,6,7],[3,4,5]),n("Long Life",[5],[3,4,5]),n("Diamoeba",[5,6,7,8],[3,5,6,7,8]),n("Amoeba",[1,3,5,8],[3,5,7]),n("Pseudo Life",[2,3,8],[3,5,7]),n("2x2",[1,2,5],[3,6]),n("HighLife",[2,3],[3,6]),n("Move",[2,4,5],[3,6,8]),n("Stains",[2,3,5,6,7,8],[3,6,7,8]),n("Day & Night",[3,4,6,7,8],[3,6,7,8]),n("DryLife",[2,3],[3,7]),n("Coagulations",[2,3,5,6,7,8],[3,7,8]),n("Walled Cities",[2,3,4,5],[4,5,6,7,8]),n("Vote 4/5",[3,5,6,7,8],[4,6,7,8]),n("Vote",[4,5,6,7,8],[5,6,7,8])]}},184:function(e,t,n){var r=n(185);"string"==typeof r&&(r=[[e.id,r,""]]);n(176)(r,{});r.locals&&(e.exports=r.locals)},185:function(e,t,n){t=e.exports=n(175)(),t.push([e.id,"a,abbr,acronym,address,applet,big,blockquote,body,caption,cite,code,dd,del,dfn,div,dl,dt,em,fieldset,form,h1,h2,h3,h4,h5,h6,html,iframe,img,ins,kbd,label,legend,li,object,ol,p,pre,q,s,samp,small,span,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,tt,ul,var{margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-family:inherit;font-size:100%;vertical-align:baseline}body{line-height:1;color:#000;background:#fff}ol,ul{list-style:none}table{border-collapse:separate;border-spacing:0}caption,table,td,th{vertical-align:middle}caption,td,th{text-align:left;font-weight:400}a img{border:none}button,div,input,select{font-family:Slabo\\ 27px,Helvetica Neue,Helvetica,sans-serif;font-size:14px}#container{width:1024px;margin:0 auto}",""])}});