/*
	Simis: Simetrias no plano
	Autor: Emerson Vitor Castelani
	Versão html/js: João henrique morales sanches <suporte@jhms.com.br>
	:: 0.1 <12/06/2012>
	// Transformações
		* Reflexão
		* wPaint (Alterado para o uso)
	:: 0.2 <19/06/2012>
	// Transformações
		* Reflexão
		* Translação
		* Rotação
		* Glisso Reflexão
	// Engine
		* menu
		* tipsy (Alterado para o uso)
		* slider jquery
		* multiplas cores (função e original)
		* salvar em png
		* ie9 suporte
		* borracha
		* limpar tela
		* edição do código do wPaint e tipsy
		* malert() com slide e tempo de exibição
	// Suporte ie9,chrome,firefox,opera 
	:: 0.3 <23/06/2012>
	// Grupos
		* Roseta
		- Reflexão

	// Engine
		* Submenus

	:: 0.3.1 <26/06/2012>
	// Engine
		* Adicionado flecha ao drawline no modo Translação. Adicionando sentido ao objeto
	
	:: 0.3.2 <12/07/2012>
	// Engine
		* Suporte window.drag para desenho
		* Salvar com window.drag

	// Frisos
		* Adicionado suporte a todos os grupos de frisos.
	
	:: 0.3.3 <26/08/2012>
	// Engine
		* Bug do limpar no rotação.
		* Adicionado ângulo para o rotação
		* Suporte a borracha no friso
		* Desabilitada borracha no papel de parede

	// Adicionado suporte a todos os grupos de Papeis de parede
*/
var MyThis_menu=[0,0,0],tmp=[0,0],reta=[0,0,0,0,0],pthis,line=operation=clicked=used=0,ctxline,tout,in_,rect=new Array(),g=[];rect[0]=[140,1,140,198];rect[1]=[140,1,140,99];rect[2]=[210,1,70,198];rect[3]=[140,1,140,99];rect[4]=[140,1,140,99];rect[5]=[210,1,70,99];rect[6]=[210,1,70,99];function check_st(){return line?true:false}function chk_eraser(e){return e=="Eraser"?true:false}function is_int(e){return typeof e==="number"&&e%1==0}function tfunc(){a=$(".menu").css("left");if(a=="120px"){$(".menu").animate({left:"0px"});MyThis_menu[0].find("._wPaint_func").addClass("active")}else{$(".menu").animate({left:"120px"});MyThis_menu[0].find("._wPaint_func").removeClass("active")}}function Mymode(e,j,f){if($.inArray(operation,[5,6])>=0&&e=="Eraser"){$("#wPaint2").css({cursor:"crosshair"})}else{$("#wPaint2").css({cursor:"default"})}MyThis_menu=[j.menu,f,e];return e}function func(e,f){if(operation==e){return -1}clean(0);operation=e;$(".func").text($(f).text());$(".menu .botao").removeClass("selected");$(".menu .botao:eq("+e+")").addClass("selected");$(".myrun").hide();$(".slider").hide();$(".submenu").slideUp("fast");$("#wclone").css({left:0});MyThis_menu[0].find("._wPaint_eraser").removeClass("_wPaint_disable").attr({title:"Borracha"});$("._wPaint_eraser").css({backgroundImage:"url(images/icon_eraser.png)"});switch(e){case 0:change_screen(0);malert("Mova o mouse para criar o segmento de reta referência",1);break;case 1:change_screen(0);malert("Mova o mouse para criar o vetor referência",1);break;case 2:change_screen(0);$("#slider").slider({min:0,max:360});$(".slider .text").show();malert("Clique para criar o ponto de origem",1);break;case 3:change_screen(0);tmp=[$("#wPaint").width()/2,$("#wPaint").height()/2];$("#slider").slider({min:0,max:800,value:400,disabled:false}).fadeIn();ctxline=document.getElementById("line").getContext("2d");line=1;drawline(ctxline,0,tmp[1],tmp[0],tmp[1],1);$(".slider .text").hide();malert("Pronto para começar",0);break;case 4:change_screen(0);tmp=[$("#wPaint").width()/2,$("#wPaint").height()/2];reta=[tmp[0],0,tmp[0],tmp[1],tmp[0]];line=1;$("#slider").slider({min:1,max:200,value:1,disabled:false}).fadeIn();$(".slider .text").css({"float":"right"}).text("1").show();$(".submenu.roseta").slideDown();malert("Pronto para começar",0);break;case 5:line=1;change_screen(1);$(".submenu.friso").slideDown();$(".submenu.friso div").removeClass("selected");$(".submenu.friso div:eq(0)").addClass("selected");drawrect(0);break;case 6:line=1;change_screen(2);MyThis_menu[0].find("._wPaint_eraser").addClass("_wPaint_disable");$(".submenu.wp").slideDown();$(".submenu.wp div").removeClass("selected");$(".submenu.wp div:eq(0)").addClass("selected");drawrect(-1);break}}function change_screen(e){if(e){switch(e){case 1:w=400;l="510px";$(".drag img").attr("title","O retângulo vermelho que aparece na tela abaixo, fornece uma área de segurança, ou seja se você desenhar fora desta área a figura que aparece na tela poderá conter sobreposições");break;case 2:w=200;l="710px";$(".drag img").attr("title","A área para desenho é limitada a esse quadrado");break}$(".cont").css({position:"static"});$("#wPaint,#wPaint3").css({width:w+"px",height:"200px"});$("#wPaint3").css({background:"#F5F5F5"});$("#wPaint3 canvas:first").attr({width:w+"px",height:"200px"});$("#wPaint canvas:first").attr({width:w+"px",height:"200px"});$(".dragtop").show();$("#wPaint2").css({left:"121px",top:"26px"});$(".drag").css({position:"absolute",left:l,top:"60px"}).draggable({disabled:false,handle:"p"}).find("p").css({width:(w-10)+"px"});$(".func").css({bottom:"17px",right:"13px"})}else{$(".cont").css({position:"relative"});$("#wPaint2").css({left:"0px",top:"0px"});$("#wPaint,#wPaint3").css({width:"800px",height:"600px"});$("#wPaint3").css({backgroundColor:"transparent"});$("#wPaint3 canvas:first").attr({width:"800px",height:"600px"});$("#wPaint canvas:first").attr({width:"800px",height:"600px"});$(".dragtop").hide();$(".drag").css({position:"static"});$(".drag").draggable("disabled");$(".func").css({bottom:"8px",right:"6px"})}}function moveline(j,q,k,f,e){pthis=q;if(k<0){j.lineJoin="round";j.lineCap="round";j.strokeStyle=q.settings.fillStyle;j.fillStyle=q.settings.fillStyle;j.lineWidth=chk_eraser(q.settings.mode)?10:q.settings.lineWidth;j.beginPath();j.arc(f,e,q.settings.lineWidth/2,0,Math.PI*2,true);j.closePath();j.fill();j.beginPath();j.moveTo(f,e);clicked=1;return -1}if(!k){clicked=0;j.closePath();return -1}j.lineTo(f,e);j.stroke();return -1}function drawrect(e){ctxline.canvas.width=ctxline.canvas.width;clean(1);if(e<0){if(e!=-2){ctxline.strokeStyle="red";ctxline.strokeRect(22,22,156,156);ctxline.strokeStyle="#cdcdcd";ctxline.beginPath();ctxline.moveTo(100,22);ctxline.lineTo(100,178);ctxline.stroke();ctx.closePath();ctxline.beginPath();ctxline.moveTo(22,100);ctxline.lineTo(178,100);ctxline.stroke();ctx.closePath()}else{ctxline.strokeStyle="#cdcdcd";ctxline.beginPath();ctxline.moveTo(100,0);ctxline.lineTo(100,200);ctxline.stroke();ctx.closePath();ctxline.beginPath();ctxline.moveTo(0,100);ctxline.lineTo(200,100);ctxline.stroke();ctx.closePath()}}else{ctxline.strokeStyle="red";ctxline.strokeRect(rect[e][0],rect[e][1],rect[e][2],rect[e][3])}fixopera(ctxline)}function drawrotline(f,e,k,j){w=$("#wPaint").width();h=$("#wPaint").height();ctxline.canvas.width=ctxline.canvas.width;if(j.toFixed(0)<30){$("#slider .text").css({"float":"right"})}else{if(j.toFixed(0)>320){$("#slider .text").css({"float":"left"})}}$("#slider .text").text(j.toFixed(0)+"º");rad=-1*(j*Math.PI)/180;cos=(Math.cos(rad).toFixed(3));sin=(Math.sin(rad).toFixed(3));m=Math.tan(rad).toFixed(3);r=Math.sqrt(Math.pow(e,2)+Math.pow(k,2)).toFixed(3);w1=j>90&&j<270?-w:w;yf=m*(w1-e)+k;if(j==270){w1=e;yf=h}if(j==90){w1=e;yf=0}f.lineJoin="round";f.beginPath();f.moveTo(e,k);f.lineTo(w,k);f.closePath();f.stroke();f.beginPath();f.arc(e,k,2,0,Math.PI*2,true);f.fillStyle="#000";f.strokeStyle="#000";f.closePath();f.stroke();f.fill();f.fillStyle="#000";f.strokeStyle="#000";f.beginPath();f.moveTo(e,k);f.lineTo(w1,yf);f.stroke();f.beginPath();f.arc(tmp[0],tmp[1],15,0,j==1||j==0?0:2*Math.PI-(j-1)*Math.PI/180,true);f.lineWidth=1;f.strokeStyle="#000";f.stroke();$(".slider").slider({disabled:false}).fadeIn()}function drawline(D,e,B,A,s,q){c=a=0;m=(s-B)/(A-e);m=m.toFixed(3);D.lineJoin="round";if(q){w=$("#wPaint").width();b=m*(-e)+B;c=B-m*e;yf=m*(w-e)+B;if(!isFinite(m)){a=A;b=0;w=A;c=e;yf=$("#wPaint").height()}}else{a=e;b=B;c=B-m*e;if(!isFinite(m)){c=e;n=s-B<0?1:-1}else{n=(s-B)>0&&(A-e)>0||(s-B>0&&A-e<0)?-1:1}if(m==0){yr=s;xr=A-e<0?A+10:A-10}else{yr=n*10/Math.sqrt((1/Math.pow(m,2))+1)+s;xr=A+(yr-s)/m}w=A;yf=s;l=rotation(A,s,xr,yr,30);D.beginPath();D.moveTo(w,yf);D.lineTo(l[0],l[1]);D.closePath();D.stroke();l=rotation(A,s,xr,yr,330);D.beginPath();D.moveTo(w,yf);D.lineTo(l[0],l[1]);D.closePath();D.stroke()}D.beginPath();D.moveTo(a,b);D.lineTo(w,yf);D.closePath();D.stroke();reta=[e,B,A,s,m];if(operation!=3){m=-1*m;m=m.toFixed(3);var t=Math.ceil(Math.max(a,w)*m)+Math.ceil(parseInt(c));var k=Math.floor(Math.min(a,w)*m)+Math.floor(parseInt(c));t=!isFinite(t)?"Infinito":t;k=!isFinite(k)?"-Infinito":k;var j=t==Math.max(a,w)*m+c.toFixed(3)?"[":"(";var C=k==Math.min(a,w)*m+c.toFixed(3)?"]":")";if(k==t){j="";C="";t="0";c=Math.floor(c)}if(c>0){c="+"+c.toFixed(3).replace(".000","")}else{c=c.toFixed(3).replace(".000","")}if(m==0){$(".reta").text("y = "+c)}else{$(".reta").text("y = "+m.replace(".000","")+"x"+c)}if(!isFinite(m)){$(".reta").text("x = "+c)}h=parseInt(Math.sqrt(Math.pow(a-w,2)+Math.pow(b-yf,2)));if(operation==1){$(".reta").html("<span style='font-size:9px'>Dom ["+parseInt(a)+","+parseInt(w)+"]x"+j+k+","+t+C+" <b>|&middot;|</b>="+h+"</span><br>"+$(".reta").text()).css({height:"24px"})}else{$(".reta").css({height:"12px"})}}}function fixopera(e){var f=e.strokeStyle;e.beginPath();e.moveTo(0,0);e.strokeStyle=$(".wPaint_demobox").css("backgroundColor");e.lineTo(0,1);e.closePath();e.stroke();e.strokeStyle=f}function clean(e){if(pthis){ctx=pthis.ctx;ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}}ctx=document.getElementById("hcanvas").getContext("2d");ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}ctx=document.getElementById("hcanvas1").getContext("2d");ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}ctx=document.getElementById("hcanvas2").getContext("2d");ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}ctx=document.getElementById("hcanvas3").getContext("2d");ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}ctx=document.getElementById("wclone").getContext("2d");ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}e=(e&&($.inArray(operation,[3,4,5,6])>=0))?1:0;if(operation==2){$(".slider").slider({disabled:true})}g=[];if(!e){tmp=[0,0];reta=[0,0,0,0,0];line=clicked=0;$(".point").css({left:-100,top:-100});$(".reta").text("");$("input.Rreflect").attr("checked",false);ctx=document.getElementById("line").getContext("2d");ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}}malert("Pronto para o uso",3);used=0;$("#wPaint2").css({cursor:"default"});MyThis_menu[0].find("._wPaint_icon:not(.not)").removeClass("active");MyThis_menu[0].find("._wPaint_pencil").addClass("active");MyThis_menu[1].settings.mode="Pencil"}function malert(f,e){clearTimeout(tout);if(!e){tout=window.setTimeout(function(){$(".alert").animate({marginTop:"50px"})},3000)}else{$(".alert").animate({marginTop:"2px"})}if(e==3){tout=window.setTimeout(function(){$(".alert").animate({marginTop:"50px"})},3000)}if(f){$(".alert").text(f)}}function translation(e,f){return[e+(reta[2]-reta[0]),f+(reta[3]-reta[1])]}function reflect(e,j,f){reta=typeof(f)!=="undefined"?f:reta;if(reta[4]==0){a=e;b=reta[1]}else{if(!isFinite(reta[4])){a=reta[0];b=j}else{mp=(-1)/reta[4];a=(-e*mp+reta[0]*reta[4]+j-reta[1])/(reta[4]-mp);b=reta[4]*(a-reta[0])+reta[1]}}return[2*a-e,2*b-j]}function rotation(f,D,C,A,j,e){var q=j?j:$("#slider").slider("value");var s=(q*Math.PI)/180;var E=(Math.cos(s).toFixed(3));var k=(Math.sin(s).toFixed(3));if(e){k=-1*k}C=C-f;A=A-D;var B=C*E+A*k;var t=-C*k+A*E;return[B+f,t+D]}function roseta(f,k,j,e,t,q){pthis=k;q=q?q:$("#slider").slider("value");m=360/(q?q:1);r=$("input.Rreflect").is(":checked");f.lineJoin="round";f.lineCap="round";f.strokeStyle=k.settings.fillStyle;f.fillStyle=k.settings.fillStyle;f.lineWidth=chk_eraser(k.settings.mode)?10:k.settings.lineWidth;if(j<0){clicked=1}else{if(!j){for(i=1;i<=q;i++){o[i]="undefined"}clicked=0;return -1}}for(i=1;i<=q;i++){l=rotation(tmp[0],tmp[1],e,t,i*m);if(typeof(o[i])=="undefined"){o[i]=l}if(j<0&&i!=q){f.beginPath();f.arc(l[0],l[1],k.settings.lineWidth/2,0,Math.PI*2,true);f.closePath();f.fill()}if(r){if(j<0){u=reflect(l[0],l[1]);f.beginPath();f.arc(u[0],u[1],k.settings.lineWidth/2,0,Math.PI*2,true);f.closePath();f.fill()}u=reflect(o[i][0],o[i][1])}if(i!=q){f.beginPath();f.moveTo(o[i][0],o[i][1])}if(j>0){o[i]=l}if(i!=q){f.lineTo(o[i][0],o[i][1]);f.closePath();f.stroke()}if(r){f.beginPath();f.moveTo(u[0],u[1]);u=reflect(o[i][0],o[i][1]);f.lineTo(u[0],u[1]);f.closePath();f.stroke()}}return -1}function friso(k,A,t,e,B){var f=$(".submenu.friso div").index($(".submenu.friso .selected")[0]);max=Math.ceil($("#wPaint2").width()/rect[f][2]);w=rect[f][2];h=rect[f][3];switch(f){case 0:n=6;break;case 1:case 2:case 3:n=12;break;case 4:n=13;break;case 5:case 6:n=24;break}pthis=A;k.lineJoin="round";k.lineCap="round";k.lineWidth=chk_eraser(A.settings.mode)?10:A.settings.lineWidth;if(t<0){clicked=1}else{if(!t){for(i=1;i<=n;i++){o[i]="undefined"}clicked=0;return -1}}var q=0;for(i=1;i<=n;i++){switch(f){case 0:d=300;k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;l=[(i-1)*w+(e-w),B+d];break;case 1:d=300;if(i>n-max){k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;l=rotation(rect[f][2]/2,rect[f][3]/2,e,B,180);l=[(q+2)*w+(l[0]-w),l[1]+d+h]}else{k.strokeStyle=A.settings.strokeStyle;k.fillStyle=A.settings.strokeStyle;l=[q*w+(e-w),B+d]}break;case 2:d=300;if(i%2==0){k.strokeStyle=A.settings.strokeStyle;k.fillStyle=A.settings.strokeStyle;l=[(i-2)*w+(e-210),B+d]}else{k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[r,0,r,v,r];l=reflect(e,B);l=[l[0]+(q-2)*w,l[1]+d]}break;case 3:d=300;if(i>n-max){k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[0,v,r,v,0];l=reflect(e,B);l=[q*w+(l[0]-w),l[1]+d+h]}else{k.strokeStyle=A.settings.strokeStyle;k.fillStyle=A.settings.strokeStyle;l=[q*w+(e-w),B+d]}break;case 4:d=300;if(i>=n-max){k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[0,v,r,v,0];l=reflect(e,B);l=[(q-1)*w+(l[0]-w/2),l[1]+d+h]}else{k.strokeStyle=A.settings.strokeStyle;k.fillStyle=A.settings.strokeStyle;l=[q*w+(e-w),B+d]}break;case 5:d=300;if(i>n-max){if(i%2!=0){k.strokeStyle=A.settings.strokeStyle;k.fillStyle=A.settings.strokeStyle;l=[q*w+(e-rect[f][0]),B+d]}else{k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[r,0,r,v,r];l=reflect(e,B);l=[q*w+(l[0]-rect[f][0]),l[1]+d]}}else{if(i%2!=0){k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[0,v,r,v,0];l=reflect(e,B);l=[q*w+(l[0]-rect[f][0]),l[1]+d+h]}else{k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[0,v,r,v,0];l=reflect(e,B);r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[r,0,r,v,r];l=reflect(l[0],l[1]);l=[q*w+(l[0]-rect[f][0]),l[1]+d+h]}}break;case 6:d=300;if(i>n-max){if(i%2!=0){k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[0,v,r,v,0];l=reflect(e,B);l=[q*w+w+(l[0]-rect[f][0]),l[1]+d+h]}else{k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;r=rect[f][0]+rect[f][2]/2;v=rect[f][1]+rect[f][3]/2;reta=[r,0,r,v,r];l=reflect(e,B);l=[l[0]+(q-3)*w,l[1]+d]}}else{if(i%2!=0){k.strokeStyle=A.settings.strokeStyle;k.fillStyle=A.settings.strokeStyle;l=[q*w+(e-rect[f][0]),B+d]}else{k.strokeStyle=A.settings.fillStyle;k.fillStyle=A.settings.fillStyle;l=rotation(rect[f][2]/2,rect[f][3]/2,e,B,180);l=[(q+4)*w+w+(l[0]-rect[f][0]),l[1]+d+h+2]}}break}if(i!=(n-max)){q++}else{q=0}if(typeof(o[i])=="undefined"){o[i]=l}if(t<0){k.beginPath();k.arc(l[0],l[1],A.settings.lineWidth/2,0,Math.PI*2,true);k.closePath();k.fill()}k.beginPath();k.moveTo(o[i][0],o[i][1]);if(t>0){o[i]=l}k.lineTo(o[i][0],o[i][1]);k.closePath();k.stroke()}return -1}function wp(k,A,t,e,B){pthis=A;var f=$(".submenu.wp div").index($(".submenu.wp .selected")[0]);c=[document.getElementById("hcanvas").getContext("2d"),document.getElementById("wclone").getContext("2d"),$("#wPaint canvas:first")[0].getContext("2d"),document.getElementById("hcanvas1").getContext("2d"),document.getElementById("hcanvas2").getContext("2d"),document.getElementById("hcanvas3").getContext("2d")];w=$("#wPaint").width();h=$("#wPaint").height();$("input.Rreflect").attr("checked",false);max=[Math.ceil($("#wPaint2").width()/w)+2,Math.ceil($("#wPaint2").height()/h)+2];n=4*max[0]*max[1];if(e<0||B<0||e>w||B>h){malert("Mantenha-se na área para desenho.",3)}k.lineJoin="round";k.lineCap="round";k.lineWidth=chk_eraser(A.settings.mode)?10:A.settings.lineWidth;switch(f){case 0:break;case 1:p2(k,t,e,B,A);return -1;break;case 2:reta=[0,100,100,100,0];l=reflect(e,B);moveline(c[0],A,t,l[0],l[1]);max=[max[0]*2,max[1]*2];break;case 3:pg(k,t,e,B,A);return -1;break;case 4:reta=[0,100,100,100,0];l=reflect(e,B);moveline(c[3],A,t,l[0],l[1]);reta=[100,0,100,100,100];l=reflect(l[0],l[1]);moveline(c[0],A,t,l[0],l[1]);reta=[100,0,100,100,100];l=reflect(e,B);moveline(c[4],A,t,l[0],l[1]);break;case 5:pmg(k,t,e,B,A);return -1;break;case 6:pgg(k,t,e,B,A);return -1;break;case 7:reta=[0,100,100,100,0];l=reflect(e,B);moveline(c[0],A,t,l[0],l[1]);max=[max[0]*2,max[1]*2];break;case 8:c2mm(k,t,e,B,A);return -1;break;case 9:case 11:tmp=[100,100];roseta(c[0],A,t,e,B,4);max=[max[0]*2,max[1]*2];break;case 10:$("input.Rreflect").attr("checked",true);reta=[0,100,100,100,0];tmp=[100,100];roseta(c[0],A,t,e,B,4);max=[max[0]*2,max[1]*2];break;case 13:case 14:$("input.Rreflect").attr("checked",true);reta=[0,100,100,100,0];case 12:tmp=[100,100];roseta(c[0],A,t,e,B,3);max=[max[0]*2,max[1]*2];break;case 16:$("input.Rreflect").attr("checked",true);reta=[0,100,100,100,0];case 15:tmp=[100,100];roseta(c[0],A,t,e,B,6);max=[max[0]*2,max[1]*2];break;case 17:runmy(k,t,e,B,A);return -1;break}var q=g=0;for(i=0;i<=n;i++){switch(f){case 0:c[1].drawImage(c[2].canvas,(q-2)*w,(g-1)*h);c[1].drawImage(c[2].canvas,(q-2)*w+w/2,(g-1)*h);c[1].drawImage(c[2].canvas,(q-2)*w+w/4,(g-1)*h+h/2);c[1].drawImage(c[2].canvas,(q-2)*w+3*w/2+w/4,(g-1)*h+h/2);break;case 1:break;case 2:if(g%2!=0){c[1].drawImage(c[2].canvas,(q-1)*(w/2),(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*(w/2),(g-1)*h)}else{c[1].drawImage(c[2].canvas,(q-1)*(w/2),(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*(w/2),(g-1)*h)}break;case 3:break;case 4:c[1].drawImage(c[0].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[2].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[3].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[4].canvas,(q-1)*w,(g-1)*h);break;case 5:break;case 6:break;case 7:if(g%2!=0){c[1].drawImage(c[2].canvas,(q-1)*(w/2),(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*(w/2)+w/4,(g-1)*h-h/2)}else{c[1].drawImage(c[2].canvas,(q-1)*(w/2),(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*(w/2)+w/4,(g-1)*h-h/2)}c[1].drawImage(c[2].canvas,(q-1)*(w/2)+w/4,(g-1)*h-h/2);c[1].drawImage(c[0].canvas,(q-1)*(w/2)+w/2,(g-1)*h);break;case 8:break;case 9:c[1].drawImage(c[2].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[2].canvas,(q-1)*w-w/2,(g-1)*h-h/2);c[1].drawImage(c[0].canvas,(q-1)*w-w/2,(g-1)*h-h/2);c[1].drawImage(c[2].canvas,(q-1)*w-w,(g-1)*h-h/2);c[1].drawImage(c[0].canvas,(q-1)*w-w,(g-1)*h-h/2);c[1].drawImage(c[2].canvas,(q-1)*w-w/2,(g-1)*h-h);c[1].drawImage(c[0].canvas,(q-1)*w-w/2,(g-1)*h-h);break;case 10:c[1].drawImage(c[2].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[2].canvas,(q-1)*w-w/2,(g-1)*h-h/2);c[1].drawImage(c[0].canvas,(q-1)*w-w/2,(g-1)*h-h/2);c[1].drawImage(c[2].canvas,(q-1)*w-w,(g-1)*h-h/2);c[1].drawImage(c[0].canvas,(q-1)*w-w,(g-1)*h-h/2);c[1].drawImage(c[2].canvas,(q-1)*w-w/2,(g-1)*h-h);c[1].drawImage(c[0].canvas,(q-1)*w-w/2,(g-1)*h-h);break;case 11:c[1].drawImage(c[2].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[2].canvas,(q-1)*w-w/2,(g-1)*h-h/2);c[1].drawImage(c[0].canvas,(q-1)*w-w/2,(g-1)*h-h/2);c[1].drawImage(c[2].canvas,(q-1)*w-w,(g-1)*h-h/2);c[1].drawImage(c[0].canvas,(q-1)*w-w,(g-1)*h-h/2);c[1].drawImage(c[2].canvas,(q-1)*w-w/2,(g-1)*h-h);c[1].drawImage(c[0].canvas,(q-1)*w-w/2,(g-1)*h-h);c[1].drawImage(c[2].canvas,(q-1)*w+w/4,(g-1)*h+h/4);c[1].drawImage(c[0].canvas,(q-1)*w+w/4,(g-1)*h+h/4);break;case 12:case 13:case 15:case 16:c[1].drawImage(c[2].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*w,(g-1)*h);c[1].drawImage(c[2].canvas,(q-1)*w+w/2,(g-1)*h);c[1].drawImage(c[0].canvas,(q-1)*w+w/2,(g-1)*h);c[1].drawImage(c[2].canvas,(q-1)*w+w/4,(g-1)*h+h/2);c[1].drawImage(c[0].canvas,(q-1)*w+w/4,(g-1)*h+h/2);c[1].drawImage(c[2].canvas,(q-1)*w-w/4,(g-1)*h+h/2);c[1].drawImage(c[0].canvas,(q-1)*w-w/4,(g-1)*h+h/2);break;case 14:c[1].drawImage(c[2].canvas,(q-1)*w,(g-1)*h+h/2);c[1].drawImage(c[0].canvas,(q-1)*w,(g-1)*h+h/2);c[1].drawImage(c[2].canvas,(q-1)*w+w/2,(g-1)*h+h/2);c[1].drawImage(c[0].canvas,(q-1)*w+w/2,(g-1)*h+h/2);c[1].drawImage(c[2].canvas,(q-1)*w+w/4,(g-1)*h+h);c[1].drawImage(c[0].canvas,(q-1)*w+w/4,(g-1)*h+h);c[1].drawImage(c[2].canvas,(q-1)*w-w/4,(g-1)*h+h);c[1].drawImage(c[0].canvas,(q-1)*w-w/4,(g-1)*h+h);break}if(g){if(i!=(g+1)*max[0]){q++}else{q=0;g++}}else{if(i!=max[0]){q++}else{q=0;g++}}}return -1}function Jmove(f,j,e,q){ctx=document.getElementById("wclone").getContext("2d");var k=j.settings.mode;if(k=="Eraser"){w=$("#wPaint").width();h=$("#wPaint").height();if(operation==6){return -1}if(e<0||q<0||e>w||q>h){return -1}ctx.globalCompositeOperation="destination-out";e=(operation==3)?e-parseInt($("#wclone").css("left").replace("px","")):e;l=[e,q]}else{used=1;ctx.globalCompositeOperation="source-over";switch(operation){case 0:l=reflect(e,q);break;case 1:l=translation(e,q);break;case 2:l=rotation(tmp[0],tmp[1],e,q);break;case 3:l=reflect(e,q);break;case 4:roseta(ctx,j,f,e,q);return -1;case 5:friso(ctx,j,f,e,q);return -1;case 6:wp(ctx,j,f,e,q);return -1}}moveline(ctx,j,f,l[0],l[1])}function eraser(f,e,k,j){if(MyThis_menu[1].settings.mode!="Eraser"){return -1}e=parseInt(e)+parseInt($(".drag").css("left"))-121;k=parseInt(k)+parseInt($(".drag").css("top"))-25;f.globalCompositeOperation="destination-out";moveline(f,pthis,j,e,k)}$(function(){var e=document.createElement("canvas");if(!e.getContext){malert("Browser muito velho, atualize-o por favor.",1);$(".func").html($(".browser").html());return false}$("#wPaint").wPaint({strokeStyle:"#336699",fillStyle:"#4c87e0"});$(".tip").tipsy({fade:true,gravity:"s",html:true});$("#slider").slider({value:45,max:360,slide:function(f,j){switch(operation){case 2:drawrotline(ctxline,tmp[0],tmp[1],j.value);break;case 3:$("#wclone").css({left:$("#slider").slider("value")-400});break;case 4:if(j.value<15){$("#slider .text").css({"float":"right"})}else{if(j.value>180){$("#slider .text").css({"float":"left"})}}$(".slider .text").text(j.value).show();break}}});ctx=document.getElementById("wclone").getContext("2d");ctxline=document.getElementById("line").getContext("2d");malert("Mova o mouse para criar a reta referência",1);$("#wPaint2,#wPaint,#line").mousedown(function(f){x=f.pageX-$("#wPaint").offset().left;y=f.pageY-$("#wPaint").offset().top;if(!line&&(operation!=2)){tmp=[x,y];ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2,true);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(x,y);clicked=1}if(!line&&(operation==2)){if(!ctx){return -1}ctx.closePath();ctx.canvas.width=ctx.canvas.width;line=1;tmp=[x,y];$("#slider").slider("value",45);$(".point").css({left:"-100px",top:"-100px"});drawrotline(ctxline,x,y,45);malert("Pronto para o uso",0)}if($(this).attr("id")=="wPaint2"&&$.inArray(operation,[5,6])>=0){clicked=1;eraser(ctx,x,y,-1)}}).mousemove(function(f){x=f.pageX-$("#wPaint").offset().left;y=f.pageY-$("#wPaint").offset().top;if(!line&&clicked&&(operation!=2)){if(!ctx){return -1}ctx.canvas.width=ctx.canvas.width;ctx.closePath();ctx.beginPath();ctx.moveTo(tmp[0],tmp[1]);ctx.lineTo(x,y);ctx.stroke()}if(line&&(operation==2)){if(Math.sqrt(Math.pow(x-tmp[0],2)+Math.pow(y-tmp[1],2))<=4&&!clicked){if(!in_){$(".point").attr("title","<b><span style='color:red;'>(</span></b>"+tmp[0]+"<b>,</b>"+tmp[1]+"<b><span style='color:red;'>)</span></b>").tipsy("show")}in_=1}else{if(in_){$(".point").css({left:tmp[0]-1,top:tmp[1]-1}).tipsy("hide")}in_=0}}if($(this).attr("id")=="wPaint2"&&$.inArray(operation,[5,6])>=0&&clicked){eraser(ctx,x,y,1)}}).mouseup(function(f){x=f.pageX-$("#wPaint").offset().left;y=f.pageY-$("#wPaint").offset().top;if((tmp[0]!=x)||(tmp[1]!=y)&&operation!=2){if(!line){if(!ctx){return -1}ctx.closePath();ctx.canvas.width=ctx.canvas.width;line=1;switch(operation){case 0:drawline(ctxline,tmp[0],tmp[1],x,y,1);break;case 1:drawline(ctxline,tmp[0],tmp[1],x,y,0);break}malert("Pronto para o uso",0)}}else{if(operation!=2){if(!ctx){return -1}malert("Mova o mouse para criar a reta referência",1);ctx.closePath();clicked=0;tmp=[0,0];line=0;ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}}}if($(this).attr("id")=="wPaint2"&&$.inArray(operation,[5,6])>=0){clicked=0;eraser(ctx,x,y,0)}});$(".refresh").hover(function(){$(this).animate({opacity:"1"},{queue:false})},function(){$(this).animate({opacity:"0.4"},{queue:false})}).click(function(){refresh()});$(".submenu.friso div").hover(function(){$(this).animate({opacity:"1"},{queue:false})},function(){$(this).animate({opacity:"0.4"},{queue:false})}).click(function(){var f=$(".submenu.friso div").index(this);if($(".submenu.friso div").eq(f).hasClass("selected")){return -1}$(".submenu.friso div").removeClass("selected");$(".submenu.friso div").eq(f).addClass("selected");drawrect(f)});$(".submenu.wp div").hover(function(){$(this).animate({opacity:"1"},{queue:false})},function(){$(this).animate({opacity:"0.4"},{queue:false})}).click(function(){var f=$(".submenu.wp div").index(this);if($(".submenu.wp div").eq(f).hasClass("selected")){return -1}$(".submenu.wp div").removeClass("selected");$(".submenu.wp div").eq(f).addClass("selected");if(f==17){$(".myrun").show();MyThis_menu[0].find("._wPaint_eraser").removeClass("_wPaint_disable");$("._wPaint_eraser").css({backgroundImage:"url(images/icon_refresh.png)"}).attr({title:"Atualizar imagem"});drawrect(-2)}else{drawrect(-1);$("._wPaint_eraser").css({backgroundImage:"url(images/icon_eraser.png)"});MyThis_menu[0].find("._wPaint_eraser").addClass("_wPaint_disable").attr({title:"Borracha"});$(".myrun").hide()}clean(1)});$(document)[0].oncontextmenu=function(){return false}});(function(){var e=[];window.pencil=function(j,A,B,f,D,C,q){var k=pthis.settings.lineWidth;if(!e[A]||B<0){e[A]=[f,D]}if(q){j.lineWidth=q}else{q=C.settings.lineWidth}j.beginPath();j.moveTo(e[A][0],e[A][1]);j.lineTo(f,D);j.stroke();if(B<0){j.lineJoin="round";j.lineCap="round";j.beginPath();j.arc(f,D,q/2,0,Math.PI*2,true);j.closePath();j.fill()}if(q){j.lineWidth=k}e[A]=[f,D]}})();var wptest=function(j,A,f,e,C){this.p=[x,y];if(typeof(this.z)==="undefined"){this.z=[]}var k=0;var B=0;this.draw=function(q,t){var s;if(q=="red"||q=="blue"||q=="green"||q=="yellow"||q==C.settings.strokeStyle||q==C.settings.fillStyle){j.strokeStyle=q;j.fillStyle=q;if(t){s=t}q=undefined;t=undefined}else{if(arguments.length==1){q=p[0]+q;t=p[1]+q}}if(!B){p[0]=f;p[1]=e}if(typeof(q)==="undefined"&&typeof(t)==="undefined"){q=p[0];t=p[1]}pencil(j,k,A,q,t,C,s);p=[q,t];k++;B=0;j.strokeStyle=C.settings.strokeStyle;j.fillStyle=C.settings.fillStyle;return this};this.Rx=function(q,D,t){var s=q;if(typeof(q)==="undefined"&&typeof(D)==="undefined"){q=p[0];D=p[1]}if(!B){q=f;D=e}if(arguments.length==1){q=p[0]+s;D=p[1]}if(typeof(t)!=="undefined"){q+=t}r=[0,100,100,100,0];l=reflect(q,D,r);p=[l[0],l[1]];B++;return this};this.Ry=function(q,D,t){var s=q;if(typeof(q)==="undefined"&&typeof(D)==="undefined"){q=p[0];D=p[1]}if(!B){q=f;D=e}if(arguments.length==1){D=p[1]+s;q=p[0]}if(typeof(t)!=="undefined"){D+=t}r=[100,0,100,100,100];l=reflect(q,D,r);p=[l[0],l[1]];B++;return this};this.zoom=function(D,s,q){if(typeof(D)==="undefined"){var D=1}if(typeof(s)==="undefined"){var s=1}x=p[0];y=p[1];if(!B){x=f;y=e}if(typeof(q)!=="undefined"){if(A<0){z=[x,y]}p=[D*(x-z[0])+z[0],s*(y-z[1])+z[1]]}else{p=[D*x,s*y]}B++;return this};this.rot=function(s,q){x=p[0];y=p[1];if(!B){x=f;y=e}tmp=[100,100];l=rotation(tmp[0],tmp[1],x,y,s||30,q);p=[l[0],l[1]];B++;return this};this.trans=function(q,s){if(!B){p[0]=f;p[1]=e}if(q=="center"){q=$("#wPaint2").width()/2-$("#wPaint").width()/2;s=$("#wPaint2").height()/2-$("#wPaint").height()/2;p[0]+=q;p[1]+=s}else{if(q){p[0]+=q}if(s){p[1]+=s}}B++;return this};this.show=function(q){malert(q||" ",1);return this};this.loop=function(s,G,H){var F;var t=(typeof(H)==="undefined")?s:H;if(!B){p[0]=f;p[1]=e}if(t=="red"||t=="blue"||t=="green"||t=="yellow"||t==C.settings.strokeStyle||t==C.settings.fillStyle){j.strokeStyle=t;j.fillStyle=t;if(typeof(G)!=="undefined"){F=G;G=undefined}if(typeof(H)==="undefined"){s=undefined}}var s=s||Math.ceil($("#wPaint").width()/2);var G=G||Math.ceil($("#wPaint").height()/2);var q=Math.max((Math.floor($("#wPaint2").width()/(s||$("#wPaint").width()))),(Math.floor($("#wPaint2").height()/(G||$("#wPaint").height()))));for(var E=-2*q;E<2*q;E++){pencil(j,k,A,p[0]+(E*s),p[1],C,F);k++;for(var D=-2*q;D<2*q;D++){pencil(j,k,A,p[0]+(D*s),p[1]+(E*G),C,F);k++}}j.strokeStyle=C.settings.strokeStyle;j.fillStyle=C.settings.fillStyle;B=0;return this};return this};function p2(j,k,e,t,q){if(!k){return false}var f=wptest(j,k,e,t,q);w=$("#wPaint").width();h=$("#wPaint").height();ctx.strokeStyle=q.settings.strokeStyle;ctx.fillStyle=q.settings.strokeStyle;f.loop(200,200);ctx.strokeStyle=q.settings.fillStyle;ctx.fillStyle=q.settings.fillStyle;f.Ry().Rx().loop(200,200)}function pg(j,k,e,t,q){if(!k){return false}var f=wptest(j,k,e,t,q);w=$("#wPaint").width();h=$("#wPaint").height();ctx.strokeStyle=q.settings.strokeStyle;ctx.fillStyle=q.settings.strokeStyle;f.loop();ctx.strokeStyle=q.settings.fillStyle;ctx.fillStyle=q.settings.fillStyle;f.Rx().trans(50,0).loop()}function pgg(j,k,e,t,q){if(!k){return false}var f=wptest(j,k,e,t,q);w=$("#wPaint").width();h=$("#wPaint").height();ctx.strokeStyle=q.settings.strokeStyle;ctx.fillStyle=q.settings.strokeStyle;f.loop();ctx.strokeStyle=q.settings.fillStyle;ctx.fillStyle=q.settings.fillStyle;f.Rx().loop();f.Ry().trans(0,50).loop();f.Ry().trans(0,50).Rx().loop()}function pmg(j,k,e,t,q){if(!k){return false}var f=wptest(j,k,e,t,q);w=$("#wPaint").width();h=$("#wPaint").height();ctx.strokeStyle=q.settings.strokeStyle;ctx.fillStyle=q.settings.strokeStyle;f.loop();ctx.strokeStyle=q.settings.fillStyle;ctx.fillStyle=q.settings.fillStyle;f.Rx().trans(50,0).loop();f.Ry().trans(0,50).loop();f.Ry().trans(0,50).Rx().trans(50,0).loop()}function c2mm(j,k,e,t,q){if(!k){return false}var f=wptest(j,k,e,t,q);w=$("#wPaint").width();h=$("#wPaint").height();ctx.strokeStyle=q.settings.strokeStyle;ctx.fillStyle=q.settings.strokeStyle;f.loop();ctx.strokeStyle=q.settings.fillStyle;ctx.fillStyle=q.settings.fillStyle;f.Rx().loop();f.Ry().loop();f.Rx().Ry().loop();f.trans(50,50).loop();f.Rx().trans(50,50).loop();f.Ry().trans(50,50).loop();f.Rx().Ry().trans(50,50).loop()}function check_refresh(){if(operation!=6){return false}else{refresh();return true}}function refresh(){if(!g.length){return -1}ctx=document.getElementById("wclone").getContext("2d");ctx.canvas.width=ctx.canvas.width;if($.browser.opera){fixopera(ctx)}runmy(ctx,-1,g[0][0],g[0][1],pthis,1);ctx.lineWidth=chk_eraser(pthis.settings.mode)?10:pthis.settings.lineWidth;for(var e=1;e<g.length;e++){if(!g[e]&&typeof(g[e+1])!=="undefined"){runmy(ctx,-1,g[e+1][0],g[e+1][1],pthis,1)}else{runmy(ctx,1,g[e][0],g[e][1],pthis,1)}}runmy(ctx,0,g[g.length-1][0],g[g.length-1][1],pthis,1)}function runmy(canvas,s,x,y,$this,a){if(!s){if(!a&&g.length){g.push(0)}return false}if(!a){g.push([x,y])}var cor=[$this.settings.fillStyle,$this.settings.strokeStyle];var simis=wptest(canvas,s,x,y,$this);var el=document.getElementById("cnsl");var w=$("#wPaint").width();var h=$("#wPaint").height();canvas.strokeStyle=$this.settings.strokeStyle;canvas.fillStyle=$this.settings.strokeStyle;try{eval(el.value)}catch(e){malert("Erro no código. "+e.message,3)}};
