(function(window,factory) {
    var wj = function(){},wd = window.document,ap = Array.prototype,sp = String.prototype,op = Object.prototype,fp = Function.prototype,ws = support();
    wj.prototype = {
        _ : function(a){
            return this.type.isString(a) ? document.getElementById(a) : void 0;
        },
        e : function(a){
            if(!a.e)return;
            var e = a.e;
            !this.type.isDom(e) && this.type.isString(e) ? e = document.createElement(e) : void 0;
            if(!e)return;
            
            var attr = a.attr || {};
            for(var v in attr)
                e.setAttribute(v, attr[v]);
            
            var style = a.style || {};
            for(var v in style)
                eval('e.style.'+v+'="'+style[v]+'"')
            
            if(a.c)this.css.add(e, a.c);
            
            if(a.to){
                var to = a.to;
                this.type.isDom(to) ? to.appendChild(e) : void 0;
                this.type.isString(to) ? 
                        to.toLocaleLowerCase() === 'body' ? 
                                document.body.appendChild(e) : 
                                document.getElmentById(to).appendChild(e)
                        : void 0;
            }
            
            if(a.html)e.innerHTML += a.html;
            
            var args = ['e','attr','style','c','to','html'];
            for(var v in a)if(args.indexOf(v) == -1)this.event(e, v, a[v], false);
            
            return e;
        },
        extend : function(){
            var o = arguments[0];
            for(var p in {String : null}){
                for(var i=1; i < arguments.length; i++){
                    var source = arguments[i];
                    for(var prop in source){
                        if(o.hasOwnProperty[prop])continue;
                        o[prop] = source[prop];
                    }
                }
                return o;
            }
            var protoprops = ["toString", "valueOf", "consturctor", "hasOwnProperty", "isPrototypeOf", "properyIsEnumerable", "toLocaleString"];
            for(var i=1; i < arguments.length; i++){
                var source = arguments[i];
                for(var prop in source){
                    if(o.hasOwnProperty[prop])continue;
                    o[prop] = source[prop];
                }
                for(var j=0; j<protoprops.length; j++){
                    var prop = protoprops[j];
                    if(o.hasOwnProperty[prop])continue;
                    if(source.hasOwnProperty[prop])o[prop] = source[prop];
                }
            }
            return o;
        },
        sleep : function(numberMillis){
             var now = new Date();
             var exitTime = now.getTime() + numberMillis; 
             while (true) {
                 now = new Date(); 
                 if (now.getTime() > exitTime) 
                 return;
             }
        },
        event : function(a,b,c,d){
            if(a.attachEvent){
                if(b === 'input')b = 'propertychange';
                a.attachEvent('on'+b, function(){c.call(a,arguments)} || function(){});
            }else if(a.addEventListener){
                a.addEventListener(b, c || function(){}, d || false);
            }else{
                a['on'+b] = c;
            }
        },
        lj : function(b){
            return this.d(this.e({
                e : 'script',
                attr : {
                    type : 'text/javascript',
                    charset : 'UTF-8',
                    src : b
                }
            }))
        },
        lc : function(b){
        	return this.d(this.e({
                e : 'link',
                attr : {
                    type : 'text/css',
                    charset : 'UTF-8',
                    rel : 'stylesheet',
                    href : b
                }
            }))
        },
        d : function(b){
            var a = document.getElementsByTagName("head")[0];
            a || (a = document.body.parentNode.appendChild(document.createElement("head")));
            a.appendChild(b);
            return b;
        },
        wj : function(b){
        	var script = '<script charset="UTF-8" type="text/javascript" src="'+b+'"><\/script>';
        	document.write(script);
        },
        wc : function(b){
    		var link = '<link charset="UTF-8" rel="stylesheet" type="text/css" href="'+b+'" />';
    		document.write(link);
        },
        clear : function(e){
            var e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return false;
        },
        point : function(e){
            var x = e.offsetLeft;
            var y = e.offsetTop;
            e = e.offsetParent;
            while (e) {
                x += e.offsetLeft - e.scrollLeft;
                y += e.offsetTop;
                e = e.offsetParent;
            }
            return {
                'x' : x,
                'y' : y
            };
        },
        fullHeight : function() {
            return (document.documentElement.scrollHeight > document.documentElement.clientHeight) ? document.documentElement.scrollHeight
                    : document.documentElement.clientHeight;
        },
        fullWidth : function() {
            return (document.documentElement.scrollWidth > document.documentElement.clientWidth) ? document.documentElement.scrollWidth
                    : document.documentElement.scrollWidth;
        },
        screenHeight : function() {
            return window.innerHeight || document.documentElement.clientHeight
                    || document.body.clientHeight;
        },
        screenWidth : function() {
            return window.innerWidth || document.documentElement.clientWidth
                    || document.body.clientWidth;
        },
        scrollTop : function() {
            return window.pageYOffset || document.documentElement.scrollTop
                    || document.body.scrollTop;
        },
        scrollLeft : function() {
            return window.pageXOffset || document.documentElement.scrollLeft
                    || document.body.scrollLeft;
        },
        center : function(o) {
            var w = o.offsetWidth;
            var h = o.offsetHeight
            var width = this.screenWidth();
            var height = this.screenHeight();
            if (w >= width) {
                o.style.left = this.scrollLeft() + 'px';
            } else {
                o.style.left = this.scrollLeft() + (width - w) / 2 + 'px';
            }
            if (h >= height) {
                o.style.top = this.scrollTop() + 'px';
            } else {
                o.style.top = this.scrollTop() + (height - h) / 2 + 'px';
            }
        },
        childNodes : function(a){
            var b = a.childNodes;
            var c = [];
            for(var i = 0; i<b.length; i++){
                if(b[i].nodeType == 1)c.push(b[i])
            }
            return c;
        },
        nextNode : function(a){
            return a.nextElementSibling || a.nextSibling;
        },
        domain_url : function() {
        	return window.location.protocol + '//' + window.location.host
        },
        lang : function(){
            var language = navigator.browserLanguage?navigator.browserLanguage:navigator.language;
        }
    }
    function support(){
        if (!sp.trim)
            sp.trim = function() {
                return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(this)[1]
            };
        if (!ap.indexOf)
            ap.indexOf = function(s){
                for(var i in this)if (this[i] === s)return i;
                return -1;
            };
        if(!ap.remove)
            ap.remove = function(s){
                var i = this.indexOf(s);
                if (i > -1)this.splice(i, 1);
            };
        if(!fp.bind){
            fp.bind = function(o /*, args */){
                var self = this, boundArgs = arguments;
                return function(){
                    var args = [], i;
                    for(i = 1; i<boundArgs.length; i++) args.push(boundArgs[i]);
                    for(i = 0; i<arguments.length; i++) args.push(arguments[i]);
                    return self.apply(o,args)
                }
            }
        }
    }
    window.wj = new wj();
    factory(window);
})(window,function(window){
    var ww = window.wj,wd = window.document,ap = Array.prototype,sp = String.prototype,op = Object.prototype,fp = Function.prototype,
    accepts = {"*": "*/".concat( "*" ),text: "text/plain",html: "text/html",xml: "application/xml",json: "application/json"},_wjhttp = false,
    xmlhttp = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP"];
    
    /**
    * 传递函数给whenReady（），当文档解析完成且为操作准备就绪时，
    * 函数将作为文档对象的方法调用
    * DOMContentLoaded、readystatechange或load事件发生时会触发注册函数
    * 一旦文档准备就绪，所有函数都将被调用、任何传递给whenReady（）的函数都将立即调用
     */
    var whenReady =(function(){     //这个函数返回whenReady（）函数
        var funcs = [];             //当获得事件时，要运行的函数
        var ready = false;          //当触发事件处理程序时，切换到true
     
        //当文档准备就绪时，调用事件处理程序
        function handler(e){
            //如果已经运行过一次，只需要放回
            if(ready)
                return;
     
            //如果发生readystatechange事件
            //但其状态不是“complete”的话，那么文档尚未准备好
            if(e.type === "readystatechange" && document.readyState !=="complete")
                return ;
            //运行所有注册函数
            //注意每次都要计算funcs.length
            //以防这些函数调用可能会导致注册更多的函数
            for(var i= 0 ; i < funcs.length ; i++)
                funcs[i].call(document);
     
            //现在设置ready标识为true，并移除所有函数
            ready = true;
            funcs = null;
        }
     
        //为接收到的任何事件注册处理程序
        if(document.addEventListener){
            document.addEventListener("DOMContentLoaded",handler,false);
            document.addEventListener("readystatechange",handler,false);
            window.addEventListener("load",handler,false);
        }else if(document.attachEvent){
            document.attachEvent("onreadystatechange",handler);
            window.attachEvent("onload",handler);
        }
     
        //返回whenReady()函数
        return function whenReady(f){
            if(ready)
                f.call(document);   //若准备完毕，只需要运行它
            else
                funcs.push(f);      //否则，加入队列等候
        }
    }());
    
    ww.ready = whenReady;
    
    ww.extend(ww.css={},{
        set : function(a,b){
            a && b ? a.className = b : void 0;
        },
        get : function(a){
            return a && a.className ? a.className : '';
        },
        has : function(a,b){
            return a && b ? 
                    new RegExp('(^|\\s)' + b + '(\\s|$)').test(a.className)
                    : false;
        },
        add : function(a,b){
            a && b && !this.has(a,b) ? a.className += ' ' + b : void 0;
        },
        remove : function(a,b){
            a && b && this.has(a,b) ? 
                    a.className = a.className.replace(new RegExp('(^|\\s)' + b + '(\\s|$)'), '') 
                        : void 0;
        }
    }),
    ww.extend(ww.type={},{
        isString : function(e){
            return '[object String]' == op.toString.call(e);
        },
        isArray : function(e){
            return typeof e === 'object' && '[object Array]' === op.toString.call(e)
        },
        isDom : function(e){
            return typeof HTMLElement === 'object' ? 
                    e instanceof HTMLElement
                    : e && typeof e === 'object' && e.nodeType === 1 && typeof e.nodeName === 'string';
        },
        isFunction : function(f){
            return '[object Function]' === op.toString.call(f)
        }
    }),
    ww.extend(ww.request={},{
        ajax : function(a){
        	var _ajax = function(a){
        		this.req(a);
        	};
        	_ajax.prototype = {
        		req : function(a){
                	if(this.supported()){
    	        		(a.async+'').toLowerCase() == 'false' ? a.async = false : a.async = true;
    	        		this.send(a);
    	        		this.back(a);
    	        	}
        		},
    	        supported : function(){
    	        	if(window.XMLHttpRequest)_wjhttp = new XMLHttpRequest();
    	        	else if(window.ActiveXObject){
    	        		for(var i=0; i < xmlhttp.length; i++){
    	                    _wjhttp = new ActiveXObject(xmlhttp[i]);
    	                    if(_wjhttp || typeof _wjhttp === 'object')break;
    	                }
    	        	}
    	        	return _wjhttp;
    	        },
        		send : function(a){
        			var params = this.params(a);
                	if(a.method && a.method.toLowerCase() === 'post'){
                		_wjhttp.open('post', a.path+a.action, a.async);
                		this.headers(a);
                        _wjhttp.send(params == '' ? null : params);
                	}else{
                		_wjhttp.open('get', a.path+a.action+(params == '' ? '' : ('?'+params)), a.async);
                		this.headers(a);
                        _wjhttp.send(null);
                	}
        		},
                params : function(a){
                	var arr = [];
                    var param = a.param;
                    if(param){
                        for(var p in param)
                            a.mv ? arr.push('mv['+p+']='+param[p]) : arr.push(p+'='+param[p])
                    }
                    return arr.length ? encodeURI(arr.join('&')) : ''
                },
                headers : function(a){
                	_wjhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8 ;'+a.header);
//                	_wjhttp.setRequestHeader("Content-Type",'multipart/form-data');
                    _wjhttp.setRequestHeader('X-Requested-With','XMLHttpRequest');
//                    console.log('222222222222222222');
//                    console.log(a.header)
//                    for(var i in a.header){
//                    	_wjhttp.setRequestHeader(i, 'aaaa');
//                    }
                    _wjhttp.withCredentials = true;
                },
        		back : function(a){
        			var self = this;
                	if(a.async) setTimeout(self.asynchronous.call(self,a),14);
                    else this.synchronous(a);
        		},
                asynchronous : function(a){
                	var self = this;
                	_wjhttp.onreadystatechange = function(){
        				if(this.readyState == 4)
        					if(this.status == 200){
        						try{
        			                 if(typeof a.back == "function")a.back.call(self,self.getData(this));
        			            }catch (e){
        			                if(typeof a.error == "function")a.error.call(self,e);
        			            }finally{
        			                _wjhttp = false;
        			            }
        					}
        			};
                },
                synchronous : function(a){
                	try{
                         if(typeof a.back == "function")a.back.call(this,this.getData());
                    }catch (e){
                        if(typeof a.error == "function")a.error.call(this);
                    }finally{
                        _wjhttp = false;
                    }
                },
                getData : function(o){
                	var data;
                	var http = o ? o : _wjhttp;
                    var ct = http.getResponseHeader('Content-Type');
                    if(ct.indexOf(accepts.text) != -1){
                        data = http.responseText;
                    }else if(ct.indexOf(accepts.html) != -1){
                        data = http.responseText;
                    }else if(ct.indexOf(accepts.json) != -1){
                        eval("data=" + http.responseText);
                    }else if(ct.indexOf(accepts.xml) != -1){
                        data = http.responseXML.getElementsByTagName("data")[0].firstChild.data;
                    }
                    return data;
                }
        	}
        	return new _ajax(a);
        },
        jsonp : function(a){
        	var _jsonp = function(a){
        		this.req(a);
        	}
        	_jsonp.prototype = {
        		req : function(a){
        			this.createScript(a);
        		},
    	        createScript : function(a){
    	        	var self = this;
    	        	var path = a.path + a.action;
    	        	a.param ? void 0 : a.param = {};
    	        	a.param.callback = this.callback(a);
    	        	var params = this.params(a);
    	        	path += (params == '' ? '' : ('?'+params))
    	        	this.script = ww.lj(path);
    	        	ww.e({
    	        		e : self.script,
    	        		attr : {id : a.param.callback}
    	        	});
    	        },
                params : function(a){
                	var arr = [];
                    var param = a.param;
                    if(param){
                        for(var p in param)
                            a.mv ? arr.push('mv['+p+']='+param[p]) : arr.push(p+'='+param[p])
                    }
                    return arr.length ? encodeURI(arr.join('&')) : ''
                },
    	        callback : function(a){
    	        	var back = 'wj_jsonp' + Math.floor(Math.random()*100000000000000);
    	        	eval(back+' = function(data,key){if(a.back)a.back(data,key);eval(\'window.\'+key+\'=void 0\');document.getElementsByTagName("head")[0].removeChild(ww._(key));}')
    	        	return back;
    	        }
        	}
        	return new _jsonp(a);
        },
        iframe : function(a){
        	var _iframe = function(a){
        		this.req(a);
        	}
        	_iframe.prototype = {
        		req : function(a){
                	this.createIframe(a);
                	this.submit(a);
        		},
                createIframe : function(a){
                	var iframe;
                	a.key = 'wj_iframe' + Math.floor(Math.random()*100000000000000);
        			try {
        				iframe = document.createElement('<iframe id="'+a.key+'" name="'+a.key+'" style="display:none"></iframe>');
        			} catch (e) {
        				iframe = document.createElement('iframe');
        				iframe.setAttribute('name', a.key);
        				iframe.setAttribute('id', a.key);
        				iframe.style.display = 'none';
        			}
        			ww.d(iframe)
                },
                submit : function(a){
                	var div = ww.e({
                		e : 'div',
                		attr : {id: a.key+'_div'},
                		style : {
                			display : 'none'
                		},
                		to : 'body'
                	});
                	var form = ww.e({
                		e : 'form',
                		attr : {
                			action : a.path + a.action,
                			method : a.method || 'get',
                			target : a.key
                		},
                		to : div
                	})
                	var params = a.param;
                	for(var p in params){
                		ww.e({
                			e : 'input',
                			attr : {
                				name : (a.mv ? 'mv['+p+']' : p),
                				value : params[p]
                			},
                			to : form
                		})
                	}
                	eval(a.key+' = function(data,key){if(a.back)a.back(data,key);document.body.removeChild(ww._(key+"_div"));document.getElementsByTagName("head")[0].removeChild(ww._(key));}')
                	ww.e({
            			e : 'input',
            			attr : {
            				name : (a.mv ? 'mv[callback]' : 'callback'),
            				value : a.key
            			},
            			to : form
            		})
                	var cross_domain = ww.domain_url();
                	if(!new RegExp("^"+cross_domain).test(a.path + a.action)){
                		var pp;
                		if(new RegExp("^http://").test(a.path)){
                			pp = a.path.substring(7);
                		}else if(new RegExp("^https://").test(a.path)){
                			pp = a.path.substring(8);
                		}
                		ww.e({
                			e : 'input',
                			attr : {
                				name : (a.mv ? 'mv[cross_domain]' : 'cross_domain'),
                				value : cross_domain + (pp ? pp.split('/')[1] ? '/'+pp.split('/')[1] : void 0 : void 0)
                			},
                			to : form
                		})
                	}
                	form.submit();
                }
        	}
        	return new _iframe(a);
        },
        image : function(a){
        	var ig = function(a){
        		this.req(a);
        	};
        	ig.prototype = {
        		req : function(a){
        			this.send(a);
        		},
                params : function(a){
                	var arr = [];
                    var param = a.param;
                    if(param){
                        for(var p in param)
                            a.mv ? arr.push('mv['+p+']='+param[p]) : arr.push(p+'='+param[p])
                    }
                    return arr.length ? encodeURI(arr.join('&')) : ''
                },
        		send : function(a){
                	var img = new Image();
                	img.onload = function(){}
                	img.onerror = function(){}
                	var params = this.params(a);
                	img.src=a.path+a.action+(params == '' ? '' : ('?'+params)); 
            	}
        	}
        	return new ig(a);
        }
    });
});
//document.readyState="complete";