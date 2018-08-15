var ws=null,wo=null;
var scan=null,domready=false,bCancel=false;
// H5 plus事件处理
function plusReady(){
	if(ws||!window.plus||!domready){
		return;
	}
	// 获取窗口对象
	ws=plus.webview.currentWebview();
	wo=ws.opener();
	// 开始扫描
	ws.addEventListener('show',function(){
		scan=new plus.barcode.Barcode('bcid',[plus.barcode.QR,plus.barcode.EAN8,plus.barcode.EAN13],{frameColor:'#00FF00',scanbarColor:'#00FF00'});
	    scan.onmarked=onmarked;
	    scan.start({conserve:true,filename:'_doc/barcode/'});
	});
	 plus.key.addEventListener('backbutton', function() {
        // 事件处理
            plus.nativeUI.confirm("退出程序？", function(event) {
                if (event.index) {
                    plus.runtime.quit();
                }
            }, null, ["取消", "确定"]);
        }, false);
	
	
	
	// 显示页面并关闭等待框
    ws.show('pop-in');
    wo.evalJS('closeWaiting()');
}


// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
	root: '#app', // App root element
	id: 'io.framework7.testapp', // App bundle ID
	name: 'Framework7', // App name
	theme: 'auto', // Automatic theme detection
	cache: false,
	statusbar: {
		iosOverlaysWebView: true,
	},
	photoBrowser: {
		type: 'popup',
	},
	template7Pages: true,
	// App root data
	data: function() {
		return {
			user: {
				firstName: 'John',
				lastName: 'Doe',
			},
		};
	},
	// App root methods
	methods: {
		helloWorld: function() {
			app.dialog.alert('Hello World!');
		},
	},
	// App routes
	routes: routes,

});

// Init/Create main view
var mainView = app.views.create('.view-main', {
	url: '/',
	dynamicNavbar: true,
	domCache: true

});



// Login Screen Demo
$$('.login-screen-content .login-button').on('click', function() {
	var username = $$('.login-screen-content [name="username"]').val();
	var password = $$('.login-screen-content [name="password"]').val();

	// Close login screen
	// app.loginScreen.close('#my-login-screen');

	// Alert username and password
	//app.dialog.alert('Username: ' + username + '<br>Password: ' + password);

	//***********ajax登录************

	var jurl = "http://115.233.208.56/zzzx/login?";
	//var jurl = "http://172.20.2.158:8080/login?";
	app.request({
		url: jurl,
		method: "POST",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			username: username,
			password: password
		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {
			console.log(username);
			console.log(password);
			console.log(data);
			console.log('Load was performed');
			console.log(data.qx);

			var qx = data.qx;
			var userid = data.userid;
			var channel = data.channel;
			var column = data.column;
			var mobilephone=data.mobilephone;
			if(qx == "normal") { //普通用户
				var da = '{"username":"' + username + '","qx":"' + qx + '","userid":"' + userid + '","channel":"' + channel + '","column":"' + column + '"}';
				$.cookie("o", da, {
					expires: "",
					path: "/"
				});
				plus.storage.setItem("username",username);
				plus.storage.setItem("qx",qx);
				plus.storage.setItem("mobilephone",mobilephone);
				plus.storage.setItem("channel",channel);
				var foo=plus.storage.getItem("username")
				console.log(foo);
				/////////
				
				mainView.router.navigate('/welcome-normal/',{context:{username:username,mobilephone:mobilephone,channel:channel}})
			} else if(qx == "admin"||username==2) { //管理员
				var da = '{"username":"' + username + '","qx":"' + qx + '","userid":"' + userid + '","channel":"' + channel + '","column":"' + column + '","mobilephone":"' + mobilephone + '"}';
				$.cookie("o", da, {
					expires: "",
					path: "/"
				});
				/////////
				
				plus.storage.setItem("username",username);
				plus.storage.setItem("qx",qx);
				plus.storage.setItem("mobilephone",mobilephone);
				plus.storage.setItem("channel",channel);
				var foo=plus.storage.getItem("username")
				console.log(foo);
				/////////
				
				mainView.router.navigate('/welcome-admin/',{context:{username:username,mobilephone:mobilephone,channel:channel}})
//				mainView.router.load({ //加载单独页面page
//					url: 'pages/welcome-admin.html', //页面的url
//					context: {
//						username: username,
//						channel:channel,
//						mobilephone:mobilephone
//					}
//				});
			} else if(qx == "leader") { //领导
				var da = '{"username":"' + username + '","qx":"' + qx + '","userid":"' + userid + '","channel":"' + channel + '","column":"' + column + '"}';
				$.cookie("o", da, {
					expires: "",
					path: "/"
				});
				plus.storage.setItem("username",username);
				plus.storage.setItem("qx",qx);
				plus.storage.setItem("mobilephone",mobilephone);
				plus.storage.setItem("channel",channel);
				var foo=plus.storage.getItem("username")
				console.log(foo);
				/////////
				
				mainView.router.navigate('/welcome-leader/',{context:{username:username,mobilephone:mobilephone,channel:channel}})
			} else if(qx == "chief") { //总监
				var da = '{"username":"' + username + '","qx":"' + qx + '","userid":"' + userid + '","channel":"' + channel + '","column":"' + column + '"}';
				$.cookie("o", da, {
					expires: "",
					path: "/"
				});
				plus.storage.setItem("username",username);
				plus.storage.setItem("qx",qx);
				plus.storage.setItem("mobilephone",mobilephone);
				plus.storage.setItem("channel",channel);
				var foo=plus.storage.getItem("username")
				console.log(foo);
				/////////
				
				mainView.router.navigate('/welcome-chief/',{context:{username:username,mobilephone:mobilephone,channel:channel}})
			}

		}
	});

	//***********************************/

});

//设备借出借还单模板
var searchBrilstnumTemplate = $$('script#search-brlistnum-template').html();

app.searchBrilstnumResultsTemplate = Template7.compile(searchBrilstnumTemplate);

