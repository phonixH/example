function setCookies(name,value,end_day){
	var date = new Date();
	date.setDate(date.getDate() + end_day);
	document.cookie = name + '=' + escape(value) + (end_day ? ';expries=' + date.toString() : '');
};

function getCookies(name){
	console.log(document.cookie)
	if(document.cookie){
		var coo = document.cookie;
		var arr1 = coo.split('; ');
		var arr2 = [];
		for(var i=0; i<arr1.length; i++){
			arr2.push(arr1[i].split('='));
		}
		if(name){
			for(var j=0; j<arr2.length; j++){
				if(arr2[j][0] == name){
					return unescape(arr2[j][1]);
				}
			}
		}else{
			var obj = {};
			for(var j=0; j<arr2.length; j++){
				obj[arr2[j][0]] = unescape(arr2[j][1]);
			}
			return obj;
		}
	}else{
		return false;
	}
};
function setCartCookies(name,value,day){
	var date = new Date();
	date.setDate(date.getDate() + day);
	document.cookie = name + escape(value) + ';expires = ' + date.toString();
};

function getCartCookies(name){
	var coo = unescape(document.cookie);
	var arr1 = coo.split(';');
	var arr2 = [];
	var arr3 = [];
	var obj = {};
	for(var i=0; i<arr1.length; i++){
		arr2.push(arr1[i].split('='));
		if(!arr2[i][1]){
			return false;
		}
		arr3[i] = arr2[i][1].split('|');
		for(var j=0; j<arr3[i].length; j++){
			arr3[i][j] = arr3[i][j].split('-');
		}
	}
	for(var i=0; i<arr3.length; i++){
		for(var j=0; j<arr3[i].length; j++){
			if(name == arr3[i][j][1]){
				for(var z=0; z<arr3[i].length; z++){
					obj[arr3[i][z][0]] = arr3[i][z][1];
				}
			}
		}
	}
	return obj;
}

function getGoods(){
	var coo = document.cookie;
	var arr1 = coo.split(';');
	var arr2 = [];
	for(var i=0; i<arr1.length; i++){
		arr2.push(arr1[i].split('=')[0]);
	}
	return arr2;
}

function clearCookies(name){
	setCookies(name,'',-1);
};