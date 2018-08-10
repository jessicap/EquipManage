var ws=null,wo=null;
var scan=null,domready=false,bCancel=false;var foo;
// H5 plus事件处理
function plusReady(){
	if(ws||!window.plus||!domready){
		return;
	}
	// 获取窗口对象
	ws=plus.webview.currentWebview();
	wo=ws.opener();
	foo=plus.storage.getItem("username")
	console.log(foo)
	// 显示页面并关闭等待框
    ws.show('pop-in');
    wo.evalJS('closeWaiting()');
}
if(window.plus){
	plusReady();
	console.log("a");
}else{
	document.addEventListener('plusready', plusReady, false);
	console.log("bb");

}

routes = [{
		path: '/',
		url: './index.html',
		on: {
			pageInit: function(e, page) {
				switchPwd();
			}

		}
	},
	{
		path: '/changepwd/',
		url: './pages/changepwd.html',
	},
	{
		path: '/welcome-admin/', //管理员登录后欢迎界面
		templateUrl: './pages/welcome-admin.html',
		options:{
			context:{
				username:foo,
				mobilephone:'bb',
				channel:'cc'
				
			}
		}

	},

	{
		path: '/welcome-normal/', //普通权限登录后欢迎界面
		url: './pages/welcome-normal.html'

	},

	{
		path: '/welcome-chief/', //总监权限登录后欢迎界面
		url: './pages/welcome-chief.html'

	},

	{
		path: '/welcome-leader/', //领导权限登录后欢迎界面
		url: './pages/welcome-leader.html'

	},
	{
		path: '/equip-borrow/', //设备借出
		componentUrl: './pages/equip-borrow.html',
		on: {
			pageInit: function(e, page) {
				$$(".keyword").on('keypress', function(e) {
					var keycode = e.keyCode;
					var which = e.which;
					var searchName = $$(this).val();
					var username, mobilephone;

					if(keycode == '13' || e.which == '13') {
						e.preventDefault();
						//请求搜索接口
						console.log($$(this).attr("name") == "borrow-username");
						if($$(this).attr("name") == "borrow-username") {
							console.log("aaaaa" + searchName);
							username = $$(this).val();
							app.searchBrilstnum(username, mobilephone);
						} else if($$(this).attr("name") == "borrow-mobilephone") {
							console.log("aaaaa" + searchName);
							mobilephone = $$(this).val();
							app.searchBrilstnum(username, mobilephone);
						}

					} else {
						console.log(keycode);
						console.log(which);
					}
				});
			}
		}

	}, {
		path: '/equip-return/', //设备归还
		componentUrl: './pages/equip-return.html',

	},
	{
		path: '/login/',
		url: './index.html', //首页
		on: {
			pageInit: function(e, page) {
				switchPwd();
				// Login Screen Demo
				$$('.login-screen-content .login-button').on('click', function() {
					var username = $$('.login-screen-content [name="username"]').val();
					var password = $$('.login-screen-content [name="password"]').val();

					// Close login screen
					// app.loginScreen.close('#my-login-screen');

					// Alert username and password
					app.dialog.alert('Username: ' + username + '<br>Password: ' + password);

					//***********ajax登录************

					var jurl = "http://115.233.208.56/zzzx/login?";
					//var jurl = "http://172.20.2.158:8080/login?";
					method: "POST",
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
								if(qx == "normal") { //普通用户
									var da = '{"username":"' + username + '","qx":"' + qx + '","userid":"' + userid + '","channel":"' + channel + '","column":"' + column + '"}';
									$.cookie("o", da, {
										expires: "",
										path: "/"
									});
									mainView.router.load({ //加载单独页面page
										url: 'pages/welcome-normal.html', //页面的url
										query: {
											username: username,
											password: password
										}
									});
								} else if(qx == "admin") { //管理员
									var da = '{"username":"' + username + '","qx":"' + qx + '","userid":"' + userid + '","channel":"' + channel + '","column":"' + column + '"}';
									$.cookie("o", da, {
										expires: "",
										path: "/"
									});

									mainView.router.load({ //加载单独页面page
										url: 'pages/welcome-admin.html', //页面的url
										query: {
											username: username,
											password: password
										}
									});
								} else if(qx == "leader") { //领导
									var da = '{"username":"' + username + '","qx":"' + qx + '","userid":"' + userid + '","channel":"' + channel + '","column":"' + column + '"}';
									$.cookie("o", da, {
										expires: "",
										path: "/"
									});

									mainView.router.load({ //加载单独页面page
										url: 'pages/welcome-leader.html', //页面的url
										query: {
											username: username,
											password: password
										}
									});
								} else if(qx == "chief") { //总监
									var da = '{"username":"' + username + '","qx":"' + qx + '","userid":"' + userid + '","channel":"' + channel + '","column":"' + column + '"}';
									$.cookie("o", da, {
										expires: "",
										path: "/"
									});

									mainView.router.load({ //加载单独页面page
										url: 'pages/welcome-chief.html', //页面的url
										query: {
											username: username,
											password: password
										}
									});
								}
							}
						});

					//***********************************/

				});

			}
		}
	},
	{
		path: '/equip-br-admin-search/', //管理员借还单查询
		componentUrl: './pages/equip-br-admin-search.html',
		on: {
			pageInit: function(e, page) {
				$$(".convert-form-to-data-admin").on('click', function(e) {

					var formData = app.form.convertToData('#brlist-admin-form');
					alert(JSON.stringify(formData));
					$$(".searchblock").remove();
					
					app.adminBRlist(formData);
				});
			
			}
		}

	}, {
		path: '/equip-br-admin-detail/:brlistnum/', //管理员借还单查询详情
		async: function(routeTo, routeFrom, resolve, reject) {
			// Router instance
			var router = this;

			// App instance
			var app = router.app;

			// Show Preloader
			app.preloader.show();

			// User ID from request
			var brlistnum = routeTo.params.brlistnum;

			// Simulate Ajax Request
			setTimeout(function() {
				// We got user data from request

				var brlistmsg;

				//***********ajax************

				var jurl = "http://115.233.208.56/zzzx/getAdminBrlistDetail?";
				//var jurl = "http://172.20.2.158:8080/getAdminBrlistDetail?";
				app.request({
					url: jurl,
					method: "GET",
					crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
					dataType: "json",
					data: {
						brlistnum: brlistnum

					},
					beforeSend: function(e) {
						//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
					},
					success: function(data) {

						console.log('Load was performed');
						brlistmsg = data;
						console.log(brlistmsg);

						// Hide Preloader
						app.preloader.hide();

						// Resolve route to load page
						resolve({
							componentUrl: './pages/equip-br-search-detail.html',
						}, {
							context: {
								brlistmsg: brlistmsg,
							}
						});
					}
				});

				//***********************************/

			}, 1000);
		}

	},
	{
		path: '/equip-maintenance/', //设备维护信息
		componentUrl: './pages/equip-maintenance.html',
		on: {
			pageInit: function(e, page) {
				$$(".convert-form-to-data-equipmsg").on('click', function(e) {

					var formData = app.form.convertToData('#equipmsg-form');
					formdata = JSON.stringify(formData)
					alert(JSON.stringify(formData));
					$$(".searchblock").remove();
					app.adminEquipSearch(formdata);
				});
			}
		}
	},

	{
		path: '/equip-maintenance-detail/:centernum/', //设备维护信息详情

		async: function(routeTo, routeFrom, resolve, reject) {
			// Router instance
			var router = this;

			// App instance
			var app = router.app;

			// Show Preloader
			app.preloader.show();

			// User ID from request
			var centernum = routeTo.params.centernum;

			// Simulate Ajax Request
			setTimeout(function() {
				// We got user data from request
				//***********ajax************
				var jurl = "http://115.233.208.56/zzzx/getEquipMaintenanceDetail?";
				//var jurl = "http://172.20.2.158:8080/getEquipMaintenanceDetail?";
				app.request({
					url: jurl,
					method: "GET",
					crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
					dataType: "json",
					data: {
						centernum: centernum

					},
					beforeSend: function(e) {
						//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
					},
					success: function(data) {

						console.log(data);

						console.log('Load was performed' + data.equipname);
						var equipmsg = data;

						//			equipmsg.push(
						//				
						////				{
						//					equipname: data.equipname,
						//					centernum: centernum,
						//					type: data.type,
						//					department: data.department,
						//					groupnum: data.groupnum,
						//					storeplace: data.storeplace,
						//					storelocation: data.storelocation,
						//					status: data.status,
						//					tag: data.tag,
						//					IMME: data.IMME,
						//					username: data.username,
						//					serialnum: data.serial,
						//					remarks: data.remarks,
						//					imgurls: [{
						//
						//							url: 'img/test.jpg'
						//						},
						//						{
						//
						//							url: 'img/test.jpg'
						//						},
						//					],
						//					repairlist: [{
						//
						//							repairproblem: '第一次故障的内容是这样的',
						//							repairtime: '2018-05-16'
						//						},
						//						{
						//
						//							repairproblem: '第二次故障的内容是这样的',
						//							repairtime: '2018-06-16'
						//						},
						//					],

						//			}
						//		);

						html2 = app.adminEquipSearchTemplate(equipmsg);

						$$('.equip-admin').html(html2);

						// Hide Preloader
						app.preloader.hide();

						// Resolve route to load page
						resolve({
							componentUrl: './pages/equip-maintenance-detail.html',
						}, {
							context: {
								equipmsg: equipmsg,
							}
						});
					}
				});

				//***********************************/

				//				var equipmsg = {
				//					equipname: 'SONY摄像机',
				//					centernum: centernum,
				//					type: 'CD150',
				//					department: '制作中心',
				//					groupnum: '201703-125',
				//					storeplace: '制作楼131',
				//					storelocation: 'A21',
				//					status: 'Y',
				//					tag: '摄像机',
				//					IMME: '20665985',
				//					username: '某某某',
				//					serialnum: '4521212',
				//					remarks: '边角有损坏',
				//					imgurls: [{
				//
				//							url: 'img/test.jpg'
				//						},
				//						{
				//
				//							url: 'img/test.jpg'
				//						},
				//					],
				//					repairlist: [{
				//
				//							repairproblem: '第一次故障的内容是这样的',
				//							repairtime: '2018-05-16'
				//						},
				//						{
				//
				//							repairproblem: '第二次故障的内容是这样的',
				//							repairtime: '2018-06-16'
				//						},
				//					],
				//
				//				};

			}, 1000);
		},
		on: {
			pageInit: function(e, page) {
				$$(".edit").on('click', function(e) {
					$$('input[name="storelocation"]').removeAttr("disabled").css({"border":"1px solid #CCCCCC","width":"100%"});
					$$('input[name="storeplace"]').removeAttr("disabled").css({"border":"1px solid #CCCCCC","width":"100%"});
					$$('input[name="equipname"]').removeAttr("disabled").css({"border":"1px solid #CCCCCC","width":"100%"});
					$$('input[name="type"]').removeAttr("disabled").css({"border":"1px solid #CCCCCC","width":"100%"});
					$$('input[name="remarks"]').removeAttr("disabled").css({"border":"1px solid #CCCCCC","width":"100%"});
					$$(".btn").html("<p class='row'><button class='col button button-fill color-red ' onclick='cancelEquip(123)'>取消</button><button class='col button button-fill color-green ' onclick='updateEquip(this)'>确认</button></p>")
					$$(".equip-maintenance-imglist").append("<i class='f7-icons img-delete' onclick='deleteimg(this)'>trash</i>")
				});
				var flag =plus.storage.getItem("qx");
				console.log(flag);
				if(flag == "leader") {
					$$(".btn").hide();
				}

			}
		},

	},
	{
		path: '/equip-repair/:centernum/:equipname/:type/:serialnum/', //设备维修信息详情
		async: function(routeTo, routeFrom, resolve, reject) {
			// Router instance
			var router = this;

			// App instance
			var app = router.app;

			// Show Preloader
			app.preloader.show();

			// User ID from request
			var centernum = routeTo.params.centernum;
			var equipname = routeTo.params.equipname;
			var type = routeTo.params.type;
			var serialnum = routeTo.params.serialnum;
			// Simulate Ajax Request
			setTimeout(function() {
				// We got user data from request
				var repairmsg = {
					equipname: equipname,
					type: type,
					serialnum: serialnum,
					centernum: centernum,

				};
				// Hide Preloader
				app.preloader.hide();

				// Resolve route to load page
				resolve({
					componentUrl: './pages/equip-repair.html',
				}, {
					context: {
						repairmsg: repairmsg,
					}
				});
			}, 1000);
		},
		on: {
			pageInit: function(e, page) {
				// 给input  date设置默认值
				var now = new Date();
				//格式化日，如果小于9，前面补0
				var day = ("0" + now.getDate()).slice(-2);
				//格式化月，如果小于9，前面补0
				var month = ("0" + (now.getMonth() + 1)).slice(-2);
				//拼装完整日期格式
				var today = now.getFullYear() + "-" + (month) + "-" + (day);
				//完成赋值
				$$('#repairtime').val(today);

			}
		},

	},
	{
		path: '/equip-locate/',
		componentUrl: './pages/equip-locate.html',
		on: {
			pageInit: function(e, page) {
				var qx = plus.storage.getItem("qx")
				console.log(qx);
				if(qx == "leader") {
					$$(".listbutton").hide();
					$$(".searchlocateequip").append("<button class='col button button-fill' style='margin:1rem 0 0 0;'><a href='/equip-view-statistic/' style='color:#fff;'>统&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计</a></button>")
				}
			}
		}
	},
	{
		path: '/equip-locate-single/:IMME/', //设备维修信息详情
		async: function(routeTo, routeFrom, resolve, reject) {
			// Router instance
			var router = this;

			// App instance
			var app = router.app;

			// Show Preloader
			app.preloader.show();

			// User ID from request

			var equipimme = routeTo.params.IMME;
			// Simulate Ajax Request
			setTimeout(function() {
				// We got user data from request

				// Hide Preloader
				app.preloader.hide();

				// Resolve route to load page
				resolve({
					componentUrl: './pages/equip-locate-single.html',
				}, {
					context: {
						equipimme: equipimme
					}
				});
			}, 1000);
		},

	},
	{
		path: '/location/:location/', //设备具体位置地图
		async: function(routeTo, routeFrom, resolve, reject) {
			// Router instance
			var router = this;

			// App instance
			var app = router.app;

			// Show Preloader
			app.preloader.show();

			// User ID from request

			var location = routeTo.params.location;
			// Simulate Ajax Request
			console.log(location);
			setTimeout(function() {
				// We got user data from request

				// Hide Preloader
				app.preloader.hide();

				// Resolve route to load page
				resolve({
					componentUrl: './pages/location.html',
				}, {
					context: {
						location: location
					}
				});
			}, 1000);
		},

	},
	{
		path: '/equip-locate-manage/', //设备定位管理
		componentUrl: './pages/equip-locate-manage.html'

	},
	{
		path: '/financial-statistic/', //管理员--财务统计查询
		componentUrl: './pages/financial-statistic.html',
		on: {
			pageInit: function(e, page) {

				var pickerCustomToolbar = app.picker.create({
					inputEl: '#demo-picker-custom-toolbar',
					rotateEffect: true,
					renderToolbar: function() {
						return '<div class="toolbar">' +
							'<div class="toolbar-inner">' +
							'<div class="right" style="position:absolute;right:10px;">' +
							'<a href="#" class="link sheet-close popover-close">确定</a>' +
							'</div>' +
							'</div>' +
							'</div>';
					},
					formatValue: function(values, displayValues) {
						return values[0] + "年" + values[1] + "月";
					},
					cols: [
						// Years
						{
							values: (function() {
								var arr = [];
								for(var i = 2010; i <= 2030; i++) {
									arr.push(i);
								}
								return arr;
							})(),
						},
						// Months
						{
							values: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
							//displayValues: ('January February March April May June July August September October November December').split(' '),
							textAlign: 'left'
						}

					],
					on: {
						open: function(picker) {
							$$('.searchfinacial').on('click', function() {
								console.log(picker.getValue());
								console.log("aaaaa");
								var month = picker.getValue()[0];
								var year = picker.getValue()[1];
								var column = $$("#admin-channel-select").val();
								app.financial(month, year, column);

							});

						},
					}
				});

			}
		}

	},
	{
		path: '/financial-static-detail/:column/:month/:year/', //管理员--财务统计详情
		async: function(routeTo, routeFrom, resolve, reject) {
			// Router instance
			var router = this;

			// App instance
			var app = router.app;

			// Show Preloader
			app.preloader.show();

			// User ID from request
			var column = routeTo.params.column;
			var month = routeTo.params.month;
			var year = routeTo.params.year;

			// Simulate Ajax Request
			setTimeout(function() {
				// We got user data from request
				
				
				//***********ajax************

				var jurl = "http://115.233.208.56/zzzx/getFinancialStatisticDetail?";
				//var jurl = "http://172.20.2.158:8080/getFinancialStatisticDetail?";
				app.request({
					url: jurl,
					method: "GET",
					crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
					dataType: "json",
					data: {
						column: column,
						month:month,
						year:year

					},
					beforeSend: function(e) {
						//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
					},
					success: function(data) {

						console.log('Load was performed');
						var staticmsg = data;
						
						// Hide Preloader
					app.preloader.hide();

				// Resolve route to load page
				resolve({
					componentUrl: './pages/financial-static-detail.html',
				}, {
					context: {
						staticmsg: staticmsg,
					}
				});
					}
				});

				//***********************************/
//				var staticmsg = {
//					"year": year,
//					"month": month,
//					"staticdetail": [{
//						"equipname": "Sony摄像机",
//						"centernum": "122424",
//						"username": "管理员A",
//						"fee": "10000"
//					}, {
//						"equipname": "Sony摄像机",
//						"centernum": "122424",
//						"username": "管理员A",
//						"fee": "10000"
//					}]
//
//				};

			
				
			}, 1000);
		}

	},
	{
		path: '/manual/',
		url: './pages/manual.html',
	},
	{
		path: '/equip-br-normal-search/', //普通权限借还单查询
		componentUrl: './pages/equip-br-normal-search.html',
		on: {
			pageInit: function(e, page) {
				$$(".convert-form-to-data").on('click', function(e) {

					var formData = app.form.convertToData('#normal-form');
					alert(JSON.stringify(formData));
					$$(".searchblock").remove();
					app.normalBRlist(formData.isverify);
				});
			}
		}

	},
	{
		path: '/equip-br-normal-detail/:brlistnum/', //普通借还单查询详情
		async: function(routeTo, routeFrom, resolve, reject) {
			// Router instance
			var router = this;

			// App instance
			var app = router.app;

			// Show Preloader
			app.preloader.show();

			// User ID from request
			var brlistnum = routeTo.params.brlistnum;

			// Simulate Ajax Request
			setTimeout(function() {
				// We got user data from request
				var brlistmsg;

				//***********ajax************

				var jurl = "http://115.233.208.56/zzzx/getAdminBrlistDetail?";
				//var jurl = "http://172.20.2.158:8080/getAdminBrlistDetail?";
				app.request({
					url: jurl,
					method: "GET",
					crossDomain: true, //这个一定要设置成true，默认是false，true是跨域请求。
					dataType: "json",
					data: {
						brlistnum: brlistnum

					},
					beforeSend: function(e) {
						//alert("ddddd");//发送数据过程，you can do something,比如:loading啥的
					},
					success: function(data) {

						console.log('Load was performed');
						brlistmsg = data;
						console.log(brlistmsg);
						// Hide Preloader
						app.preloader.hide();

						// Resolve route to load page
						resolve({
							componentUrl: './pages/equip-br-normal-search-detail.html',
						}, {
							context: {
								brlistmsg: brlistmsg,
							}
						});
					}
				});

				//***********************************/
				//				var brlistmsg = {
				//					brlistnum: brlistnum,
				//					department: '电视制作中心',
				//					column: '中国新歌声第三季',
				//					username: '某某某',
				//					mobilephone: '18698985865',
				//					remarks: '摄像机三个',
				//					imgurl: 'img/test.jpg',
				//					equiplist: [{
				//
				//							equipname: 'Sony摄像机',
				//							centernum: '12345',
				//							status: 'Y'
				//
				//						},
				//						{
				//
				//							equipname: 'Sony摄像机',
				//							centernum: '12345',
				//							status: 'N'
				//
				//						}
				//					]
				//
				//				};

			}, 1000);
		}

	},
	{
		path: '/financial-view-normal/', //普通权限--财务统计查询
		componentUrl: './pages/financial-view-normal.html',
		on: {
			pageInit: function(e, page) {

				var pickerCustomToolbar = app.picker.create({
					inputEl: '#demo-picker-custom-toolbar',
					rotateEffect: true,
					renderToolbar: function() {
						return '<div class="toolbar">' +
							'<div class="toolbar-inner">' +
							'<div class="right" style="position:absolute;right:10px;">' +
							'<a href="#" class="link sheet-close popover-close">确定</a>' +
							'</div>' +
							'</div>' +
							'</div>';
					},
					formatValue: function(values, displayValues) {
						return values[0] + "年" + values[1] + "月";
					},
					cols: [
						// Years
						{
							values: (function() {
								var arr = [];
								for(var i = 2010; i <= 2030; i++) {
									arr.push(i);
								}
								return arr;
							})(),
						},
						// Months
						{
							values: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
							//displayValues: ('January February March April May June July August September October November December').split(' '),
							textAlign: 'left'
						}

					],
					on: {
						open: function(picker) {
							picker.$el.find('.popover-close').on('click', function() {
								console.log(picker.getValue());
								console.log("aaaaa");
								var month = picker.getValue()[0];
								var year = picker.getValue()[1];
								app.financialNormal(month, year);

							});

						},
					}
				});

			}
		}

	},
	{
		path: '/update-column/', //普通权限 --更新栏目名称
		componentUrl: './pages/update-column-normal.html',
		on: {
			pageInit: function(e, page) {
				var column = JSON.parse($.cookie("o")).column;
				console.log(column);
				$$('input[name="currentcolumn"]').val(column);

			}
		}
	},
	{
		path: '/equip-br-chief-search/', //总监权限借还单查询
		componentUrl: './pages/equip-br-chief-search.html',
		on: {
			pageInit: function(e, page) {
				$$(".convert-form-to-data").on('click', function(e) {

					var formData = app.form.convertToData('#chief-form');
					alert(JSON.stringify(formData));
					$$(".searchblock").remove();
					app.chiefBRlist(formData);
				});
			}
		}

	},
	{
		path: '/equip-br-chief-detail/:brlistnum/', //总监借还单查询详情
		async: function(routeTo, routeFrom, resolve, reject) {
			// Router instance
			var router = this;

			// App instance
			var app = router.app;

			// Show Preloader
			app.preloader.show();

			// User ID from request
			var brlistnum = routeTo.params.brlistnum;

			// Simulate Ajax Request
			setTimeout(function() {
				// We got user data from request
				var brlistmsg = {
					brlistnum: brlistnum,
					department: '电视制作中心',
					column: '中国新歌声第三季',
					username: '某某某',
					mobilephone: '18698985865',
					remarks: '摄像机三个',
					imgurl: 'img/test.jpg',
					equiplist: [{

							equipname: 'Sony摄像机',
							centernum: '12345',
							status: 'Y'

						},
						{

							equipname: 'Sony摄像机',
							centernum: '12345',
							status: 'N'

						}
					]

				};

				// Hide Preloader
				app.preloader.hide();

				// Resolve route to load page
				resolve({
					componentUrl: './pages/equip-br-chief-search-detail.html',
				}, {
					context: {
						brlistmsg: brlistmsg,
					}
				});
			}, 1000);
		}

	},
	{
		path: '/financial-statistic-chief/', //总监--财务统计查询
		componentUrl: './pages/financial-statistic-chief.html',
		on: {
			pageInit: function(e, page) {

				var pickerCustomToolbar = app.picker.create({
					inputEl: '#demo-picker-custom-toolbar',
					rotateEffect: true,
					renderToolbar: function() {
						return '<div class="toolbar">' +
							'<div class="toolbar-inner">' +
							'<div class="right" style="position:absolute;right:10px;">' +
							'<a href="#" class="link sheet-close popover-close">确定</a>' +
							'</div>' +
							'</div>' +
							'</div>';
					},
					formatValue: function(values, displayValues) {
						return values[0] + "年" + values[1] + "月";
					},
					cols: [
						// Years
						{
							values: (function() {
								var arr = [];
								for(var i = 2010; i <= 2030; i++) {
									arr.push(i);
								}
								return arr;
							})(),
						},
						// Months
						{
							values: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
							//displayValues: ('January February March April May June July August September October November December').split(' '),
							textAlign: 'left'
						}

					],
					on: {
						open: function(picker) {
							$$('.financial-chief').on('click', function() {
								console.log(picker.getValue());
								console.log("aaaaa");
								var month = picker.getValue()[0];
								var year = picker.getValue()[1];
								var column = JSON.parse($.cookie("o")).column;
								app.financial(month, year, column);

							});

						},
					}
				});

			}
		}

	},
	{
		path: '/leader-equip-view/', //领导设备速览
		componentUrl: './pages/leader-equip-view.html',
		on: {
			pageInit: function(e, page) {

				var pickerCustomToolbar = app.picker.create({
					inputEl: '#demo-picker-custom-toolbar',
					rotateEffect: true,
					renderToolbar: function() {
						return '<div class="toolbar">' +
							'<div class="toolbar-inner">' +
							'<div class="right" style="position:absolute;right:10px;">' +
							'<a href="#" class="link sheet-close popover-close">确定</a>' +
							'</div>' +
							'</div>' +
							'</div>';
					},
					formatValue: function(values, displayValues) {
						return values[0] + "年" + values[1] + "月";
					},
					cols: [
						// Years
						{
							values: (function() {
								var arr = [];
								for(var i = 2010; i <= 2030; i++) {
									arr.push(i);
								}
								return arr;
							})(),
						},
						// Months
						{
							values: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
							//displayValues: ('January February March April May June July August September October November December').split(' '),
							textAlign: 'left'
						}

					]
				})
			}
		}
	},

	{
		path: '/equip-view-statistic/', //设备统计界面
		componentUrl: './pages/equip-view-statistic.html'

	},
	// Default rute (404 page). MUST BE THE LAST
	{
		path: '(.*)',
		url: './pages/404.html',
	},
];

