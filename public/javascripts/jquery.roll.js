﻿
var scrolltotop={
	setting:{
		startline:100,scrollto:0,scrollduration:1000,fadeduration:[500,100]
	},controlHTML:'<img src="images/up.gif" style="width:22px; height:28px" />',controlattrs:{
		offsetx:28,offsety:88
	},anchorkeyword:"#top",state:{
		isvisible:false,shouldvisible:false
	},scrollup:function (){
		if(!this.cssfixedsupport){
			this.$control.css({
				opacity:0
			})
		}var a=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);
		if(typeof a=="string"&&jQuery("#"+a).length==1){
			a=jQuery("#"+a).offset().top
		}else {
			a=0
		}this.$body.animate({
			scrollTop:a
		},this.setting.scrollduration)
	},keepfixed:function (){
		var c=jQuery(window);
		var b=c.scrollLeft()+c.width()-this.$control.width()-this.controlattrs.offsetx;
		var a=c.scrollTop()+c.height()-this.$control.height()-this.controlattrs.offsety;
		this.$control.css({
			left:b+"px",top:a+"px"
		})
	},togglecontrol:function (){
		var a=jQuery(window).scrollTop();
		if(!this.cssfixedsupport){
			this.keepfixed()
		}this.state.shouldvisible=(a>=this.setting.startline)?true:false;
		if(this.state.shouldvisible&&!this.state.isvisible){
			this.$control.stop().animate({
				opacity:1
			},this.setting.fadeduration[0]);
			this.state.isvisible=true
		}else {
			if(this.state.shouldvisible==false&&this.state.isvisible){
				this.$control.stop().animate({
					opacity:0
				},this.setting.fadeduration[1]);
				this.state.isvisible=false
			}
		}
	},init:function (){
		jQuery(document).ready(function (c){
			var a=scrolltotop;
			var b=document.all;
			a.cssfixedsupport=!b||b&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;
			a.$body=(window.opera)?(document.compatMode=="CSS1Compat"?c("html"):c("body")):c("html,body");
			a.$control=c('<div id="topcontrol" style="z-index:11;">'+a.controlHTML+"</div>").css({
				position:a.cssfixedsupport?"fixed":"absolute",bottom:a.controlattrs.offsety,right:a.controlattrs.offsetx,opacity:0,cursor:"pointer"
			}).attr({
				title:"返回顶部"
			}).click(function (){
				a.scrollup();
				return false
			}).appendTo("body");
			if(document.all&&!window.XMLHttpRequest&&a.$control.text()!=""){
				a.$control.css({
					width:a.$control.width()
				})
			}a.togglecontrol();
			c('a[href="'+a.anchorkeyword+'"]').click(function (){
				a.scrollup();
				return false
			});
			c(window).bind("scroll resize",function (d){
				a.togglecontrol()
			})
		})
	}
}