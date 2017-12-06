define("mockup-i18n",["jquery"],function(a){"use strict";var b=function(){var b=this;b.baseUrl=a("body").attr("data-i18ncatalogurl"),b.baseUrl||(b.baseUrl="/plonejsi18n"),b.currentLanguage=a("html").attr("lang")||"en-us",b.storage=null,b.catalogs={},b.ttl=864e5,Date.now||(Date.now=function(){return(new Date).valueOf()});try{"localStorage"in window&&null!==window.localStorage&&"JSON"in window&&null!==window.JSON&&(b.storage=window.localStorage)}catch(c){}b.configure=function(a){for(var c in a)b[c]=a[c]},b._setCatalog=function(a,c,d){a in b.catalogs?b.catalogs[a][c]=d:(b.catalogs[a]={},b.catalogs[a][c]=d)},b._storeCatalog=function(a,c,d){var e=a+"-"+c;null!==b.storage&&null!==d&&(b.storage.setItem(e,JSON.stringify(d)),b.storage.setItem(e+"-updated",Date.now()))},b.getUrl=function(a,c){return b.baseUrl+"?domain="+a+"&language="+c},b.loadCatalog=function(c,d){if(void 0===d&&(d=b.currentLanguage),null!==b.storage){var e=c+"-"+d;if(e in b.storage&&Date.now()-parseInt(b.storage.getItem(e+"-updated"),10)<b.ttl){var f=JSON.parse(b.storage.getItem(e));return void b._setCatalog(c,d,f)}}a.getJSON(b.getUrl(c,d),function(a){null!==a&&(b._setCatalog(c,d,a),b._storeCatalog(c,d,a))})},b.MessageFactory=function(a,c){return c=c||b.currentLanguage,function(d,e){var f;if(f=a in b.catalogs&&c in b.catalogs[a]&&d in b.catalogs[a][c]?b.catalogs[a][c][d]:d,e){var g,h;for(h in e)e.hasOwnProperty(h)&&(g=new RegExp("\\$\\{"+h+"\\}","g"),f=f.replace(g,e[h]))}return f}}};return b}),define("translate",["mockup-i18n"],function(a){"use strict";var b=null;return function(c,d){if(null===b){var e=new a;e.loadCatalog("widgets"),b=e.MessageFactory("widgets")}return b(c,d)}}),define("text",["module"],function(a){"use strict";function b(a,b){return void 0===a||""===a?b:a}function c(a,c,d,e){if(c===e)return!0;if(a===d){if("http"===a)return b(c,"80")===b(e,"80");if("https"===a)return b(c,"443")===b(e,"443")}return!1}var d,e,f,g,h,i=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],j=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,k=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,l="undefined"!=typeof location&&location.href,m=l&&location.protocol&&location.protocol.replace(/\:/,""),n=l&&location.hostname,o=l&&(location.port||void 0),p={},q=a.config&&a.config()||{};return d={version:"2.0.15",strip:function(a){if(a){a=a.replace(j,"");var b=a.match(k);b&&(a=b[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:q.createXhr||function(){var a,b,c;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(b=0;b<3;b+=1){c=i[b];try{a=new ActiveXObject(c)}catch(d){}if(a){i=[c];break}}return a},parseName:function(a){var b,c,d,e=!1,f=a.lastIndexOf("."),g=0===a.indexOf("./")||0===a.indexOf("../");return f!==-1&&(!g||f>1)?(b=a.substring(0,f),c=a.substring(f+1)):b=a,d=c||b,f=d.indexOf("!"),f!==-1&&(e="strip"===d.substring(f+1),d=d.substring(0,f),c?c=d:b=d),{moduleName:b,ext:c,strip:e}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,e,f){var g,h,i,j=d.xdRegExp.exec(a);return!j||(g=j[2],h=j[3],h=h.split(":"),i=h[1],h=h[0],(!g||g===b)&&(!h||h.toLowerCase()===e.toLowerCase())&&(!i&&!h||c(g,i,b,f)))},finishLoad:function(a,b,c,e){c=b?d.strip(c):c,q.isBuild&&(p[a]=c),e(c)},load:function(a,b,c,e){if(e&&e.isBuild&&!e.inlineText)return void c();q.isBuild=e&&e.isBuild;var f=d.parseName(a),g=f.moduleName+(f.ext?"."+f.ext:""),h=b.toUrl(g),i=q.useXhr||d.useXhr;return 0===h.indexOf("empty:")?void c():void(!l||i(h,m,n,o)?d.get(h,function(b){d.finishLoad(a,f.strip,b,c)},function(a){c.error&&c.error(a)}):b([g],function(a){d.finishLoad(f.moduleName+"."+f.ext,f.strip,a,c)}))},write:function(a,b,c,e){if(p.hasOwnProperty(b)){var f=d.jsEscape(p[b]);c.asModule(a+"!"+b,"define(function () { return '"+f+"';});\n")}},writeFile:function(a,b,c,e,f){var g=d.parseName(b),h=g.ext?"."+g.ext:"",i=g.moduleName+h,j=c.toUrl(g.moduleName+h)+".js";d.load(i,c,function(b){var c=function(a){return e(j,a)};c.asModule=function(a,b){return e.asModule(a,j,b)},d.write(a,i,c,f)},f)}},"node"===q.env||!q.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"]?(e=require.nodeRequire("fs"),d.get=function(a,b,c){try{var d=e.readFileSync(a,"utf8");"\ufeff"===d[0]&&(d=d.substring(1)),b(d)}catch(f){c&&c(f)}}):"xhr"===q.env||!q.env&&d.createXhr()?d.get=function(a,b,c,e){var f,g=d.createXhr();if(g.open("GET",a,!0),e)for(f in e)e.hasOwnProperty(f)&&g.setRequestHeader(f.toLowerCase(),e[f]);q.onXhr&&q.onXhr(g,a),g.onreadystatechange=function(d){var e,f;4===g.readyState&&(e=g.status||0,e>399&&e<600?(f=new Error(a+" HTTP status: "+e),f.xhr=g,c&&c(f)):b(g.responseText),q.onXhrComplete&&q.onXhrComplete(g,a))},g.send(null)}:"rhino"===q.env||!q.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?d.get=function(a,b){var c,d,e="utf-8",f=new java.io.File(a),g=java.lang.System.getProperty("line.separator"),h=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f),e)),i="";try{for(c=new java.lang.StringBuffer,d=h.readLine(),d&&d.length()&&65279===d.charAt(0)&&(d=d.substring(1)),null!==d&&c.append(d);null!==(d=h.readLine());)c.append(g),c.append(d);i=String(c.toString())}finally{h.close()}b(i)}:("xpconnect"===q.env||!q.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(f=Components.classes,g=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),h="@mozilla.org/windows-registry-key;1"in f,d.get=function(a,b){var c,d,e,i={};h&&(a=a.replace(/\//g,"\\")),e=new FileUtils.File(a);try{c=f["@mozilla.org/network/file-input-stream;1"].createInstance(g.nsIFileInputStream),c.init(e,1,0,!1),d=f["@mozilla.org/intl/converter-input-stream;1"].createInstance(g.nsIConverterInputStream),d.init(c,"utf-8",c.available(),g.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),d.readString(c.available(),i),d.close(),c.close(),b(i.value)}catch(j){throw new Error((e&&e.path||"")+": "+j)}}),d}),define("text!bluechurch-locationsearch-url/locationsearch.pt",[],function(){return'<button class="locationsearch btn btn-success" \n    i18n:domain="rohberg.bluechurch" i18n:translate="">Search address in map</button>\n'}),define("bluechurch-locationsearch",["jquery","pat-base","translate","text!bluechurch-locationsearch-url/locationsearch.pt"],function(a,b,c,d){"use strict";var e=b.extend({name:"bluechurch-locationsearch-locationsearch",trigger:".geolocation_wrapper.edit",parser:"mockup",init:function(){var b=_.template(d)({_t:c});this.$el.prepend(b),a("button.locationsearch",this.$el).on("click",function(b){b.preventDefault();var d=this.$el.closest("form"),e=a("input#form-widgets-IBasic-title",d).val(),f=a("input#form-widgets-IAddress-street",d).val(),g=a("input#form-widgets-IAddress-zip_code",d).val(),h=a("input#form-widgets-IAddress-city",d).val(),i=a("select#form-widgets-IAddress-country option:selected",d).text();a.ajax("@@locationsearch",{dataType:"json",data:{title:e,street:f,zip_code:g,city:h,country:i}}).done(function(b){b.latitude&&b.longitude?(a("input.latitude",this.$el).val(b.latitude).trigger("change"),a("input.longitude",this.$el).val(b.longitude).trigger("change")):window.alert(c("Could not find an address."))}.bind(this))}.bind(this))}});return e}),require(["pat-registry","bluechurch-locationsearch"],function(a){"use strict";window.parent===window&&$(document).ready(function(){a.initialized||a.init()})}),define("/Users/ksuess/Plone/bluechurch/plone_bluechurch/src/rohberg.bluechurch/src/rohberg/bluechurch/locationsearch/bluechurch-locationsearch-bundle.js",function(){});
//# sourceMappingURL=bluechurch-locationsearch-bundle-compiled.js.map