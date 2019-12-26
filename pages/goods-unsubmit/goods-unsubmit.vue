<template>
	<view>
		<view class="list" v-for="(item,index) in data" :key="index" @tap="navigate(item.goodsID)">
			<view class="goods-name">商品名:{{item.goodsName}}</view>
			<view class="goods-type">类别:{{item.goodsType}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[]
			}
		},
		onLoad:function(){
			this.getList()
		},
		methods:{
			getList:function(){
				uni.request({
					url:this.$url+'unSubmitGoods',
					success:(res)=>{
						console.log(res)
						this.data=res.data.items;
					}
				})
			},
			navigate:function(goodsID){
				uni.navigateTo({
					url:'../goods-add/add1/add1?goodsID='+goodsID
				})
			}
		}
	}
</script>

<style>
	.list{
		width: 750upx;
		height:120upx;
		margin-bottom: 10upx;
		background-color: white;
	}
	.goods-name,.goods-type{
		text-indent: 40upx;
		width:750upx;
		height:60upx;
		line-height: 60upx;
	}
</style>
