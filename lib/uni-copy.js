export default function uniCopy({content,success,error}) {
	
	content = typeof content === 'string' ? content : content.toString() // 复制内容，必须字符串，数字需要转换为字符串
	
	/**
	 * 小程序端 和 app端的复制逻辑
	 */
	//#ifndef H5
	uni.setClipboardData({
		data: content,
		success: function() {
			success("复制成功~")
			console.log('success');
		},
		fail:function(){
			success("复制失败~")
		}
	});
	//#endif
	
	/**
	 * H5端的复制逻辑
	 */
	// #ifdef H5
	if (!document.queryCommandSupported('copy')) { //为了兼容有些浏览器 queryCommandSupported 的判断
		// 不支持
		error('浏览器不支持')
	}
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	textarea.remove()
	success("复制成功~")
	// #endif
}
