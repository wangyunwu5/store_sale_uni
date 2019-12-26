<template>
	<view class="content">
		<view class="page-body">
			<view class="btn-area" id="buttonContainer">
				<button type="default" plain="true" @tap="navigateToOrder()">订单列表</button>
				<button type="default" plain="true" @tap="navigateToRefunds()">退款订单</button>
				<button type="default" plain="true" @tap="navigateToAddGoods()">添加商品</button>
				<button type="default" plain="true" @tap="navigateToUnSubmit()">未确认商品</button>
				<button type="default" plain="true" @tap="navigateToList()">已确认商品</button>
				<button type="default" plain="true" @tap="navigateToExpress()">运费设置</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[]
			}
		},
		methods:{
			navigateToOrder:function(e){
				uni.navigateTo({url: '../order-list/order-list?s=1',})
			},
			navigateToRefunds:function(e){
				uni.navigateTo({url: '../refunds-list/refunds-list',})
			},
			navigateToAddGoods:function(e){
				uni.navigateTo({url: '../goods-add/add1/add1',})
			},
			navigateToUnSubmit:function(e){
				uni.navigateTo({url: '../goods-unsubmit/goods-unsubmit',})
			},
			navigateToList:function(e){
				uni.navigateTo({url: '../goods-list/goods-list',})
			},
			navigateToExpress:function(e){
				uni.navigateTo({url: '../express/express',})
			},
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
	.content {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items:flex-start;
		padding-top:20%;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	button {
		margin-top: 30upx;
		margin-bottom: 30upx;
	}

	.button-sp-area {
		margin: 0 auto;
		width: 60%;
	}

	.mini-btn {
		margin-right: 10upx;
	}	
</style>
