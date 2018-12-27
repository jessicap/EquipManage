$(document).ready(function(){

			$(document).endlessScroll({

				bottomPixels: 450,

				fireDelay: 10,

				callback: function(p){

					var last_img = $(".brlist ul");

					$(".brlist").append("<i class='f7-icons img-delete' onclick='deleteimg(this)'>trash</i>")

				}

			});

		});