app.searchBrilstnum = function(username, mobilephone) {

	searchTimeout = setTimeout(function() {
		console.log(username + mobilephone);

		var html2 = '';
		var brlistmsg;

		//***********ajax************

		var jurl = "http://115.233.208.56/zzzx/getBRListCreated?";
		//var jurl = "http://172.20.2.158:8080/getBRListCreated?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				username: username,
				mobilephone: mobilephone

			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {
					
				console.log('Load was performed');
				brlistmsg = data;
				console.log(brlistmsg);
				html2 = app.searchBrilstnumResultsTemplate(brlistmsg);

				$$('.createdbrlist').html(html2);
				$$(".keyword").on('keypress', function(e) {
					var keycode = e.keyCode;
					var which = e.which;
					if(keycode == '13' || e.which == '13') {
						e.preventDefault();
						//请求搜索接口
					if($$(this).attr("name") == "equipnum") {
							
							var num = $$(this).val();
							console.log(num);
							dealBorrow("", num);
						}

					} else {
						console.log(keycode);
						console.log(which);
					}
				});

			}
		});

		//***********************************/

		//			var html2 = '';
		//			var mydate = new Date();
		//			//var time = mydate.toLocaleString();
		//			var brlistmsg = {
		//				"brlistnum": "TPC180515002A",
		//				//"time": time,
		//				"channel": "电视制作中心",
		//				"column": "中国梦想秀第三季"
		//			};
		//			html2 = app.searchBrilstnumResultsTemplate(brlistmsg);
		//
		//			$$('.createdbrlist').html(html2);

	}, 300);
};
//设备借出--扫描中心条码添加设备
var searchTemplate = $$('script#search-equip-template').html();
app.searchResultsTemplate = Template7.compile(searchTemplate);

var html = '';
var equip = [];
var index = 0;
app.searchLocation = function(search) {

	searchTimeout = setTimeout(function() {
		console.log("search 225 " + search);
		var isHave = true;
		if(search) {
			if(equip != "") {
				for(var i = 0; i < equip.length; i++) {
					console.log("229" + equip[i].centernum);
					if(search == equip[i].centernum) {
						alert("重复设备！");
						isHave = false;
					}
				}
			}

			console.log("235" + isHave);
			if(isHave) {
				//***********ajax************
				var jurl = "http://115.233.208.56/zzzx/getEquipName?";
				//var jurl = "http://172.20.2.158:8080/getEquipName?";
				app.request({
					url: jurl,
					method: "GET",
					crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
					dataType: "json",
					data: {
						centernum: search
					},
					beforeSend: function(e) {
						//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
					},
					success: function(data) {
					$$(".keyword").on('keypress', function(e) {
					var keycode = e.keyCode;
					var which = e.which;
					if(keycode == '13' || e.which == '13') {
						e.preventDefault();
						//请求搜索接口
					if($$(this).attr("name") == "equipnum") {
							
							var num = $$(this).val();
							console.log(num);
							dealBorrow("", num);
						}

					} else {
						console.log(keycode);
						console.log(which);
					}
				});
						index++;
						console.log('Load was performed');
						equipname = data.equipname;
						equip.push({
							"index": index,
							"equipname": equipname,
							"centernum": search
						});
						html = app.searchResultsTemplate(equip);

						$$('.equip-list tbody').html(html);
						$$('.totalequip').html("总计：" + equip.length);
						$$('.saveEquipBorrow').show();

					}
				});

				//***********************************/
			}

		}

	}, 300);
};
//设备归还--扫描中心条码
var searchReturnTemplate = $$('script#equip-return-template').html();
app.searchReturnResultsTemplate = Template7.compile(searchReturnTemplate);

var equipReturnhtml = '';
var equipReturn = [];
var index1 = 0;
app.equipReturnStatus = function(search) {

	searchTimeout = setTimeout(function() {
		console.log(search);
		if(search) {

			var isHave = true;
			if(equipReturn != "") {
				for(var i = 0; i < equipReturn.length; i++) {
					console.log("229" + equipReturn[i].centernum);
					if(search == equipReturn[i].centernum) {
						alert("重复设备！");
						isHave = false;
					}
				}
			}

			if(isHave) {
				//***********ajax************
				var jurl = "http://115.233.208.56/zzzx/getEquipName?";
				//var jurl = "http://172.20.2.158:8080/getEquipName?";
				app.request({
					url: jurl,
					method: "GET",
					crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
					dataType: "json",
					data: {
						centernum: search
					},
					beforeSend: function(e) {
						//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
					},
					success: function(data) {

						index1++;
						console.log('Load was performed');
						equipname = data.equipname;
						equipReturn.push({
							"index": index1,
							"equipname": equipname,
							"centernum": search,

						});
						equipReturnhtml = app.searchReturnResultsTemplate(equipReturn);

						$$('.equip-list tbody').html(equipReturnhtml);
						$$('.totalequip').html("总计：" + equipReturn.length);
						$$(".equip-return-submit").show();
					}
				});

				//***********************************/
			}

		}

	}, 300);
};
//管理员借还单查询模板

var adminBRlistTemplate = $$('script#admin-search-brlistnum-template').html();

app.adminBRlistsearchTemplate = Template7.compile(adminBRlistTemplate);

