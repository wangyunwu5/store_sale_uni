<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}
	/* #endif */
	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 15rpx;
		width: 750rpx;
	}
	.toright{
		height: 40rpx;
		width: 40rpx;
	}
</style>
