// thent(urla,meth,stringn){
// 	uni.getStorage({
// 		key:"token",
// 		success(res){
// 			var come=res.data
// 		}
// 	});
// 	uni.request({
// 		url:urla,
// 		method:meth,
// 		header:{
// 			token:come
// 		},
// 		stringn,
// 		success(res) {
// 			return res
// 		}
// 	})
// };

let	thent=(urla,meth,stringn)=> {
		uni.getStorage({
			key:"token",
			success(res) {
				var come=res.data
			}
		})
		uni.request({
			url:urla,
			method:meth,
			header:{
				token:come
			},
			stringn,
			success(res) {
				return res
			}
		})
	}

export default {
 
		thent(urla,meth,stringn) {
			return thent(urla,meth,stringn);
		}
	}