app.adminBRlist = function(formdata) {

	searchTimeout = setTimeout(function() {

		var brlistmsg;
		var html2 = '';
		console.log("393 " + formdata)
		console.log($.cookie("o"))
		//var a=JSON.parse(formdata);
		var username = formdata.username;
		var brlistnum = formdata.brlistnum;
		var department = formdata.department;
		var column = formdata.column;
		var centernum = formdata.centernum;
		var isverify = formdata.isverify;
		//var userid = JSON.parse($.cookie("o")).username;
		var userid=plus.storage.getItem("username");
		
		//***********ajax************

		var jurl = "http://115.233.208.56/zzzx/getAdminBrlist?";
		//var jurl = "http://172.20.2.158:8080/getAdminBrlist?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				username: username,
				isverify: isverify,
				brlistnum: brlistnum,
				department: department,
				column: column,
				centernum: centernum,
				userid: userid
			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				console.log('Load was performed');
				brlistmsg = data;
				console.log("brlistmsg" + brlistmsg);
				html2 = app.adminBRlistsearchTemplate(brlistmsg);

				$$('.equip-br-admin').html(html2);

			}
		});

		//***********************************/

		//		var brlistmsg = [{
		//			"brlistnum": "TPC180515002A",
		//			"username": "张三",
		//			"column": "中国新歌声第三季",
		//			"mobilephone": "18759562632",
		//			"borrowtime": "2017-12-03",
		//			"returntime": "2017-12-03",
		//			"verify": true
		//		}, {
		//			"brlistnum": "TPC180515002A",
		//			"username": "张三",
		//			"column": "中国新歌声第三季",
		//			"mobilephone": "18759562632",
		//			"borrowtime": "2017-12-03",
		//			"returntime": "2017-12-03",
		//			"verify": false
		//		}];
		//		html2 = app.adminBRlistsearchTemplate(brlistmsg);
		//
		//		$$('.equip-br-admin').html(html2);

	}, 300);
};
//管理员--设备查询模板

var adminEquipSearchTemplate = $$('script#admin-equip-search-template').html();

app.adminEquipSearchTemplate = Template7.compile(adminEquipSearchTemplate);

app.adminEquipSearch = function(formdata) {

	searchTimeout = setTimeout(function() {
		console.log("393 " + formdata)
		var a = JSON.parse(formdata);
		var centernum = a.centernum;
		var equipname = a.equipname;
		var serial = a.serial;
		var scale = a.scale;
		var department = a.department;
		var type = a.type;
		var tag = a.tag;
		//var userid = JSON.parse($.cookie("o")).username;
		var userid=plus.storage.getItem("username");
		var html2 = '';
		var equipmsg = [];
		//***********ajax************
		var jurl = "http://115.233.208.56/zzzx/getEquipMaintenance?";
		//var jurl = "http://172.20.2.158:8080/getEquipMaintenance?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				centernum: centernum,
				equipname: equipname,
				serial: serial,
				scale: scale,
				department: department,
				type: type,
				tag: tag,
				userid: userid

			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				console.log(data);

				console.log('Load was performed' + data.equipname);
				equipname = data.equipname;
				serial = data.serial;
				scale = data.scale;
				department = data.department;
				status = data.status;
				imgurl = data.imgurl;
//				equipmsg.push({
//					"centernum": a.centernum,
//					"serialnum": serial,
//					"equipname": equipname,
//					"scale": scale,
//					"department": department,
//					"status": status,
//					"imgurl": imgurl
//
//				});
				equipmsg=data;

				html2 = app.adminEquipSearchTemplate(equipmsg);

				$$('.equip-admin').html(html2);
			}
		});

		//***********************************/

		//		var equipmsg = [{
		//			"centernum": a.centernum,
		//			"serialnum": "SUZ123456",
		//			"equipname": "蓝光高清摄像机",
		//			"type": "SUSU111",
		//			"department": "广电制作中心",
		//			"status": "借出",
		//			"imgurl": "img/test.jpg"
		//
		//		}, {
		//			"centernum": "2018-12345",
		//			"serialnum": "SUZ123456",
		//			"equipname": "蓝光高清摄像机",
		//			"type": "SUSU111",
		//			"department": "广电制作中心",
		//			"status": "在库",
		//			"imgurl": "img/test.jpg"
		//		}];

	}, 300);
};
//设备定位--查询定位设备
var searchLocateEquipTemplate = $$('script#equip-locate-template').html();
app.searchLocateEquip = Template7.compile(searchLocateEquipTemplate);

var equipLocatehtml = '';

app.searchEquipLocate = function(equipname, tag) {

	searchTimeout = setTimeout(function() {
		console.log(equipname);
		if(equipname || tag) {

//***********ajax************
		var jurl = "http://115.233.208.56/zzzx/getEquipLocation?";
		//var jurl = "http://172.20.2.158:8080/getEquipLocation?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				equipname: equipname,
				tag: tag
			
			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				var equipmsg = data;
				console.log(equipmsg);

				equipLocatehtml = app.searchLocateEquip(equipmsg);

			$$('.equip-locate .equiplocatelist').html(equipLocatehtml);
			}
		});

		//***********************************/




			

		}

	}, 300);
};
//设备定位--管理定位设备
var manageLocateEquipTemplate = $$('script#equip-locate-manage-template').html();
app.manageLocateEquip = Template7.compile(manageLocateEquipTemplate);

var equipLocatemanagehtml = '';

app.manageEquipLocate = function(equipname, tag) {

	searchTimeout = setTimeout(function() {
		console.log(equipname);
		if(equipname || tag) {

			var equipmsg = [{
				"equipname": equipname,
				"IMME": "353507000803415",
				"department": "广播制作中心",
				"battery": "0%",
				"centernum": "2015-45845",
				"location": "浙江省杭州市莫干山路111号",
				"type": "SUSU111",
				"imgurl": "img/test.jpg"

			}, {
				"equipname": "转播车",
				"IMME": "353507000803415",
				"department": "广播制作中心",
				"battery": "0%",
				"centernum": "2015-45845",
				"location": "浙江省杭州市莫干山路111号",
				"type": "SUSU111",
				"imgurl": "img/test.jpg"
			}];
			equipLocatemanagehtml = app.manageLocateEquip(equipmsg);

			$$('.equip-locate-manage .equiplocatelist').html(equipLocatemanagehtml);

		}

	}, 300);
};
//财务统计模板
var financialTemplate = $$('script#financial-template').html();

app.financialStaticTemplate = Template7.compile(financialTemplate);

app.financial = function(year, month, channel) {

	searchTimeout = setTimeout(function() {

		var html2 = '';
		console.log("bbb" + year + "ccc" + month + "ddd" + channel);
		
		//var userid = JSON.parse($.cookie("o")).username;
		var userid=plus.storage.getItem("username");
		
		//***********ajax************
		var jurl = "http://115.233.208.56/zzzx/getFinancialStatistic?";
		//var jurl = "http://172.20.2.158:8080/getFinancialStatistic?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				channel: channel,
				month: month,
				year: year,
				userid:userid

			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				
			 var staticmsg=data;

				html2 = app.financialStaticTemplate(staticmsg);

		$$('.staticlist').html(html2);
			}
		});

		//***********************************/
		