function dealBorrow(type, result) {
	console.log(result);
	$$(".numberinput").val(result);
	app.searchLocation(result);
	//var a=$$(".numberinput").val();
	//console.log(a);
}

function dealReturn(type, result) {
	console.log(result);
	$$(".numberinput").val(result);
	app.equipReturnStatus(result);
	//var a=$$(".numberinput").val();
	//console.log(a);

}

function dealEquip(type, result) {
	console.log(result);
	$$(".equip-centernum").val(result);
	//app.searchEquip(null, result);
	//var a=$$(".numberinput").val();
	//console.log(a);

}

function dealLocateSearch() {

	console.log("eeeee");

	//	var formData = app.form.convertToData('#equiplocate-form');
	//alert(JSON.stringify(formData));
	//
	var equipname = $$('input[name="equipname"]').val();
	var tag = $$('select[name="type"]').val();
	console.log(equipname + tag);
	app.searchEquipLocate(equipname, tag);
	$$(".equip-locate .listbutton").remove();
	$$(".equip-locate .allequipmap").remove();

}

function dealLocateManageSearch() {

	console.log("eeeee");

	//	var formData = app.form.convertToData('#equiplocate-form');
	//alert(JSON.stringify(formData));
	//
	var locateequipname = $$('input[name="locateequipname"]').val();
	var centernum = $$('input[name="centernum"]').val();
	console.log(locateequipname + centernum);
	app.manageEquipLocate(locateequipname, centernum);

}

function deleteEquipReturn(centernum) {
	console.log("delete");
	equipReturn.splice(equipReturn.indexOf(centernum), 1);
	$$('.totalequip').html("总计：" + equipReturn.length);
	$$(".equip-" + centernum).remove();

}

function deleteEquip(centernum) {
	console.log("delete " + centernum);
	equip.splice(equip.indexOf(centernum), 1);

	$$('.totalequip').html("总计：" + equip.length);
	$$(".equip-" + centernum).remove();

}

function searchManual() {
	console.log("ddd");
	var filename = $$('input[name="keyword"]').val();
	console.log(filename);
	app.searchManuallist(filename);

}

