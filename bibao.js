var a = 1;
var obj = {
	A: function(){
		this.a  = 2;
		console.log(this)//obj
		function B(){
			console.log(this)//window
			alert(this.a);
		}
		return B;
	}
}
obj.A()();//1




var a = 1;
var obj = {
	A: function(){
		this.a  = 2;
		console.log(this)//obj
		function B(){
			console.log(this)//window
			alert(a);
		}
		return B;
	}
}
obj.A()();//1




var a = 1;
var obj = {
	A: function(){
		var a = 2;
		console.log(this)//obj
		function B(){
			console.log(this)//window
			alert(a);
		}
		return B;
	}
}
obj.A()();//2



function C(){
	use strict;
	console.log(this);
}
C();