//		var staticmsg = {
//
//			"totalfee": "20000",
//			"staticlist": [{
//				"month": month,
//				"year": year,
//				"column": "奔跑吧兄弟",
//				"fee": "10000"
//
//			}, {
//				"month": month,
//				"year": year,
//				"column": "101女团",
//				"fee": "10000"
//
//			}]
//		};
		

	}, 300);
};
//操作手册模板
var searchManualTemplate = $$('script#searchManual-template').html();

app.searchManual = Template7.compile(searchManualTemplate);

app.searchManuallist = function(search) {

	searchTimeout = setTimeout(function() {

		var html2 = '';
		console.log(search);
		
		//***********ajax************
		var jurl = "http://115.233.208.56/zzzx/getManual?";
		//var jurl = "http://172.20.2.158:8080/getManual?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				keyword:search

			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				
			 var msg=data.filelist;

				html2 = app.searchManual(msg);

		$$('.manualist').html(html2);
			}
		});

		//***********************************/
		
		
		
//		var msg = [{
//			"filename": "摄像机手册",
//			"filepath": "http://www.czbank.com/cn/personal/investment/issue/201608/W020180606616600656738.pdf"
//
//		}, {
//			"filename": "摄像机手册",
//			"filepath": "files/test.docx"
//
//		}];
		

	}, 300);
};
//普通权限借还单查询模板

var normalBRlistTemplate = $$('script#normal-search-brlistnum-template').html();

app.normalBRlistsearchTemplate = Template7.compile(normalBRlistTemplate);

app.normalBRlist = function(search) {

	searchTimeout = setTimeout(function() {

		var isverify = search;
		//var username = JSON.parse($.cookie("o")).username;
		var username=plus.storage.getItem("username");
		var brlistmsg;
		var html2 = '';
		//***********ajax************

		var jurl = "http://115.233.208.56/zzzx/getBRList?";
		//var jurl = "http://172.20.2.158:8080/getBRList?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				username: username,
				isverify: isverify

			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				console.log('Load was performed');
				brlistmsg = data;
				console.log("brlistmsg" + brlistmsg);
				html2 = app.normalBRlistsearchTemplate(brlistmsg);

				$$('.equip-br-normal').html(html2);

			}
		});

		//***********************************/

		/*
				var brlistmsg = [{
					"brlistnum": "TPC180515002A",
					"username": "张三",
					"column": "中国新歌声第三季",
					"mobilephone": "18759562632",
					"borrowtime": "2017-12-03",
					"returntime": "2017-12-03",
					"verify": true
				}, {
					"brlistnum": "TPC180515002A",
					"username": "张三",
					"column": "中国新歌声第三季",
					"mobilephone": "18759562632",
					"borrowtime": "2017-12-03",
					"returntime": "2017-12-03",
					"verify": false
				}];*/

	}, 300);
};
//总监权限借还单查询模板

var chiefBRlistTemplate = $$('script#chief-search-brlistnum-template').html();

app.chiefBRlistsearchTemplate = Template7.compile(chiefBRlistTemplate);

app.chiefBRlist = function(formdata) {

	searchTimeout = setTimeout(function() {

		var brlistmsg;
		var html2 = '';
		console.log("753 " + formdata)

		//var a=JSON.parse(formdata);

		var date_begin = formdata.date_begin;
		var date_finish = formdata.date_finish;
		//var username = JSON.parse($.cookie("o")).username;
		var username=plus.storage.getItem("username")
		//***********ajax************

		var jurl = "http://115.233.208.56/zzzx/getChiefBrlist?";
		//var jurl = "http://172.20.2.158:8080/getChiefBrlist?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				username: username,
				date_begin: date_begin,
				date_finish: date_finish
			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				console.log('Load was performed');
				brlistmsg = data;
				console.log("brlistmsg" + brlistmsg);
				html2 = app.chiefBRlistsearchTemplate(brlistmsg);

				$$('.equip-br-chief').html(html2);
			}
		});
		//		var html2 = '';
		//
		//		var brlistmsg = [{
		//			"brlistnum": "TPC180515002A",
		//			"username": "张三",
		//			"column": "中国新歌声第三季",
		//			"mobilephone": "18759562632",
		//			"borrowtime": "2017-12-03",
		//			"returntime": "2017-12-03",
		//			"verify": true
		//		}, {
		//			"brlistnum": "TPC180515002A",
		//			"username": "张三",
		//			"column": "中国新歌声第三季",
		//			"mobilephone": "18759562632",
		//			"borrowtime": "2017-12-03",
		//			"returntime": "2017-12-03",
		//			"verify": false
		//		}];
		//		html2 = app.chiefBRlistsearchTemplate(brlistmsg);
		//
		//		$$('.equip-br-chief').html(html2);

	}, 300);
};
//普通权限-财务速览
var financialTemplate = $$('script#financial-normal-template').html();

app.financialNormalTemplate = Template7.compile(financialTemplate);

app.financialNormal = function(year, month) {

	searchTimeout = setTimeout(function() {

		var html2 = '';
		console.log("bbb" + year + "ccc" + month);
		
		//var username = JSON.parse($.cookie("o")).username;
		var username = "洪渊";
		//***********ajax************

		var jurl = "http://115.233.208.56/zzzx/getNormalFinancialStatistic?";
		//var jurl = "http://172.20.2.158:8080/getNormalFinancialStatistic?";
		app.request({
			url: jurl,
			method: "GET",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				username: username,
				year:year,
				month:month
			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				console.log('Load was performed');
				var staticmsg = data;
				//console.log("brlistmsg" + brlistmsg);
				html2 = app.financialNormalTemplate(staticmsg);

		$$('.staticlist').html(html2);
			}
		});
//		var staticmsg = {
//
//			"totalfee": "20000",
//			"staticlist": [{
//				"month": month,
//				"year": year,
//				"equipname": "高清蓝光摄像机",
//				"column": "奔跑吧兄弟",
//				"fee": "10000"
//
//			}, {
//				"month": month,
//				"year": year,
//				"equipname": "摄像机",
//				"column": "101女团",
//				"fee": "10000"
//
//			}]
//		};
		

	}, 300);
};

function startRecognize() {

	var text = null;
	text = document.getElementsByClassName('mic_text');
	console.log(text.value);
	if(plus.os.name == 'Android' && navigator.userAgent.indexOf('StreamApp') > 0) {
		plus.nativeUI.toast('当前环境暂不支持语音识别插件');
		return;
	}
	var options = {};
	options.engine = 'iFly';
	//options.punctuation = false;	// 是否需要标点符号 
	text.value = "";

	//outSet( "开始语音识别：" );

	plus.speech.startRecognize(options, function(s) {
		//	outLine( s );
		text.value += s;
		console.log(text.value);
		$$(".mic_text").val(text.value);
	}, function(e) {
		//	outSet( "语音识别失败："+e.message );
	});
}
//保存借出设备
function saveEquipBorrow() {
	var borrowusername = $$("input[name='borrow-username']").val();
	var borrowmobilephone = $$("input[name='borrow-mobilephone']").val();
	var brlistnum = $$(".brlistnum").text();
	var channel = $$(".channel").text();
	var column = $$(".column").text();
	var remarks = $$(".remarks").val();
	//var userid = JSON.parse($.cookie("o")).username;
	var equiplist = tabToJSONForJquery("equip-list");

	console.log(equiplist + 678);
	console.log("borrowusername=" + borrowusername + "&borrowmobilephone=" + borrowmobilephone + "&brlistnum=" + brlistnum + "&channel=" + channel + "&column=" + column + "&remarks=" + remarks + "&equiplist=" + equiplist)
	//		//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/postEquipBorrow?";
	//var jurl = "http://172.20.2.158:8080/postEquipBorrow?";
	app.request({
		url: jurl,
		method: "POST",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			borrowusername: borrowusername,
			borrowmobilephone: borrowmobilephone,
			brlistnum: brlistnum,
			channel: channel,
			column: column,
			remarks: remarks,
			equiplist: equiplist
		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {
			if(data.status=='success'){
				alert("借出成功！");
			}
			
			console.log(data.status);
		}
	});
	//	//***********************************/

}
//保存归还设备
function saveEquipReturn() {

	var equiplist = tabToJSONForJquery("equip-list");

	console.log(equiplist + 678);
	//console.log("borrowusername="+borrowusername+"&borrowmobilephone="+borrowmobilephone+"&brlistnum="+brlistnum+"&channel="+channel+"&column="+column+"&remarks="+remarks+"&equiplist="+equiplist)
	//		//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/postEquipReturnStatus?";
	//var jurl = "http://172.20.2.158:8080/postEquipReturnStatus?";
	app.request({
		url: jurl,
		method: "POST",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {

			centernum: equiplist
		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {
			console.log(data);
			var result="归还失败的设备中心条码：";
			//alert(data);
				$.each(data, function(i,item){
					if(data[i].status=="N")
					result=result+data[i].centernum+" "
					
				});
				alert(result);
		}
	});
	//	//***********************************/

}

function tabToJSONForJquery(id) {
	var titles = $("." + id).find("tr:first th:not(:first):not(:last)"); //获得表头td数组
	//遍历非表头的，tr、td...拼装json
	var json = "[" + $("." + id).find("tr:not(:first)").map(function(i, e) {
		return "{" + $(e).children("td:not(:first):not(:last)").map(function(j, el) {
			return '"' + $(titles[j]).attr("name") + '":"' + $(el).html() + '"';
		}).get().join(",") + "}";
	}).get().join(",") + "]";
	return json;
}

function cancelEquip(e) {
	/*	$$(".btn").html(
			"<p class='row'><button class='col button button-fill color-red edit'>编辑</button></a><a href='/equip-repair/123/' class='col'><button class='col button button-fill color-blue'>维修</button></a></p>"
		)
		$$("input").attr("disabled", "disabled");
		$$("input").css("border", "0");
		
		*/
	mainView.router.refreshPage();

}

function deleteimg(obj) {
	$$(obj).parent().html("<input type='hidden' id='ckjl.id' name='ckjl.id' value='429'> <div class='collapse-content' >  <div id='F_CKJLBS' class='row image-list'> <i class='f7-icons' id='F_CKJLB' onclick='showActionSheet(this)'>camera_fill</i></div></div>");
	//$$(".equip-maintenance-imglist").html("");
}
//设备编辑更新
function updateEquip(obj) {
	var storelocation = $$('input[name="storelocation"]').val();
	var storeplace = $$('input[name="storeplace"]').val();
	var equipname = $$('input[name="equipname"]').val();
	var type = $$('input[name="type"]').val();
	var remarks = $$('input[name="remarks"]').val();
	var centernum = $$('input[name="e-centernum"]').val();
	var arr = new Array();
	console.log(centernum);
	$$(".equip-maintenance-imglist img").each(function() {
		arr.push(

			{
				"url": $$(this).attr("src")
			}

		);
	});

	//		//***********ajax修改密码************
	var jurl = "http:/115.233.208.56/zzzx/updateEquipRepair?";
	//var jurl = "http://172.20.2.158:8080/updateEquipRepair?";
	app.request({
		url: jurl,
		method: "POST",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			storelocation: storelocation,
			storeplace: storeplace,
			equipname: equipname,
			type: type,
			remarks: remarks,
			centernum: centernum,
			imglist: arr.toString()
		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {

			console.log(data);
		}
	});
	//	//***********************************/

	//var imgurllist=$$('.equip-maintenance-imglist img').attr("src");
	console.log(centernum + " " + storelocation + " " + storeplace + " " + equipname + " " + type + " " + remarks + " " + arr)
	mainView.router.refreshPage();
}
//添加维修信息
function addEquipRepair(obj) {
	var formData = app.form.convertToData('#equiprepair-form');
	//alert(JSON.stringify(formData));
	var arr = new Array();
	$$(".equiprepair-imgs img").each(function() {
		arr.push(

			{
				"url": $$(this).attr("src")
			}

		);
	});
	var equipproblem = formData.equipproblem;
	var repaircontent = formData.repaircontent;
	var repairperson = formData.repairperson;
	var repairtime = formData.repairtime;
	var imglist = arr;
	var centernum = $$(".centernum").text();

	//***********ajax************
	var jurl = "http://115.233.208.56/zzzx/addEquipRepair?";
	//var jurl = "http://172.20.2.158:8080/addEquipRepair?";
	app.request({
		url: jurl,
		method: "GET",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			centernum: centernum,
			equipproblem: equipproblem,
			repairperson: repairperson,
			repairtime: repairtime,
			imglist: imglist,
			repaircontent: repaircontent

		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {

			alert(data.status);

		}
	});

	//***********************************/

	console.log(arr);
}

function switchPwd() {

	var passwordeye = $$('.pwdeye');
	var showPwd = $$(".pwd");
	passwordeye.off('click').on('click', function() {

		if(passwordeye.hasClass('invisible')) {
			passwordeye.removeClass('invisible').addClass('visible'); //密码可见
			showPwd.prop('type', 'text');
		} else {
			passwordeye.removeClass('visible').addClass('invisible'); //密码不可见
			showPwd.prop('type', 'password');
		};
	});
}

function changepwd() {
	var orginpwd = $$(".orginpwd").val();
	var newpwd = $$(".newpwd").val();
	var newpwdagain = $$(".newpwdagain").val();
	//var username = JSON.parse($.cookie("o")).username;
	var username=plus.storage.getItem("username");
	//var userid = JSON.parse($.cookie("o")).userid;
	console.log(newpwd+" "+newpwdagain)
	if(newpwd != newpwdagain) {
		alert("两次密码不一致");
	} else {
		//***********ajax修改密码************

			var jurl = "http://115.233.208.56/zzzx/changePwd?";
		//var jurl = "http://172.20.2.158:8080/changePwd?";
		app.request({
			url: jurl,
			method: "POST",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				
				password: orginpwd,
				newpassword: newpwd,
				userid: username
			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {

				alert(data.status);

			}
		});

		//***********************************/
	}

}


function updateRemarks() {
	var remarks = $$(".input-with-value").val();
	var brlistnum = $$(".brlistnum").text();
	//***********ajax修改密码************

	var jurl = "http://115.233.208.56/zzzx/updateAdminBrlistRemark?";
	//var jurl = "http://172.20.2.158:8080/updateAdminBrlistRemark?";
	app.request({
		url: jurl,
		method: "POST",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			remarks: remarks,
			brlistnum: brlistnum

		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {

			alert(data.status)

		}
	});

	//***********************************/
}

function submitVerify() {
	//var userid = JSON.parse($.cookie("o")).username;
	var userid=plus.storage.getItem("username");
	var brlistnum = $$(".brlistnum").text();
	//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/updateAdminBrlist?";
	//var jurl = "http://172.20.2.158:8080/updateAdminBrlist?";
	app.request({
		url: jurl,
		method: "POST",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			userid: userid,
			brlistnum: brlistnum

		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {

		  alert(data.status);

		}
	});

	//***********************************/
}

function searchbrlist(){
	console.log("ddddddddd");
}
function downloadManual(filename,surl){
	console.log("url "+surl);
	
	   var url = "http://115.233.208.56/zzzx/Downfile?";
	 // var url = "http://172.20.2.158:8080/Downfile?";
        var surl =surl ;
        var form = $$("<form></form>").attr("action", url).attr("method", "post");
        form.append($$("<input></input>").attr("type", "hidden").attr("name", "url").attr("value", surl));
        form.appendTo('body').submit().remove();
//	var jurl = "http://172.20.2.158:8080/Downfile?";
//	app.request({
//		url: jurl,
//		method: "POST",
//		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
//		dataType: "json",
//		data: {
//			
//			url,url
//
//		},
//		beforeSend: function(e) {
//			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
//		},
//		success: function(response, status, request) {
//			console.log(request);
//			
//			 var disp = request.getResponseHeader('Content-Disposition');
//           if (disp && disp.search('attachment') != -1) {  //判断是否为文件
//          var form = $$('<form method="POST" action="' + jurl + '">');
//          $$.each(params, function(k, v) {
//               form.append($$('<input type="hidden" name="' + k +
//                      '" value="' + v + '">'));
//          });
//          $$('body').append(form);
//        form.submit(); //自动提交
//     }
//		}
//	});

	//***********************************/
}
function dealFinancialSearch(){
	
}
function dealEquipViewSearch() {
	var tag = $$('select[name="tag"]').val();
	var department = $$('select[name="department"]').val();
	bar(tag, department);
	line(tag, department);
	pie(tag, department);
}

function bar(tag, department) {

	var dom = document.getElementById("bar");
	var myChart = echarts.init(dom);

	option = null;
	//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/getEquipStatusStatistic?";
	//var jurl = "http://172.20.2.158:8080/getEquipStatusStatistic?";
	app.request({
		url: jurl,
		method: "get",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			tag: tag,
			department: department

		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {
			//console.log(data.equipactivity)

			option = {
				title: {
					text: '库存',

				},
				xAxis: {
					type: 'category',
					axisLabel: {
						fontSize: 8,
						interval: 0,
						rotate: 30,
						color: "#657c97",
						fontFamily: "#Arial"
					},
					// data: ['摄像机', '转播车', '话筒', 'Sony', '电池', '录音机', '相机']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					label: { //---图形上的文本标签
						show: true,
						position: 'insideTop', //---相对位置
						rotate: 0, //---旋转角度
						color: '#eee',
					},
					// data: [120, 200, 150, 80, 70, 110, 130],
					type: 'bar'
				}]
			};
			var arr = [];
			var arr2 = [];
			$.each(data.stock, function(i, val) {
				arr.push(data.stock[i].tag);
				console.log(data.stock[i].tag)

				arr2.push(data.stock[i].zk);
			});

			option.xAxis.data = arr;
			option.series[0].data = arr2;
			console.log(arr)
			console.log(arr2);
			console.log(option);

			if(option && typeof option === "object") {
				myChart.setOption(option, true);
			}

		}
	});
	//option = {
	//	 title: {
	//      text: '库存',
	//     
	//  },
	//  xAxis: {
	//      type: 'category',
	//      axisLabel: {
	//          fontSize : 8,
	//         interval:0,
	//         rotate:40,
	//          color: "#657c97",
	//          fontFamily : "#Arial"
	//      },
	//      data: ['摄像机', '转播车', '话筒', 'Sony', '电池', '录音机', '相机']
	//  },
	//  yAxis: {
	//      type: 'value'
	//  },
	//  series: [{
	//  	label:{                     //---图形上的文本标签
	//          show:true,
	//          position:'insideTop',   //---相对位置
	//          rotate:0,               //---旋转角度
	//          color:'#eee',
	//                  },
	//      data: [120, 200, 150, 80, 70, 110, 130],
	//      type: 'bar'
	//  }]
	//};
	//
	//if (option && typeof option === "object") {
	//  myChart.setOption(option, true);
	//}
}

function line(tag, department) {
	var dom = document.getElementById("line");
	var myChart = echarts.init(dom);

	option = null;
	//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/getEquipStatusStatistic?";
	//var jurl = "http://172.20.2.158:8080/getEquipStatusStatistic?";
	app.request({
		url: jurl,
		method: "get",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			tag:tag,
			department:department

		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {
			//console.log(data.equipactivity)

			option = {
				title: {
					text: '设备使用时长',

				},
				legend: {
					right: 20,
					data: ['转播车', '摄像机', '相机']
				},
				xAxis: {
					type: 'category',
					axisLabel: {
						fontSize: 8,
						interval: 0,
						rotate: 40,
						color: "#657c97",
						fontFamily: "#Arial"
					},
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
				},
				yAxis: {
					type: 'value'
				},
				series: [
//				{
//						name: "转播车",
//						data: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 60, 110, 130],
//						type: 'line'
//					},
//					{
//						name: "摄像机",
//						data: [10, 200, 10, 80, 70, 10, 130, 20, 150, 20, 72, 10, 130],
//						type: 'line'
//					},
//					{
//						name: "相机",
//						data: [12, 20, 150, 180, 70, 110, 10, 100, 150, 5, 70, 90, 20],
//						type: 'line'
//					}
				]
			};
			var arr = [];
			var arr2 = [];

			$.each(data.equipusetime, function(i, val) {
				arr.push(data.equipusetime[i].equipname);
				console.log(data.equipusetime[i].equipname)
				var s = {
					name: data.equipusetime[i].equipname,
					data:data.equipusetime[i].monthdata,
					type:'line'
				};
				option.series.push(s);
			});

			option.xAxis.data = arr;
			//option.series[0].data=arr2;
			console.log(arr)
			//console.log(arr2);
			console.log(option);

			if(option && typeof option === "object") {
				myChart.setOption(option, true);
			}
		}
	});

	//option = {
	//	 title: {
	//      text: '设备使用时长',
	//     
	//  },
	//   legend: {
	//   	right:20,
	//      data:['转播车','摄像机','相机']
	//  },
	//  xAxis: {
	//      type: 'category',
	//      axisLabel: {
	//          fontSize : 8,
	//         interval:0,
	//         rotate:40,
	//          color: "#657c97",
	//          fontFamily : "#Arial"
	//      },
	//      data: ['1月', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12']
	//  },
	//  yAxis: {
	//      type: 'value'
	//  },
	//  series: [{
	//  	name:"转播车",
	//      data: [120, 200, 150, 80, 70, 110, 130,200, 150, 80, 60, 110, 130],
	//      type: 'line'
	//  },
	//  {
	//  	name:"摄像机",
	//      data: [10, 200, 10, 80, 70, 10, 130,20, 150, 20, 72, 10, 130],
	//      type: 'line'
	//  },
	//  {
	//  	name:"相机",
	//      data: [12, 20, 150, 180, 70, 110, 10,100, 150, 5, 70, 90, 20],
	//      type: 'line'
	//  }]
	//};

}

function pie(tag, department) {
	var dom = document.getElementById("pie");
	var myChart = echarts.init(dom);

	option = null;
	//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/getEquipStatusStatistic?";
	//var jurl = "http://172.20.2.158:8080/getEquipStatusStatistic?";
	app.request({
			url: jurl,
			method: "get",
			crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
			dataType: "json",
			data: {
				tag: tag,
				department: department

			},
			beforeSend: function(e) {
				//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
			},
			success: function(data) {
				//console.log(data.equipactivity)

				option = {
					title: {
						text: '部门使用时长',

					},
					legend: {
						type: 'scroll',
						right: 10,
						top: 20,
						bottom: 20,
						// data:['浙江卫视','教育科技','影视娱乐']
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c}小时({d}%)"
					},
					series: [{
						name: '部门使用时长',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						//          data:[
						//              {value:335, name:'浙江卫视'},
						//              {value:310, name:'教育科技'},
						//              {value:234, name:'影视娱乐'},
						//             
						//          ],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				var arr = [];
				var arr2 = [];
				$.each(data.channelequipuse, function(i, val) {
					arr.push(data.channelequipuse[i].department);
					console.log(data.channelequipuse[i].department)
					var items = {
						name: data.channelequipuse[i].department,
						value: parseInt(data.channelequipuse[i].num)
					};
					arr2.push(items);
				});

				option.legend.data = arr;
				option.series[0].data = arr2;
				console.log(arr)
				console.log(arr2);
				console.log(option);

				if(option && typeof option === "object") {
					myChart.setOption(option, true);
				}

			}
	});

}
function dealEquipView(){
	var begintime=$$('#begintime').val();
	var finishtime=$$('#finishtime').val();
	
	
	locatePersonBar(begintime,finishtime)
	equipBar(begintime,finishtime);
	locatePie(begintime,finishtime);
}
function locatePersonBar(begintime,finishtime){
	var dom = document.getElementById("locate-person-bar");
var myChart = echarts.init(dom);

option = null;
//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/getEquipStatistic?";
	//var jurl = "http://172.20.2.158:8080/getEquipStatistic?";
	app.request({
		url: jurl,
		method: "get",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			date_begin:begintime,
			date_finish:finishtime

		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {
			//console.log(data.equipactivity)
			 
			
			
option = {
	 title: {
        text: '设备里程数',
       
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            fontSize : 8,
           interval:0,
           rotate:30,
            color: "#657c97",
            fontFamily : "#Arial"
        },
       // data: ['摄像机', '转播车', '话筒', 'Sony', '电池', '录音机', '相机']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
    	label:{                     //---图形上的文本标签
            show:true,
            position:'insideTop',   //---相对位置
            rotate:0,               //---旋转角度
            color:'#eee',
                    },
       // data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
    };
var arr=[];
var arr2=[];
$.each(data.equipdistance, function(i,val){      
      			arr.push(data.equipdistance[i].equipname);
      			console.log(data.equipdistance[i].equipname)
      			
				arr2.push(data.equipdistance[i].num);
  				});
  			
  				option.xAxis.data=arr;
  				option.series[0].data=arr2;
  				console.log(arr)
  				console.log(arr2);
  				console.log(option);
  				
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
		

		}
		});
//option = {
//	 title: {
//      text: '设备里程数',
//     
//  },
//  xAxis: {
//      type: 'category',
//      axisLabel: {
//          fontSize : 8,
//         interval:0,
//         rotate:40,
//          color: "#657c97",
//          fontFamily : "#Arial"
//      },
//      data: ['摄像机', '转播车', '话筒', 'Sony', '电池', '录音机', '相机']
//  },
//  yAxis: {
//      type: 'value'
//  },
//  series: [{
//  	label:{                     //---图形上的文本标签
//          show:true,
//          position:'insideTop',   //---相对位置
//          rotate:0,               //---旋转角度
//          color:'#eee',
//                  },
//      data: [120, 200, 150, 80, 70, 110, 130],
//      type: 'bar'
//  }]
//};
//
//if (option && typeof option === "object") {
//  myChart.setOption(option, true);
//}
}
function equipBar(begintime,finishtime){
	var dom = document.getElementById("locate-equip-bar");
var myChart = echarts.init(dom);

option = null;
//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/getEquipStatistic?";
	//var jurl = "http://172.20.2.158:8080/getEquipStatistic?";
	app.request({
		url: jurl,
		method: "get",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			date_begin:begintime,
			date_finish:finishtime

		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {
			//console.log(data.equipactivity)
			 
			
			
option = {
	 title: {
        text: '员工里程排名（前十位）',
       
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            fontSize : 8,
           interval:0,
           rotate:30,
            color: "#657c97",
            fontFamily : "#Arial"
        }
       // data: ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
    	label:{                     //---图形上的文本标签
            show:true,
            position:'insideTop',   //---相对位置
            rotate:0,               //---旋转角度
            color:'#eee',
                    },
        //data: [120, 200, 150, 80, 70, 110, 130,70, 110, 130],
        type: 'bar'
    }]
};
var arr=[];
var arr2=[];
$.each(data.persondistance, function(i,val){      
      			arr.push(data.persondistance[i].equipname);
      			console.log(data.persondistance[i].equipname)
      			
				arr2.push(data.persondistance[i].num);
  				});
  			
  				option.xAxis.data=arr;
  				option.series[0].data=arr2;
  				console.log(arr)
  				console.log(arr2);
  				console.log(option);
  				
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
		

		}
	});
//option = {
//	 title: {
//      text: '员工里程排名（前十位）',
//     
//  },
//  xAxis: {
//      type: 'category',
//      axisLabel: {
//          fontSize : 8,
//         interval:0,
//         rotate:40,
//          color: "#657c97",
//          fontFamily : "#Arial"
//      },
//      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J']
//  },
//  yAxis: {
//      type: 'value'
//  },
//  series: [{
//  	label:{                     //---图形上的文本标签
//          show:true,
//          position:'insideTop',   //---相对位置
//          rotate:0,               //---旋转角度
//          color:'#eee',
//                  },
//      data: [120, 200, 150, 80, 70, 110, 130,70, 110, 130],
//      type: 'bar'
//  }]
//};
//
//if (option && typeof option === "object") {
//  myChart.setOption(option, true);
//}
}
function locatePie(begintime,finishtime){
var dom = document.getElementById("locate-pie");
var myChart = echarts.init(dom);

option = null;
//***********ajax修改密码************
	var jurl = "http://115.233.208.56/zzzx/getEquipStatistic?";
	//var jurl = "http://172.20.2.158:8080/getEquipStatistic?";
	app.request({
		url: jurl,
		method: "get",
		crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
		dataType: "json",
		data: {
			date_begin:begintime,
			date_finish:finishtime

		},
		beforeSend: function(e) {
			//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
		},
		success: function(data) {
			//console.log(data.equipactivity)
			 
			
			
option = {
	 title: {
        text: '部门活跃度分析',
       
    },
     legend: {
     	type: 'scroll',
        right: 10,
        top: 20,
        bottom: 20,
       // data:['浙江卫视','教育科技','影视娱乐']
    },
     tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}公里 ({d}%)"
    },
    series: [ {
            name: '部门里程数',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
//          data:[
//              {value:335, name:'浙江卫视'},
//              {value:310, name:'教育科技'},
//              {value:234, name:'影视娱乐'},
//             
//          ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
};
var arr=[];
var arr2=[];
$.each(data.equipactivity, function(i,val){      
      			arr.push(data.equipactivity[i].equipname);
      			console.log(data.equipactivity[i].equipname)
      			var items={ 
							name:data.equipactivity[i].equipname, 
							value: parseInt(data.equipactivity[i].active)
						};
				arr2.push(items);
  				});
  			
  				option.legend.data=arr;
  				option.series[0].data=arr2;
  				console.log(arr)
  				console.log(arr2);
  				console.log(option);
  				
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
		

		}
	});

	
}